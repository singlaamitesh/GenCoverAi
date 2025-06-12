import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle error if needed
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle error if needed
          }
        },
      },
    }
  )
}

export async function getSession() {
  const supabase = await createClient()
  return supabase.auth.getSession()
}

export async function getUser() {
  const supabase = await createClient()
  return supabase.auth.getUser()
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient()
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient()
  return supabase.auth.signUp({
    email,
    password,
  })
}

export async function signOut() {
  const supabase = await createClient()
  return supabase.auth.signOut()
}
