import { z } from "zod"

export const valuationReportSchema = z.object({
  executiveSummary: z.string().describe("Executive summary of the valuation in German"),
  companyOverview: z.object({
    strengths: z.array(z.string()).describe("Key strengths of the company"),
    weaknesses: z.array(z.string()).describe("Areas for improvement"),
    opportunities: z.array(z.string()).describe("Market opportunities"),
    threats: z.array(z.string()).describe("Potential threats"),
  }),
  valuationMethods: z.object({
    ebitdaMultiple: z.object({
      multiple: z.number().describe("Industry-appropriate EBITDA multiple"),
      calculatedValue: z.number().describe("Valuation based on EBITDA multiple in EUR"),
      explanation: z.string().describe("Explanation of the multiple used"),
    }),
    revenueMultiple: z.object({
      multiple: z.number().describe("Industry-appropriate revenue multiple"),
      calculatedValue: z.number().describe("Valuation based on revenue multiple in EUR"),
      explanation: z.string().describe("Explanation of the multiple used"),
    }),
    assetBased: z.object({
      calculatedValue: z.number().describe("Asset-based valuation in EUR"),
      explanation: z.string().describe("Explanation of asset-based approach"),
    }),
    discountedCashFlow: z.object({
      calculatedValue: z.number().describe("DCF valuation in EUR"),
      discountRate: z.number().describe("Discount rate used (%)"),
      explanation: z.string().describe("Explanation of DCF assumptions"),
    }),
  }),
  recommendedValuation: z.object({
    lowRange: z.number().describe("Lower bound of valuation range in EUR"),
    midPoint: z.number().describe("Most likely valuation in EUR"),
    highRange: z.number().describe("Upper bound of valuation range in EUR"),
    rationale: z.string().describe("Rationale for the recommended valuation range"),
  }),
  marketAnalysis: z.object({
    industryTrends: z.string().describe("Current industry trends and outlook"),
    competitivePosition: z.string().describe("Analysis of competitive position"),
    growthPotential: z.string().describe("Assessment of growth potential"),
  }),
  recommendations: z.array(z.string()).describe("Strategic recommendations for the business owner"),
  riskFactors: z.array(z.string()).describe("Key risk factors to consider"),
})

export type ValuationReport = z.infer<typeof valuationReportSchema>
