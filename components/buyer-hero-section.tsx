"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Target } from "lucide-react"

export function BuyerHeroSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById("buyer-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Exklusive Unternehmensangebote</span>
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Finden Sie Ihr nächstes Investment
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Registrieren Sie sich als Käufer und erhalten Sie Zugang zu geprüften Unternehmensangeboten im DACH-Raum.
            Kostenlos und unverbindlich.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group" onClick={scrollToForm}>
              Jetzt registrieren
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#vorteile">Vorteile entdecken</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
            <div>
              <div className="mb-2 font-serif text-3xl font-bold">200+</div>
              <div className="text-sm text-muted-foreground">Aktive Käufer</div>
            </div>
            <div>
              <div className="mb-2 font-serif text-3xl font-bold">€0</div>
              <div className="text-sm text-muted-foreground">Registrierungsgebühr</div>
            </div>
            <div>
              <div className="mb-2 font-serif text-3xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Erfolgreiche Deals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
