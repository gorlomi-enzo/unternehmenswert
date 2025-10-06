import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AGB - Allgemeine Geschäftsbedingungen | Unternehmenswert.io",
  description: "Allgemeine Geschäftsbedingungen für die Nutzung von Unternehmenswert.io",
}

export default function AGBPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-8 font-serif text-4xl font-bold">Allgemeine Geschäftsbedingungen</h1>

              <div className="prose prose-neutral max-w-none">
                <h2 className="mb-4 font-serif text-2xl font-bold">§ 1 Geltungsbereich</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Erbringung von
                  Dienstleistungen, die zwischen der Unternehmenswert.io GmbH (nachfolgend „Anbieter") und dem Kunden
                  (nachfolgend „Kunde") über die Website unternehmenswert.io geschlossen werden.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 2 Vertragsgegenstand</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Der Anbieter erstellt auf Grundlage der vom Kunden bereitgestellten Unternehmensdaten eine
                  KI-gestützte Unternehmensbewertung. Die Bewertung erfolgt nach anerkannten Bewertungsmethoden und wird
                  in Form eines PDF-Reports zur Verfügung gestellt.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 3 Vertragsschluss</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Der Vertrag kommt durch die Annahme des Angebots des Anbieters durch den Kunden zustande. Dies erfolgt
                  durch Ausfüllen des Bewertungsformulars und Abschluss des Zahlungsvorgangs. Nach erfolgreichem
                  Zahlungseingang erhält der Kunde eine Auftragsbestätigung per E-Mail.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 4 Preise und Zahlungsbedingungen</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Die Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt über den
                  Zahlungsdienstleister Stripe. Es gelten die auf der Website angegebenen Preise zum Zeitpunkt der
                  Bestellung.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 5 Leistungserbringung</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Der Anbieter erstellt die Unternehmensbewertung innerhalb von 24 Stunden nach Zahlungseingang und
                  Bereitstellung aller erforderlichen Informationen. Die Bewertung wird per E-Mail als PDF-Dokument an
                  die vom Kunden angegebene E-Mail-Adresse versandt.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 6 Pflichten des Kunden</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Der Kunde verpflichtet sich, wahrheitsgemäße und vollständige Angaben zu machen. Der Kunde ist für die
                  Richtigkeit der bereitgestellten Daten verantwortlich. Falsche oder unvollständige Angaben können zu
                  einer fehlerhaften Bewertung führen, ohne dass der Anbieter hierfür haftet.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 7 Haftung</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Die Unternehmensbewertung stellt eine Einschätzung auf Basis der bereitgestellten Informationen dar
                  und ersetzt keine umfassende Due Diligence oder rechtliche Beratung. Der Anbieter haftet nicht für
                  Schäden, die durch die Verwendung der Bewertung entstehen. Die Haftung ist auf Vorsatz und grobe
                  Fahrlässigkeit beschränkt.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 8 Widerrufsrecht</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Da es sich um eine Dienstleistung handelt, die auf ausdrücklichen Wunsch des Kunden vor Ablauf der
                  Widerrufsfrist vollständig erbracht wird, besteht kein Widerrufsrecht gemäß § 356 Abs. 4 BGB.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 9 Datenschutz</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Der Anbieter verpflichtet sich, alle personenbezogenen Daten vertraulich zu behandeln und nur zur
                  Erfüllung des Vertrags zu verwenden. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">§ 10 Schlussbestimmungen</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam
                  sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
