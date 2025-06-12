'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, User, Mail, ArrowLeft, Loader2 } from 'lucide-react';

// Simple toast notification
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 px-6 py-3 rounded shadow-lg font-medium transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
      role="alert"
      aria-live="polite"
    >
      {message}
      <button onClick={onClose} className="ml-4 text-white/70 hover:text-white font-bold">×</button>
    </div>
  );
}


type Profile = {
  id: string;
  full_name: string | null;
  email: string;
  created_at: string;
};

export default function ProfilePage() {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const router = useRouter();

  // Simple client-side sign out
  const handleSignOut = async () => {
    try {
      setSaving(true);
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.clear();
      setProfile(null);
      window.location.href = '/';
    } catch (error) {
      setToast({ message: 'Failed to sign out. Please try again.', type: 'error' });
      setSaving(false);
    }
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth/login');
          return;
        }
        const userProfile = {
          id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          created_at: user.created_at || new Date().toISOString()
        };
        setProfile(userProfile);
        setName(userProfile.full_name || '');
        setTimeout(() => nameInputRef.current?.focus(), 400);
      } catch (error) {
        setToast({ message: 'Failed to load profile', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim() === profile?.full_name) {
      setToast({ message: 'Please enter a new name to update.', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name.trim() }
      });
      if (error) throw error;
      setProfile(prev => prev ? { ...prev, full_name: name.trim() } : prev);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to update profile. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4 animate-fade-in">
          <Loader2 className="w-8 h-8 mx-auto animate-spin text-brand-500" />
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Profile Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 animate-fade-in">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold">My Profile</h1>
                <div className="w-9"></div> {/* Spacer for alignment */}
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold text-white">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{profile?.full_name || 'User'}</h2>
                  <p className="text-sm opacity-90">Member since {new Date(profile?.created_at || '').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        ref={nameInputRef}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                        placeholder="Your name"
                        required
                        aria-label="Full Name"
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={profile?.email || ''}
                        disabled
                        className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm sm:text-sm cursor-not-allowed"
                        aria-label="Email Address"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Contact support to change your email
                    </p>
                  </div>
                </div>
                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    disabled={saving || !name.trim() || name.trim() === profile?.full_name}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {saving ? 'Saving...' : 'Update Profile'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={saving}
                    className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need help?{' '}
              <a href="mailto:support@gencover.com" className="text-brand-600 hover:text-brand-700 font-medium">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}