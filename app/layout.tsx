import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/lib/cart-context"
import SupabaseProvider from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  title: "GenCover - Premium Custom Phone Cases",
  description: "Create and customize premium phone cases with military-grade protection. Fast shipping, lifetime warranty, and perfect fit guaranteed.",
  keywords: ["phone cases", "custom cases", "premium protection", "military grade", "fast shipping"],
  authors: [{ name: "GenCover" }],
  creator: "GenCover",
  publisher: "GenCover",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gencover.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GenCover - Premium Custom Phone Cases",
    description: "Create and customize premium phone cases with military-grade protection.",
    url: "https://gencover.ai",
    siteName: "GenCover",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenCover - Premium Custom Phone Cases",
    description: "Create and customize premium phone cases with military-grade protection.",
    creator: "@gencover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-white antialiased`}>
        <SupabaseProvider>
          <CartProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "white",
                  border: "1px solid #e5e5e5",
                  color: "#171717",
                  borderRadius: "12px",
                  boxShadow: "0 4px 25px -5px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </CartProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
