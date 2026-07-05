'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

interface TabItem {
  tab: string;
  title: string;
  text: string;
  bullets?: string[];
  metric?: { value: string; label: string };
}

/** dezerv-style tab switcher — click to swap panels, no reload. */
export function Tabs({
  items,
  accent,
  dark,
  display,
}: {
  items: TabItem[];
  accent: string;
  dark: boolean;
  display: string;
}) {
  const [active, setActive] = useState(0);
  const cur = items[active];
  const muted = dark ? 'text-washi/55' : 'text-sumi-soft';
  const head = dark ? 'text-washi' : 'text-sumi';

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-14">
      <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative shrink-0 rounded-xl px-5 py-3.5 text-left text-sm font-medium transition-colors duration-300 ${
              i === active ? '' : `${muted} hover:${head}`
            }`}
            style={i === active ? { color: accent, background: `${accent}14` } : undefined}
          >
            {i === active && (
              <span
                className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
                style={{ background: accent }}
              />
            )}
            <span className="lg:pl-2.5">{it.tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={`rounded-2xl border p-8 lg:p-12 ${
            dark ? 'border-white/10 bg-white/[0.03]' : 'border-sumi/8 bg-washi-deep/40'
          }`}
        >
          {cur.metric && (
            <div className="mb-7 flex items-baseline gap-3">
              <span className="font-en text-5xl font-light lg:text-6xl" style={{ color: accent }}>
                {cur.metric.value}
              </span>
              <span className={`text-[13px] uppercase tracking-[0.18em] ${muted}`}>
                {cur.metric.label}
              </span>
            </div>
          )}
          <h3 className={`${display} text-2xl font-semibold ${head} lg:text-3xl`}>{cur.title}</h3>
          <p className={`mt-5 max-w-2xl text-[0.98rem] font-light leading-[1.95] ${muted}`}>
            {cur.text}
          </p>
          {cur.bullets && (
            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {cur.bullets.map((b, i) => (
                <li key={i} className={`flex items-start gap-3 text-sm font-light ${muted}`}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: accent }} />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Live, slider-driven yield calculator — drag and watch the numbers move. */
export function YieldCalculator({
  accent,
  dark,
  ja,
}: {
  accent: string;
  dark: boolean;
  ja: boolean;
}) {
  const [price, setPrice] = useState(1_850_000);
  const [yld, setYld] = useState(7);
  const annual = (price * yld) / 100;
  const jpy = annual * 40.8;

  const head = dark ? 'text-washi' : 'text-sumi';
  const muted = dark ? 'text-washi/55' : 'text-sumi-soft';
  const track = dark ? 'bg-white/10' : 'bg-sumi/10';
  const t = {
    price: ja ? '物件価格' : 'Property price',
    yield: ja ? '想定グロス利回り' : 'Assumed gross yield',
    annual: ja ? '年間賃料収入' : 'Annual rental income',
    monthly: ja ? '月額換算' : 'Per month',
    jpy: ja ? '円換算（年間）' : 'In JPY (annual)',
  };

  return (
    <div
      className={`grid gap-10 rounded-3xl border p-8 lg:grid-cols-2 lg:gap-16 lg:p-12 ${
        dark ? 'border-white/10 bg-white/[0.03]' : 'border-sumi/8 bg-washi'
      }`}
      style={{ boxShadow: '0 30px 60px -40px rgba(32,37,31,0.35)' }}
    >
      {/* inputs */}
      <div className="flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className={`text-[13px] uppercase tracking-[0.18em] ${muted}`}>{t.price}</span>
            <span className={`font-en text-xl ${head}`}>AED {fmt(price)}</span>
          </div>
          <input
            type="range" min={400_000} max={20_000_000} step={50_000}
            value={price} onChange={(e) => setPrice(+e.target.value)}
            className={`h-1.5 w-full cursor-pointer appearance-none rounded-full ${track}`}
            style={{ accentColor: accent }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className={`text-[13px] uppercase tracking-[0.18em] ${muted}`}>{t.yield}</span>
            <span className={`font-en text-xl ${head}`}>{yld.toFixed(1)}%</span>
          </div>
          <input
            type="range" min={3} max={10} step={0.1}
            value={yld} onChange={(e) => setYld(+e.target.value)}
            className={`h-1.5 w-full cursor-pointer appearance-none rounded-full ${track}`}
            style={{ accentColor: accent }}
          />
        </div>
      </div>

      {/* outputs */}
      <div className="flex flex-col justify-center gap-7 border-t pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0" style={{ borderColor: `${accent}33` }}>
        <div>
          <div className="font-en text-5xl font-light lg:text-6xl" style={{ color: accent }}>
            AED {fmt(annual)}
          </div>
          <div className={`mt-2 text-[13px] uppercase tracking-[0.18em] ${muted}`}>{t.annual}</div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <div className={`font-en text-2xl font-light ${head}`}>AED {fmt(annual / 12)}</div>
            <div className={`mt-1 text-[12px] uppercase tracking-[0.16em] ${muted}`}>{t.monthly}</div>
          </div>
          <div>
            <div className={`font-en text-2xl font-light ${head}`}>¥{fmt(jpy)}</div>
            <div className={`mt-1 text-[12px] uppercase tracking-[0.16em] ${muted}`}>{t.jpy}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Side-by-side comparison — breaks the vertical rhythm with a face-off. */
export function Compare({
  left,
  right,
  rows,
  accent,
  dark,
  display,
}: {
  left: string;
  right: string;
  rows: { label: string; left: string; right: string }[];
  accent: string;
  dark: boolean;
  display: string;
}) {
  const head = dark ? 'text-washi' : 'text-sumi';
  const muted = dark ? 'text-washi/50' : 'text-sumi-soft';
  const border = dark ? 'border-white/10' : 'border-sumi/8';

  return (
    <div className={`overflow-hidden rounded-2xl border ${border}`}>
      <div className="grid grid-cols-[1.2fr_1fr_1fr]">
        <div className={`border-b ${border} p-5`} />
        <div className={`border-b border-l ${border} p-5 text-center`} style={{ background: `${accent}10` }}>
          <span className={`${display} text-sm font-semibold`} style={{ color: accent }}>{left}</span>
        </div>
        <div className={`border-b border-l ${border} p-5 text-center`}>
          <span className={`${display} text-sm font-semibold ${muted}`}>{right}</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="contents">
            <div className={`${i < rows.length - 1 ? `border-b ${border}` : ''} p-5 text-[15px] ${muted}`}>{r.label}</div>
            <div className={`${i < rows.length - 1 ? `border-b ` : ''} border-l ${border} p-5 text-center text-sm font-medium ${head}`} style={{ background: `${accent}08` }}>{r.left}</div>
            <div className={`${i < rows.length - 1 ? `border-b ` : ''} border-l ${border} p-5 text-center text-sm ${muted}`}>{r.right}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
