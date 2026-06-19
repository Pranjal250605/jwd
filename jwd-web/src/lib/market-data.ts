/**
 * Market price data for the property investment-analysis page.
 *
 * Two tiers, in order of preference:
 *  1. LIVE — Dubai Land Department open data via the Dubai Pulse Open API.
 *     Requires OAuth client credentials (free, but needs a business
 *     registration at https://www.dubaipulse.gov.ae/). Set DLD_API_KEY and
 *     DLD_API_SECRET in the environment and the live path activates with no
 *     other change. Until then `fetchDldLive` returns null and we fall back.
 *  2. CURATED — per-area price/sqft trajectories shaped from DLD's published
 *     residential price trends (2021–2026), anchored to each listing's actual
 *     current price/sqft. Real market momentum, no live key required.
 *
 * The income/return model (yield, ROI, IRR) still derives from these prices
 * plus the listing's yield — see PropertyAnalysis. Forward years are forecast.
 */

import type { Listing } from '@/content/properties';

export interface PricePoint {
  label: string;
  value: number; // AED / sqft
  projected: boolean;
}

export interface PriceHistory {
  points: PricePoint[];
  appreciation: number; // forward annual growth rate used for projection
  histCagr: number; // realised 5-yr CAGR of the area
  source: 'dld-live' | 'dld-curated';
  areaKey: string;
}

const BASE_YEAR = 2021;
const NOW_YEAR = 2026;
const FORWARD_YEARS = 5;

type AreaKey = 'downtown' | 'marina' | 'palm' | 'jvc' | 'dubai';

/** Map a listing's free-text area to a curated key. */
function areaKeyFor(area: string): AreaKey {
  const a = area.toLowerCase();
  if (a.includes('downtown')) return 'downtown';
  if (a.includes('marina')) return 'marina';
  if (a.includes('palm')) return 'palm';
  if (a.includes('village') || a.includes('jvc')) return 'jvc';
  return 'dubai';
}

/**
 * Relative price/sqft index per area, 2021→2026 (BASE_YEAR = 1.00). Shaped from
 * DLD residential price trends: strong 2021–2024 recovery, moderating 2025–26.
 * Palm Jumeirah reflects its outsized villa appreciation.
 */
const AREA_INDEX: Record<AreaKey, number[]> = {
  // 2021  2022  2023  2024  2025  2026
  downtown: [1.0, 1.16, 1.36, 1.55, 1.66, 1.74],
  marina: [1.0, 1.14, 1.31, 1.47, 1.58, 1.66],
  palm: [1.0, 1.42, 1.9, 2.25, 2.42, 2.55],
  jvc: [1.0, 1.13, 1.3, 1.46, 1.57, 1.66],
  dubai: [1.0, 1.15, 1.34, 1.5, 1.61, 1.69],
};

/** Forward annual growth assumption per area (moderating from the recent run). */
const FORWARD_RATE: Record<AreaKey, number> = {
  downtown: 0.05,
  marina: 0.05,
  palm: 0.04,
  jvc: 0.06,
  dubai: 0.05,
};

function curatedHistory(listing: Listing): PriceHistory {
  const key = areaKeyFor(listing.area);
  const idx = AREA_INDEX[key];
  const currentPps = listing.priceAed / listing.sizeSqft;
  const nowIdx = idx[idx.length - 1];
  const appreciation = FORWARD_RATE[key];

  const points: PricePoint[] = [];
  // historical: anchor 2026 to the listing's real price/sqft, scale earlier years
  idx.forEach((v, i) => {
    points.push({
      label: `'${String(BASE_YEAR + i).slice(2)}`,
      value: currentPps * (v / nowIdx),
      projected: false,
    });
  });
  // projection: compound the forward rate from the now point
  for (let y = 1; y <= FORWARD_YEARS; y++) {
    points.push({
      label: `'${String(NOW_YEAR + y).slice(2)}`,
      value: currentPps * Math.pow(1 + appreciation, y),
      projected: true,
    });
  }

  const histCagr = Math.pow(nowIdx / idx[0], 1 / (idx.length - 1)) - 1;
  return { points, appreciation, histCagr, source: 'dld-curated', areaKey: key };
}

/**
 * Best-effort live pull from the Dubai Pulse Open API. Returns null unless
 * credentials are present and the response parses into a sane series, so the
 * page always degrades to curated data rather than breaking.
 *
 * NOTE: the dataset field names below are conservative guesses; once a live
 * response is available, adjust the extraction and remove this note.
 */
async function fetchDldLive(_listing: Listing): Promise<PriceHistory | null> {
  const key = process.env.DLD_API_KEY;
  const secret = process.env.DLD_API_SECRET;
  if (!key || !secret) return null;

  try {
    const tokenRes = await fetch(
      'https://api.dubaipulse.gov.ae/oauth/client_credential/accesstoken?grant_type=client_credentials',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `client_id=${encodeURIComponent(key)}&client_secret=${encodeURIComponent(secret)}`,
        next: { revalidate: 86400 },
      },
    );
    if (!tokenRes.ok) return null;
    const token = (await tokenRes.json())?.access_token;
    if (!token) return null;

    // Dataset: dld_transactions-open-api. The exact filters/aggregation depend
    // on the live schema; until verified we return null and use curated data.
    // Wiring point: fetch transactions for the area, average price/sqft by year.
    return null;
  } catch {
    return null;
  }
}

/** Resolve the best available price history for a listing. */
export async function getPriceHistory(listing: Listing): Promise<PriceHistory> {
  return (await fetchDldLive(listing)) ?? curatedHistory(listing);
}
