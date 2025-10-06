"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Building2, TrendingUp, Users, FileText, CreditCard } from "lucide-react"
import Checkout from "@/components/checkout"

type FormData = {
  // Step 1: Company Info
  companyName: string
  industry: string
  foundedYear: string
  employees: string
  location: string

  // Step 2: Financial Data
  revenue: string
  ebitda: string
  netProfit: string
  assets: string
  liabilities: string

  // Step 3: Additional Info
  growthRate: string
  marketPosition: string
  uniqueSellingPoints: string

  // Step 4: Contact
  contactName: string
  email: string
  phone: string
}

const initialFormData: FormData = {
  companyName: "",
  industry: "",
  foundedYear: "",
  employees: "",
  location: "",
  revenue: "",
  ebitda: "",
  netProfit: "",
  assets: "",
  liabilities: "",
  growthRate: "",
  marketPosition: "",
  uniqueSellingPoints: "",
  contactName: "",
  email: "",
  phone: "",
}

export function ValuationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showPayment, setShowPayment] = useState(false)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    localStorage.setItem("valuationFormData", JSON.stringify(formData))
    setShowPayment(true)
  }

  const handleBackFromPayment = () => {
    setShowPayment(false)
  }

  if (showPayment) {
    return (
      <section id="bewertung" className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Zahlung abschließen</h2>
              <p className="text-muted-foreground">
                Schließen Sie die Zahlung ab, um Ihren detaillierten Bewertungsbericht zu erhalten
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Sichere Zahlung
                </CardTitle>
                <CardDescription>Ihre Zahlung wird sicher über Stripe verarbeitet</CardDescription>
              </CardHeader>
              <CardContent>
                <Checkout productId="valuation-report" />

                <div className="mt-6">
                  <Button type="button" variant="outline" onClick={handleBackFromPayment}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zum Formular
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="bewertung" className="bg-muted/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Unternehmensbewertung starten</h2>
            <p className="text-muted-foreground">
              Beantworten Sie einige Fragen zu Ihrem Unternehmen und erhalten Sie eine professionelle Bewertung
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex flex-1 items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      s <= step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && <div className={`h-0.5 flex-1 ${s < step ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Unternehmen</span>
              <span>Finanzen</span>
              <span>Details</span>
              <span>Kontakt</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && (
                  <>
                    <Building2 className="h-5 w-5" />
                    Unternehmensinformationen
                  </>
                )}
                {step === 2 && (
                  <>
                    <TrendingUp className="h-5 w-5" />
                    Finanzdaten
                  </>
                )}
                {step === 3 && (
                  <>
                    <Users className="h-5 w-5" />
                    Zusätzliche Informationen
                  </>
                )}
                {step === 4 && (
                  <>
                    <FileText className="h-5 w-5" />
                    Kontaktdaten
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Grundlegende Informationen über Ihr Unternehmen"}
                {step === 2 && "Finanzielle Kennzahlen der letzten 12 Monate"}
                {step === 3 && "Marktposition und Wachstumspotenzial"}
                {step === 4 && "Ihre Kontaktdaten für die Bewertung"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Company Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Unternehmensname *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => updateFormData("companyName", e.target.value)}
                        placeholder="Ihre Firma GmbH"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Branche *</Label>
                      <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Branche auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software & IT</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          <SelectItem value="manufacturing">Produktion</SelectItem>
                          <SelectItem value="services">Dienstleistungen</SelectItem>
                          <SelectItem value="retail">Einzelhandel</SelectItem>
                          <SelectItem value="healthcare">Gesundheitswesen</SelectItem>
                          <SelectItem value="other">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="foundedYear">Gründungsjahr *</Label>
                        <Input
                          id="foundedYear"
                          type="number"
                          value={formData.foundedYear}
                          onChange={(e) => updateFormData("foundedYear", e.target.value)}
                          placeholder="2020"
                          min="1900"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employees">Anzahl Mitarbeiter *</Label>
                        <Select
                          value={formData.employees}
                          onValueChange={(value) => updateFormData("employees", value)}
                        >
                          <SelectTrigger id="employees">
                            <SelectValue placeholder="Auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201-500">201-500</SelectItem>
                            <SelectItem value="500+">500+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Standort *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => updateFormData("location", e.target.value)}
                        placeholder="Berlin, Deutschland"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Financial Data */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="revenue">Jahresumsatz (€) *</Label>
                      <Input
                        id="revenue"
                        type="number"
                        value={formData.revenue}
                        onChange={(e) => updateFormData("revenue", e.target.value)}
                        placeholder="1000000"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Umsatz der letzten 12 Monate</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ebitda">EBITDA (€) *</Label>
                      <Input
                        id="ebitda"
                        type="number"
                        value={formData.ebitda}
                        onChange={(e) => updateFormData("ebitda", e.target.value)}
                        placeholder="200000"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Gewinn vor Zinsen, Steuern und Abschreibungen</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="netProfit">Nettogewinn (€) *</Label>
                      <Input
                        id="netProfit"
                        type="number"
                        value={formData.netProfit}
                        onChange={(e) => updateFormData("netProfit", e.target.value)}
                        placeholder="150000"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assets">Vermögenswerte (€)</Label>
                        <Input
                          id="assets"
                          type="number"
                          value={formData.assets}
                          onChange={(e) => updateFormData("assets", e.target.value)}
                          placeholder="500000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="liabilities">Verbindlichkeiten (€)</Label>
                        <Input
                          id="liabilities"
                          type="number"
                          value={formData.liabilities}
                          onChange={(e) => updateFormData("liabilities", e.target.value)}
                          placeholder="100000"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Info */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="growthRate">Wachstumsrate (% pro Jahr) *</Label>
                      <Input
                        id="growthRate"
                        type="number"
                        value={formData.growthRate}
                        onChange={(e) => updateFormData("growthRate", e.target.value)}
                        placeholder="15"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Durchschnittliches Umsatzwachstum der letzten 3 Jahre
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marketPosition">Marktposition *</Label>
                      <Select
                        value={formData.marketPosition}
                        onValueChange={(value) => updateFormData("marketPosition", value)}
                      >
                        <SelectTrigger id="marketPosition">
                          <SelectValue placeholder="Position auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leader">Marktführer</SelectItem>
                          <SelectItem value="challenger">Herausforderer</SelectItem>
                          <SelectItem value="follower">Mitläufer</SelectItem>
                          <SelectItem value="niche">Nischenanbieter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="uniqueSellingPoints">Alleinstellungsmerkmale</Label>
                      <Textarea
                        id="uniqueSellingPoints"
                        value={formData.uniqueSellingPoints}
                        onChange={(e) => updateFormData("uniqueSellingPoints", e.target.value)}
                        placeholder="Was macht Ihr Unternehmen einzigartig? Welche Wettbewerbsvorteile haben Sie?"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Ihr Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => updateFormData("contactName", e.target.value)}
                        placeholder="Max Mustermann"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail-Adresse *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="max@beispiel.de"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonnummer</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+49 123 456789"
                      />
                    </div>

                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <h4 className="mb-2 font-semibold">Zusammenfassung</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>Unternehmen:</strong> {formData.companyName || "—"}
                        </p>
                        <p>
                          <strong>Branche:</strong> {formData.industry || "—"}
                        </p>
                        <p>
                          <strong>Jahresumsatz:</strong> €
                          {formData.revenue ? Number(formData.revenue).toLocaleString("de-DE") : "—"}
                        </p>
                        <p>
                          <strong>EBITDA:</strong> €
                          {formData.ebitda ? Number(formData.ebitda).toLocaleString("de-DE") : "—"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm">
                        Nach Abschluss der Zahlung erhalten Sie Ihren detaillierten Bewertungsbericht innerhalb von 24
                        Stunden per E-Mail.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Zurück
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                      Weiter
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="ml-auto">
                      Zur Zahlung (€495)
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
