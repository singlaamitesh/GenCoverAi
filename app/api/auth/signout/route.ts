import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies });
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      return NextResponse.json(
        { error: 'Failed to sign out' },
        { status: 500 }
      );
    }

    // Clear all Supabase auth cookies
    const response = NextResponse.redirect(requestUrl.origin, { status: 303 });
    
    // Delete all Supabase auth cookies
    const cookieNames = (await cookieStore.getAll()).map((cookie: any) => cookie.name);
    cookieNames.forEach((cookieName: string) => {
      if (cookieName.startsWith('sb-')) {
        response.cookies.delete(cookieName);
      }
    });
    
    // Also clear the session cookie
    response.cookies.delete('sb-auth-token');
    
    return response;
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
