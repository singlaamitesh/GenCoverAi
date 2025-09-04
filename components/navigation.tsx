"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Sparkles, Menu, X } from "lucide-react"
import { CartButton } from "./cart"
import UserGreeting from "./UserGreeting"
import { createClient } from "@/lib/supabase/client"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  
  // Set client-side state
  useEffect(() => {
    setIsClient(true)
    
    // Check current user
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      }
    }
    
    checkUser()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => document.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/generate", label: "Design" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b transition-all duration-300 ${
      scrolled ? 'shadow-md border-neutral-200' : 'border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              GenCover
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full">
            <div className="flex items-center h-full space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-neutral-700 hover:text-brand-600 font-medium transition-colors duration-200 relative group h-full flex items-center"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)] transform -translate-x-1/2"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center">
              {isClient && <UserGreeting />}
            </div>
            
            <div className="relative">
              <CartButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -mr-2 text-neutral-600 hover:text-brand-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-opacity-50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth Section - Shows either sign in/up or user greeting */}
            <div className="pt-2 border-t border-neutral-100 mt-2">
              <div className="px-4 py-2">
                {isClient && <UserGreeting />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
