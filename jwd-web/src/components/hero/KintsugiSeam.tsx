'use client';

import { motion } from 'framer-motion';
import { SEAM_PATH } from './seam';

/** Branch cracks splitting off the main seam — drawn after the main stroke. */
const BRANCHES = [
  'M54 37 L50 33.5 L47.5 34.5',
  'M58.5 46 L62 49 L64.5 48.2',
  'M49 59 L45.5 62.5',
  'M52.5 70 L56 73.5 L58.5 72.8',
  'M43 83 L39.5 80.5',
];

const DRAW = { duration: 1.15, ease: [0.65, 0, 0.35, 1] as const, delay: 0.25 };

export function KintsugiSeam({ reduce }: { reduce: boolean }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="kintsugi-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6d9b8" />
          <stop offset="40%" stopColor="#c9a85c" />
          <stop offset="75%" stopColor="#9a7b2d" />
          <stop offset="100%" stopColor="#c9a85c" />
        </linearGradient>
        <filter id="kintsugi-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* Glow halo */}
      <motion.path
        d={SEAM_PATH}
        fill="none"
        stroke="#c9a85c"
        strokeWidth={5}
        strokeOpacity={0.35}
        vectorEffect="non-scaling-stroke"
        filter="url(#kintsugi-glow)"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={DRAW}
      />

      {/* Main gold stroke */}
      <motion.path
        d={SEAM_PATH}
        fill="none"
        stroke="url(#kintsugi-gold)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={DRAW}
      />

      {/* Branch cracks */}
      {BRANCHES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="url(#kintsugi-gold)"
          strokeWidth={1}
          strokeOpacity={0.55}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 0.5, delay: 1.35 + i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}
