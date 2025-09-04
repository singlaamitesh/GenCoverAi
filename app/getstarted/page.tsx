"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Zap, Users, CheckCircle } from "lucide-react"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">GenCover</span>
          </Link>
          <Link
            href="/auth/login"
            className="text-neutral-600 hover:text-brand-600 font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-500 to-accent-500 rounded-2xl mb-8 shadow-large">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-neutral-900 mb-6">
            Create Amazing Phone Cases
            <span className="block text-brand-600">with AI</span>
          </h1>

          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
            Transform your ideas into stunning custom phone cases using our advanced AI technology.
            Design, customize, and order in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-xl hover:border-brand-500 hover:text-brand-600 transition-colors"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Why Choose GenCover?
            </h2>
            <p className="text-lg text-neutral-600">
              Everything you need to create perfect phone cases
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">AI-Powered Design</h3>
              <p className="text-neutral-600">
                Generate unique designs using advanced AI technology. Just describe your vision and watch it come to life.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Premium Quality</h3>
              <p className="text-neutral-600">
                High-resolution prints on durable, scratch-resistant materials. Your designs look amazing and last longer.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-neutral-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Community Driven</h3>
              <p className="text-neutral-600">
                Join thousands of creators sharing their designs. Get inspired and share your unique creations with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600">
              Create your perfect phone case in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Describe Your Design</h3>
              <p className="text-neutral-600">
                Tell our AI what you want - from abstract art to your favorite characters, sports teams, or personal photos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Customize & Preview</h3>
              <p className="text-neutral-600">
                Fine-tune your design with our easy-to-use tools. Preview how it looks on different phone models.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Order & Enjoy</h3>
              <p className="text-neutral-600">
                Place your order and receive your custom phone case within days. Perfect fit and stunning quality guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-brand-500 to-accent-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of creators and start designing your perfect phone case today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-brand-600 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-brand-500 to-accent-500 rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">GenCover</span>
          </div>
          <p className="text-neutral-400">
            © 2025 GenCover. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
