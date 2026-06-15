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

/** Lucide icon key (see ICONS map in Blocks.tsx). */
export type IconKey = string;

export interface StatItem {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: L;
}

/** Code-drawn, animated data visualisations. */
export type ChartSpec =
  | { type: 'bars'; unit?: string; items: { label: L; value: number; highlight?: boolean }[] }
  | { type: 'line'; unit?: string; points: { label: L; value: number }[] }
  | { type: 'donut'; items: { label: L; value: number }[] };

export type Block =
  | { kind: 'lead'; tone?: Tone; text: L; sidenote?: L }
  | { kind: 'prose'; tone?: Tone; kicker?: L; heading?: L; body: L[] }
  | {
      kind: 'split';
      tone?: Tone;
      reverse?: boolean;
      image: string;
      imageAlt?: L;
      kicker?: L;
      heading?: L;
      body: L[];
      bullets?: L[];
    }
  | { kind: 'stats'; tone?: Tone; kicker?: L; heading?: L; items: StatItem[] }
  | { kind: 'chart'; tone?: Tone; kicker?: L; heading?: L; chart: ChartSpec; note?: L }
  | {
      kind: 'points';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      numbered?: boolean;
      items: { title: L; text: L; icon?: IconKey }[];
    }
  | {
      kind: 'cards';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: { title: L; text: L; meta?: L; icon?: IconKey }[];
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
      kind: 'tabs';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: {
        tab: L;
        title: L;
        text: L;
        bullets?: L[];
        icon?: IconKey;
        metric?: { value: string; label: L };
      }[];
    }
  | {
      kind: 'calculator';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      note?: L;
    }
  | {
      kind: 'compare';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      left: L;
      right: L;
      rows: { label: L; left: L; right: L }[];
    }
  | {
      kind: 'faq';
      tone?: Tone;
      kicker?: L;
      heading?: L;
      items: { q: L; a: L }[];
    }
  | {
      kind: 'testimonial';
      tone?: Tone;
      quote: L;
      name: L;
      role: L;
      result?: L;
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
