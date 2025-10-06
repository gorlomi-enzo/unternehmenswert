"use server"

import { generateObject } from "ai"
import { valuationReportSchema } from "@/lib/valuation-schema"

interface ValuationFormData {
  companyName: string
  industry: string
  foundedYear: string
  employees: string
  location: string
  revenue: string
  ebitda: string
  netProfit: string
  assets: string
  liabilities: string
  growthRate: string
  marketPosition: string
  uniqueSellingPoints: string
  contactName: string
  email: string
  phone: string
}

export async function generateValuation(formData: ValuationFormData) {
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
1. Executive Summary
2. SWOT-Analyse (Stärken, Schwächen, Chancen, Risiken)
3. Bewertung nach verschiedenen Methoden:
   - EBITDA-Multiple (verwenden Sie branchenübliche Multiples)
   - Umsatz-Multiple
   - Substanzwertverfahren (Asset-based)
   - Discounted Cash Flow (DCF)
4. Empfohlene Bewertungsspanne (niedrig, mittel, hoch)
5. Marktanalyse
6. Strategische Empfehlungen
7. Risikofaktoren

Alle Bewertungen in EUR. Seien Sie realistisch und berücksichtigen Sie die Branche, Größe und Wachstumsrate.
`

  try {
    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: valuationReportSchema,
      prompt,
      maxOutputTokens: 4000,
      temperature: 0.7,
    })

    return {
      success: true,
      data: object,
    }
  } catch (error) {
    console.error("[v0] Valuation generation error:", error)
    return {
      success: false,
      error: "Fehler bei der Bewertungserstellung. Bitte versuchen Sie es später erneut.",
    }
  }
}
