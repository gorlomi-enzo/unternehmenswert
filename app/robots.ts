import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://unternehmenswert.io"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/bewertung/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
