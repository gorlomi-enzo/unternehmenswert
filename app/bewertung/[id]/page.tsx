"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Download, TrendingUp, Building2, AlertCircle, FileText } from "lucide-react"
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

        // Get form data from localStorage
        const formDataStr = localStorage.getItem("valuationFormData")
        if (!formDataStr) {
          setError("Keine Bewertungsdaten gefunden")
          setLoading(false)
          return
        }

        const parsedFormData = JSON.parse(formDataStr)
        setFormData(parsedFormData)
        console.log("[v0] Form data loaded:", parsedFormData)

        // Generate valuation
        console.log("[v0] Generating valuation...")
        const response = await fetch("/api/valuation/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedFormData),
        })

        const result = await response.json()
        console.log("[v0] Valuation result:", result)

        if (!result.success) {
          setError(result.error || "Fehler bei der Bewertungserstellung")
          setLoading(false)
          return
        }

        setValuation(result.valuation)
        setLoading(false)
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

  if (loading) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-20">
        <div className="text-center">
          <Spinner className="mx-auto mb-4 h-12 w-12" />
          <h2 className="mb-2 font-serif text-2xl font-bold">Bewertung wird erstellt...</h2>
          <p className="text-muted-foreground">Dies kann einige Sekunden dauern</p>
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
              <p className="text-muted-foreground">Professionelle KI-gestützte Analyse</p>
            </div>
            <Button onClick={handleDownloadPDF} disabled={downloadingPDF} size="lg">
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
                    {valuation.companyOverview.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-red-600">Schwächen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-blue-600">Chancen</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.opportunities.map((opportunity, i) => (
                      <li key={i}>{opportunity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-orange-600">Risiken</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {valuation.companyOverview.threats.map((threat, i) => (
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
                    €{valuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Multiple: {valuation.valuationMethods.ebitdaMultiple.multiple}x
                </p>
                <p className="text-sm text-muted-foreground">{valuation.valuationMethods.ebitdaMultiple.explanation}</p>
              </div>

              {/* Revenue Multiple */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Umsatz-Multiple</h4>
                  <p className="font-serif text-xl font-bold">
                    €{valuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Multiple: {valuation.valuationMethods.revenueMultiple.multiple}x
                </p>
                <p className="text-sm text-muted-foreground">
                  {valuation.valuationMethods.revenueMultiple.explanation}
                </p>
              </div>

              {/* Asset Based */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold">Substanzwertverfahren</h4>
                  <p className="font-serif text-xl font-bold">
                    €{valuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}
                  </p>
                </div>
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
