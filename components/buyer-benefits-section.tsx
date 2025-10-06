import { Shield, Bell, FileSearch, Handshake } from "lucide-react"

const benefits = [
  {
    icon: FileSearch,
    title: "Geprüfte Angebote",
    description: "Alle Unternehmen werden von uns vorab geprüft und bewertet",
  },
  {
    icon: Bell,
    title: "Exklusive Benachrichtigungen",
    description: "Erhalten Sie sofort Bescheid, wenn passende Angebote verfügbar sind",
  },
  {
    icon: Shield,
    title: "Vertraulichkeit",
    description: "Ihre Daten und Investitionskriterien werden streng vertraulich behandelt",
  },
  {
    icon: Handshake,
    title: "Persönliche Betreuung",
    description: "Unser Team unterstützt Sie während des gesamten Kaufprozesses",
  },
]

export function BuyerBenefitsSection() {
  return (
    <section id="vorteile" className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Ihre Vorteile als registrierter Käufer</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Profitieren Sie von unserem exklusiven Netzwerk und professioneller Unterstützung
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-card p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-4 font-serif text-2xl font-bold">Bereit, Ihr nächstes Investment zu finden?</h3>
            <p className="mb-6 text-muted-foreground">
              Registrieren Sie sich jetzt kostenlos und erhalten Sie Zugang zu exklusiven Unternehmensangeboten
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#buyer-form"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Jetzt registrieren
              </a>
              <a
                href="/kontakt"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
