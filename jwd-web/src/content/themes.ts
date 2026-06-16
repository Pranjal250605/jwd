/**
 * Per-section visual identity. Each sitemap section keeps the washi + sumi
 * base but gets its own muted jewel accent and a signature abstract motif, so
 * it reads as its own place rather than one endless template.
 *
 *   about           · heritage gold   · ensō ink rings
 *   why-dubai       · desert amber    · Islamic geometric lattice
 *   dubai-properties· architect steel · blueprint grid
 *   heart-of-europe · ocean teal      · water ripples + islands
 *   funds           · finance indigo  · flowing line mesh
 */
export type MotifKey = 'enso' | 'lattice' | 'blueprint' | 'ripples' | 'mesh';

export interface SectionTheme {
  /** mid-tone accent — for kickers, rules, icons on light surfaces */
  accent: string;
  /** brighter accent — same hue, legible on the sumi-ink (dark) surfaces */
  accentBright: string;
  /** very soft tint — for chips, glows, motif fills */
  accentSoft: string;
  /** silk-ribbon palette for this section's hero — tints the whole gradient */
  ribbon: string[];
  motif: MotifKey;
}

export const SECTION_THEMES: Record<string, SectionTheme> = {
  about: {
    accent: '#9a7b2d',
    accentBright: '#c9a85c',
    accentSoft: 'rgba(154,123,45,0.10)',
    // the colourful "home" abstract now lives on About JWD
    ribbon: ['#bcc8ec', '#d7bfe4', '#e6a98f', '#e8a14e', '#d99a2e', '#c9a85c', '#e6d9b8', '#9a7b2d', '#cdbfe0'],
    motif: 'enso',
  },
  'why-dubai': {
    accent: '#b07b2e',
    accentBright: '#e0b15e',
    accentSoft: 'rgba(176,123,46,0.10)',
    ribbon: ['#e0b15e', '#d99a2e', '#e8c98a', '#b07b2e', '#f0d6a0', '#caa45a'],
    motif: 'lattice',
  },
  'dubai-properties': {
    accent: '#5d6f8a',
    accentBright: '#9fb1cd',
    accentSoft: 'rgba(93,111,138,0.10)',
    ribbon: ['#9fb1cd', '#5d6f8a', '#c3cee0', '#7d8fb0', '#b8c6dd', '#6d7e98'],
    motif: 'blueprint',
  },
  'heart-of-europe': {
    accent: '#2f7d80',
    accentBright: '#74bcbe',
    accentSoft: 'rgba(47,125,128,0.10)',
    ribbon: ['#74bcbe', '#2f7d80', '#a6d8d6', '#4a9a9c', '#cfe8e4', '#5aa6a2'],
    motif: 'ripples',
  },
  funds: {
    accent: '#645a92',
    accentBright: '#a79ed3',
    accentSoft: 'rgba(100,90,146,0.10)',
    ribbon: ['#a79ed3', '#645a92', '#c4bce6', '#7d72ad', '#d6cfee', '#8b80bd'],
    motif: 'mesh',
  },
};

export const DEFAULT_THEME: SectionTheme = SECTION_THEMES.about;

export function getTheme(slug: string): SectionTheme {
  return SECTION_THEMES[slug] ?? DEFAULT_THEME;
}
