"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

function ConfirmPageContent() {
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      const tokenHash = searchParams.get("token_hash")
      const type = searchParams.get("type")

      if (!tokenHash || type !== "signup") {
        setError("Invalid verification link")
        setLoading(false)
        return
      }

      try {
        // Verify email using Supabase's built-in verification
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'email'
        })

        if (error) throw error

        // Get the current session after verification
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) throw sessionError

        // Create user profile if session exists
        if (session?.user) {
          const profileData = {
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || '',
            updated_at: new Date().toISOString(),
          };
          
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert(profileData)
            .select()
            .single();

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Don't throw here, profile creation failure shouldn't block login
          }
        }

        setSuccess(true)
        toast.success("Email verified successfully!")
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      } catch (err) {
        console.error("Email verification error:", err)
        setError(err instanceof Error ? err.message : "Failed to verify email. The link may have expired.")
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="modern-card p-8 animate-slide-up backdrop-blur-sm bg-white/80">
          <div className="text-center mb-8">
            {loading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-brand-500 mb-4" />
                <p className="text-neutral-600">Verifying your email...</p>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">Email Verified!</h1>
                <p className="text-neutral-600">Your account has been successfully verified.</p>
                <p className="text-neutral-600">Redirecting to dashboard in 3 seconds...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircle className="h-12 w-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">Verification Failed</h1>
                <p className="text-red-600">{error}</p>
                <Link
                  href="/auth/register"
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-500 text-white px-4 py-2 text-sm font-medium hover:bg-brand-600 transition-colors"
                >
                  Try Again
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="modern-card p-8 animate-slide-up backdrop-blur-sm bg-white/80">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-brand-500 mb-4" />
                <p className="text-neutral-600">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ConfirmPageContent />
    </Suspense>
  )
}
