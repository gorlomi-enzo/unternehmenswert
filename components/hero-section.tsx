"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById("bewertung")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium">
            <span className="text-accent-foreground">KI-gestützte Unternehmensbewertung</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Ermitteln Sie den wahren Wert Ihres Unternehmens
          </h1>

          <p className="mb-8 text-lg text-foreground/80 md:text-xl">
            Professionelle Unternehmensbewertung mit KI-Unterstützung. Erhalten Sie innerhalb von Minuten einen
            detaillierten Bewertungsbericht für nur €495.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={scrollToForm}
            >
              Bewertung starten
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white" asChild>
              <a href="#wie-es-funktioniert">Wie es funktioniert</a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
            <div>
              <div className="mb-2 text-3xl font-bold">500+</div>
              <div className="text-sm text-foreground/60">Bewertungen durchgeführt</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold">€495</div>
              <div className="text-sm text-foreground/60">Festpreis</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold">24h</div>
              <div className="text-sm text-foreground/60">Lieferzeit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
