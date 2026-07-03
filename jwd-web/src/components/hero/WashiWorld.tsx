'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { seededRandom } from './seam';

/* ── Sakura petals — soft blush-gold dust drifting across the washi ────── */
function SakuraPetals({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = seededRandom(8086);
    const petals = Array.from({ length: 22 }, () => ({
      x: rand(),
      y: rand(),
      size: 2.6 + rand() * 4.2,
      fall: 0.00012 + rand() * 0.00022,
      swayFreq: 0.0006 + rand() * 0.0009,
      swayAmp: 0.00025 + rand() * 0.0004,
      phase: rand() * Math.PI * 2,
      spin: (rand() - 0.5) * 0.002,
      angle: rand() * Math.PI * 2,
      alpha: 0.25 + rand() * 0.35,
    }));

    const draw = (t: number) => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of petals) {
        p.y += p.fall;
        p.x += Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;
        p.angle += p.spin;
        if (p.y > 1.05) {
          p.y = -0.05;
          p.x = Math.random();
        }

        ctx.save();
        ctx.translate(p.x * w, p.y * h);
        ctx.rotate(p.angle + Math.sin(t * 0.0004 + p.phase) * 0.6);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#dcb9a6';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
  );
}

/**
 * The Japan side — washi paper, rising sun, ensō brush circle, Mt. Fuji
 * floating in layered mist, zen ripples and drifting sakura petals.
 * Entirely code-drawn; no image assets.
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
            'radial-gradient(circle, rgba(0,176,225,0.30) 0%, rgba(0,176,225,0.12) 45%, transparent 70%)',
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
          stroke="#007ec4"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.13"
          transform="rotate(-105 100 100)"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 0.82 }}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="#007ec4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.10"
          transform="rotate(-99 100 100)"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 0.78 }}
          transition={{ duration: 1.6, delay: 1.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      {/* Mt. Fuji floating in layered mist (sumi-e style) */}
      <motion.svg
        aria-hidden
        className="absolute bottom-[16%] left-0 w-[68%] opacity-60"
        viewBox="0 0 600 300"
        preserveAspectRatio="xMidYMax meet"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* far range */}
        <path
          d="M0 300 L0 224 Q80 176 160 212 Q240 244 320 206 Q400 176 480 218 L600 198 L600 300 Z"
          fill="#d8d2c4"
          opacity="0.5"
        />
        {/* Fuji */}
        <path d="M170 300 L262 132 Q272 114 282 132 L376 300 Z" fill="#c5beae" opacity="0.6" />
        {/* snow cap */}
        <path
          d="M247 160 L262 132 Q272 114 282 132 L298 161 L288 152 L279 159 L271 150 L262 158 L255 151 Z"
          fill="#faf9f5"
          opacity="0.95"
        />
        {/* near range */}
        <path
          d="M0 300 L0 254 Q100 216 200 248 Q310 280 420 244 Q510 218 600 252 L600 300 Z"
          fill="#b8ae97"
          opacity="0.35"
        />
      </motion.svg>

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
            transition={{ duration: 1.4, delay: 1.4 + i * 0.15, ease: 'easeOut' }}
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

      <SakuraPetals reduce={reduce} />
    </div>
  );
}
