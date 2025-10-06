import { Shield, Zap, FileCheck, Lock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Schnelle Bewertung",
    description: "Erhalten Sie Ihre professionelle Unternehmensbewertung innerhalb von 24 Stunden",
  },
  {
    icon: Shield,
    title: "KI-gestützt",
    description: "Modernste KI-Technologie kombiniert mit bewährten Bewertungsmethoden",
  },
  {
    icon: FileCheck,
    title: "Detaillierter Bericht",
    description: "Umfassender PDF-Bericht mit allen relevanten Kennzahlen und Analysen",
  },
  {
    icon: Lock,
    title: "100% Vertraulich",
    description: "Ihre Daten werden verschlüsselt und vertraulich behandelt",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Warum Unternehmenswert.io?</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Professionelle Unternehmensbewertung war noch nie so einfach und schnell
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
