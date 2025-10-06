import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Unternehmenswert.io - Professionelle Unternehmensbewertung",
  description:
    "Ermitteln Sie den Wert Ihres Unternehmens mit unserer KI-gestützten Bewertung. Professionelle Unternehmensbewertung für den DACH-Raum.",
  keywords: [
    "Unternehmensbewertung",
    "Unternehmenswert berechnen",
    "Unternehmen verkaufen",
    "Unternehmen kaufen",
    "Business Valuation",
  ],
  generator: "v0.app",
  openGraph: {
    title: "Unternehmenswert.io - Professionelle Unternehmensbewertung",
    description: "Ermitteln Sie den Wert Ihres Unternehmens mit unserer KI-gestützten Bewertung.",
    type: "website",
    locale: "de_DE",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
