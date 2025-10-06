import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum - Unternehmenswert.io",
  description: "Impressum und rechtliche Informationen zu Unternehmenswert.io",
}

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-8 font-serif text-4xl font-bold">Impressum</h1>

              <div className="prose prose-neutral max-w-none">
                <h2 className="mb-4 font-serif text-2xl font-bold">Angaben gemäß § 5 TMG</h2>
                <p className="mb-6">
                  Unternehmenswert.io GmbH
                  <br />
                  Musterstraße 123
                  <br />
                  10115 Berlin
                  <br />
                  Deutschland
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">Vertreten durch</h2>
                <p className="mb-6">Geschäftsführer: Max Mustermann</p>

                <h2 className="mb-4 font-serif text-2xl font-bold">Kontakt</h2>
                <p className="mb-6">
                  Telefon: +49 (0) 30 1234 5678
                  <br />
                  E-Mail: kontakt@unternehmenswert.io
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">Registereintrag</h2>
                <p className="mb-6">
                  Eintragung im Handelsregister
                  <br />
                  Registergericht: Amtsgericht Berlin-Charlottenburg
                  <br />
                  Registernummer: HRB 123456 B
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">Umsatzsteuer-ID</h2>
                <p className="mb-6">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                  <br />
                  DE123456789
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p className="mb-6">
                  Max Mustermann
                  <br />
                  Musterstraße 123
                  <br />
                  10115 Berlin
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">Haftungsausschluss</h2>
                <h3 className="mb-2 text-lg font-semibold">Haftung für Inhalte</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                  und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir
                  gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                </p>

                <h3 className="mb-2 text-lg font-semibold">Haftung für Links</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
                  haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>

                <h3 className="mb-2 text-lg font-semibold">Urheberrecht</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
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
