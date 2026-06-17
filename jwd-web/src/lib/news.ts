import { home, type NewsItem } from '@/content/home';

export interface NewsEntry extends NewsItem {
  market: 'dubai' | 'japan';
}

/**
 * News source of truth.
 *
 * LIVE: if NEWS_SHEET_CSV_URL is set (a Google Sheet "Publish to web → CSV"
 * link), the news is read from that sheet and refreshed hourly via ISR — the
 * JWD team just edits the spreadsheet; no redeploy needed.
 * Sheet columns (row 1 = headers): date, market, tag_en, tag_ja, title_en,
 * title_ja, href.  date format: YYYY.MM.DD ; market: dubai | japan.
 *
 * FALLBACK: the curated entries in src/content/home.ts (used locally / if the
 * sheet is unset or unreachable). See NEWS_SETUP.md for the 2-minute setup.
 */
const SHEET_URL = process.env.NEWS_SHEET_CSV_URL;
const REVALIDATE = 3600; // re-read the sheet at most once an hour

export async function getNews(): Promise<NewsEntry[]> {
  if (SHEET_URL) {
    try {
      const res = await fetch(SHEET_URL, { next: { revalidate: REVALIDATE } });
      if (res.ok) {
        const entries = rowsToEntries(parseCSV(await res.text()));
        if (entries.length) return entries.sort(byDateDesc);
      }
    } catch {
      // fall through to curated data
    }
  }
  return curated().sort(byDateDesc);
}

const byDateDesc = (a: NewsEntry, b: NewsEntry) => b.date.localeCompare(a.date);

function curated(): NewsEntry[] {
  const dubai = home.dubaiNews.items.map((n) => ({ ...n, market: 'dubai' as const }));
  const japan = home.japanNews.items.map((n) => ({ ...n, market: 'japan' as const }));
  return [...dubai, ...japan];
}

/** Minimal RFC-4180 CSV parser (handles quoted fields with commas/newlines). */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch !== '\r') field += ch;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function rowsToEntries(rows: string[][]): NewsEntry[] {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const c = {
    date: col('date'),
    market: col('market'),
    tagEn: col('tag_en'),
    tagJa: col('tag_ja'),
    titleEn: col('title_en'),
    titleJa: col('title_ja'),
    href: col('href'),
  };
  const get = (row: string[], i: number) => (i >= 0 ? (row[i] ?? '').trim() : '');

  const out: NewsEntry[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const date = get(row, c.date);
    const titleEn = get(row, c.titleEn);
    const titleJa = get(row, c.titleJa);
    if (!date || (!titleEn && !titleJa)) continue;
    const m = get(row, c.market).toLowerCase();
    const market: 'dubai' | 'japan' = m.includes('japan') || m.includes('日本') ? 'japan' : 'dubai';
    out.push({
      date,
      market,
      tag: { en: get(row, c.tagEn) || 'News', ja: get(row, c.tagJa) || 'ニュース' },
      title: { en: titleEn || titleJa, ja: titleJa || titleEn },
      href: get(row, c.href) || '/news',
    });
  }
  return out;
}
