/**
 * Compiles essential JWD site content into a compact knowledge document
 * that fits within Groq free-tier token limits (~8K tokens).
 *
 * Strategy: English-only (the model can translate to Japanese itself),
 * key facts only, no redundant descriptions.
 */

import { listings } from '@/content/properties';
import { services } from '@/content/services';
import { NET_WORTH, ALLOC, CCY, TARGET, RE_KPI, PROPS, EQ_KPI, HOLDINGS } from '@/data/wealth';

const oku = (m: number) => `¥${(m / 100).toFixed(2)}億`; // 百万円 → 億

/** Build the compact knowledge base document. */
export function buildKnowledgeBase(): string {
  const parts: string[] = [];

  // ── Company overview ──
  parts.push(`# JWD GROUP
"The Bridge Between Japan & Dubai Real Estate and Wealth Creation"
Founded by Tomo Kawana. Cross-border advisory connecting Japanese investors with Dubai real estate, investment funds, and wealth planning.
Tomo personally lives in Dubai, invests in Dubai (Heart of Europe project), and raises his family there.
Head Office: Nagoya, Japan. Dubai Office: DWC and free zones.
Consultations by introduction only. Channels: WhatsApp, LINE, Zoom.`);

  // ── Key investment highlights ──
  parts.push(`
# DUBAI INVESTMENT FACTS
- Personal income tax: 0%
- Capital gains tax: 0%
- Average rental yield: 7%+
- Population growth: 6%+ annually
- Foreign ownership: 100% in freehold areas
- Golden Visa: AED 2M+ property purchase qualifies
- Currency: AED pegged to USD (1 USD = 3.6725 AED)
- Corporate tax: 9% (free-zone exemptions available)
- AED to JPY rate: ~¥41 per AED`);

  // ── Property listings ──
  parts.push(`
# CURATED DUBAI PROPERTIES`);
  for (const p of listings) {
    parts.push(`
${p.nameEn}: ${p.area}, ${p.typeEn}, AED ${p.priceAed.toLocaleString('en-US')} (~¥${Math.round(p.priceAed * 41).toLocaleString('en-US')}), ${p.yieldPct}% yield, ${p.beds}, ${p.sizeSqft}sqft. ${p.descEn}`);
  }

  // ── Heart of Europe ──
  parts.push(`
# HEART OF EUROPE (Flagship Project)
Located on The World Islands, 4km off Dubai coast. Europe-themed resort: hotels, villas, residences.
Tomo's personal investment. Property types: Hotels, Villas, Residences.
Offers: rental returns, capital appreciation, unique island living.
Links: theworld-dubai.com, theheartofeurope.emirates.expert`);

  // ── Investment Funds ──
  parts.push(`
# INVESTMENT FUNDS
Equity Fund: Regulated platform for global market access (equiti.com)
AIX Fund: Alternative investment fund focused on real assets (aixinvestment.com)
Both feature: independent governance, risk management, transparent reporting.
Future: Crowdfunding, fractional ownership, real estate syndication.`);

  // ── Why Dubai ──
  parts.push(`
# WHY DUBAI
Tax Benefits: 0% income tax, 0% capital gains, 9% corporate (with exemptions)
Visa Programs: Golden Visa (10yr) for AED 2M+ property, investor visas, family visas
Currency: AED-USD peg provides stability vs JPY volatility
Rental Yield: Average 7%+, JVC area 8%+, Downtown 6-7%, Marina 7%+
Market: Record transaction volumes, strong off-plan sales, 6% population growth`);

  // ── Japan Properties ──
  parts.push(`
# JAPAN PROPERTIES (for overseas investors)
Why now: Historic JPY weakness makes prime assets affordable for foreign buyers
Opportunities: Akiya (vacant house) renovation for high yields, regional city investments
Inheritance planning via property, succession optimization
Tokyo prime tight yields, but regional cities and resorts offer upside`);

  // ── Family Office ──
  parts.push(`
# FAMILY OFFICE & WEALTH PLANNING
Services: Asset protection, succession planning, tax planning, family office setup, multi-country wealth structures
Cross-border Japan-Dubai structuring — JWD's core premium offering`);

  // ── Family Office sample portfolio (the live dashboard on /family-office) ──
  parts.push(`
# FAMILY OFFICE — SAMPLE PORTFOLIO DASHBOARD (illustrative demo)
Shown on the /family-office page as the "Wealth Suite". This is a DEMONSTRATION portfolio (the fictional "Todō family" / 藤堂家), NOT a real client — present it as an example of how JWD consolidates a whole family's balance sheet. JPY-based.
Net worth: ¥${NET_WORTH.oku}億 (¥${NET_WORTH.jpy.toLocaleString('en-US')}) across 5 accounts / 3 currencies. MoM +${NET_WORTH.momPct}% (+¥${(NET_WORTH.momYen / 1e6).toFixed(0)}M). YTD +${NET_WORTH.ytdPct}% vs benchmark +${NET_WORTH.benchPct}%. Liquid ¥${NET_WORTH.liquidOku}億 (${NET_WORTH.liquidPct}%).
Asset allocation: ${ALLOC.map((a) => `${a.en} ${a.pct}% (${oku(a.v)})`).join(', ')}.
Currency mix: ${CCY.map((c) => `${c.en} ${c.v}%`).join(', ')}.
Target vs current weights (rebalanced quarterly): ${TARGET.map((t) => `${t.en} ${t.cur}%→${t.tgt}%`).join(', ')}.
Real estate: ¥${RE_KPI.valueOku}億 value, unrealised +¥${RE_KPI.unrealOku}億, ${RE_KPI.count} properties (${RE_KPI.dom} domestic / ${RE_KPI.intl} overseas), ${RE_KPI.yld}% avg gross yield, ¥${RE_KPI.rentM}M annual rent.
  ${PROPS.map((p) => `${p.locEn} ${p.nmEn} (${p.tagEn}, acq ${oku(p.acq)} → now ${oku(p.cur)}, yield ${p.yld})`).join('; ')}.
Equities: ¥${EQ_KPI.valueOku}億, +${EQ_KPI.dayPct}% today. Holdings: ${HOLDINGS.map((h) => `${h.nmEn} ¥${h.v}M (${h.w}%)`).join(', ')}.
Each Dubai property page also has an interactive growth simulator (this property vs keeping capital in Japan, using a live AED/JPY FX rate) and a Japan-vs-Dubai tax comparison (Japan 20.315% capital-gains tax vs Dubai 0%).`);

  // ── Services ──
  parts.push(`
# CONSULTING SERVICES`);
  for (const svc of services) {
    parts.push(`- ${svc.titleEn}: ${svc.descEn}`);
  }

  // ── JWD Differentiators ──
  parts.push(`
# WHY JWD IS UNIQUE
- Tomo's personal brand + lived Dubai experience (investing, family, daily life)
- Bilingual (Japanese & English) — rare in the market
- One-stop: property, company/visa, family office, Japan strategy — one team
- Radical transparency: real data, Tomo's own portfolio disclosed
- 5+ years Dubai operations, ¥10B+ transaction volume, 120+ families advised`);

  // ── Investment Simulator ──
  parts.push(`
# INVESTMENT SIMULATOR
Available at /simulator page. Calculates: ROI, gross/net yield, JPY conversion.
Users input: property price (AED), monthly rent (AED), annual expenses (AED).
Output: gross yield %, net yield %, price in JPY, rent in JPY.`);

  return parts.join('\n');
}
