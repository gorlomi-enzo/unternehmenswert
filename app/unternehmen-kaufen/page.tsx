import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BuyerHeroSection } from "@/components/buyer-hero-section"
import { BuyerProfileForm } from "@/components/buyer-profile-form"
import { BuyerBenefitsSection } from "@/components/buyer-benefits-section"

export const metadata = {
  title: "Unternehmen kaufen - Unternehmenswert.io",
  description:
    "Registrieren Sie sich als Käufer und erhalten Sie Zugang zu exklusiven Unternehmensangeboten im DACH-Raum.",
  keywords: ["Unternehmen kaufen", "Unternehmenskauf", "M&A", "Firmenübernahme", "Investition"],
}

export default function BuyerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BuyerHeroSection />
        <BuyerProfileForm />
        <BuyerBenefitsSection />
      </main>
      <Footer />
    </div>
  )
}
