import { home, type NewsItem } from '@/content/home';

export interface NewsEntry extends NewsItem {
  market: 'dubai' | 'japan';
}

/**
 * Single source of truth for market news.
 *
 * TODAY: returns curated entries the JWD team controls (in src/content/home.ts).
 *
 * TO MAKE IT LIVE — replace the body with a fetch to your source (a CMS like
 * Sanity/Contentful, a Google-Sheet/Airtable endpoint, an RSS feed, or a news
 * API), using Next.js ISR so it refreshes automatically without a redeploy:
 *
 *   const res = await fetch(process.env.NEWS_FEED_URL!, {
 *     next: { revalidate: 3600 },   // re-fetch at most once an hour
 *   });
 *   const raw = await res.json();
 *   return raw.map(normalise);      // map the feed into NewsEntry[]
 *
 * Because this is an async server function, any page that calls `await getNews()`
 * is automatically re-generated on the revalidate interval. Curation is
 * recommended for a premium brand (don't surface random off-brand headlines) —
 * a lightweight CMS the team edits is the cleanest "always latest" source.
 */
export async function getNews(): Promise<NewsEntry[]> {
  const dubai = home.dubaiNews.items.map((n) => ({ ...n, market: 'dubai' as const }));
  const japan = home.japanNews.items.map((n) => ({ ...n, market: 'japan' as const }));
  return [...dubai, ...japan].sort((a, b) => b.date.localeCompare(a.date));
}
