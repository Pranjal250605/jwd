'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * A Stripe-style flowing mesh gradient — large, soft, blurred colour fields
 * that drift slowly past one another. Pure CSS/transform (GPU-composited), so
 * it stays smooth on low-end hardware. Palette is the JWD "kintsugi aurora":
 * gold, sand and bronze warmed by a whisper of Dubai indigo.
 */
const BLOBS = [
  { color: '#c9a85c', top: '-12%', left: '2%', size: 60, o: 0.85, dx: 9, dy: 7, dur: 22 },
  { color: '#e8ddc8', top: '-20%', left: '48%', size: 66, o: 0.95, dx: -8, dy: 6, dur: 26 },
  { color: '#9a7b2d', top: '14%', left: '24%', size: 52, o: 0.5, dx: 7, dy: -6, dur: 28 },
  { color: '#e6d9b8', top: '20%', left: '66%', size: 58, o: 0.8, dx: -7, dy: -5, dur: 24 },
  { color: '#bcc8e0', top: '-6%', left: '80%', size: 44, o: 0.55, dx: -6, dy: 8, dur: 30 },
  { color: '#d8b878', top: '26%', left: '6%', size: 40, o: 0.5, dx: 6, dy: 5, dur: 20 },
];

export function AuroraMesh() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* warm wash base so blobs melt into the paper */}
      <div className="absolute inset-0" style={{ background: '#f4efe3' }} />
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}vw`,
            height: `${b.size}vw`,
            opacity: b.o,
            background: `radial-gradient(circle at 50% 50%, ${b.color} 0%, ${b.color}00 68%)`,
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [`0%`, `${b.dx}%`, `0%`],
                  y: [`0%`, `${b.dy}%`, `0%`],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* fine grain to kill banding */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
