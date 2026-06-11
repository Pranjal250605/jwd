# JWD GROUP — Website Overhaul: Implementation Plan

> "The Bridge Between Japan & Dubai Real Estate and Wealth Creation"
> Base aesthetic: **Zen mode**, elevated to a flagship premium design system.
> Sources: `JWD GROUP WEBSITE_SiteMap-Structure_w-Link.pdf`, `Strategic Importance of Each Menu.pdf`, `JWD_WEBSITE Concept:SiteMap:MenuStructure.pdf`

---

## 0. Where we are vs. where we're going

| | Current (foj-app) | Target (JWD Group) |
|---|---|---|
| Positioning | Family-office concierge (FOJ), JP-only | Japan ⇄ Dubai real-estate + wealth platform, JP/EN |
| IA | 1 landing + 8 service pages | 13 top-level sections, 3 launch phases |
| Themes | 5 switchable themes (zen/formal/lux/sovereign/pavilion) | **One** definitive design system derived from zen |
| Audience | Implied UHNW Japanese | 7 personas: JP investors, HNWI, family offices, business owners, retirees, education parents, foreign investors into Japan |
| Goal | Brochure | Lead-gen machine: consultation bookings, guide downloads, trust, education, tools |

**Decision baked into this plan:** the theme switcher gets retired. Zen becomes *the* brand. (The other 4 themes' code stays in git history if we ever want to mine them.)

---

## 1. Design System — "ZEN ELEVATED" (KINTSUGI system)

The concept: **kintsugi** — Japanese craft of repairing pottery with gold seams. The gold line literally *is* the brand metaphor: a golden bridge joining two worlds (Japan ⇄ Dubai). It already exists in the zen theme (`.kintsugi-line`) — we promote it to the central visual motif: section dividers, hover states, route transitions, the hero seam.

### 1.1 Palette
| Token | Value | Role |
|---|---|---|
| `--washi` | `#faf9f5` | base canvas (from zen) |
| `--washi-deep` | `#f0ede5` | alt section bands |
| `--sumi` | `#1d211d` → `#2f342e` | ink text (darkened for contrast vs current) |
| `--gold` | `#9a7b2d` | primary accent (current `#775a19` brightened one step for AA on washi) |
| `--gold-bright` | `#c9a85c` | hover / gradients / kintsugi seams |
| `--indigo-night` | `#10182b` | "Dubai night" — inverted sections, footer, data/stat blocks |
| `--sand` | `#e8ddc8` | warm neutral fills, cards |
| `--mist` | `rgba(250,249,245,0.72)` | veils over imagery |

Light washi sections for the *Japan voice* (calm, education, trust) and deep indigo-night sections for the *Dubai voice* (data, yields, skyline, funds). The alternation itself tells the two-worlds story as you scroll.

### 1.2 Typography
- **JP display:** Shippori Mincho B1 / Zen Old Mincho (900 + 200 weights, dramatic contrast)
- **EN display:** Cormorant Garamond or (if budget allows licensing) Canela / Self Modern
- **Labels/UI:** Inter or Neue Haas-like, 9–11px, `tracking 0.3–0.5em`, uppercase
- **Numerals (yields, prices):** tabular lining figures — recommend Söhne Mono or IBM Plex Mono for the "private-bank statement" feel
- Vertical `writing-mode: vertical-rl` JP type as a recurring structural element (already in zen, keep and amplify)

### 1.3 Motion language
- **Lenis** smooth scroll + scroll-driven reveals (IntersectionObserver / Framer Motion `whileInView`)
- Kintsugi gold line that **draws itself** (SVG `stroke-dashoffset`) as sections enter
- Ken-burns drift on imagery; 700ms+ ease durations everywhere — nothing snappy, everything *placed*
- Page transitions: washi-paper wipe with a gold seam (Framer Motion `AnimatePresence`)
- Strict `prefers-reduced-motion` support

### 1.4 Texture & materials
- Keep the SVG noise grain (already in zen) at 2–3% — it's what makes flat color feel like paper
- Glassmorphism **only** on indigo-night sections (data tickers, stat cards) — frosted glass over Dubai imagery
- Thin 1px gold rules, never heavy borders; shadows extremely soft and rare

---

## 2. THE HERO — "Two Horizons" (the out-of-this-world part)

### Concept
A full-viewport cinematic split that fuses Japan and Dubai into one frame, joined by an animated kintsugi seam:

```
┌────────────────────────────────────────────────────────────┐
│  [JP zen garden / Kyoto dusk]   ╱   [Dubai skyline night]  │
│   soft washi light           ╱ gold     deep indigo        │
│                           ╱  seam                          │
│        100年先を見つめる、 ✦ 日本とドバイを繋ぐ架け橋          │
│        The Bridge Between Japan & Dubai                    │
│                                                            │
│   [ 無料相談を予約する ]   [ 投資ガイドをダウンロード ]          │
│  ────────────────────────────────────────────────────      │
│  ◉ AED/JPY 41.2 ▲   Dubai avg yield 6.9%   DXB pop +3.1%   │
└────────────────────────────────────────────────────────────┘
```

**Choreography (first 2.5s, once per session):**
1. Washi white screen, single gold line draws horizontally (calligraphy stroke)
2. Line fractures into a kintsugi seam; the two halves "crack open" revealing the two worlds — Japan side in daylight tones, Dubai side in night gold
3. The seam settles into a slow-breathing diagonal divider; both images ken-burns drift in opposite directions (parallax on scroll)
4. JP headline types in with a brush-reveal mask; EN subline fades under it
5. Live data strip (glass, bottom edge) slides up: AED/JPY rate (live API), Dubai rental yield, one rotating market stat — *this is the instant credibility signal*

**Build tiers:**
- **Tier 1 (launch):** layered `<video>`/AVIF imagery + Framer Motion + SVG seam + CSS masks. 60fps on mid phones, ~2 weeks incl. art direction. **Recommended.**
- **Tier 2 (enhancement):** React-Three-Fiber shader plane — ink-in-water dissolve between the two worlds driven by scroll, gold particles along the seam. Ship behind a capability check (`navigator.hardwareConcurrency`, reduced-motion, mobile fallback to Tier 1).
- Mobile: vertical split (Japan top / Dubai bottom), seam runs diagonally across, same data strip.

**Asset needs:** 2 hero-grade clips or stills (Kyoto/zen garden dusk; Dubai Marina or Heart of Europe aerial night). Licensed 4K stock or client drone footage — see "Missing info" §8.

---

## 3. Information Architecture & Routing

```
/                       Home
/about                  About JWD (+ Tomo Kawana profile anchor)
/why-dubai              Why Dubai (stats, tax, visa, Golden Visa guide)
/dubai-properties       Property search + Bayut/PropertyFinder integration
/heart-of-europe        FLAGSHIP landing page (The World Islands + HoE)
/funds                  Investment Funds (Equiti, AIX, governance, risk)
/japan-properties       Japan Properties (Phase 3)
/family-office          Family Office (Phase 3 — reuse current FOJ content!)
/simulator              Investment Simulator (4 calculators + trends)
/knowledge              Knowledge Center (articles, videos, reports)
/stories                Tomo's Stories
/consulting             Consulting Services (5 service lines)
/contact                Contact (booking, WhatsApp, LINE, Zoom)
```

- **Nav:** 13 items don't fit a navbar. Primary nav = 6 items (Home, Why Dubai, Properties, Heart of Europe, Simulator, Contact) + a full-screen **menu overlay** (washi takeover, vertical JP type, gold seam dividers) holding all 13 — the overlay itself becomes a design moment.
- Persistent slim CTA bar (mobile: floating pill): 無料相談 / WhatsApp / LINE.
- The current 8 FOJ service pages (`servicePages.ts` — company formation, visas, banking, tax…) map almost 1:1 into **/consulting** and **/family-office**. We migrate, not discard.

---

## 4. Tech Stack & Architecture

**Keep:** Vite + React 18 + TS + Tailwind + react-router-dom 7 (already v7 ✓).

**Add:**
| Package | Why |
|---|---|
| `framer-motion` | hero choreography, page transitions, scroll reveals |
| `lenis` | smooth scroll |
| `react-i18next` + `i18next` | JA primary / EN secondary from day one (retrofit is 3× the cost) |
| `recharts` | trend graphs, calculator outputs, stat viz |
| `react-hook-form` + `zod` | lead forms, validated |
| `@react-three/fiber` + `drei` | hero Tier 2 only, lazy-loaded chunk |

**Content layer:** start with typed TS/MDX content modules (extends the existing `data/*.ts` pattern the codebase already uses); design the interfaces so a headless CMS (Sanity/Storyblok) can replace the source in Phase 2 without component changes. Articles/market reports = MDX at launch.

**SEO reality check:** pure Vite SPA = weak SEO, and this site *lives* on search ("ドバイ不動産 投資" etc.). Two options:
- **A (recommended): migrate shell to Next.js (App Router)** during the overhaul — SSG for content pages, ISR for news/reports. The components we build are framework-agnostic React either way; doing it now costs ~3 dev-days, doing it later costs weeks.
- B: stay Vite + `vite-react-ssg` + prerender. Cheaper, weaker (no ISR, clunkier i18n routing).
→ **Needs a decision before Sprint 1** (flagged in §8).

**Structure:**
```
src/
  design/        tokens.ts, motion presets, Kintsugi primitives (Seam, Rule, Grain)
  components/    ui/ (Button, Card, Stat, GlassStrip…) + sections/ per page
  features/      simulator/, property-search/, booking/, i18n/
  content/       {page}.ja.ts / .en.ts, articles/*.mdx
  pages|app/     routes
```

---

## 5. Integrations — what's actually possible

| Integration | Reality | Approach |
|---|---|---|
| **Bayut** | ❌ No public API | Phase 1: curated outbound deep-links on listing cards ("View on Bayut ↗"). Phase 2: apply for partner/agency feed access (client may already have an agency account — §8) |
| **Property Finder** | ❌ No public API (agent portal only) | Same as Bayut. *Never scrape — TOS + fragile.* |
| Property listings (own) | — | Manual curated listings in CMS/TS modules with photos, price, yield — this is the premium move anyway: *curation over volume* |
| **Equiti / AIX funds** | Info pages + outbound | Content + disclaimers; no embedding needed Phase 2 |
| **FX rate (JPY⇄AED)** | ✅ Easy | exchangerate.host (free) or Open Exchange Rates; cache 1h; drives hero ticker + currency calculator |
| Dubai market stats | DXB Interact / DLD publish data | Phase 1: editor-curated quarterly numbers. Phase 2: evaluate API |
| **Booking** | Calendly (Zoom-native) or Cal.com | Embed on /contact + slide-over from any CTA |
| **WhatsApp** | ✅ `wa.me/<number>` deep link | Floating action + contact |
| **LINE** | ✅ LINE Official Account `lin.ee` link + QR | JP audience expects this — QR prominently on /contact |
| Investment Guide PDF | Lead magnet | Gate behind email form → CRM/email tool (§8) |
| Videos | YouTube embeds (lite-youtube) | Tomo Talks, site tours |

---

## 6. Page-by-page build spec (Phase 1 pages)

### 6.1 Home
1. **Hero "Two Horizons"** (§2)
2. **Trust bar** — 4 glass stats on indigo: years in Dubai, transaction volume, families advised, JP×UAE licensed (numbers from client — §8)
3. **Latest Properties** — horizontal scroll-snap rail of 4–6 curated cards (image, area, price AED+¥, yield badge, Bayut/PF link)
4. **Why JWD** — split: Tomo portrait + kintsugi-underlined 3 pillars (Personal brand / Cross-border / Family office)
5. **Featured: Heart of Europe** — full-bleed indigo cinematic band → /heart-of-europe
6. **Market News** — two-column JP/Dubai news (the two-worlds motif again), MDX-fed
7. **Education teaser** — 3 Knowledge Center cards + simulator CTA ("シミュレーターで試算する")
8. **Closing CTA** — washi, centered, calligraphic: book consultation / download guide

### 6.2 Why Dubai
Scrollytelling page: sticky left rail of animated counters (0% income tax → counts down from 45%; yield 6–8% vs Tokyo 3–4%; population curve), narrative right. Golden Visa interactive checker (3 questions → eligibility hint → consultation CTA). This page is the **education engine** — objective ③.

### 6.3 Dubai Properties
Filter bar (Area / Budget / Type / Yield / Developer) over curated listing grid; each card: gallery, AED + ¥ dual pricing (live FX), yield badge, "Simulate this property →" (pre-fills simulator — the killer cross-link), Bayut/PF outbound links.

### 6.4 Heart of Europe — flagship
Most cinematic page after Home: full-bleed aerial opener with slow zoom, "What is The World?" with animated map/islands SVG, property types (Hotels/Villas/Residences) as a horizontal cinematic rail, returns & appreciation data blocks, **Tomo's personal experience** (first-person, portrait-led — the trust weapon), videos, FAQ accordion.

### 6.5 About JWD / 6.6 Contact
About: company story timeline (kintsugi seam = the timeline itself), mission/vision bilingual lockups, leadership, deep Tomo profile.
Contact: booking embed, WhatsApp/LINE/Zoom, JP-polite form (react-hook-form + zod), office info.

---

## 7. Phasing & sprints (mirrors the strategy PDF)

### Phase 1 — 30 days: foundation + 6 pages
| Sprint | Deliverable |
|---|---|
| 1 (wk 1) | Framework decision (§4), design tokens, typography, Kintsugi primitives, nav + menu overlay, footer, i18n scaffold, Lenis+Motion setup |
| 2 (wk 2) | **Hero Tier 1** + Home top half; FX ticker live |
| 3 (wk 3) | Home complete; Why Dubai; About |
| 4 (wk 4) | Dubai Properties (curated + outbound links); Heart of Europe; Contact + booking/WhatsApp/LINE; QA, Lighthouse ≥90, launch |

### Phase 2 — 60 days
Investment Simulator (4 calculators + trend graphs — recharts, URL-shareable state, "send results to consultation" lead hook), Knowledge Center (MDX articles, videos, monthly reports), Investment Funds, hero Tier 2 (R3F) if Phase 1 metrics are healthy.

### Phase 3 — 90–120 days
Family Office (migrate + elevate existing FOJ content), Japan Properties, Tomo's Stories, Consulting Services detail pages, AI Property Advisor (Claude-backed chat: "¥1億あります。ドバイで何を買うべき？" — needs separate scoping), property matching engine, B2B subscription area (¥30–50k/mo for JP agencies — separate auth'd product, scope later).

**Definition of done, every page:** JA+EN · responsive 360→1920 · reduced-motion · LCP < 2.5s · CLS < 0.1 · semantic HTML + meta/OG/JSON-LD · forms tracked.

---

## 8. ⚠️ MISSING INFORMATION — what I need from you/client

**Blocking Phase 1:**
1. **Brand assets** — Is there a JWD Group logo? (Repo only has FOJ-era `jwdlogo.png`.) Brand guidelines? Or do we design the logotype as part of this?
2. **Languages** — JA only at launch, or JA+EN? (Changes routing/content volume ~2×. Plan assumes both, JA primary.)
3. **Tomo Kawana content** — bio, professional portrait photography, track record numbers he'll publicly stand behind, his personal HoE investment story, existing videos?
4. **Trust-bar numbers** — transaction volume, families advised, years, licenses. Real numbers only.
5. **Property data** — Does JWD have an agency account with Bayut/Property Finder (feed access?) or do we launch with curated manual listings + outbound links? How many launch listings, who supplies photos/specs?
6. **Hero media** — budget for licensed 4K footage, or does the client have Dubai/HoE drone footage? (This single asset decides how "out of this world" the hero feels.)
7. **Framework go/no-go** — my strong recommendation: migrate to Next.js now for SEO (§4). Need a yes/no.
8. **Domain & hosting** — final domain (jwd-group.com? .ae? .jp?), stays on Vercel?
9. **Contact endpoints** — WhatsApp business number, LINE official account ID, Zoom/Calendly account, destination email/CRM for leads.
10. **Investment Guide PDF** — exists, or are we producing it? (It's the #2 CTA.)

**Needed during Phase 1–2:**
11. Copywriting ownership — who writes JA copy? (Tone: 丁寧語 vs 敬語 matters for HNWI.) Who translates EN?
12. **Compliance/legal** — fund pages (Equiti/AIX) describe financial products: what disclaimers has counsel approved? Any DFSA/JP FSA constraints on yield claims? Privacy policy / 特定商取引法 page?
13. Relationship with Equiti & AIX — partner, introducer, or just informational links? (Changes what we may legally say.)
14. Market data source for "real transaction data, price history" trust content — DLD/DXB Interact, paid feed, or editor-curated?
15. News strategy — who curates Dubai/Japan market news, how often?
16. Success stories/case studies — real client stories with publication consent?
17. Analytics & marketing stack — GA4? Meta/Google ads pixels? Email tool for the guide download (Mailchimp/Brevo)?
18. The current FOJ site — does it stay live anywhere (subdomain?) or is this a full replacement at the same domain?
19. Photography of the team/office for About.
20. AI Property Advisor — appetite/budget for Phase 3 LLM feature (API costs, JP-language quality bar)?

---

## 9. Risks
| Risk | Mitigation |
|---|---|
| No Bayut/PF API | Outbound links + curation framed as a *feature* ("厳選物件のみ"); pursue partner feed in parallel |
| Heavy media kills mobile perf | AVIF/WebP, `<video>` poster + lazy, Tier-2 hero capability-gated; perf budget: hero ≤ 2.5 MB total |
| 13 sections balloon scope | Hard phase gates from the strategy PDF; Phase 1 = 6 pages, nothing else |
| Financial-content compliance | Legal review before /funds publishes; yield figures always sourced & dated |
| JP typography on web | Use `font-feature-settings: "palt"`, subset JP fonts (e.g. via Google Fonts JP subsets), test 約物 line-breaking (`word-break: auto-phrase` where supported) |
```
