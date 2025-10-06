import { type NextRequest, NextResponse } from "next/server"
import { generateValuation } from "@/app/actions/valuation"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    // Validate required fields
    if (!formData.companyName || !formData.revenue || !formData.ebitda) {
      return NextResponse.json({ error: "Fehlende erforderliche Felder" }, { status: 400 })
    }

    const result = await generateValuation(formData)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      valuation: result.data,
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
