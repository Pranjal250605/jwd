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
    // brand turquoise
    accent: '#0097a7',
    accentBright: '#00c4cc',
    accentSoft: 'rgba(0,151,167,0.10)',
    ribbon: ['#7fe7e0', '#b5ece7', '#4fd8d5', '#00c4cc', '#00a3ad', '#2ee6d6', '#9fe3de', '#0097a7', '#c4f1ec'],
    motif: 'enso',
  },
  'why-dubai': {
    // bright aqua register
    accent: '#00a5a5',
    accentBright: '#40e0d0',
    accentSoft: 'rgba(0,165,165,0.10)',
    ribbon: ['#40e0d0', '#2ee6d6', '#8ff0e8', '#00c9c0', '#c9f7f0', '#00d6ca'],
    motif: 'lattice',
  },
  'dubai-properties': {
    // architect steel teal
    accent: '#4a8a94',
    accentBright: '#9fd0d6',
    accentSoft: 'rgba(74,138,148,0.10)',
    ribbon: ['#9fd0d6', '#4a8a94', '#c3e2e6', '#6dabb4', '#b8dade', '#5d9aa3'],
    motif: 'blueprint',
  },
  'heart-of-europe': {
    // lagoon register
    accent: '#177f80',
    accentBright: '#61d5cf',
    accentSoft: 'rgba(23,127,128,0.10)',
    ribbon: ['#61d5cf', '#177f80', '#9de6e0', '#29b3ad', '#cff2ee', '#43c4bc'],
    motif: 'ripples',
  },
  funds: {
    // deep sea teal register
    accent: '#006d77',
    accentBright: '#5fd3c8',
    accentSoft: 'rgba(0,109,119,0.08)',
    ribbon: ['#5fd3c8', '#006d77', '#a9e8e0', '#1ea5a0', '#d6f4f0', '#42bdb4'],
    motif: 'mesh',
  },
};

export const DEFAULT_THEME: SectionTheme = SECTION_THEMES.about;

export function getTheme(slug: string): SectionTheme {
  return SECTION_THEMES[slug] ?? DEFAULT_THEME;
}
