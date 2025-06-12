import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const AUTH_COOKIES = [
  'sb-access-token',
  'sb-refresh-token',
  'sb-auth-token',
  'sb:token',
  'sb:refresh_token',
  'sb:provider_token',
  'sb-provider-token'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get('redirectTo') || '/';
    
    // Create a response that will redirect
    const response = NextResponse.redirect(new URL(redirectTo, request.url));
    
    // Clear all auth cookies
    AUTH_COOKIES.forEach(cookie => {
      response.cookies.delete(cookie);
      response.cookies.set({
        name: cookie,
        value: '',
        path: '/',
        expires: new Date(0),
      });
    });
    
    // Clear the session using Supabase
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    await supabase.auth.signOut();
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    
    // Add a unique query parameter to prevent caching
    const redirectUrl = new URL(redirectTo, request.url);
    redirectUrl.searchParams.set('loggedOut', Date.now().toString());
    
    // Redirect to the home page
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error during sign out:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
