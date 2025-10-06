import type { ValuationReport } from "./valuation-schema"

interface PDFGenerationData {
  valuation: ValuationReport
  formData: {
    companyName: string
    industry: string
    foundedYear: string
    employees: string
    location: string
    revenue: string
    ebitda: string
    netProfit: string
    assets: string
    liabilities: string
    growthRate: string
    marketPosition: string
    uniqueSellingPoints: string
  }
}

export async function generatePDF(data: PDFGenerationData): Promise<Blob> {
  const { valuation, formData } = data

  // Create HTML content for the PDF
  const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }
    
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #C6B3A5;
    }
    
    .header h1 {
      font-size: 28pt;
      margin: 0 0 10px 0;
      color: #000;
    }
    
    .header p {
      font-size: 12pt;
      color: #666;
      margin: 5px 0;
    }
    
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 18pt;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #C6B3A5;
    }
    
    .subsection-title {
      font-size: 14pt;
      font-weight: bold;
      color: #000;
      margin: 20px 0 10px 0;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .info-item {
      padding: 10px;
      background: #F5F5F5;
      border-left: 3px solid #C6B3A5;
    }
    
    .info-label {
      font-weight: bold;
      font-size: 10pt;
      color: #666;
      margin-bottom: 3px;
    }
    
    .info-value {
      font-size: 12pt;
      color: #000;
    }
    
    .valuation-box {
      background: #F5F5F5;
      border: 2px solid #C6B3A5;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    
    .valuation-range {
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
    }
    
    .valuation-item {
      text-align: center;
    }
    
    .valuation-label {
      font-size: 10pt;
      color: #666;
      margin-bottom: 5px;
    }
    
    .valuation-value {
      font-size: 20pt;
      font-weight: bold;
      color: #000;
    }
    
    .valuation-mid {
      font-size: 24pt;
      color: #C6B3A5;
    }
    
    .swot-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 20px 0;
    }
    
    .swot-box {
      padding: 15px;
      border-radius: 5px;
    }
    
    .swot-strengths {
      background: #E8F5E9;
      border-left: 4px solid #4CAF50;
    }
    
    .swot-weaknesses {
      background: #FFEBEE;
      border-left: 4px solid #F44336;
    }
    
    .swot-opportunities {
      background: #E3F2FD;
      border-left: 4px solid #2196F3;
    }
    
    .swot-threats {
      background: #FFF3E0;
      border-left: 4px solid #FF9800;
    }
    
    .swot-title {
      font-weight: bold;
      font-size: 12pt;
      margin-bottom: 10px;
    }
    
    .method-box {
      background: #F5F5F5;
      padding: 15px;
      margin: 15px 0;
      border-left: 4px solid #C6B3A5;
    }
    
    .method-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .method-name {
      font-weight: bold;
      font-size: 13pt;
    }
    
    .method-value {
      font-size: 16pt;
      font-weight: bold;
      color: #C6B3A5;
    }
    
    ul {
      margin: 10px 0;
      padding-left: 25px;
    }
    
    li {
      margin: 8px 0;
    }
    
    .page-break {
      page-break-after: always;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #C6B3A5;
      text-align: center;
      font-size: 9pt;
      color: #666;
    }
    
    .highlight-box {
      background: #FFF9F0;
      border: 2px solid #C6B3A5;
      padding: 15px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <!-- Page 1: Cover & Executive Summary -->
  <div class="header">
    <h1>Unternehmensbewertung</h1>
    <p style="font-size: 16pt; margin: 20px 0;">${formData.companyName}</p>
    <p>Erstellt am ${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</p>
    <p style="margin-top: 30px; font-size: 10pt;">Professionelle KI-gestützte Analyse</p>
  </div>

  <div class="section">
    <div class="section-title">Unternehmensinformationen</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Unternehmen</div>
        <div class="info-value">${formData.companyName}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Branche</div>
        <div class="info-value">${formData.industry}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Gründungsjahr</div>
        <div class="info-value">${formData.foundedYear}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Mitarbeiter</div>
        <div class="info-value">${formData.employees}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Standort</div>
        <div class="info-value">${formData.location}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Marktposition</div>
        <div class="info-value">${formData.marketPosition}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Finanzkennzahlen (letzte 12 Monate)</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Jahresumsatz</div>
        <div class="info-value">€${Number(formData.revenue).toLocaleString("de-DE")}</div>
      </div>
      <div class="info-item">
        <div class="info-label">EBITDA</div>
        <div class="info-value">€${Number(formData.ebitda).toLocaleString("de-DE")}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Nettogewinn</div>
        <div class="info-value">€${Number(formData.netProfit).toLocaleString("de-DE")}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Wachstumsrate</div>
        <div class="info-value">${formData.growthRate}% p.a.</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Executive Summary</div>
    <p style="text-align: justify;">${valuation.executiveSummary}</p>
  </div>

  <div class="page-break"></div>

  <!-- Page 2: Valuation Results -->
  <div class="section">
    <div class="section-title">Empfohlene Bewertung</div>
    <div class="valuation-box">
      <div class="valuation-range">
        <div class="valuation-item">
          <div class="valuation-label">Untere Grenze</div>
          <div class="valuation-value">€${valuation.recommendedValuation.lowRange.toLocaleString("de-DE")}</div>
        </div>
        <div class="valuation-item">
          <div class="valuation-label">Mittlerer Wert</div>
          <div class="valuation-value valuation-mid">€${valuation.recommendedValuation.midPoint.toLocaleString("de-DE")}</div>
        </div>
        <div class="valuation-item">
          <div class="valuation-label">Obere Grenze</div>
          <div class="valuation-value">€${valuation.recommendedValuation.highRange.toLocaleString("de-DE")}</div>
        </div>
      </div>
      <p style="margin-top: 20px; text-align: justify; font-size: 10pt;">${valuation.recommendedValuation.rationale}</p>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Bewertungsmethoden im Detail</div>
    
    <div class="method-box">
      <div class="method-header">
        <div class="method-name">EBITDA-Multiple Methode</div>
        <div class="method-value">€${valuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}</div>
      </div>
      <p><strong>Multiple:</strong> ${valuation.valuationMethods.ebitdaMultiple.multiple}x</p>
      <p style="text-align: justify;">${valuation.valuationMethods.ebitdaMultiple.explanation}</p>
      <div class="highlight-box">
        <strong>Berechnung:</strong> EBITDA (€${Number(formData.ebitda).toLocaleString("de-DE")}) × Multiple (${valuation.valuationMethods.ebitdaMultiple.multiple}x) = €${valuation.valuationMethods.ebitdaMultiple.calculatedValue.toLocaleString("de-DE")}
      </div>
    </div>

    <div class="method-box">
      <div class="method-header">
        <div class="method-name">Umsatz-Multiple Methode</div>
        <div class="method-value">€${valuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}</div>
      </div>
      <p><strong>Multiple:</strong> ${valuation.valuationMethods.revenueMultiple.multiple}x</p>
      <p style="text-align: justify;">${valuation.valuationMethods.revenueMultiple.explanation}</p>
      <div class="highlight-box">
        <strong>Berechnung:</strong> Umsatz (€${Number(formData.revenue).toLocaleString("de-DE")}) × Multiple (${valuation.valuationMethods.revenueMultiple.multiple}x) = €${valuation.valuationMethods.revenueMultiple.calculatedValue.toLocaleString("de-DE")}
      </div>
    </div>

    <div class="method-box">
      <div class="method-header">
        <div class="method-name">Substanzwertverfahren</div>
        <div class="method-value">€${valuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}</div>
      </div>
      <p style="text-align: justify;">${valuation.valuationMethods.assetBased.explanation}</p>
      <div class="highlight-box">
        <strong>Berechnung:</strong> Vermögenswerte (€${Number(formData.assets || 0).toLocaleString("de-DE")}) - Verbindlichkeiten (€${Number(formData.liabilities || 0).toLocaleString("de-DE")}) = €${valuation.valuationMethods.assetBased.calculatedValue.toLocaleString("de-DE")}
      </div>
    </div>

    <div class="method-box">
      <div class="method-header">
        <div class="method-name">Discounted Cash Flow (DCF)</div>
        <div class="method-value">€${valuation.valuationMethods.discountedCashFlow.calculatedValue.toLocaleString("de-DE")}</div>
      </div>
      <p><strong>Diskontierungssatz:</strong> ${valuation.valuationMethods.discountedCashFlow.discountRate}%</p>
      <p style="text-align: justify;">${valuation.valuationMethods.discountedCashFlow.explanation}</p>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- Page 3: SWOT Analysis -->
  <div class="section">
    <div class="section-title">SWOT-Analyse</div>
    <div class="swot-grid">
      <div class="swot-box swot-strengths">
        <div class="swot-title">Stärken</div>
        <ul>
          ${valuation.companyOverview.strengths.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <div class="swot-box swot-weaknesses">
        <div class="swot-title">Schwächen</div>
        <ul>
          ${valuation.companyOverview.weaknesses.map((w) => `<li>${w}</li>`).join("")}
        </ul>
      </div>
      <div class="swot-box swot-opportunities">
        <div class="swot-title">Chancen</div>
        <ul>
          ${valuation.companyOverview.opportunities.map((o) => `<li>${o}</li>`).join("")}
        </ul>
      </div>
      <div class="swot-box swot-threats">
        <div class="swot-title">Risiken</div>
        <ul>
          ${valuation.companyOverview.threats.map((t) => `<li>${t}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Marktanalyse</div>
    
    <div class="subsection-title">Branchentrends</div>
    <p style="text-align: justify;">${valuation.marketAnalysis.industryTrends}</p>
    
    <div class="subsection-title">Wettbewerbsposition</div>
    <p style="text-align: justify;">${valuation.marketAnalysis.competitivePosition}</p>
    
    <div class="subsection-title">Wachstumspotenzial</div>
    <p style="text-align: justify;">${valuation.marketAnalysis.growthPotential}</p>
  </div>

  <div class="page-break"></div>

  <!-- Page 4: Recommendations -->
  <div class="section">
    <div class="section-title">Strategische Empfehlungen</div>
    <p style="margin-bottom: 15px;">Basierend auf unserer Analyse empfehlen wir folgende Maßnahmen zur Wertsteigerung:</p>
    <ol>
      ${valuation.recommendations.map((rec) => `<li style="margin: 15px 0; text-align: justify;">${rec}</li>`).join("")}
    </ol>
  </div>

  <div class="section">
    <div class="section-title">Risikofaktoren</div>
    <p style="margin-bottom: 15px;">Bei der Bewertung wurden folgende Risikofaktoren identifiziert:</p>
    <ul>
      ${valuation.riskFactors.map((risk) => `<li style="margin: 12px 0; text-align: justify;">${risk}</li>`).join("")}
    </ul>
  </div>

  <div class="page-break"></div>

  <!-- Page 5: Methodology & Disclaimer -->
  <div class="section">
    <div class="section-title">Bewertungsmethodik</div>
    <p style="text-align: justify; margin-bottom: 15px;">
      Diese Unternehmensbewertung wurde unter Verwendung modernster KI-Technologie und etablierter Bewertungsmethoden erstellt. 
      Die Analyse berücksichtigt die von Ihnen bereitgestellten Finanzdaten sowie branchenspezifische Kennzahlen und Marktbedingungen.
    </p>
    
    <div class="subsection-title">Verwendete Bewertungsverfahren</div>
    <ul>
      <li><strong>EBITDA-Multiple:</strong> Vergleichsbasierte Bewertung anhand branchenüblicher Multiplikatoren</li>
      <li><strong>Umsatz-Multiple:</strong> Bewertung basierend auf Umsatzkennzahlen vergleichbarer Unternehmen</li>
      <li><strong>Substanzwertverfahren:</strong> Bewertung der materiellen und immateriellen Vermögenswerte</li>
      <li><strong>Discounted Cash Flow:</strong> Zukunftsorientierte Bewertung basierend auf prognostizierten Cashflows</li>
    </ul>

    <div class="subsection-title">Datengrundlage</div>
    <p style="text-align: justify;">
      Die Bewertung basiert auf den von Ihnen bereitgestellten Finanzdaten für die letzten 12 Monate. 
      Für eine noch präzisere Bewertung empfehlen wir eine detaillierte Due Diligence mit Prüfung der Jahresabschlüsse 
      der letzten 3-5 Jahre sowie eine Analyse der Marktposition und Wettbewerbssituation.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Haftungsausschluss</div>
    <p style="text-align: justify; font-size: 9pt; line-height: 1.5;">
      Diese Unternehmensbewertung dient ausschließlich zu Informationszwecken und stellt keine Anlageberatung, 
      Steuerberatung oder rechtliche Beratung dar. Die Bewertung basiert auf den von Ihnen bereitgestellten Informationen 
      und öffentlich verfügbaren Daten. Unternehmenswert.io übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit 
      oder Aktualität der bereitgestellten Informationen. Die tatsächliche Bewertung eines Unternehmens kann von den 
      hier dargestellten Werten abweichen und hängt von zahlreichen Faktoren ab, einschließlich Marktbedingungen, 
      Verhandlungsgeschick und individuellen Käufer-/Verkäuferpräferenzen. Für rechtsverbindliche Bewertungen empfehlen 
      wir die Konsultation eines zertifizierten Wirtschaftsprüfers oder Unternehmensbewerters.
    </p>
  </div>

  <div class="footer">
    <p><strong>Unternehmenswert.io</strong></p>
    <p>Professionelle Unternehmensbewertungen für den DACH-Raum</p>
    <p style="margin-top: 10px;">© ${new Date().getFullYear()} Unternehmenswert.io | Alle Rechte vorbehalten</p>
  </div>
</body>
</html>
  `

  // Convert HTML to PDF using browser's print functionality
  const blob = new Blob([htmlContent], { type: "text/html" })
  return blob
}
