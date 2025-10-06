"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"verifying" | "generating" | "complete" | "error">("verifying")
  const [error, setError] = useState<string | null>(null)
  const [valuationId, setValuationId] = useState<string | null>(null)

  useEffect(() => {
    const processPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id")
        console.log("[v0] Processing payment with session ID:", sessionId)

        if (!sessionId) {
          setError("Keine Sitzungs-ID gefunden")
          setStatus("error")
          return
        }

        // Get form data from localStorage
        const formDataStr = localStorage.getItem("valuationFormData")
        if (!formDataStr) {
          setError("Keine Formulardaten gefunden")
          setStatus("error")
          return
        }

        const formData = JSON.parse(formDataStr)
        console.log("[v0] Form data retrieved:", formData.companyName)

        // Generate valuation
        setStatus("generating")
        console.log("[v0] Generating valuation...")

        const response = await fetch("/api/valuation/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const result = await response.json()
        console.log("[v0] Valuation generation result:", result.success)

        if (!result.success) {
          console.error("[v0] Valuation generation failed:", result.error)
          setError(result.error || "Fehler bei der Bewertungserstellung")
          setStatus("error")
          return
        }

        // Store valuation in localStorage
        const id = `val_${Date.now()}`
        localStorage.setItem(`valuation_${id}`, JSON.stringify(result.valuation))
        setValuationId(id)

        // Send email (non-blocking)
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              companyName: formData.companyName,
              valuationId: id,
            }),
          })
          console.log("[v0] Email sent successfully")
        } catch (emailError) {
          console.error("[v0] Email sending failed:", emailError)
          // Don't fail the whole process if email fails
        }

        setStatus("complete")

        // Redirect to valuation report
        setTimeout(() => {
          router.push(`/bewertung/${id}`)
        }, 2000)
      } catch (err) {
        console.error("[v0] Error processing payment:", err)
        setError("Ein unerwarteter Fehler ist aufgetreten")
        setStatus("error")
      }
    }

    processPayment()
  }, [searchParams, router])

  if (status === "error") {
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
            <p className="mb-4">{error}</p>
            <p className="text-sm text-muted-foreground">
              Bitte kontaktieren Sie unseren Support oder versuchen Sie es erneut.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-20">
      <div className="max-w-md text-center">
        {status === "complete" ? (
          <>
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-600" />
            <h2 className="mb-2 font-serif text-2xl font-bold">Bewertung erstellt!</h2>
            <p className="mb-4 text-muted-foreground">
              Ihre Unternehmensbewertung wurde erfolgreich erstellt. Sie werden weitergeleitet...
            </p>
          </>
        ) : (
          <>
            <Spinner className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-2 font-serif text-2xl font-bold">
              {status === "verifying" ? "Zahlung wird überprüft..." : "Bewertung wird erstellt..."}
            </h2>
            <p className="text-muted-foreground">
              {status === "verifying"
                ? "Bitte warten Sie einen Moment"
                : "Unsere KI analysiert Ihre Unternehmensdaten. Dies kann bis zu 30 Sekunden dauern."}
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
