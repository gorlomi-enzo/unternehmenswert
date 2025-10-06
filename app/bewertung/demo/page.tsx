"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Building2, AlertCircle, FileText } from "lucide-react"

// Mock data for demonstration
const mockValuation = {
  executiveSummary:
    "Hope Consulting GmbH ist ein aufstrebendes Software-Unternehmen mit starkem Wachstumspotenzial. Mit einem beeindruckenden EBITDA von €350.000 bei einem Umsatz von €400.000 zeigt das Unternehmen eine außergewöhnliche Profitabilität von 87,5%. Die Bewertung berücksichtigt die Nischenposition im Markt, das junge Alter des Unternehmens (gegründet 2021) und die solide finanzielle Basis ohne Verbindlichkeiten.",
  companyOverview: {
    strengths: [
      "Außergewöhnlich hohe EBITDA-Marge von 87,5%",
      "Keine Verbindlichkeiten - vollständig eigenfinanziert",
      "Starkes Wachstum von 10% pro Jahr",
      "Etablierte Nischenposition im Software-Markt",
    ],
    weaknesses: [
      "Kleine Teamgröße (1-10 Mitarbeiter) limitiert Skalierbarkeit",
      "Junges Unternehmen mit begrenzter Marktpräsenz",
      "Abhängigkeit von wenigen Schlüsselkunden möglich",
      "Begrenzte Vermögenswerte (€100.000)",
    ],
    opportunities: [
      "Expansion in neue Märkte und Regionen",
      "Skalierung durch Automatisierung und digitale Produkte",
      "Strategische Partnerschaften mit größeren Unternehmen",
      "Entwicklung neuer Software-Produkte",
    ],
    threats: [
      "Intensiver Wettbewerb im Software-Markt",
      "Schnelle technologische Veränderungen",
      "Fachkräftemangel in der IT-Branche",
      "Wirtschaftliche Unsicherheiten",
    ],
  },
  valuationMethods: {
    ebitdaMultiple: {
      multiple: 4.5,
      calculatedValue: 1575000,
      explanation:
        "Für Software-Unternehmen mit hoher Profitabilität ist ein EBITDA-Multiple von 4,5x angemessen. Dies berücksichtigt die Nischenposition und das Wachstumspotenzial.",
    },
    revenueMultiple: {
      multiple: 2.0,
      calculatedValue: 800000,
      explanation:
        "Ein Umsatz-Multiple von 2,0x ist für profitable Software-Unternehmen dieser Größe üblich und spiegelt die starke Marktposition wider.",
    },
    assetBased: {
      calculatedValue: 100000,
      explanation:
        "Der Substanzwert basiert auf den Nettovermögenswerten (Vermögen minus Verbindlichkeiten). Für Software-Unternehmen ist dies typischerweise der niedrigste Bewertungsansatz.",
    },
    discountedCashFlow: {
      discountRate: 15,
      calculatedValue: 1400000,
      explanation:
        "Die DCF-Bewertung projiziert zukünftige Cashflows über 5 Jahre mit einem Diskontierungssatz von 15%, der das Risikoprofil eines jungen Software-Unternehmens widerspiegelt.",
    },
  },
  recommendedValuation: {
    lowRange: 1200000,
    midPoint: 1450000,
    highRange: 1700000,
    rationale:
      "Die empfohlene Bewertungsspanne von €1,2M bis €1,7M basiert auf einer gewichteten Analyse aller Bewertungsmethoden, wobei EBITDA-Multiple und DCF am stärksten gewichtet wurden. Der Mittelwert von €1,45M reflektiert die starke Profitabilität, das Wachstumspotenzial und die solide finanzielle Basis, berücksichtigt aber auch die Größe und das Alter des Unternehmens.",
  },
  marketAnalysis: {
    industryTrends:
      "Der Software-Markt zeigt weiterhin starkes Wachstum, insbesondere in Nischenbereichen mit spezialisierten Lösungen. Die Digitalisierung treibt die Nachfrage nach innovativen Software-Produkten.",
    competitivePosition:
      "Als Nischenanbieter hat Hope Consulting eine starke Position in ihrem Marktsegment. Die hohe Profitabilität deutet auf einen klaren Wettbewerbsvorteil hin.",
    growthPotential:
      "Mit der aktuellen Wachstumsrate von 10% und der Möglichkeit zur Skalierung durch digitale Produkte besteht erhebliches Potenzial für weiteres Wachstum.",
  },
  recommendations: [
    "Investieren Sie in Marketing und Vertrieb, um die Marktpräsenz zu erhöhen",
    "Erweitern Sie das Team strategisch, um Skalierbarkeit zu verbessern",
    "Entwickeln Sie zusätzliche Produkte oder Services zur Diversifizierung",
    "Bauen Sie strategische Partnerschaften auf, um neue Märkte zu erschließen",
    "Dokumentieren Sie Prozesse und Know-how, um den Unternehmenswert zu steigern",
  ],
  riskFactoren: [
    "Abhängigkeit von Schlüsselkunden könnte Umsatzstabilität gefährden",
    "Kleine Teamgröße erhöht das Risiko bei Personalausfällen",
    "Schnelle technologische Veränderungen erfordern kontinuierliche Innovation",
    "Wettbewerbsdruck könnte Margen unter Druck setzen",
  ],
}

const mockFormData = {
  companyName: "Hope Consulting GmbH",
  industry: "Software",
  revenue: "400000",
  ebitda: "350000",
}

export default function DemoValuationPage() {
  const handleDownloadPDF = () => {
    alert("Dies ist eine Demo-Seite. In der Live-Version können Sie hier die vollständige PDF-Bewertung herunterladen.")
  }

  return (
    <div className="bg-background py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Demo Banner */}
          <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-center">
            <p className="font-semibold text-yellow-900">📋 Demo-Ansicht - Dies ist ein Beispiel-Bewertungsbericht</p>
          </div>

          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="mb-2 font-serif text-4xl font-bold">Unternehmensbewertung</h1>
              <p className="text-lg text-muted-foreground">{mockFormData.companyName}</p>
              <p className="text-sm text-muted-foreground">Professionelle KI-gestützte Analyse</p>
            </div>
            <Button onClick={handleDownloadPDF} size="lg">
              <Download className="mr-2 h-4 w-4" />
              PDF herunterladen
            </Button>
          </div>

          {/* Executive Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{mockValuation.executiveSummary}</p>
            </CardContent>
          </Card>

          {/* Recommended Valuation */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Empfohlene Bewertung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Untere Grenze</p>
                  <p className="font-serif text-2xl font-bold">
                    €{mockValuation.recommendedValuation.lowRange.toLocaleString("de-DE")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Mittlerer Wert</p>
                  <p className="font-serif text-3xl font-bold text-primary">
                    €{mockValuation.recommendedValuation.midPoint.toLocaleString("de-DE")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Obere Grenze</p>
                  <p className="font-serif text-2xl font-bold">
                    €{mockValuation.recommendedValuation.highRange.toLocaleString("de-DE")}
                  </p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground">{mockValuation.recommendedValuation.rationale}</p>
            </CardContent>
          </Card>

          {/* SWOT Analysis */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                SWOT-Analyse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-green-600">Stärken</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-red-600">Schwächen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-blue-600">Chancen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.opportunities.map((opportunity, i) => (
                      <li key={i}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-orange-600">Risiken</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.threats.map((threat, i) => (
                      <li key={i}>{threat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valuation Methods */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bewertungsmethoden</CardTitle>
              <CardDescription>Verschiedene Ansätze zur Unternehmensbewertung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* EBITDA Multiple */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">EBITDA-Multiple</h4>
                  <p className="font-serif text-xl font-bold">
                    €{mockValuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Multiple: {mockValuation.valuationMethods.ebitdaMultiple.multiple}x | Berechnung: €
                  {mockFormData.ebitda} × {mockValuation.valuationMethods.ebitdaMultiple.multiple}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockValuation.valuationMethods.ebitdaMultiple.explanation}
                </p>
              </div>

              {/* Revenue Multiple */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Umsatz-Multiple</h4>
                  <p className="font-serif text-xl font-bold">
                    €{mockValuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Multiple: {mockValuation.valuationMethods.revenueMultiple.multiple}x | Berechnung: €
                  {mockFormData.revenue} × {mockValuation.valuationMethods.revenueMultiple.multiple}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockValuation.valuationMethods.revenueMultiple.explanation}
                </p>
              </div>

              {/* Asset Based */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Substanzwertverfahren</h4>
                  <p className="font-serif text-xl font-bold">
                    €{mockValuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Berechnung: Vermögenswerte (€100.000) - Verbindlichkeiten (€0)
                </p>
                <p className="text-sm text-muted-foreground">{mockValuation.valuationMethods.assetBased.explanation}</p>
              </div>

              {/* DCF */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Discounted Cash Flow (DCF)</h4>
                  <p className="font-serif text-xl font-bold">
                    €{mockValuation.valuationMethods.discountedCashFlow.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Diskontierungssatz: {mockValuation.valuationMethods.discountedCashFlow.discountRate}% | Projektion: 5
                  Jahre
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockValuation.valuationMethods.discountedCashFlow.explanation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Marktanalyse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Branchentrends</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mockValuation.marketAnalysis.industryTrends}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Wettbewerbsposition</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mockValuation.marketAnalysis.competitivePosition}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Wachstumspotenzial</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {mockValuation.marketAnalysis.growthPotential}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Strategische Empfehlungen</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-decimal space-y-2">
                {mockValuation.recommendations.map((rec, i) => (
                  <li key={i} className="leading-relaxed">
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Risikofaktoren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {mockValuation.riskFactoren.map((risk, i) => (
                  <li key={i} className="leading-relaxed text-muted-foreground">
                    {risk}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="mt-8 rounded-lg bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Diese Bewertung wurde mit künstlicher Intelligenz erstellt und dient nur zu Informationszwecken. Für
              rechtlich bindende Bewertungen konsultieren Sie bitte einen zertifizierten Unternehmensbewerter.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
