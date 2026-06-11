'use client';

import { useEffect, useMemo, useRef } from 'react';
import { seededRandom } from './seam';

/* ── Hand-drawn Dubai skyline silhouette (viewBox 0 0 1200 360) ─────────── */

/** Burj Khalifa — stepped spire, centered around x≈760. */
const BURJ_KHALIFA =
  'M728 360 L728 252 L737 252 L737 184 L745 184 L745 124 L753 124 L753 76 L757 76 L759.2 22 L760.8 22 L763 76 L767 76 L767 124 L775 124 L775 184 L783 184 L783 252 L792 252 L792 360 Z';

/** Burj Al Arab — the sail, around x≈300. */
const BURJ_AL_ARAB =
  'M268 360 L268 212 C268 132 326 108 336 104 L340 104 L340 360 Z M338 104 L338 70 L341 70 L341 104 Z';

/** Generic towers: [x, width, height, hasAntenna] */
const TOWERS: ReadonlyArray<[number, number, number, boolean]> = [
  [10, 52, 120, false],
  [80, 40, 168, false],
  [136, 34, 140, true],
  [186, 46, 196, false],
  [388, 44, 150, false],
  [448, 56, 208, true],
  [520, 38, 162, false],
  [572, 50, 232, false],
  [640, 42, 184, false],
  [820, 50, 216, true],
  [886, 40, 170, false],
  [940, 58, 244, false],
  [1014, 44, 186, false],
  [1072, 38, 148, false],
  [1124, 52, 200, true],
];

/** Back-layer towers for depth. */
const BACK_TOWERS: ReadonlyArray<[number, number, number]> = [
  [50, 60, 90], [230, 70, 110], [350, 60, 95], [500, 80, 120],
  [690, 70, 105], [860, 80, 130], [1000, 70, 100], [1140, 60, 92],
];

interface Win {
  x: number;
  y: number;
  o: number;
  delay: number;
  dur: number;
}

function buildWindows(): Win[] {
  const rand = seededRandom(20260611); // fixed seed → identical SSR/CSR markup
  const wins: Win[] = [];
  for (const [bx, bw, bh] of TOWERS) {
    const cols = Math.floor(bw / 9);
    const rows = Math.floor(bh / 14);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rand() > 0.3) continue; // ~30% of windows lit
        wins.push({
          x: bx + 4 + c * 9,
          y: 360 - bh + 6 + r * 14,
          o: 0.25 + rand() * 0.55,
          delay: rand() * 8,
          dur: 5 + rand() * 9,
        });
      }
    }
  }
  return wins;
}

function Stars({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const rand = seededRandom(77);
    const stars = Array.from({ length: 90 }, () => ({
      x: rand(),
      y: rand() * 0.72,
      r: 0.4 + rand() * 1.1,
      p: rand() * Math.PI * 2,
      s: 0.4 + rand() * 1.2,
    }));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    /* Occasional shooting star — the wish-upon-a-star moment */
    let meteor: { nx: number; ny: number; born: number } | null = null;
    let nextMeteor = 5000 + Math.random() * 5000;

    const draw = (t: number) => {
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t / 900 * st.s + st.p);
        ctx.globalAlpha = tw * 0.85;
        ctx.fillStyle = '#e6d9b8';
        ctx.beginPath();
        ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) {
        if (!meteor && t > nextMeteor) {
          meteor = { nx: 0.1 + Math.random() * 0.5, ny: 0.05 + Math.random() * 0.25, born: t };
        }
        if (meteor) {
          const age = (t - meteor.born) / 850;
          if (age >= 1) {
            meteor = null;
            nextMeteor = t + 6000 + Math.random() * 7000;
          } else {
            const hx = meteor.nx * w + age * 0.24 * w;
            const hy = meteor.ny * h + age * 0.13 * h;
            const trail = (1 - age) * 0.09 * w;
            const grad = ctx.createLinearGradient(hx, hy, hx - trail, hy - trail * 0.54);
            grad.addColorStop(0, 'rgba(230,217,184,0.9)');
            grad.addColorStop(1, 'rgba(230,217,184,0)');
            ctx.globalAlpha = Math.sin(Math.PI * age);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(hx, hy);
            ctx.lineTo(hx - trail, hy - trail * 0.54);
            ctx.stroke();
          }
        }
        raf = requestAnimationFrame(draw);
      }
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}

/**
 * The Dubai side — indigo night sky, twinkling stars, crescent moon and a
 * hand-drawn skyline (Burj Khalifa + Burj Al Arab) with flickering gold
 * windows. Entirely code-drawn; no image assets.
 */
export function NightWorld({ reduce }: { reduce: boolean }) {
  const windows = useMemo(buildWindows, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Night sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #070d1c 0%, #0a1020 38%, #131c33 68%, #2a2438 88%, #3a2f25 100%)',
        }}
      />

      <Stars reduce={reduce} />

      {/* Horizon gold haze */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 55% 100%, rgba(201,168,92,0.22) 0%, rgba(201,168,92,0.06) 50%, transparent 75%)',
        }}
      />

      {/* Crescent moon */}
      <svg
        aria-hidden
        className="absolute right-[14%] top-[12%] h-16 w-16"
        viewBox="0 0 64 64"
      >
        <circle cx="32" cy="32" r="18" fill="#e6d9b8" opacity="0.9" />
        <circle cx="40" cy="26" r="17" fill="#0a1020" />
      </svg>

      {/* Skyline */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ height: 'min(46vh, 420px)' }}
        viewBox="0 0 1200 360"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* back layer */}
        <g fill="#141d35">
          {BACK_TOWERS.map(([x, w, h]) => (
            <rect key={`b${x}`} x={x} y={360 - h} width={w} height={h} />
          ))}
        </g>

        {/* front silhouettes */}
        <g fill="#080e1d">
          {TOWERS.map(([x, w, h, antenna]) => (
            <g key={`t${x}`}>
              <rect x={x} y={360 - h} width={w} height={h} />
              {antenna && (
                <rect x={x + w / 2 - 0.8} y={360 - h - 22} width={1.6} height={22} />
              )}
            </g>
          ))}
          <path d={BURJ_AL_ARAB} />
          <path d={BURJ_KHALIFA} />
          {/* Burj Khalifa spire */}
          <rect x={759.3} y={0} width={1.4} height={22} />
          {/* ground line */}
          <rect x={0} y={356} width={1200} height={4} />
        </g>

        {/* Spire glint — a four-point star pulsing at the very top */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: reduce ? undefined : 'glint 5.5s ease-in-out infinite',
          }}
        >
          <circle cx={760} cy={20} r={3.2} fill="#e6d9b8" opacity={0.85} />
          <rect x={759.4} y={4} width={1.2} height={32} fill="#e6d9b8" opacity={0.8} />
          <rect x={744} y={19.4} width={32} height={1.2} fill="#e6d9b8" opacity={0.8} />
        </g>

        {/* lit windows */}
        <g fill="#c9a85c">
          {windows.map((win, i) => (
            <rect
              key={i}
              x={win.x}
              y={win.y}
              width={2}
              height={3.2}
              style={{
                opacity: win.o,
                ['--w-base' as string]: win.o,
                animation: reduce
                  ? undefined
                  : `windowFlicker ${win.dur}s ease-in-out ${win.delay}s infinite`,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
