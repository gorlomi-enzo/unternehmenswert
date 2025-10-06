import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Häufig gestellte Fragen | Unternehmenswert.io",
  description:
    "Antworten auf häufig gestellte Fragen zur Unternehmensbewertung. Wie funktioniert die Bewertung? Was kostet sie? Wie lange dauert es?",
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">Häufig gestellte Fragen</h1>
              <p className="mb-12 text-lg text-muted-foreground">
                Hier finden Sie Antworten auf die wichtigsten Fragen zur Unternehmensbewertung.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">Wie funktioniert die Unternehmensbewertung?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sie füllen ein detailliertes Formular mit Informationen zu Ihrem Unternehmen aus. Unsere
                    KI-gestützte Plattform analysiert diese Daten und erstellt eine professionelle Bewertung nach
                    mehreren anerkannten Methoden (EBITDA-Multiple, Umsatz-Multiple, Substanzwert, DCF). Sie erhalten
                    einen detaillierten PDF-Report mit Bewertungsspanne und strategischen Empfehlungen.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">Was kostet die Bewertung?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Eine vollständige Unternehmensbewertung mit detailliertem PDF-Report kostet €495. Dies ist ein
                    Bruchteil der Kosten einer traditionellen Bewertung durch eine Beratungsfirma, die oft mehrere
                    tausend Euro kostet.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">Wie lange dauert die Bewertung?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Nach Abschluss der Zahlung erhalten Sie Ihren detaillierten Bewertungsbericht innerhalb von 24
                    Stunden per E-Mail. Das Ausfüllen des Formulars dauert etwa 10-15 Minuten.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">Welche Bewertungsmethoden werden verwendet?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Wir verwenden vier etablierte Bewertungsmethoden: EBITDA-Multiple (branchenspezifisch),
                    Umsatz-Multiple, Substanzwertverfahren (Asset-based) und Discounted Cash Flow (DCF). Jede Methode
                    hat ihre Stärken, und die Kombination gibt Ihnen ein vollständiges Bild des Unternehmenswerts.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Für welche Unternehmensgrößen ist die Bewertung geeignet?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Unsere Bewertung eignet sich für kleine und mittelständische Unternehmen (KMU) mit einem
                    Jahresumsatz zwischen €100.000 und €50 Millionen. Für größere Unternehmen oder komplexe
                    Konzernstrukturen empfehlen wir eine individuelle Beratung.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">Sind meine Daten sicher?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Ja, Datenschutz und Vertraulichkeit haben höchste Priorität. Alle Daten werden verschlüsselt
                    übertragen und gespeichert. Wir geben keine Informationen an Dritte weiter und halten uns strikt an
                    die DSGVO-Richtlinien.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">
                    Kann ich die Bewertung für Verhandlungen verwenden?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Ja, unsere Bewertung bietet Ihnen eine fundierte Grundlage für Verkaufsverhandlungen,
                    Investorengespräche oder interne Planungen. Beachten Sie jedoch, dass für rechtlich bindende
                    Transaktionen oft eine zusätzliche Due Diligence durch Wirtschaftsprüfer erforderlich ist.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">Was ist im PDF-Report enthalten?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Der Report enthält: Executive Summary, SWOT-Analyse, detaillierte Bewertung nach vier Methoden,
                    empfohlene Bewertungsspanne (niedrig/mittel/hoch), Marktanalyse, strategische Empfehlungen und
                    Risikofaktoren. Alle Berechnungen sind transparent nachvollziehbar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left">
                    Bieten Sie auch Unterstützung beim Unternehmensverkauf?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Ja, wir vermitteln qualifizierte Käufer für Ihr Unternehmen. Registrieren Sie sich auf unserer Seite
                    "Unternehmen kaufen", um in unsere Käuferdatenbank aufgenommen zu werden. Wir bringen Käufer und
                    Verkäufer zusammen.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left">Welche Zahlungsmethoden akzeptieren Sie?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, American Express) sowie
                    SEPA-Lastschrift über unseren sicheren Zahlungspartner Stripe. Die Zahlung erfolgt verschlüsselt und
                    ist zu 100% sicher.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
