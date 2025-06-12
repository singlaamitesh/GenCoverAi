import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/confirm',
  '/auth/verify',
  '/_next',
  '/favicon.ico',
  '/placeholder.svg',
  '/api',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt',
]

const authPaths = ['/auth/login', '/auth/register', '/auth/forgot-password']

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  
  // Skip middleware for public paths
  if (publicPaths.some(publicPath => pathname.startsWith(publicPath))) {
    if (authPaths.some(authPath => pathname.startsWith(authPath))) {
      // For auth pages, check if user is already logged in
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({
                name,
                value,
                ...options,
              })
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({
                name,
                value: '',
                ...options,
              })
            },
          },
        }
      )
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // If user is already logged in, redirect to home or previous page
        const redirectTo = request.nextUrl.searchParams.get('redirectedFrom') || '/'
        return NextResponse.redirect(new URL(redirectTo, request.url))
      }
    }
    
    return NextResponse.next()
  }

  // For all other paths, check authentication
  const response = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            path: '/',
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            path: '/',
            expires: new Date(0),
            ...options,
          })
        },
      },
    }
  )

  // Skip middleware for sign-out, let the client handle it
  if (pathname === '/auth/logout') {
    return NextResponse.next();
  }

  // Check for session
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    // Redirect to login with the current path as the redirect URL
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
