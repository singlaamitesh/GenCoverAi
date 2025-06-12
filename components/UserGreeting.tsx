'use client';

import { useState, useEffect, useRef } from 'react';
import { LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UserGreetingProps {
  onLinkClick?: () => void;
}

export default function UserGreeting({ onLinkClick }: UserGreetingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Set client-side state and fetch user
  useEffect(() => {
    setIsClient(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    try {
      setIsOpen(false);
      
      // Show loading state
      toast.loading('Signing out...');
      
      // Sign out from Supabase first
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.user');
      
      // Clear session storage
      sessionStorage.clear();
      
      // Clear all cookies by setting them to expire in the past
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      
    } catch (error) {
      console.error('Error during sign out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    if (onLinkClick) onLinkClick();
  };

  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 focus:outline-none group"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white font-medium">
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={handleLinkClick}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={handleLinkClick}
              >
                <UserIcon className="w-4 h-4 mr-2" />
                My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show sign in/sign up buttons if not logged in
  return (
    <div className="flex items-center space-x-3">
      <Link 
        href="/auth/login" 
        className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-50"
        onClick={onLinkClick}
      >
        Sign in
      </Link>
      <Link
        href="/auth/register"
        className="text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        onClick={onLinkClick}
      >
        Get started
      </Link>
    </div>
  );
}
