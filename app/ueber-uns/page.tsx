import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, TrendingUp, Award } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Über uns - Unternehmenswert.io",
  description:
    "Erfahren Sie mehr über Unternehmenswert.io und unser Team. Professionelle Unternehmensbewertung für den DACH-Raum.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">Über Unternehmenswert.io</h1>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                Wir sind Ihr Partner für professionelle Unternehmensbewertungen im DACH-Raum. Mit modernster
                KI-Technologie und jahrelanger Expertise im M&A-Bereich bieten wir Ihnen präzise, transparente und
                schnelle Bewertungen.
              </p>

              <div className="mb-12 grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <Building2 className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-serif text-xl font-bold">Unsere Mission</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Unternehmensbewertungen für jeden zugänglich machen. Transparent, schnell und professionell.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <TrendingUp className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-serif text-xl font-bold">Unsere Methodik</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Wir kombinieren bewährte Bewertungsmethoden mit KI-gestützter Analyse für präzise Ergebnisse.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <Users className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-serif text-xl font-bold">Unser Team</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Erfahrene M&A-Berater, Wirtschaftsprüfer und Technologie-Experten arbeiten Hand in Hand.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <Award className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-serif text-xl font-bold">Unsere Werte</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Transparenz, Präzision und Vertraulichkeit stehen im Mittelpunkt unserer Arbeit.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-8">
                <h2 className="mb-4 font-serif text-2xl font-bold">Warum Unternehmenswert.io?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      1
                    </span>
                    <p className="leading-relaxed">
                      <strong>Schnell:</strong> Erhalten Sie Ihre Bewertung innerhalb von 24 Stunden
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      2
                    </span>
                    <p className="leading-relaxed">
                      <strong>Präzise:</strong> Mehrere Bewertungsmethoden für ein vollständiges Bild
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      3
                    </span>
                    <p className="leading-relaxed">
                      <strong>Transparent:</strong> Nachvollziehbare Berechnungen und klare Erklärungen
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      4
                    </span>
                    <p className="leading-relaxed">
                      <strong>Vertraulich:</strong> Ihre Daten sind bei uns sicher und geschützt
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
