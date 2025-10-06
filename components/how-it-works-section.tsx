import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Formular ausfüllen",
    description: "Beantworten Sie einige Fragen zu Ihrem Unternehmen und Ihren Finanzdaten",
  },
  {
    number: "02",
    title: "Zahlung durchführen",
    description: "Sichere Zahlung von €495 über Stripe",
  },
  {
    number: "03",
    title: "KI-Analyse",
    description: "Unsere KI analysiert Ihre Daten und erstellt eine detaillierte Bewertung",
  },
  {
    number: "04",
    title: "Bericht erhalten",
    description: "Erhalten Sie Ihren professionellen Bewertungsbericht per E-Mail",
  },
]

export function HowItWorksSection() {
  return (
    <section id="wie-es-funktioniert" className="bg-background py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Wie es funktioniert</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            In vier einfachen Schritten zu Ihrer professionellen Unternehmensbewertung
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <CheckCircle2 className="absolute -bottom-4 left-5 h-5 w-5 text-primary md:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
