import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, companyName, valuationId } = await req.json()

    console.log("[v0] Sending email to:", email)

    const { data, error } = await resend.emails.send({
      from: "Unternehmenswert.io <onboarding@resend.dev>",
      to: [email],
      subject: `Ihre Unternehmensbewertung für ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #C6B3A5; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Unternehmenswert.io</h1>
          </div>
          
          <div style="padding: 30px; background: #f5f5f5;">
            <h2 style="color: #050D13; margin-top: 0;">Ihre Unternehmensbewertung ist fertig!</h2>
            
            <p>Sehr geehrte Damen und Herren,</p>
            
            <p>vielen Dank für Ihr Vertrauen in Unternehmenswert.io. Ihre professionelle KI-gestützte Unternehmensbewertung für <strong>${companyName}</strong> wurde erfolgreich erstellt.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #050D13;">Was Sie erhalten:</h3>
              <ul style="line-height: 1.8;">
                <li>Detaillierte Bewertung nach 4 etablierten Methoden</li>
                <li>SWOT-Analyse Ihres Unternehmens</li>
                <li>Marktanalyse und Wettbewerbsposition</li>
                <li>Strategische Empfehlungen zur Wertsteigerung</li>
                <li>Risikobewertung und Handlungsempfehlungen</li>
              </ul>
            </div>
            
            <p>Sie können Ihre Bewertung jederzeit in Ihrem Browser abrufen und als PDF herunterladen.</p>
            
            <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
            
            <p>Mit freundlichen Grüßen<br/>
            Ihr Team von Unternehmenswert.io</p>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Unternehmenswert.io. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Email konnte nicht gesendet werden" }, { status: 500 })
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Email API error:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
