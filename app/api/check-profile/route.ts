import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Get the current user's session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Get the user's profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
    
    return NextResponse.json({
      userId: session.user.id,
      email: session.user.email,
      profile: profile || 'No profile found',
      session: {
        accessToken: session.access_token ? 'Token exists' : 'No token',
        expiresAt: session.expires_at,
      },
    });
    
  } catch (error) {
    console.error('Error in check-profile API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
