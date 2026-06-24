/**
 * Live foreign-exchange rates for the property wealth tools.
 *
 * Real-time *property* prices have no free open feed (see market-data.ts), but
 * real-time *FX* does — and FX is the lever the Japan↔Dubai story turns on
 * (yen weakness amplifies a Japanese investor's Dubai returns). We pull a live
 * rate, cached with ISR, and fall back gracefully so the page never breaks.
 *
 * AED is pegged to USD at 3.6725, so we can derive AED→JPY from USD→JPY.
 */

export interface FxRate {
  aedJpy: number;
  usdJpy: number;
  source: string;
  asOf: string;
  live: boolean;
}

const AED_PER_USD = 3.6725; // UAE dirham's hard peg to the US dollar
const REVALIDATE = 3600; // refresh hourly

export async function getFxRate(): Promise<FxRate> {
  // primary — Frankfurter (ECB reference rates, free, no key): USD→JPY
  try {
    const r = await fetch('https://api.frankfurter.app/latest?from=USD&to=JPY', {
      next: { revalidate: REVALIDATE },
    });
    if (r.ok) {
      const j = await r.json();
      const usdJpy = j?.rates?.JPY;
      if (typeof usdJpy === 'number' && usdJpy > 0) {
        return { usdJpy, aedJpy: usdJpy / AED_PER_USD, source: 'ECB · Frankfurter', asOf: j.date ?? '', live: true };
      }
    }
  } catch {
    /* fall through */
  }

  // fallback — open.er-api.com (free, no key): AED base directly
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/AED', { next: { revalidate: REVALIDATE } });
    if (r.ok) {
      const j = await r.json();
      const aedJpy = j?.rates?.JPY;
      if (typeof aedJpy === 'number' && aedJpy > 0) {
        const asOf = (j.time_last_update_utc ?? '').slice(0, 16);
        return { aedJpy, usdJpy: aedJpy * AED_PER_USD, source: 'er-api', asOf, live: true };
      }
    }
  } catch {
    /* fall through */
  }

  // static fallback — keeps the tools usable offline / if both feeds are down
  return { aedJpy: 41, usdJpy: 150.6, source: 'fallback', asOf: '', live: false };
}
