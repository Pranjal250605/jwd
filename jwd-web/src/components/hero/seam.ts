/**
 * The kintsugi seam — single source of truth for the diagonal fracture
 * that splits the hero into the Japan (washi) and Dubai (night) worlds.
 * Coordinates are in a 0–100 viewBox space, jittered like a ceramic crack.
 */
export const SEAM_POINTS: ReadonlyArray<readonly [number, number]> = [
  [62, 0],
  [58.5, 13],
  [63, 21],
  [54, 37],
  [58.5, 46],
  [49, 59],
  [52.5, 70],
  [43, 83],
  [46.5, 91],
  [38, 100],
];

/** SVG path along the seam (viewBox 0 0 100 100, preserveAspectRatio="none"). */
export const SEAM_PATH = SEAM_POINTS.map(
  ([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`,
).join(' ');

/** clip-path polygon for the night (Dubai) side: right of the seam. */
export const NIGHT_CLIP = `polygon(${[
  '62% 0%',
  '100% 0%',
  '100% 100%',
  '38% 100%',
  // back up along the seam
  ...[...SEAM_POINTS]
    .reverse()
    .slice(1, -1)
    .map(([x, y]) => `${x}% ${y}%`),
].join(', ')})`;

/** Linear interpolation of a point at t ∈ [0,1] along the seam. */
export function seamPointAt(t: number): [number, number] {
  const segs = SEAM_POINTS.length - 1;
  const f = Math.min(t, 0.9999) * segs;
  const i = Math.floor(f);
  const local = f - i;
  const [x1, y1] = SEAM_POINTS[i];
  const [x2, y2] = SEAM_POINTS[i + 1];
  return [x1 + (x2 - x1) * local, y1 + (y2 - y1) * local];
}

/** Deterministic PRNG (mulberry32) — identical output on server & client. */
export function seededRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
