import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ValuationForm } from "@/components/valuation-form"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unternehmensbewertung online - Unternehmenswert berechnen | Unternehmenswert.io",
  description:
    "Professionelle Unternehmensbewertung mit KI. Berechnen Sie den Wert Ihres Unternehmens in 10 Minuten. EBITDA-Multiple, DCF und mehr. €495 für detaillierten PDF-Report.",
  keywords: [
    "Unternehmensbewertung",
    "Unternehmenswert berechnen",
    "Firmenwert ermitteln",
    "Unternehmen verkaufen",
    "Business Valuation",
    "EBITDA Multiple",
    "Unternehmenswert ermitteln",
  ],
  openGraph: {
    title: "Unternehmensbewertung online - Unternehmenswert berechnen",
    description:
      "Professionelle KI-gestützte Unternehmensbewertung für den DACH-Raum. Detaillierter PDF-Report in 24h.",
    type: "website",
    locale: "de_DE",
    url: "https://unternehmenswert.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unternehmensbewertung online - Unternehmenswert berechnen",
    description: "Professionelle KI-gestützte Unternehmensbewertung für den DACH-Raum.",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ValuationForm />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Unternehmenswert.io",
            description: "Professionelle Unternehmensbewertung mit KI-Unterstützung",
            url: "https://unternehmenswert.io",
            areaServed: ["DE", "AT", "CH"],
            priceRange: "€€",
            offers: {
              "@type": "Offer",
              name: "Unternehmensbewertung",
              price: "495",
              priceCurrency: "EUR",
              description: "Detaillierte Unternehmensbewertung mit PDF-Report",
            },
          }),
        }}
      />
    </div>
  )
}
