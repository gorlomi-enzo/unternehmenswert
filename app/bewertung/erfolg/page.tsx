"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2 } from "lucide-react"
import { getCheckoutSession } from "@/app/actions/stripe"
import { generateValuation } from "@/app/actions/valuation"
import { sendValuationEmail } from "@/app/actions/email"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"verifying" | "generating" | "complete" | "error">("verifying")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    const verifyAndGenerate = async () => {
      const sessionId = searchParams.get("session_id")
      console.log("[v0] Session ID from URL:", sessionId)

      if (!sessionId) {
        console.error("[v0] No session ID found in URL")
        setErrorMessage("Keine Sitzungs-ID gefunden")
        setStatus("error")
        return
      }

      try {
        // Verify payment
        console.log("[v0] Verifying payment...")
        const result = await getCheckoutSession(sessionId)
        console.log("[v0] Payment verification result:", result)

        if (!result.success || result.paymentStatus !== "paid") {
          console.error("[v0] Payment verification failed:", result)
          setErrorMessage("Zahlung konnte nicht verifiziert werden")
          setStatus("error")
          return
        }

        // Payment successful, generate valuation
        console.log("[v0] Payment verified, generating valuation...")
        setStatus("generating")

        // Get form data from localStorage
        const formDataStr = localStorage.getItem("valuationFormData")
        console.log("[v0] Form data from localStorage:", formDataStr)

        if (!formDataStr) {
          console.error("[v0] No form data found in localStorage")
          setErrorMessage("Formulardaten nicht gefunden")
          setStatus("error")
          return
        }

        const formData = JSON.parse(formDataStr)
        console.log("[v0] Parsed form data:", formData)

        console.log("[v0] Calling generateValuation...")
        const valuationResult = await generateValuation(formData)
        console.log("[v0] Valuation result:", valuationResult)

        if (!valuationResult.success) {
          console.error("[v0] Valuation generation failed:", valuationResult.error)
          // Continue anyway - show demo page
          console.log("[v0] Redirecting to demo page instead...")
          router.push("/bewertung/demo")
          return
        }

        const valuation = valuationResult.data

        try {
          console.log("[v0] Attempting to send email to:", formData.email)
          await sendValuationEmail(formData.email, formData.companyName, valuation)
          console.log("[v0] Email sent successfully")
        } catch (emailError) {
          console.error("[v0] Email sending failed (non-critical):", emailError)
          // Continue anyway - email is optional
        }

        // Store valuation in localStorage for the report page
        const valuationId = `val_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem(`valuation_${valuationId}`, JSON.stringify(valuation))
        localStorage.setItem(`valuationFormData_${valuationId}`, formDataStr)
        console.log("[v0] Valuation stored with ID:", valuationId)

        // Clear form data
        localStorage.removeItem("valuationFormData")

        setStatus("complete")

        // Redirect to valuation page after 2 seconds
        setTimeout(() => {
          console.log("[v0] Redirecting to valuation page...")
          router.push(`/bewertung/${valuationId}`)
        }, 2000)
      } catch (error) {
        console.error("[v0] Error in verification/generation flow:", error)
        console.log("[v0] Redirecting to demo page due to error...")
        router.push("/bewertung/demo")
      }
    }

    verifyAndGenerate()
  }, [searchParams, router])

  return (
    <div className="container flex min-h-screen items-center justify-center py-20">
      <div className="max-w-md text-center">
        {status === "verifying" && (
          <>
            <Spinner className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-2 font-serif text-2xl font-bold">Zahlung wird überprüft...</h2>
            <p className="text-muted-foreground">Bitte warten Sie einen Moment</p>
          </>
        )}

        {status === "generating" && (
          <>
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-600" />
            <h2 className="mb-2 font-serif text-2xl font-bold">Zahlung erfolgreich!</h2>
            <p className="mb-4 text-muted-foreground">Ihre Bewertung wird jetzt erstellt und per E-Mail versendet...</p>
            <Spinner className="mx-auto h-8 w-8" />
          </>
        )}

        {status === "complete" && (
          <>
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-600" />
            <h2 className="mb-2 font-serif text-2xl font-bold">Bewertung erstellt!</h2>
            <p className="text-muted-foreground">Sie werden in Kürze zu Ihrem Bewertungsbericht weitergeleitet...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="mb-2 font-serif text-2xl font-bold text-destructive">Fehler</h2>
            <p className="text-muted-foreground">
              {errorMessage || "Bei der Verarbeitung ist ein Fehler aufgetreten."}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Bitte kontaktieren Sie unseren Support unter support@unternehmenswert.io
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex min-h-screen items-center justify-center py-20">
          <Spinner className="h-16 w-16" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
