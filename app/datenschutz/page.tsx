import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung - Unternehmenswert.io",
  description: "Datenschutzerklärung und Informationen zum Umgang mit Ihren Daten bei Unternehmenswert.io",
}

export default function DatenschutzPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-8 font-serif text-4xl font-bold">Datenschutzerklärung</h1>

              <div className="prose prose-neutral max-w-none">
                <h2 className="mb-4 font-serif text-2xl font-bold">1. Datenschutz auf einen Blick</h2>
                <h3 className="mb-2 text-lg font-semibold">Allgemeine Hinweise</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">2. Datenerfassung auf dieser Website</h2>
                <h3 className="mb-2 text-lg font-semibold">Wer ist verantwortlich für die Datenerfassung?</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Impressum dieser Website entnehmen.
                </p>

                <h3 className="mb-2 text-lg font-semibold">Wie erfassen wir Ihre Daten?</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
                  um Daten handeln, die Sie in ein Kontaktformular oder Bewertungsformular eingeben. Andere Daten werden
                  automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische
                  Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>

                <h3 className="mb-2 text-lg font-semibold">Wofür nutzen wir Ihre Daten?</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Die im Bewertungsformular
                  eingegebenen Daten werden ausschließlich zur Erstellung Ihrer Unternehmensbewertung verwendet.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">3. Allgemeine Hinweise und Pflichtinformationen</h2>
                <h3 className="mb-2 text-lg font-semibold">Datenschutz</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie
                  dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
                  Daten erhoben.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">4. Datenerfassung auf dieser Website</h2>
                <h3 className="mb-2 text-lg font-semibold">Cookies</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf
                  Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                  (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>

                <h3 className="mb-2 text-lg font-semibold">Server-Log-Dateien</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und
                  Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit
                  der Serveranfrage und IP-Adresse.
                </p>

                <h3 className="mb-2 text-lg font-semibold">Kontaktformular</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
                  von Anschlussfragen bei uns gespeichert.
                </p>

                <h3 className="mb-2 text-lg font-semibold">Bewertungsformular</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Die im Bewertungsformular eingegebenen Unternehmensdaten werden ausschließlich zur Erstellung Ihrer
                  Unternehmensbewertung verwendet. Diese Daten werden verschlüsselt übertragen und gespeichert. Wir
                  geben diese Daten nicht an Dritte weiter.
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">5. Zahlungsdienstleister</h2>
                <h3 className="mb-2 text-lg font-semibold">Stripe</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Wir nutzen Stripe als Zahlungsdienstleister. Anbieter ist die Stripe Inc., 510 Townsend Street, San
                  Francisco, CA 94103, USA. Wenn Sie sich für eine Zahlung via Stripe entscheiden, werden die von Ihnen
                  eingegebenen Zahlungsdaten an Stripe übermittelt. Die Übermittlung erfolgt auf Grundlage von Art. 6
                  Abs. 1 lit. b DSGVO (Vertragsabwicklung).
                </p>

                <h2 className="mb-4 font-serif text-2xl font-bold">6. Ihre Rechte</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
                  Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
                  Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                  Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
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
