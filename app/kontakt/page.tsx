import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt - Unternehmenswert.io",
  description: "Kontaktieren Sie uns für Fragen zur Unternehmensbewertung. Wir helfen Ihnen gerne weiter.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">Kontakt</h1>
              <p className="mb-12 text-lg text-muted-foreground">
                Haben Sie Fragen? Wir sind für Sie da und helfen Ihnen gerne weiter.
              </p>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Kontaktformular</CardTitle>
                      <CardDescription>Senden Sie uns eine Nachricht</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input id="name" placeholder="Max Mustermann" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">E-Mail *</Label>
                          <Input id="email" type="email" placeholder="max@beispiel.de" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Betreff *</Label>
                          <Input id="subject" placeholder="Ihre Anfrage" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Nachricht *</Label>
                          <Textarea id="message" placeholder="Ihre Nachricht an uns..." rows={5} required />
                        </div>

                        <Button type="submit" className="w-full">
                          Nachricht senden
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Mail className="mt-1 h-6 w-6 text-primary" />
                        <div>
                          <h3 className="mb-1 font-semibold">E-Mail</h3>
                          <p className="text-sm text-muted-foreground">kontakt@unternehmenswert.io</p>
                          <p className="text-sm text-muted-foreground">Antwort innerhalb von 24 Stunden</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Phone className="mt-1 h-6 w-6 text-primary" />
                        <div>
                          <h3 className="mb-1 font-semibold">Telefon</h3>
                          <p className="text-sm text-muted-foreground">+49 (0) 30 1234 5678</p>
                          <p className="text-sm text-muted-foreground">Mo-Fr: 9:00 - 18:00 Uhr</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="mt-1 h-6 w-6 text-primary" />
                        <div>
                          <h3 className="mb-1 font-semibold">Adresse</h3>
                          <p className="text-sm text-muted-foreground">Unternehmenswert.io GmbH</p>
                          <p className="text-sm text-muted-foreground">Musterstraße 123</p>
                          <p className="text-sm text-muted-foreground">10115 Berlin, Deutschland</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                    <h3 className="mb-2 font-semibold">Schnelle Hilfe</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Viele Antworten finden Sie bereits in unseren FAQ.
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/faq">Zu den FAQ</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
