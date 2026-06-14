/**
 * Bilingual, block-based content model that drives every section hub and
 * subsection page for sections 1–6 of the JWD sitemap.
 *
 * Leaves are `L` (a { ja, en } pair). Blocks are plain JSON-serializable
 * objects so the whole tree can cross the server→client boundary untouched;
 * the client renderer resolves the active locale at the leaf.
 */

/** A localized string pair. */
export type L = { ja: string; en: string };

/** Surface palette a block renders on — keeps the two-worlds scroll rhythm. */
export type Tone = 'light' | 'deep' | 'dark';

export interface StatItem {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: L;
}

export type Block =
  | { kind: 'lead'; tone?: Tone; text: L }
  | { kind: 'prose'; tone?: Tone; kicker?: L; heading?: L; body: L[] }
  | { kind: 'stats'; tone?: Tone; kicker?: L; heading?: L; items: StatItem[] }
  | {
      kind: 'points';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      numbered?: boolean;
      items: { title: L; text: L }[];
    }
  | {
      kind: 'cards';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: { title: L; text: L; meta?: L }[];
    }
  | { kind: 'quote'; tone?: Tone; text: L; by?: L; role?: L }
  | {
      kind: 'steps';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: { title: L; text: L }[];
    }
  | { kind: 'callout'; tone?: Tone; title: L; text: L }
  | {
      kind: 'links';
      tone?: Tone;
      heading?: L;
      note?: L;
      items: { label: L; url: string }[];
    }
  | {
      kind: 'faq';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: { q: L; a: L }[];
    }
  | {
      kind: 'gallery';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: { title: L; meta: L }[];
    };

export interface Subsection {
  slug: string;
  label: L;
  title: L;
  tagline: L;
  image: string;
  blocks: Block[];
}

export interface Section {
  /** route segment, e.g. "about" */
  slug: string;
  /** key into the `nav` message namespace */
  navKey: string;
  /** 1-based sitemap order */
  order: number;
  image: string;
  intro: L;
  /** one-line hub overview shown under the hub heading */
  blurb: L;
  subsections: Subsection[];
}
