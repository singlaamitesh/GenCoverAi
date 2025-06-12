import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { CartProvider } from "@/lib/cart-context"
import SupabaseProvider from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GenCover - AI-Powered Custom Phone Cases | Premium Quality",
  description:
    "Create stunning custom phone cases with AI technology. Premium quality, fast delivery across India. Start designing your perfect phone case today!",
  keywords: "custom phone cases, AI phone covers, personalized phone cases, premium phone protection, India",
  openGraph: {
    title: "GenCover - AI-Powered Custom Phone Cases",
    description: "Create stunning custom phone cases with AI technology",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenCover - AI-Powered Custom Phone Cases",
    description: "Create stunning custom phone cases with AI technology",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-neutral-50 antialiased`}>
        <SupabaseProvider>
          <CartProvider>
            {children}
            <Toaster
            position="top-right"
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
