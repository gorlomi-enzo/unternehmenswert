export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Product catalog for Unternehmenswert.io
export const PRODUCTS: Product[] = [
  {
    id: "valuation-report",
    name: "Unternehmensbewertung",
    description: "Professionelle KI-gestützte Unternehmensbewertung mit detailliertem PDF-Report",
    priceInCents: 50, // €0.50 (was €495.00 / €49,500 cents in production)
  },
]
