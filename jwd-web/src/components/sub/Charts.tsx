'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from '@/components/kintsugi/CountUp';

const EASE = [0.22, 1, 0.36, 1] as const;

type Datum = { label: string; value: number; highlight?: boolean };

/** Horizontal comparison bars — yields, returns, anything ranked. */
export function BarChart({
  items,
  unit = '',
  dark = false,
  accent = '#0097a7',
}: {
  items: Datum[];
  unit?: string;
  dark?: boolean;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const max = Math.max(...items.map((d) => d.value)) * 1.08;
  const labelCol = dark ? 'text-washi/70' : 'text-sumi-soft';
  const valueCol = dark ? 'text-washi' : 'text-sumi';

  return (
    <div ref={ref} className="flex flex-col gap-5">
      {items.map((d, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className={`w-28 shrink-0 text-right text-[13px] tracking-wide ${labelCol} sm:w-40`}>
            {d.label}
          </span>
          <div className="relative h-7 flex-1 overflow-hidden rounded-sm" style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(32,37,31,0.05)' }}>
            <motion.div
              className="h-full origin-left rounded-sm"
              style={{
                background: d.highlight
                  ? `linear-gradient(90deg, ${accent}, ${accent}aa)`
                  : `${accent}44`,
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: d.value / max } : undefined}
              transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease: EASE }}
            />
          </div>
          <span className={`w-16 shrink-0 font-en text-lg font-light ${valueCol}`}>
            <CountUp to={d.value} decimals={Number.isInteger(d.value) ? 0 : 1} suffix={unit} start={inView} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Self-drawing area line — price trends, fx, growth over time. */
export function LineChart({
  points,
  unit = '',
  dark = false,
  accent = '#0097a7',
}: {
  points: Datum[];
  unit?: string;
  dark?: boolean;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const W = 100;
  const H = 42;
  const pad = 4;
  const vals = points.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (W - pad * 2);
    const y = pad + (1 - (p.value - min) / span) * (H - pad * 2);
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const area = `${line} L${coords[coords.length - 1][0]} ${H} L${coords[0][0]} ${H} Z`;
  const labelCol = dark ? 'text-washi/55' : 'text-sumi-soft/80';

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 200 }}>
        <defs>
          <linearGradient id={`areaFill-${accent.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity={dark ? 0.35 : 0.26} />
            <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill={`url(#areaFill-${accent.slice(1)})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={accent}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {coords.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={0.9}
            fill={accent}
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
          />
        ))}
      </svg>
      <div className="flex justify-between">
        {points.map((p, i) => (
          <span key={i} className={`text-[12px] tracking-wide ${labelCol}`}>
            {p.label}
            {unit && i === points.length - 1 ? '' : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Donut — allocation, share, composition. */
export function DonutChart({
  items,
  dark = false,
  accent = '#0097a7',
}: {
  items: Datum[];
  dark?: boolean;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const SHADES = [accent, '#00c4cc', '#177f80', '#b5ece7', '#8fa0c4', '#b7a7d0'];
  const total = items.reduce((s, d) => s + d.value, 0);
  const C = 2 * Math.PI * 30;
  let offset = 0;
  const labelCol = dark ? 'text-washi/70' : 'text-sumi-soft';
  const valueCol = dark ? 'text-washi' : 'text-sumi';

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-10">
      <svg viewBox="0 0 80 80" className="h-44 w-44 -rotate-90">
        {items.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * C;
          const seg = (
            <motion.circle
              key={i}
              cx={40}
              cy={40}
              r={30}
              fill="none"
              stroke={SHADES[i % SHADES.length]}
              strokeWidth={10}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <ul className="flex flex-col gap-3">
        {items.map((d, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SHADES[i % SHADES.length] }} />
            <span className={`text-[15px] ${labelCol}`}>{d.label}</span>
            <span className={`font-en text-sm ${valueCol}`}>
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
