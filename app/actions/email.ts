"use server"

export async function sendValuationEmail(email: string, companyName: string, valuation: any) {
  console.log("[v0] sendValuationEmail called for:", email)

  // For now, just log and return success
  console.log("[v0] Email would be sent to:", email)
  console.log("[v0] Company:", companyName)
  console.log("[v0] Valuation summary:", valuation.recommendedValuation)

  // TODO: Implement Resend email sending
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ ... })

  return {
    success: true,
    message: "Email sending is not yet implemented",
  }
}
