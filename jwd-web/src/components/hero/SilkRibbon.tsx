'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Stripe-style flowing "silk ribbon" gradient — a fan of long, blurred colour
 * strands sweeping from a focal point, overlaid with fine striations so it
 * reads like combed silk / a bird-of-paradise bloom. Warm JWD palette (gold,
 * amber, bronze, sand) lifted by a cool lavender–indigo accent.
 *
 * Pure CSS transforms + blur (GPU-composited) — smooth on low-end machines.
 */
const STRANDS = [
  { rot: -4, len: 132, w: 16, o: 0.58 },
  { rot: -13, len: 138, w: 19, o: 0.64 },
  { rot: -23, len: 144, w: 22, o: 0.7 },
  { rot: -33, len: 150, w: 24, o: 0.82 },
  { rot: -43, len: 152, w: 26, o: 0.85 },
  { rot: -53, len: 150, w: 24, o: 0.85 },
  { rot: -63, len: 144, w: 22, o: 0.72 },
  { rot: -73, len: 136, w: 19, o: 0.6 },
  { rot: -83, len: 128, w: 16, o: 0.5 },
];

// Default homepage palette — sky-and-ocean blues on the white canvas.
const DEFAULT_COLORS = [
  '#bce8e4', '#9fe3de', '#5ce0d8', '#40e0d0', '#00c4cc',
  '#00c4cc', '#b5ece7', '#0097a7', '#cdbfe0',
];

export function SilkRibbon({ colors = DEFAULT_COLORS }: { colors?: string[] }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* The fan, anchored low-right, blooming up and across */}
      <motion.div
        className="absolute"
        style={{
          right: '4%',
          bottom: '-18%',
          width: '1px',
          height: '1px',
          filter: 'blur(34px)',
          willChange: 'transform',
        }}
        animate={reduce ? undefined : { rotate: [0, 4, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      >
        {STRANDS.map((s, i) => {
          const c = colors[i % colors.length];
          return (
          <motion.span
            key={i}
            className="absolute block rounded-full"
            style={{
              bottom: 0,
              left: 0,
              width: `${s.w}vw`,
              height: `${s.len}vh`,
              transformOrigin: '50% 100%',
              rotate: `${s.rot}deg`,
              translateX: '-50%',
              background: `linear-gradient(to top, ${c}00 0%, ${c} 42%, ${c}cc 70%, ${c}00 100%)`,
              opacity: s.o,
              mixBlendMode: 'multiply',
            }}
            animate={reduce ? undefined : { rotate: [`${s.rot}deg`, `${s.rot + 3}deg`, `${s.rot}deg`] }}
            transition={{
              duration: 18 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
          );
        })}
      </motion.div>

      {/* Fine silk striations following the sweep */}
      <div
        className="absolute inset-0 opacity-[0.5] mix-blend-overlay"
        style={{
          background:
            'repeating-linear-gradient(118deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 2px, transparent 6px)',
          maskImage:
            'radial-gradient(120% 110% at 82% 22%, #000 18%, transparent 62%)',
          WebkitMaskImage:
            'radial-gradient(120% 110% at 82% 22%, #000 18%, transparent 62%)',
        }}
      />

      {/* Keep the left side clean/white for the headline */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(95deg, rgba(250,249,245,1) 0%, rgba(250,249,245,0.82) 26%, rgba(250,249,245,0.2) 50%, rgba(250,249,245,0) 68%)',
        }}
      />
    </div>
  );
}
