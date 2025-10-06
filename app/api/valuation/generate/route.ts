import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { valuationReportSchema } from "@/lib/valuation-schema"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    console.log("[v0] Generating valuation for:", formData.companyName)

    // Validate required fields
    if (!formData.companyName || !formData.revenue || !formData.ebitda) {
      return NextResponse.json({ error: "Fehlende erforderliche Felder" }, { status: 400 })
    }

    const prompt = `
Sie sind ein erfahrener Unternehmensbewerter. Erstellen Sie eine professionelle Unternehmensbewertung auf Deutsch für folgendes Unternehmen:

Unternehmensinformationen:
- Name: ${formData.companyName}
- Branche: ${formData.industry}
- Gründungsjahr: ${formData.foundedYear}
- Mitarbeiter: ${formData.employees}
- Standort: ${formData.location}

Finanzdaten (letzte 12 Monate):
- Jahresumsatz: €${Number(formData.revenue).toLocaleString("de-DE")}
- EBITDA: €${Number(formData.ebitda).toLocaleString("de-DE")}
- Nettogewinn: €${Number(formData.netProfit).toLocaleString("de-DE")}
- Vermögenswerte: €${Number(formData.assets || 0).toLocaleString("de-DE")}
- Verbindlichkeiten: €${Number(formData.liabilities || 0).toLocaleString("de-DE")}

Marktinformationen:
- Wachstumsrate: ${formData.growthRate}% pro Jahr
- Marktposition: ${formData.marketPosition}
- Alleinstellungsmerkmale: ${formData.uniqueSellingPoints || "Nicht angegeben"}

Erstellen Sie eine detaillierte Bewertung mit:
1. Executive Summary (2-3 Absätze)
2. SWOT-Analyse (jeweils 3-5 Punkte pro Kategorie)
3. Bewertung nach verschiedenen Methoden:
   - EBITDA-Multiple (verwenden Sie branchenübliche Multiples zwischen 4-8x)
   - Umsatz-Multiple (verwenden Sie branchenübliche Multiples zwischen 0.5-2x)
   - Substanzwertverfahren (Asset-based: Vermögenswerte minus Verbindlichkeiten)
   - Discounted Cash Flow (DCF mit 5-Jahres-Projektion)
4. Empfohlene Bewertungsspanne (niedrig, mittel, hoch)
5. Marktanalyse (Branchentrends, Wettbewerb, Marktgröße)
6. Strategische Empfehlungen (5-7 konkrete Handlungsempfehlungen)
7. Risikofaktoren (5-7 spezifische Risiken)

Alle Bewertungen in EUR. Seien Sie realistisch und berücksichtigen Sie die Branche, Größe und Wachstumsrate.
Verwenden Sie konkrete Zahlen und Berechnungen basierend auf den angegebenen Finanzdaten.
`

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log("[v0] Calling OpenAI API...")

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: valuationReportSchema,
      prompt,
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    console.log("[v0] Valuation generated successfully")

    return NextResponse.json({
      success: true,
      valuation: object,
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      {
        error: "Fehler bei der Bewertungserstellung",
        details: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 },
    )
  }
}
