"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Briefcase, Target, CheckCircle2 } from "lucide-react"

type BuyerFormData = {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string

  // Investment Criteria
  industries: string[]
  minRevenue: string
  maxRevenue: string
  minPrice: string
  maxPrice: string
  preferredLocations: string

  // Additional Info
  investmentType: string
  timeline: string
  experience: string
  additionalInfo: string
}

const initialFormData: BuyerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  industries: [],
  minRevenue: "",
  maxRevenue: "",
  minPrice: "",
  maxPrice: "",
  preferredLocations: "",
  investmentType: "",
  timeline: "",
  experience: "",
  additionalInfo: "",
}

const industryOptions = [
  { id: "software", label: "Software & IT" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "manufacturing", label: "Produktion" },
  { id: "services", label: "Dienstleistungen" },
  { id: "retail", label: "Einzelhandel" },
  { id: "healthcare", label: "Gesundheitswesen" },
  { id: "other", label: "Sonstiges" },
]

export function BuyerProfileForm() {
  const [formData, setFormData] = useState<BuyerFormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)

  const updateFormData = (field: keyof BuyerFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleIndustry = (industryId: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(industryId)
        ? prev.industries.filter((id) => id !== industryId)
        : [...prev.industries, industryId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Buyer form submitted:", formData)
    // Will integrate with backend in later phase
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="buyer-form" className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="mb-2 font-serif text-2xl font-bold">Vielen Dank für Ihre Registrierung!</h2>
                  <p className="mb-6 text-muted-foreground">
                    Wir haben Ihre Informationen erhalten und werden uns in Kürze bei Ihnen melden, sobald passende
                    Unternehmensangebote verfügbar sind.
                  </p>
                  <Button asChild>
                    <a href="/">Zur Startseite</a>
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
    <section id="buyer-form" className="bg-muted/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Käuferprofil erstellen</h2>
            <p className="text-muted-foreground">
              Teilen Sie uns Ihre Investitionskriterien mit, damit wir Ihnen passende Angebote zusenden können
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Registrierung
              </CardTitle>
              <CardDescription>Alle Felder mit * sind Pflichtfelder</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <User className="h-4 w-4" />
                    Persönliche Informationen
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        placeholder="Max"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        placeholder="Mustermann"
                        required
                      />
                    </div>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefonnummer *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+49 123 456789"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Unternehmen</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => updateFormData("company", e.target.value)}
                        placeholder="Ihre Firma GmbH"
                      />
                    </div>
                  </div>
                </div>

                {/* Investment Criteria */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Target className="h-4 w-4" />
                    Investitionskriterien
                  </div>

                  <div className="space-y-2">
                    <Label>Interessante Branchen *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {industryOptions.map((industry) => (
                        <div key={industry.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={industry.id}
                            checked={formData.industries.includes(industry.id)}
                            onCheckedChange={() => toggleIndustry(industry.id)}
                          />
                          <label
                            htmlFor={industry.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {industry.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Umsatzbereich (€) *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          id="minRevenue"
                          type="number"
                          value={formData.minRevenue}
                          onChange={(e) => updateFormData("minRevenue", e.target.value)}
                          placeholder="Min. Umsatz"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          id="maxRevenue"
                          type="number"
                          value={formData.maxRevenue}
                          onChange={(e) => updateFormData("maxRevenue", e.target.value)}
                          placeholder="Max. Umsatz"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Kaufpreisbereich (€) *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          id="minPrice"
                          type="number"
                          value={formData.minPrice}
                          onChange={(e) => updateFormData("minPrice", e.target.value)}
                          placeholder="Min. Kaufpreis"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          id="maxPrice"
                          type="number"
                          value={formData.maxPrice}
                          onChange={(e) => updateFormData("maxPrice", e.target.value)}
                          placeholder="Max. Kaufpreis"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredLocations">Bevorzugte Standorte *</Label>
                    <Input
                      id="preferredLocations"
                      value={formData.preferredLocations}
                      onChange={(e) => updateFormData("preferredLocations", e.target.value)}
                      placeholder="z.B. Deutschland, Österreich, Schweiz"
                      required
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Briefcase className="h-4 w-4" />
                    Zusätzliche Informationen
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investmentType">Art der Investition *</Label>
                    <Select
                      value={formData.investmentType}
                      onValueChange={(value) => updateFormData("investmentType", value)}
                    >
                      <SelectTrigger id="investmentType">
                        <SelectValue placeholder="Auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-acquisition">Vollständige Übernahme</SelectItem>
                        <SelectItem value="majority-stake">Mehrheitsbeteiligung</SelectItem>
                        <SelectItem value="minority-stake">Minderheitsbeteiligung</SelectItem>
                        <SelectItem value="strategic-partnership">Strategische Partnerschaft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Zeitrahmen *</Label>
                    <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Sofort</SelectItem>
                        <SelectItem value="3-months">Innerhalb 3 Monate</SelectItem>
                        <SelectItem value="6-months">Innerhalb 6 Monate</SelectItem>
                        <SelectItem value="12-months">Innerhalb 12 Monate</SelectItem>
                        <SelectItem value="flexible">Flexibel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">M&A Erfahrung *</Label>
                    <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-time">Erstkäufer</SelectItem>
                        <SelectItem value="1-3-deals">1-3 Transaktionen</SelectItem>
                        <SelectItem value="4-10-deals">4-10 Transaktionen</SelectItem>
                        <SelectItem value="10plus-deals">10+ Transaktionen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Zusätzliche Informationen</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                      placeholder="Teilen Sie uns weitere Details zu Ihren Investitionskriterien mit..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">
                    Mit der Registrierung stimmen Sie unseren{" "}
                    <a href="/agb" className="text-primary hover:underline">
                      AGB
                    </a>{" "}
                    und{" "}
                    <a href="/datenschutz" className="text-primary hover:underline">
                      Datenschutzbestimmungen
                    </a>{" "}
                    zu.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Kostenlos registrieren
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
