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
    // brand ocean blue
    accent: '#007ec4',
    accentBright: '#00b0e1',
    accentSoft: 'rgba(0,126,196,0.10)',
    ribbon: ['#89d5ff', '#aedfef', '#66c8ff', '#00b0e1', '#0089d6', '#00d3f1', '#9ddbeb', '#007ec4', '#bfe6f5'],
    motif: 'enso',
  },
  'why-dubai': {
    // bright cyan register
    accent: '#0093c4',
    accentBright: '#00d3f1',
    accentSoft: 'rgba(0,147,196,0.10)',
    ribbon: ['#42e7ff', '#00d3f1', '#89f0ff', '#00bbd6', '#bff6ff', '#00daf9'],
    motif: 'lattice',
  },
  'dubai-properties': {
    // architect steel blue, tuned cooler
    accent: '#4a6d9c',
    accentBright: '#9fb9dd',
    accentSoft: 'rgba(74,109,156,0.10)',
    ribbon: ['#9fb9dd', '#4a6d9c', '#c3d4ea', '#6d8fc0', '#b8cce5', '#5d7eab'],
    motif: 'blueprint',
  },
  'heart-of-europe': {
    // blue-teal register
    accent: '#1d7795',
    accentBright: '#61c0df',
    accentSoft: 'rgba(29,119,149,0.10)',
    ribbon: ['#61c0df', '#1d7795', '#9ddbeb', '#29a7d0', '#cfeaf5', '#43b4d9'],
    motif: 'ripples',
  },
  funds: {
    // deep royal navy register
    accent: '#0042b2',
    accentBright: '#669fff',
    accentSoft: 'rgba(0,66,178,0.08)',
    ribbon: ['#669fff', '#0042b2', '#a9c8ff', '#1e72ff', '#d6e6ff', '#4289ff'],
    motif: 'mesh',
  },
};

export const DEFAULT_THEME: SectionTheme = SECTION_THEMES.about;

export function getTheme(slug: string): SectionTheme {
  return SECTION_THEMES[slug] ?? DEFAULT_THEME;
}
