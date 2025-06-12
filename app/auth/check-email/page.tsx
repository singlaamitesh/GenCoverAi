"use client"

import { Mail } from "lucide-react"
import Link from "next/link"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 p-4">
      <div className="w-full max-w-md relative z-10">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-brand-600 mb-8 transition-colors group"
        >
          <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <div className="modern-card p-8 animate-slide-up backdrop-blur-sm bg-white/80">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-2xl mb-6 shadow-large">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Check Your Email</h1>
            <p className="text-neutral-600">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="w-full inline-flex items-center justify-center rounded-lg bg-brand-500 text-white px-4 py-3 text-sm font-medium hover:bg-brand-600 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
