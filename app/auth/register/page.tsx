"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase/client"
import { sendEmail } from "../../lib/email"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    setIsLoading(true)

    try {
      // First, sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name }
        }
      })

      if (signUpError) throw signUpError

      // Sign in the user immediately
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) throw signInError;

      // Create or update user profile
      if (signInData.user) {
        console.log('Creating/updating profile for user:', signInData.user.id);
        
        const profileData = {
          id: signInData.user.id,
          full_name: formData.name,
          updated_at: new Date().toISOString(),
        };
        
        console.log('Profile data to upsert:', profileData);
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .upsert(profileData)
          .select()
          .single();

        console.log('Profile upsert result:', { profile, profileError });
        
        if (profileError) {
          console.error('Profile upsert error:', profileError);
          throw new Error(`Failed to create/update profile: ${profileError.message}`);
        }

        // Force refresh the session to ensure it's properly set
        await supabase.auth.refreshSession();
        
        // Store user data in localStorage
        if (signInData.session) {
          localStorage.setItem('supabase.auth.token', signInData.session.access_token);
          localStorage.setItem('supabase.user', JSON.stringify(signInData.user));
        }

        // Send welcome email
        try {
          await sendEmail({
            to: formData.email,
            subject: 'Welcome to GenCover!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #4F46E5;">Welcome to GenCover, ${formData.name}!</h1>
                <p>Thank you for registering with us. We're excited to have you on board!</p>
                <p>Please check your email to complete your registration and verify your account.</p>
                <p>If you don't see the email, please check your spam folder.</p>
                <a href="${window.location.origin}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Go to Home Page</a>
                <p style="margin-top: 30px; font-size: 12px; color: #666;">
                  If you didn't create an account, please ignore this email.
                </p>
              </div>
            `,
          });
          
          // Show success message with email instructions
          toast.success(
            <div>
              <p className="font-medium">Account created successfully!</p>
              <p className="text-sm">Please check your email to verify your account.</p>
            </div>,
            {
              duration: 10000,
            }
          );

          // Redirect to home page after a short delay to show the message
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          toast.error("Account created, but we couldn't send the welcome email. Please contact support.");
          // Still redirect to home page even if email fails
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-200/30 to-brand-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-brand-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-accent-100/20 to-brand-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-brand-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl mb-6 shadow-large">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h1>
          <p className="text-neutral-600">Join thousands of creators designing amazing phone cases</p>
        </div>

        {/* Register Form */}
        <div className="modern-card p-8 animate-slide-up backdrop-blur-sm bg-white/80">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="modern-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="modern-input"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="modern-input pr-12"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="modern-input pr-12"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full premium-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-brand-600 hover:text-brand-700 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="modern-card p-4 bg-white/60 backdrop-blur-sm">
              <div className="text-2xl font-bold text-brand-600 mb-1">2</div>
              <div className="text-xs text-neutral-600">Free Designs</div>
            </div>
            <div className="modern-card p-4 bg-white/60 backdrop-blur-sm">
              <div className="text-2xl font-bold text-brand-600 mb-1">24h</div>
              <div className="text-xs text-neutral-600">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
