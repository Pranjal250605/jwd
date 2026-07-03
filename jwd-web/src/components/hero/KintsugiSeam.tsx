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
          <stop offset="0%" stopColor="#aedfef" />
          <stop offset="40%" stopColor="#00b0e1" />
          <stop offset="75%" stopColor="#007ec4" />
          <stop offset="100%" stopColor="#00b0e1" />
        </linearGradient>
        <filter id="kintsugi-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* Light bleeding through the crack — flash at the moment of opening */}
      <motion.path
        d={SEAM_PATH}
        fill="none"
        stroke="#aedfef"
        strokeWidth={26}
        vectorEffect="non-scaling-stroke"
        filter="url(#kintsugi-glow)"
        initial={reduce ? { strokeOpacity: 0 } : { strokeOpacity: 0 }}
        animate={
          reduce
            ? { strokeOpacity: 0 }
            : { strokeOpacity: [0, 0.85, 0.12] }
        }
        transition={{ duration: 1.4, delay: 1.05, times: [0, 0.45, 1], ease: 'easeInOut' }}
      />

      {/* Breathing glow — the seam stays alive */}
      <motion.path
        d={SEAM_PATH}
        fill="none"
        stroke="#00b0e1"
        strokeWidth={9}
        vectorEffect="non-scaling-stroke"
        filter="url(#kintsugi-glow)"
        initial={{ strokeOpacity: reduce ? 0.25 : 0 }}
        animate={
          reduce
            ? { strokeOpacity: 0.25 }
            : { strokeOpacity: [0.16, 0.38, 0.16] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 5, delay: 2.4, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Glow halo */}
      <motion.path
        d={SEAM_PATH}
        fill="none"
        stroke="#00b0e1"
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
          transition={{ duration: 0.5, delay: 1.5 + i * 0.08, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}
