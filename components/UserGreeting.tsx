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
        // Use getSession instead of getUser to avoid AuthSessionMissingError
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
        } else if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      }
    };

    checkUser();

    // Listen for auth changes with cleanup
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email || 'no user');
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    console.log('Starting sign out process...');

    // Close dropdown immediately
    setIsOpen(false);

    // Show loading state
    const loadingToast = toast.loading('Signing out...');

    // Clear all storage synchronously
    try {
      localStorage.clear();
      sessionStorage.clear();

      // Clear cookies
      document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.trim().split('=');
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });

      console.log('Storage cleared');
    } catch (error) {
      console.warn('Error clearing storage:', error);
    }

    // Try async sign out but don't wait for it
    supabase.auth.signOut().then(() => {
      console.log('Supabase sign out completed');
    }).catch((error) => {
      console.warn('Supabase sign out error:', error);
    });

    // Dismiss loading toast after a short delay
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Signed out successfully');

      // Force redirect
      window.location.href = '/';
    }, 500);
  };  const handleLinkClick = () => {
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
          className="flex items-center space-x-2 focus:outline-none group hover:bg-gray-100 rounded-full p-1 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-medium shadow-md group-hover:shadow-lg transition-shadow">
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[100] border border-gray-200">
            <div className="py-1">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                onClick={handleLinkClick}
              >
                <LayoutDashboard className="w-4 h-4 mr-2 text-gray-600" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                onClick={handleLinkClick}
              >
                <UserIcon className="w-4 h-4 mr-2 text-gray-600" />
                My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-600" />
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
        className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-md hover:bg-blue-50 border border-gray-200"
        onClick={onLinkClick}
      >
        Sign in
      </Link>
      <Link
        href="/auth/register"
        className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
        onClick={onLinkClick}
      >
        Get started
      </Link>
    </div>
  );
}
