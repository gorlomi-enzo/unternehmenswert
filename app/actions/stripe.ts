"use server"

import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = headersList.get("x-forwarded-proto") || "http"
  const baseUrl = `${protocol}://${host}`

  console.log("[v0] Creating checkout session with return_url:", `${baseUrl}/bewertung/bericht`)

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "always",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${baseUrl}/bewertung/bericht?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return {
      success: true,
      status: session.status,
      paymentStatus: session.payment_status,
    }
  } catch (error) {
    console.error("[v0] Error retrieving checkout session:", error)
    return {
      success: false,
      error: "Session konnte nicht abgerufen werden",
    }
  }
}
