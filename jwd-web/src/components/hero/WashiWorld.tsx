'use client';

import { motion } from 'framer-motion';

/**
 * The Japan side — washi paper, a rising sun disc, an ensō brush circle
 * and zen-garden ripple arcs. Entirely code-drawn; no image assets.
 */
export function WashiWorld({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-washi">
      {/* Vertical paper gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(175deg, #faf9f5 0%, #f5f2ea 55%, #efeadf 100%)',
        }}
      />

      {/* Rising sun disc */}
      <div
        className="absolute"
        style={{
          width: '44vmin',
          height: '44vmin',
          top: '8%',
          left: '12%',
          background:
            'radial-gradient(circle, rgba(201,168,92,0.30) 0%, rgba(201,168,92,0.12) 45%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Ensō — brush circle, draws itself */}
      <svg
        aria-hidden
        className="absolute"
        style={{ width: '58vmin', height: '58vmin', top: '4%', left: '5%' }}
        viewBox="0 0 200 200"
      >
        <motion.circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="#9a7b2d"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.13"
          transform="rotate(-105 100 100)"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 0.82 }}
          transition={{ duration: 1.6, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="#9a7b2d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.10"
          transform="rotate(-99 100 100)"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 0.78 }}
          transition={{ duration: 1.6, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      {/* Zen-garden ripple arcs, bottom-left */}
      <svg
        aria-hidden
        className="absolute bottom-[-6%] left-[-4%]"
        style={{ width: '52vmin', height: '52vmin' }}
        viewBox="0 0 200 200"
      >
        {[46, 70, 94, 118].map((r, i) => (
          <motion.circle
            key={r}
            cx="40"
            cy="170"
            r={r}
            fill="none"
            stroke="#20251f"
            strokeWidth="0.8"
            strokeOpacity={0.12 - i * 0.02}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.7 + i * 0.15, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* Drifting mist veils */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 75%, rgba(250,249,245,0.9) 0%, transparent 65%)',
          animation: reduce ? undefined : 'mistDrift 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 70% 25%, rgba(250,249,245,0.75) 0%, transparent 60%)',
          animation: reduce ? undefined : 'mistDriftAlt 24s ease-in-out infinite',
        }}
      />
    </div>
  );
}
