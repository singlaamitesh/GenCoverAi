'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SessionDebug() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      try {
        setLoading(true);
        
        // Get session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        setSession(currentSession);
        
        // Get profile if user is logged in
        if (currentSession?.user) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentSession.user.id)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') { // Ignore not found error
            console.error('Profile error:', profileError);
          } else {
            setProfile(profileData || null);
          }
        }
        
      } catch (err) {
        console.error('Error in getSession:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    
    getSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      if (session?.user) {
        // Refresh profile on auth change
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setProfile(data || null));
      } else {
        setProfile(null);
      }
    });
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Session Debug</h1>
          <p>Loading session data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Session Debug</h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Session Information</h3>
          </div>
          <div className="px-4 py-5 sm:p-0">
            <pre className="whitespace-pre-wrap p-4">
              {session ? JSON.stringify(session, null, 2) : 'No active session'}
            </pre>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          </div>
          <div className="px-4 py-5 sm:p-0">
            <pre className="whitespace-pre-wrap p-4">
              {profile ? JSON.stringify(profile, null, 2) : 'No profile data'}
            </pre>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Actions</h3>
          </div>
          <div className="p-4 space-x-4">
            <button
              onClick={async () => {
                const { data: { session: currentSession } } = await supabase.auth.getSession();
                console.log('Current session:', currentSession);
                alert('Check console for session details');
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log Session to Console
            </button>
            
            <button
              onClick={async () => {
                try {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                } catch (err) {
                  console.error('Error signing out:', err);
                }
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
