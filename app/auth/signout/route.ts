import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Sign out from Supabase
  await supabase.auth.signOut();
  
  // Redirect to home page after sign out
  return NextResponse.json({ success: true });
}
