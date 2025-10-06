"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Download, TrendingUp, Building2, AlertCircle, FileText, BarChart3, PieChart } from "lucide-react"
import type { ValuationReport } from "@/lib/valuation-schema"
import { generatePDF } from "@/lib/pdf-generator"

export default function ValuationReportPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [valuation, setValuation] = useState<ValuationReport | null>(null)
  const [formData, setFormData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [downloadingPDF, setDownloadingPDF] = useState(false)

  useEffect(() => {
    const loadValuation = async () => {
      try {
        console.log("[v0] Loading valuation for ID:", params.id)

        // Get valuation from localStorage
        const valuationStr = localStorage.getItem(`valuation_${params.id}`)
        const formDataStr = localStorage.getItem("valuationFormData")

        if (!valuationStr || !formDataStr) {
          setError("Bewertung nicht gefunden")
          setLoading(false)
          return
        }

        const parsedValuation = JSON.parse(valuationStr)
        const parsedFormData = JSON.parse(formDataStr)

        setValuation(parsedValuation)
        setFormData(parsedFormData)
        setLoading(false)

        console.log("[v0] Valuation loaded successfully")
      } catch (err) {
        console.error("[v0] Error loading valuation:", err)
        setError("Fehler beim Laden der Bewertung")
        setLoading(false)
      }
    }

    loadValuation()
  }, [params.id])

  const handleDownloadPDF = async () => {
    if (!valuation || !formData) return

    setDownloadingPDF(true)
    try {
      console.log("[v0] Generating PDF...")
      const pdfBlob = await generatePDF({ valuation, formData })

      // Create download link
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Unternehmensbewertung_${formData.companyName}_${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      console.log("[v0] PDF download initiated")

      // Show instructions
      alert(
        "Die Bewertung wurde als HTML-Datei heruntergeladen. Öffnen Sie die Datei in Ihrem Browser und drucken Sie sie als PDF (Strg+P / Cmd+P).",
      )
    } catch (err) {
      console.error("[v0] Error generating PDF:", err)
      alert("Fehler beim Erstellen der PDF. Bitte versuchen Sie es erneut.")
    } finally {
      setDownloadingPDF(false)
    }
  }

  const ebitdaMargin = ((Number(formData.ebitda) / Number(formData.revenue)) * 100).toFixed(1)
  const netMargin = ((Number(formData.netProfit) / Number(formData.revenue)) * 100).toFixed(1)

  if (loading) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-20">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 h-12 w-12" />
          <h2 className="mb-2 font-serif text-2xl font-bold">Bewertung wird geladen...</h2>
          <p className="text-muted-foreground">Einen Moment bitte</p>
        </div>
      </div>
    )
  }

  if (error || !valuation) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-20">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Fehler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Bewertung konnte nicht geladen werden"}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-background py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="mb-2 font-serif text-4xl font-bold">Unternehmensbewertung</h1>
              <p className="text-lg text-muted-foreground">{formData.companyName}</p>
              <p className="text-sm text-muted-foreground">Erstellt am {new Date().toLocaleDateString("de-DE")}</p>
            </div>
            <Button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {downloadingPDF ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Wird erstellt...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  PDF herunterladen
                </>
              )}
            </Button>
          </div>

          {/* Company Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Unternehmensinformationen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Branche</p>
                  <p className="font-semibold">{formData.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mitarbeiter</p>
                  <p className="font-semibold">{formData.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Standort</p>
                  <p className="font-semibold">{formData.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jahresumsatz</p>
                  <p className="font-semibold">€{Number(formData.revenue).toLocaleString("de-DE")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">EBITDA</p>
                  <p className="font-semibold">€{Number(formData.ebitda).toLocaleString("de-DE")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">EBITDA-Marge</p>
                  <p className="font-semibold">{ebitdaMargin}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{valuation.executiveSummary}</p>
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
                    €{valuation.recommendedValuation.lowRange.toLocaleString("de-DE")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Mittlerer Wert</p>
                  <p className="font-serif text-3xl font-bold text-primary">
                    €{valuation.recommendedValuation.midPoint.toLocaleString("de-DE")}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Obere Grenze</p>
                  <p className="font-serif text-2xl font-bold">
                    €{valuation.recommendedValuation.highRange.toLocaleString("de-DE")}
                  </p>
                </div>
              </div>
              <p className="leading-relaxed text-muted-foreground">{valuation.recommendedValuation.rationale}</p>
            </CardContent>
          </Card>

          {/* Valuation Methods */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bewertungsmethoden im Detail</CardTitle>
              <CardDescription>Verschiedene Ansätze zur Unternehmensbewertung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* EBITDA Multiple */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">EBITDA-Multiple-Verfahren</h4>
                  <p className="font-serif text-xl font-bold">
                    €{valuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Angewandter Multiple: {valuation.valuationMethods.ebitdaMultiple.multiple}x
                </p>
                <p className="text-sm text-muted-foreground">
                  Berechnung: EBITDA (€{Number(formData.ebitda).toLocaleString("de-DE")}) ×{" "}
                  {valuation.valuationMethods.ebitdaMultiple.multiple} = €
                  {valuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}
                </p>
                <p className="text-sm text-muted-foreground">{valuation.valuationMethods.ebitdaMultiple.explanation}</p>
              </div>

              {/* Revenue Multiple */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Umsatz-Multiple-Verfahren</h4>
                  <p className="font-serif text-xl font-bold">
                    €{valuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Angewandter Multiple: {valuation.valuationMethods.revenueMultiple.multiple}x
                </p>
                <p className="text-sm text-muted-foreground">
                  Berechnung: Umsatz (€{Number(formData.revenue).toLocaleString("de-DE")}) ×{" "}
                  {valuation.valuationMethods.revenueMultiple.multiple} = €
                  {valuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {valuation.valuationMethods.revenueMultiple.explanation}
                </p>
              </div>

              {/* Asset Based */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Substanzwertverfahren (Asset-Based)</h4>
                  <p className="font-serif text-xl font-bold">
                    €{valuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Berechnung: Vermögenswerte - Verbindlichkeiten = Substanzwert
                </p>
                <p className="text-sm text-muted-foreground">{valuation.valuationMethods.assetBased.explanation}</p>
              </div>

              {/* DCF */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Discounted Cash Flow (DCF)</h4>
                  <p className="font-serif text-xl font-bold">
                    €{valuation.valuationMethods.discountedCashFlow.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Diskontierungssatz: {valuation.valuationMethods.discountedCashFlow.discountRate}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {valuation.valuationMethods.discountedCashFlow.explanation}
                </p>
              </div>

              {/* Chart Placeholder */}
              <div className="chart-placeholder">
                <BarChart3 className="mr-2 h-4 w-4" />
                Vergleich der Bewertungsmethoden
                <br />
                (Visualisierung: EBITDA-Multiple, Umsatz-Multiple, Substanzwert, DCF)
              </div>
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
              <div className="swot-grid">
                <div className="swot-box strengths">
                  <h4 className="font-semibold">Stärken</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="swot-box weaknesses">
                  <h4 className="font-semibold">Schwächen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                <div className="swot-box opportunities">
                  <h4 className="font-semibold">Chancen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.opportunities.map((opportunity, i) => (
                      <li key={i}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
                <div className="swot-box threats">
                  <h4 className="font-semibold">Risiken</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.threats.map((threat, i) => (
                      <li key={i}>{threat}</li>
                    ))}
                  </ul>
                </div>
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
                <h4 className="mb-2 font-semibold">Branchentrends und Marktumfeld</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {valuation.marketAnalysis.industryTrends}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Wettbewerbsposition</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {valuation.marketAnalysis.competitivePosition}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Wachstumspotenzial</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {valuation.marketAnalysis.growthPotential}
                </p>
              </div>

              {/* Chart Placeholder */}
              <div className="chart-placeholder">
                <PieChart className="mr-2 h-4 w-4" />
                Marktpositionierung und Wachstumsprognose
                <br />
                (Visualisierung: Marktanteil, Wachstumstrend, Wettbewerbsvergleich)
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
                {valuation.recommendations.map((rec, i) => (
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
                {valuation.riskFactors.map((risk, i) => (
                  <li key={i} className="leading-relaxed text-muted-foreground">
                    {risk}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
