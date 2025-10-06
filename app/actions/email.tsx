"use server"

import { Resend } from "resend"
import type { ValuationReport } from "@/lib/valuation-schema"

const resend = new Resend("re_GtYQrCGk_7vzXqyL75HjM1xmw1eYx8Xxh")

export async function sendValuationEmail(email: string, companyName: string, valuation: ValuationReport) {
  try {
    console.log("[v0] Sending email to:", email)

    // Generate HTML email content
    const emailHtml = generateEmailHtml(companyName, valuation)

    const { data, error } = await resend.emails.send({
      from: "Unternehmenswert.io <bewertung@unternehmenswert.io>",
      to: [email],
      subject: `Ihre Unternehmensbewertung für ${companyName}`,
      html: emailHtml,
    })

    if (error) {
      console.error("[v0] Error sending email:", error)
      throw new Error("E-Mail konnte nicht gesendet werden")
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true }
  } catch (error) {
    console.error("[v0] Error in sendValuationEmail:", error)
    throw error
  }
}

function generateEmailHtml(companyName: string, valuation: ValuationReport): string {
  const avgValuation = Math.round(
    (valuation.valuationMethods.ebitdaMultiple.value +
      valuation.valuationMethods.revenueMultiple.value +
      valuation.valuationMethods.assetBased.value +
      valuation.valuationMethods.dcf.value) /
      4,
  )

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ihre Unternehmensbewertung</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #050D13; padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                Unternehmenswert.io
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #050D13; font-size: 24px; font-weight: 600;">
                Ihre Unternehmensbewertung ist fertig!
              </h2>
              
              <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                Sehr geehrte Damen und Herren,
              </p>
              
              <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                vielen Dank für Ihr Vertrauen in Unternehmenswert.io. Ihre professionelle Unternehmensbewertung für <strong>${companyName}</strong> wurde erfolgreich erstellt.
              </p>
              
              <!-- Valuation Summary Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #C6B3A5; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px; color: #050D13; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Geschätzter Unternehmenswert
                    </p>
                    <p style="margin: 0; color: #050D13; font-size: 36px; font-weight: 700;">
                      €${avgValuation.toLocaleString("de-DE")}
                    </p>
                    <p style="margin: 10px 0 0; color: #050D13; font-size: 14px;">
                      Durchschnitt aus 4 Bewertungsmethoden
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                Ihr detaillierter Bewertungsbericht umfasst:
              </p>
              
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #666; font-size: 16px; line-height: 1.8;">
                <li>Executive Summary mit Kernerkenntnissen</li>
                <li>4 professionelle Bewertungsmethoden (EBITDA, Umsatz, Substanzwert, DCF)</li>
                <li>SWOT-Analyse Ihres Unternehmens</li>
                <li>Marktanalyse und Wettbewerbsposition</li>
                <li>Strategische Empfehlungen</li>
                <li>Risikobewertung und Handlungsempfehlungen</li>
              </ul>
              
              <p style="margin: 0 0 30px; color: #666; font-size: 16px; line-height: 1.6;">
                Sie können Ihren vollständigen Bewertungsbericht jederzeit in Ihrem Account abrufen und als PDF herunterladen.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}" 
                       style="display: inline-block; background-color: #050D13; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      Bewertung jetzt ansehen
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #999; font-size: 14px; line-height: 1.6;">
                Bei Fragen stehen wir Ihnen gerne zur Verfügung unter <a href="mailto:support@unternehmenswert.io" style="color: #C6B3A5; text-decoration: none;">support@unternehmenswert.io</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 30px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; color: #999; font-size: 14px;">
                © ${new Date().getFullYear()} Unternehmenswert.io - Professionelle Unternehmensbewertungen
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
