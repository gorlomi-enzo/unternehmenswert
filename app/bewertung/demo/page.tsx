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
    console.log("[v0] Starting PDF download...")

    try {
      // Get the content element
      const content = document.getElementById("pdf-content")
      if (!content) {
        console.error("[v0] PDF content element not found")
        alert("Fehler: Inhalt nicht gefunden")
        return
      }

      // Create a complete HTML document
      const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unternehmensbewertung - ${mockFormData.companyName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6; 
      color: #1a1a1a; 
      background: white;
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 { font-size: 36px; margin-bottom: 10px; font-weight: 700; }
    h2 { font-size: 24px; margin: 30px 0 15px; font-weight: 600; }
    h3 { font-size: 20px; margin: 20px 0 10px; font-weight: 600; }
    h4 { font-size: 16px; margin: 15px 0 8px; font-weight: 600; }
    p { margin-bottom: 12px; }
    .header { border-bottom: 3px solid #C6B3A5; padding-bottom: 20px; margin-bottom: 30px; }
    .section { margin-bottom: 40px; padding: 25px; background: #f9f9f9; border-radius: 8px; }
    .highlight { background: #C6B3A5; color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0; }
    .value-large { font-size: 42px; font-weight: 700; margin: 15px 0; }
    .value-medium { font-size: 28px; font-weight: 600; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center; }
    ul, ol { margin-left: 25px; margin-bottom: 15px; }
    li { margin-bottom: 8px; }
    .method { background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #C6B3A5; }
    .swot-item { background: white; padding: 15px; border-radius: 6px; }
    .footer { margin-top: 50px; padding-top: 30px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 14px; }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Unternehmensbewertung</h1>
    <p style="font-size: 18px; color: #666;">${mockFormData.companyName}</p>
    <p style="color: #888;">Professionelle KI-gestützte Analyse | Erstellt am: ${new Date().toLocaleDateString("de-DE")}</p>
  </div>

  <div class="section">
    <h2>📋 Executive Summary</h2>
    <p>${mockValuation.executiveSummary}</p>
  </div>

  <div class="highlight">
    <h2 style="color: white; margin-bottom: 20px;">💰 Empfohlene Bewertung</h2>
    <div class="grid-3">
      <div>
        <p style="font-size: 14px; opacity: 0.9;">Untere Grenze</p>
        <p class="value-medium">€${mockValuation.recommendedValuation.lowRange.toLocaleString("de-DE")}</p>
      </div>
      <div>
        <p style="font-size: 14px; opacity: 0.9;">Mittlerer Wert</p>
        <p class="value-large">€${mockValuation.recommendedValuation.midPoint.toLocaleString("de-DE")}</p>
      </div>
      <div>
        <p style="font-size: 14px; opacity: 0.9;">Obere Grenze</p>
        <p class="value-medium">€${mockValuation.recommendedValuation.highRange.toLocaleString("de-DE")}</p>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 15px; opacity: 0.95;">${mockValuation.recommendedValuation.rationale}</p>
  </div>

  <div class="section">
    <h2>🏢 SWOT-Analyse</h2>
    <div class="grid">
      <div class="swot-item">
        <h4 style="color: #16a34a;">✓ Stärken</h4>
        <ul>
          ${mockValuation.companyOverview.strengths.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <div class="swot-item">
        <h4 style="color: #dc2626;">✗ Schwächen</h4>
        <ul>
          ${mockValuation.companyOverview.weaknesses.map((w) => `<li>${w}</li>`).join("")}
        </ul>
      </div>
      <div class="swot-item">
        <h4 style="color: #2563eb;">↗ Chancen</h4>
        <ul>
          ${mockValuation.companyOverview.opportunities.map((o) => `<li>${o}</li>`).join("")}
        </ul>
      </div>
      <div class="swot-item">
        <h4 style="color: #ea580c;">⚠ Risiken</h4>
        <ul>
          ${mockValuation.companyOverview.threats.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>📊 Bewertungsmethoden</h2>
    
    <div class="method">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3>EBITDA-Multiple</h3>
        <p class="value-medium" style="color: #C6B3A5;">€${mockValuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}</p>
      </div>
      <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
        Multiple: ${mockValuation.valuationMethods.ebitdaMultiple.multiple}x | 
        Berechnung: €${mockFormData.ebitda} × ${mockValuation.valuationMethods.ebitdaMultiple.multiple}
      </p>
      <p>${mockValuation.valuationMethods.ebitdaMultiple.explanation}</p>
    </div>

    <div class="method">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3>Umsatz-Multiple</h3>
        <p class="value-medium" style="color: #C6B3A5;">€${mockValuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}</p>
      </div>
      <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
        Multiple: ${mockValuation.valuationMethods.revenueMultiple.multiple}x | 
        Berechnung: €${mockFormData.revenue} × ${mockValuation.valuationMethods.revenueMultiple.multiple}
      </p>
      <p>${mockValuation.valuationMethods.revenueMultiple.explanation}</p>
    </div>

    <div class="method">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3>Substanzwertverfahren</h3>
        <p class="value-medium" style="color: #C6B3A5;">€${mockValuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}</p>
      </div>
      <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
        Berechnung: Vermögenswerte (€100.000) - Verbindlichkeiten (€0)
      </p>
      <p>${mockValuation.valuationMethods.assetBased.explanation}</p>
    </div>

    <div class="method">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3>Discounted Cash Flow (DCF)</h3>
        <p class="value-medium" style="color: #C6B3A5;">€${mockValuation.valuationMethods.discountedCashFlow.calculatedValue.toLocaleString("de-DE")}</p>
      </div>
      <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
        Diskontierungssatz: ${mockValuation.valuationMethods.discountedCashFlow.discountRate}% | Projektion: 5 Jahre
      </p>
      <p>${mockValuation.valuationMethods.discountedCashFlow.explanation}</p>
    </div>
  </div>

  <div class="section">
    <h2>📈 Marktanalyse</h2>
    <h4>Branchentrends</h4>
    <p>${mockValuation.marketAnalysis.industryTrends}</p>
    <h4>Wettbewerbsposition</h4>
    <p>${mockValuation.marketAnalysis.competitivePosition}</p>
    <h4>Wachstumspotenzial</h4>
    <p>${mockValuation.marketAnalysis.growthPotential}</p>
  </div>

  <div class="section">
    <h2>💡 Strategische Empfehlungen</h2>
    <ol>
      ${mockValuation.recommendations.map((r) => `<li>${r}</li>`).join("")}
    </ol>
  </div>

  <div class="section">
    <h2>⚠️ Risikofaktoren</h2>
    <ul>
      ${mockValuation.riskFactoren.map((r) => `<li>${r}</li>`).join("")}
    </ul>
  </div>

  <div class="footer">
    <p><strong>Haftungsausschluss:</strong> Diese Bewertung wurde mit künstlicher Intelligenz erstellt und dient nur zu Informationszwecken. 
    Für rechtlich bindende Bewertungen konsultieren Sie bitte einen zertifizierten Unternehmensbewerter. 
    Die Bewertung basiert auf den bereitgestellten Informationen und allgemeinen Marktdaten. 
    Unternehmenswert.io übernimmt keine Haftung für Entscheidungen, die auf Basis dieser Bewertung getroffen werden.</p>
    <p style="margin-top: 20px;">© ${new Date().getFullYear()} Unternehmenswert.io - Alle Rechte vorbehalten</p>
    <p style="margin-top: 10px; font-size: 12px;">
      <strong>Tipp:</strong> Drücken Sie Strg+P (Windows) oder Cmd+P (Mac) und wählen Sie "Als PDF speichern" um diese Bewertung als PDF zu speichern.
    </p>
  </div>
</body>
</html>
      `

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `Unternehmensbewertung-${mockFormData.companyName.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      console.log("[v0] PDF download successful")

      // Show instructions
      setTimeout(() => {
        alert(
          "✅ Die Bewertung wurde heruntergeladen!\n\n" +
            "So erstellen Sie eine PDF:\n" +
            "1. Öffnen Sie die heruntergeladene HTML-Datei in Ihrem Browser\n" +
            "2. Drücken Sie Strg+P (Windows) oder Cmd+P (Mac)\n" +
            "3. Wählen Sie 'Als PDF speichern' als Drucker\n" +
            "4. Klicken Sie auf 'Speichern'",
        )
      }, 500)
    } catch (error) {
      console.error("[v0] PDF download error:", error)
      alert("❌ Fehler beim Erstellen der PDF. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.")
    }
  }

  return (
    <div className="bg-background py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl" id="pdf-content">
          {/* Demo Banner */}
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-center">
            <p className="font-semibold text-green-900">✅ Zahlung erfolgreich! Dies ist Ihr Bewertungsbericht</p>
          </div>

          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="mb-2 font-serif text-4xl font-bold">Unternehmensbewertung</h1>
              <p className="text-lg text-muted-foreground">{mockFormData.companyName}</p>
              <p className="text-sm text-muted-foreground">Professionelle KI-gestützte Analyse</p>
              <p className="text-sm text-muted-foreground">Erstellt am: {new Date().toLocaleDateString("de-DE")}</p>
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
                <div className="swot-section swot-strengths">
                  <h4 className="mb-2 font-semibold text-green-600">Stärken</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="swot-section swot-weaknesses">
                  <h4 className="mb-2 font-semibold text-red-600">Schwächen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                <div className="swot-section swot-opportunities">
                  <h4 className="mb-2 font-semibold text-blue-600">Chancen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {mockValuation.companyOverview.opportunities.map((opportunity, i) => (
                      <li key={i}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
                <div className="swot-section swot-threats">
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
              <div className="method-item">
                <div className="method-header">
                  <h3 className="font-semibold">EBITDA-Multiple</h3>
                  <p className="method-value font-serif text-xl font-bold">
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
              <div className="method-item">
                <div className="method-header">
                  <h3 className="font-semibold">Umsatz-Multiple</h3>
                  <p className="method-value font-serif text-xl font-bold">
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
              <div className="method-item">
                <div className="method-header">
                  <h3 className="font-semibold">Substanzwertverfahren</h3>
                  <p className="method-value font-serif text-xl font-bold">
                    €{mockValuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Berechnung: Vermögenswerte (€100.000) - Verbindlichkeiten (€0)
                </p>
                <p className="text-sm text-muted-foreground">{mockValuation.valuationMethods.assetBased.explanation}</p>
              </div>

              {/* DCF */}
              <div className="method-item">
                <div className="method-header">
                  <h3 className="font-semibold">Discounted Cash Flow (DCF)</h3>
                  <p className="method-value font-serif text-xl font-bold">
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
              <ol className="list-inside list-decimal space-y-2">
                {mockValuation.recommendations.map((rec, i) => (
                  <li key={i} className="leading-relaxed">
                    {rec}
                  </li>
                ))}
              </ol>
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
              rechtlich bindende Bewertungen konsultieren Sie bitte einen zertifizierten Unternehmensbewerter. Die
              Bewertung basiert auf den bereitgestellten Informationen und allgemeinen Marktdaten. Unternehmenswert.io
              übernimmt keine Haftung für Entscheidungen, die auf Basis dieser Bewertung getroffen werden.
            </p>
            <p style={{ marginTop: "15px" }}>
              © {new Date().getFullYear()} Unternehmenswert.io - Alle Rechte vorbehalten
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
