"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Building2, TrendingUp, AlertTriangle, Target, CheckCircle2 } from "lucide-react"

function generateValuation(formData: any) {
  const revenue = Number.parseFloat(formData.revenue) || 0
  const ebitda = Number.parseFloat(formData.ebitda) || 0
  const netProfit = Number.parseFloat(formData.netProfit) || 0
  const assets = Number.parseFloat(formData.assets) || 0
  const liabilities = Number.parseFloat(formData.liabilities) || 0
  const growthRate = Number.parseFloat(formData.growthRate) || 0

  // Industry-specific EBITDA multiples
  const industryMultiples: Record<string, number> = {
    software: 8.5,
    saas: 10.0,
    ecommerce: 4.5,
    consulting: 5.0,
    manufacturing: 6.0,
    retail: 3.5,
    healthcare: 7.0,
    fintech: 9.0,
    default: 5.5,
  }

  const ebitdaMultiple = industryMultiples[formData.industry] || industryMultiples.default
  const revenueMultiple = ebitdaMultiple * 0.6

  // Calculate valuations
  const ebitdaValuation = ebitda * ebitdaMultiple
  const revenueValuation = revenue * revenueMultiple
  const assetValuation = assets - liabilities

  // DCF calculation (simplified)
  const discountRate = 0.12
  const terminalGrowthRate = 0.03
  const projectionYears = 5
  let dcfValue = 0

  for (let year = 1; year <= projectionYears; year++) {
    const projectedCashFlow = ebitda * Math.pow(1 + growthRate / 100, year)
    dcfValue += projectedCashFlow / Math.pow(1 + discountRate, year)
  }

  const terminalValue =
    (ebitda * Math.pow(1 + growthRate / 100, projectionYears) * (1 + terminalGrowthRate)) /
    (discountRate - terminalGrowthRate)
  dcfValue += terminalValue / Math.pow(1 + discountRate, projectionYears)

  // Weighted average
  const estimatedValue = ebitdaValuation * 0.4 + revenueValuation * 0.3 + dcfValue * 0.2 + assetValuation * 0.1

  return {
    companyName: formData.companyName,
    industry: formData.industry,
    estimatedValue,
    valuationRange: {
      min: estimatedValue * 0.8,
      max: estimatedValue * 1.2,
    },
    methods: {
      ebitda: {
        value: ebitdaValuation,
        multiple: ebitdaMultiple,
        calculation: `${ebitda.toLocaleString("de-DE")}€ × ${ebitdaMultiple}`,
      },
      revenue: {
        value: revenueValuation,
        multiple: revenueMultiple,
        calculation: `${revenue.toLocaleString("de-DE")}€ × ${revenueMultiple.toFixed(1)}`,
      },
      dcf: {
        value: dcfValue,
        discountRate: discountRate * 100,
        growthRate: growthRate,
      },
      asset: {
        value: assetValuation,
        calculation: `${assets.toLocaleString("de-DE")}€ - ${liabilities.toLocaleString("de-DE")}€`,
      },
    },
    financials: {
      revenue,
      ebitda,
      netProfit,
      ebitdaMargin: (ebitda / revenue) * 100,
      netMargin: (netProfit / revenue) * 100,
      assets,
      liabilities,
      equity: assets - liabilities,
    },
    swot: {
      strengths: [
        growthRate > 10 ? "Starkes Umsatzwachstum" : "Stabiles Geschäftsmodell",
        ebitda / revenue > 0.2 ? "Hohe Profitabilität" : "Solide Margen",
        formData.marketPosition === "leader" ? "Marktführerschaft" : "Etablierte Marktposition",
      ],
      weaknesses: [
        liabilities > assets * 0.5 ? "Hohe Verschuldung" : "Begrenzte Skalierbarkeit",
        formData.employees === "1-10" ? "Kleine Teamgröße" : "Abhängigkeit von Schlüsselpersonen",
      ],
      opportunities: ["Digitalisierung und Automatisierung", "Expansion in neue Märkte", "Produktdiversifikation"],
      risks: ["Zunehmender Wettbewerb", "Wirtschaftliche Unsicherheiten", "Regulatorische Änderungen"],
    },
    recommendations: [
      "Fokus auf profitables Wachstum und Skalierung",
      "Stärkung der Marktposition durch Innovation",
      "Optimierung der operativen Effizienz",
      "Aufbau strategischer Partnerschaften",
    ],
  }
}

function ReportContent() {
  const searchParams = useSearchParams()
  const [valuation, setValuation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    console.log("[v0] Loading report with session:", sessionId)

    // Get form data from localStorage
    const formDataStr = localStorage.getItem("valuationFormData")
    if (formDataStr) {
      const formData = JSON.parse(formDataStr)
      console.log("[v0] Generating valuation for:", formData.companyName)

      // Generate valuation client-side
      const result = generateValuation(formData)
      setValuation(result)

      // Store in localStorage for later access
      const id = `val_${Date.now()}`
      localStorage.setItem(`valuation_${id}`, JSON.stringify(result))
    }

    setLoading(false)
  }, [searchParams])

  const handleDownloadPDF = () => {
    if (!valuation) return

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Unternehmensbewertung - ${valuation.companyName}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; max-width: 800px; margin: 0 auto; padding: 40px; }
        h1 { color: #C6B3A5; font-size: 32px; margin-bottom: 10px; }
        h2 { color: #050D13; font-size: 24px; margin-top: 30px; border-bottom: 2px solid #C6B3A5; padding-bottom: 10px; }
        h3 { color: #050D13; font-size: 18px; margin-top: 20px; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #C6B3A5; padding-bottom: 20px; }
        .value-box { background: #F5F5F5; padding: 20px; border-left: 4px solid #C6B3A5; margin: 20px 0; }
        .value-box h3 { margin-top: 0; }
        .value-large { font-size: 36px; font-weight: bold; color: #C6B3A5; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .card { background: #F5F5F5; padding: 15px; border-radius: 8px; }
        .card h4 { margin: 0 0 10px 0; color: #050D13; }
        .card p { margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #C6B3A5; color: white; }
        ul { list-style: none; padding: 0; }
        ul li { padding: 8px 0; padding-left: 25px; position: relative; }
        ul li:before { content: "•"; position: absolute; left: 0; color: #C6B3A5; font-weight: bold; font-size: 20px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #C6B3A5; font-size: 12px; color: #666; }
        @media print { body { padding: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>Unternehmensbewertungsbericht</h1>
        <p style="font-size: 18px; color: #666;">${valuation.companyName}</p>
        <p style="color: #666;">Erstellt am ${new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>

    <h2>Executive Summary</h2>
    <div class="value-box">
        <h3>Geschätzter Unternehmenswert</h3>
        <div class="value-large">${valuation.estimatedValue.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</div>
        <p style="margin-top: 10px; color: #666;">Bewertungsspanne: ${valuation.valuationRange.min.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} € - ${valuation.valuationRange.max.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</p>
    </div>

    <h2>Unternehmensinformationen</h2>
    <div class="grid">
        <div class="card">
            <h4>Branche</h4>
            <p>${valuation.industry}</p>
        </div>
        <div class="card">
            <h4>Jahresumsatz</h4>
            <p>${valuation.financials.revenue.toLocaleString("de-DE")} €</p>
        </div>
        <div class="card">
            <h4>EBITDA</h4>
            <p>${valuation.financials.ebitda.toLocaleString("de-DE")} €</p>
        </div>
        <div class="card">
            <h4>EBITDA-Marge</h4>
            <p>${valuation.financials.ebitdaMargin.toFixed(1)}%</p>
        </div>
    </div>

    <h2>Bewertungsmethoden</h2>
    
    <h3>1. EBITDA-Multiple-Methode</h3>
    <p><strong>Bewertung:</strong> ${valuation.methods.ebitda.value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</p>
    <p><strong>Berechnung:</strong> ${valuation.methods.ebitda.calculation}</p>
    <p>Die EBITDA-Multiple-Methode ist eine der gängigsten Bewertungsmethoden für etablierte Unternehmen. Der verwendete Multiple von ${valuation.methods.ebitda.multiple}x basiert auf branchenüblichen Vergleichswerten.</p>

    <h3>2. Umsatz-Multiple-Methode</h3>
    <p><strong>Bewertung:</strong> ${valuation.methods.revenue.value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</p>
    <p><strong>Berechnung:</strong> ${valuation.methods.revenue.calculation}</p>
    <p>Diese Methode eignet sich besonders für wachstumsstarke Unternehmen und berücksichtigt das Umsatzpotenzial.</p>

    <h3>3. Discounted Cash Flow (DCF)</h3>
    <p><strong>Bewertung:</strong> ${valuation.methods.dcf.value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</p>
    <p><strong>Diskontierungssatz:</strong> ${valuation.methods.dcf.discountRate}%</p>
    <p><strong>Wachstumsrate:</strong> ${valuation.methods.dcf.growthRate}%</p>
    <p>Die DCF-Methode bewertet das Unternehmen basierend auf den erwarteten zukünftigen Cashflows, diskontiert auf den heutigen Wert.</p>

    <h3>4. Substanzwertmethode</h3>
    <p><strong>Bewertung:</strong> ${valuation.methods.asset.value.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</p>
    <p><strong>Berechnung:</strong> ${valuation.methods.asset.calculation}</p>
    <p>Der Substanzwert ergibt sich aus der Differenz zwischen Vermögenswerten und Verbindlichkeiten.</p>

    <h2>SWOT-Analyse</h2>
    
    <h3>Stärken</h3>
    <ul>
        ${valuation.swot.strengths.map((s: string) => `<li>${s}</li>`).join("")}
    </ul>

    <h3>Schwächen</h3>
    <ul>
        ${valuation.swot.weaknesses.map((w: string) => `<li>${w}</li>`).join("")}
    </ul>

    <h3>Chancen</h3>
    <ul>
        ${valuation.swot.opportunities.map((o: string) => `<li>${o}</li>`).join("")}
    </ul>

    <h3>Risiken</h3>
    <ul>
        ${valuation.swot.risks.map((r: string) => `<li>${r}</li>`).join("")}
    </ul>

    <h2>Strategische Empfehlungen</h2>
    <ul>
        ${valuation.recommendations.map((r: string) => `<li>${r}</li>`).join("")}
    </ul>

    <h2>Finanzielle Kennzahlen</h2>
    <table>
        <tr>
            <th>Kennzahl</th>
            <th>Wert</th>
        </tr>
        <tr>
            <td>Jahresumsatz</td>
            <td>${valuation.financials.revenue.toLocaleString("de-DE")} €</td>
        </tr>
        <tr>
            <td>EBITDA</td>
            <td>${valuation.financials.ebitda.toLocaleString("de-DE")} €</td>
        </tr>
        <tr>
            <td>Nettogewinn</td>
            <td>${valuation.financials.netProfit.toLocaleString("de-DE")} €</td>
        </tr>
        <tr>
            <td>EBITDA-Marge</td>
            <td>${valuation.financials.ebitdaMargin.toFixed(1)}%</td>
        </tr>
        <tr>
            <td>Nettomarge</td>
            <td>${valuation.financials.netMargin.toFixed(1)}%</td>
        </tr>
        <tr>
            <td>Bilanzsumme</td>
            <td>${valuation.financials.assets.toLocaleString("de-DE")} €</td>
        </tr>
        <tr>
            <td>Eigenkapital</td>
            <td>${valuation.financials.equity.toLocaleString("de-DE")} €</td>
        </tr>
    </table>

    <div class="footer">
        <p><strong>Wichtiger Hinweis:</strong> Diese Bewertung stellt eine Schätzung dar und basiert auf den von Ihnen bereitgestellten Informationen. Sie dient als Orientierungshilfe und ersetzt keine professionelle Unternehmensbewertung durch einen zertifizierten Gutachter. Der tatsächliche Verkaufspreis kann von dieser Schätzung abweichen und hängt von vielen Faktoren ab, einschließlich Marktbedingungen, Verhandlungsgeschick und Due-Diligence-Ergebnissen.</p>
        <p style="margin-top: 20px;">© ${new Date().getFullYear()} Unternehmenswert.io - Alle Rechte vorbehalten</p>
    </div>
</body>
</html>
    `

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Unternehmensbewertung_${valuation.companyName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-muted-foreground">Bewertung wird geladen...</p>
        </div>
      </div>
    )
  }

  if (!valuation) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-20">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Keine Daten gefunden</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Bitte füllen Sie zuerst das Bewertungsformular aus.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Banner */}
      <div className="bg-green-50 border-b border-green-200 py-4">
        <div className="container flex items-center justify-center gap-2 text-green-800">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Zahlung erfolgreich! Ihre Bewertung ist bereit.</span>
        </div>
      </div>

      <div className="container py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-serif text-4xl font-bold">Unternehmensbewertungsbericht</h1>
          <p className="text-xl text-muted-foreground">{valuation.companyName}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Erstellt am {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Download Button */}
        <div className="mb-8 flex justify-center">
          <Button onClick={handleDownloadPDF} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Vollständigen Bericht als PDF herunterladen
          </Button>
        </div>

        {/* Estimated Value */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Geschätzter Unternehmenswert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-2 font-serif text-5xl font-bold text-primary">
                {valuation.estimatedValue.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </div>
              <p className="text-muted-foreground">
                Bewertungsspanne:{" "}
                {valuation.valuationRange.min.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                € -{" "}
                {valuation.valuationRange.max.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Valuation Methods */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">EBITDA-Multiple</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-2xl font-bold">
                {valuation.methods.ebitda.value.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </div>
              <p className="text-sm text-muted-foreground">{valuation.methods.ebitda.calculation}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Umsatz-Multiple</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-2xl font-bold">
                {valuation.methods.revenue.value.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </div>
              <p className="text-sm text-muted-foreground">{valuation.methods.revenue.calculation}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discounted Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-2xl font-bold">
                {valuation.methods.dcf.value.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </div>
              <p className="text-sm text-muted-foreground">Diskontierungssatz: {valuation.methods.dcf.discountRate}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Substanzwert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-2xl font-bold">
                {valuation.methods.asset.value.toLocaleString("de-DE", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                €
              </div>
              <p className="text-sm text-muted-foreground">{valuation.methods.asset.calculation}</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Finanzielle Kennzahlen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-sm text-muted-foreground">Jahresumsatz</div>
                <div className="text-xl font-bold">{valuation.financials.revenue.toLocaleString("de-DE")} €</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">EBITDA</div>
                <div className="text-xl font-bold">{valuation.financials.ebitda.toLocaleString("de-DE")} €</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">EBITDA-Marge</div>
                <div className="text-xl font-bold">{valuation.financials.ebitdaMargin.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Nettogewinn</div>
                <div className="text-xl font-bold">{valuation.financials.netProfit.toLocaleString("de-DE")} €</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Eigenkapital</div>
                <div className="text-xl font-bold">{valuation.financials.equity.toLocaleString("de-DE")} €</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Nettomarge</div>
                <div className="text-xl font-bold">{valuation.financials.netMargin.toFixed(1)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SWOT Analysis */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                Stärken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {valuation.swot.strengths.map((strength: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-5 w-5" />
                Schwächen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {valuation.swot.weaknesses.map((weakness: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-orange-600">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Target className="h-5 w-5" />
                Chancen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {valuation.swot.opportunities.map((opportunity: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-blue-600">•</span>
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Risiken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {valuation.swot.risks.map((risk: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 text-red-600">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Strategische Empfehlungen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {valuation.recommendations.map((rec: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">
                    {i + 1}
                  </Badge>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-muted-foreground/20 bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Wichtiger Hinweis:</strong> Diese Bewertung stellt eine Schätzung dar und basiert auf den von
              Ihnen bereitgestellten Informationen. Sie dient als Orientierungshilfe und ersetzt keine professionelle
              Unternehmensbewertung durch einen zertifizierten Gutachter. Der tatsächliche Verkaufspreis kann von dieser
              Schätzung abweichen und hängt von vielen Faktoren ab, einschließlich Marktbedingungen,
              Verhandlungsgeschick und Due-Diligence-Ergebnissen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex min-h-screen items-center justify-center py-20">
          <div className="text-center">
            <div className="mb-4 text-4xl">⏳</div>
            <p className="text-muted-foreground">Bewertung wird geladen...</p>
          </div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  )
}
