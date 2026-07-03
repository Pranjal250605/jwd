'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { SlidersHorizontal } from 'lucide-react';

const DUBAI = '#007ec4';
const JAPAN = '#5d6f8a';
const JP_CGT = 0.20315; // Japan capital-gains / financial-income tax

const oku = (n: number) => `¥${(n / 1e8).toFixed(2)}億`;

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] text-sumi-soft">{label}</span>
        <span className="font-en text-base font-medium text-sumi">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-sumi/15 accent-[#007ec4]"
      />
    </div>
  );
}

export function PropertySimulator({
  priceAed,
  sizeSqft,
  yieldPct,
  appreciation,
  aedJpy,
  fxLive,
  fxSource,
  fxAsOf,
}: {
  priceAed: number;
  sizeSqft: number;
  yieldPct: number;
  appreciation: number; // forward annual rate (e.g. 0.05)
  aedJpy: number;
  fxLive: boolean;
  fxSource: string;
  fxAsOf: string;
}) {
  const ja = (useLocale() as string) === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';

  const [years, setYears] = useState(10);
  const [dubaiApp, setDubaiApp] = useState(Math.round(appreciation * 1000) / 10); // %
  const [japanRet, setJapanRet] = useState(1.5); // % domestic alternative

  const netRentAed = Math.max((priceAed * yieldPct) / 100 - sizeSqft * 18, 0);

  const sim = useMemo(() => {
    const initJpy = priceAed * aedJpy;
    const jpAfter = (japanRet / 100) * (1 - JP_CGT); // after-tax compounding in Japan
    const dubai: number[] = [];
    const japan: number[] = [];
    for (let t = 0; t <= years; t++) {
      // Dubai: capital appreciation (0% tax) + cumulative net rent, in JPY
      const dAed = priceAed * Math.pow(1 + dubaiApp / 100, t) + netRentAed * t;
      dubai.push(dAed * aedJpy);
      // Japan: same capital kept domestically, compounding after-tax
      japan.push(initJpy * Math.pow(1 + jpAfter, t));
    }
    return { dubai, japan };
  }, [years, dubaiApp, japanRet, priceAed, aedJpy, netRentAed]);

  const dFinal = sim.dubai[years];
  const jFinal = sim.japan[years];
  const gap = dFinal - jFinal;
  const dFinalAed = dFinal / aedJpy;

  // chart geometry
  const all = [...sim.dubai, ...sim.japan];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const W = 100, H = 42, pad = 3;
  const toXY = (arr: number[]) =>
    arr.map((v, i) => {
      const x = pad + (i / years) * (W - pad * 2);
      const y = pad + (1 - (v - min) / (max - min || 1)) * (H - pad * 2);
      return [x, y] as const;
    });
  const path = (pts: ReadonlyArray<readonly [number, number]>) =>
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const dPts = toXY(sim.dubai);
  const jPts = toXY(sim.japan);

  return (
    <section className="mx-auto mt-8 max-w-6xl px-4 lg:px-8">
      <div className="overflow-hidden rounded-[1.75rem] border border-sumi/8 bg-washi p-8 lg:p-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: DUBAI }}>
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} /> {ja ? '資産シミュレーション' : 'Growth Simulation'}
            </span>
            <h2 className={`${display} text-2xl font-semibold text-sumi lg:text-3xl`}>
              {ja ? 'この物件 vs 日本での運用' : 'This property vs. keeping it in Japan'}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sumi/10 bg-washi px-4 py-2 text-[11px]">
            <span className={`h-1.5 w-1.5 rounded-full ${fxLive ? 'bg-emerald-500' : 'bg-sumi/30'}`} />
            <span className="text-sumi-soft">AED 1 =</span>
            <span className="font-en font-semibold text-sumi">¥{aedJpy.toFixed(2)}</span>
            <span className="text-sumi-soft/60">{fxLive ? (ja ? 'ライブ' : 'live') : ''}</span>
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
          {/* chart */}
          <div className="flex flex-col gap-5">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: 300 }}>
              <defs>
                <linearGradient id="sim-d" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={DUBAI} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={DUBAI} stopOpacity={0} />
                </linearGradient>
              </defs>
              <path d={`${path(dPts)} L${dPts[years][0]} ${H} L${dPts[0][0]} ${H} Z`} fill="url(#sim-d)" />
              <path d={path(jPts)} fill="none" stroke={JAPAN} strokeWidth={1} strokeDasharray="2 1.6" vectorEffect="non-scaling-stroke" />
              <path d={path(dPts)} fill="none" stroke={DUBAI} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-2 text-[12px] text-sumi">
                <span className="h-1.5 w-4 rounded-full" style={{ background: DUBAI }} /> {ja ? 'この物件（ドバイ・0%課税）' : 'This property · Dubai (0% tax)'}
              </span>
              <span className="inline-flex items-center gap-2 text-[12px] text-sumi">
                <span className="h-1.5 w-4 rounded-full" style={{ background: JAPAN, opacity: 0.7 }} /> {ja ? '日本での運用（課税後）' : 'Kept in Japan (after tax)'}
              </span>
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-6 rounded-2xl border border-sumi/8 bg-washi-deep/40 p-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-soft">{ja ? '前提条件' : 'Assumptions'}</span>
            <Slider label={ja ? '運用年数' : 'Holding period'} value={years} display={`${years}${ja ? '年' : 'y'}`} min={3} max={25} step={1} onChange={setYears} />
            <Slider label={ja ? 'ドバイ 期待値上がり/年' : 'Dubai appreciation / yr'} value={dubaiApp} display={`${dubaiApp.toFixed(1)}%`} min={0} max={12} step={0.1} onChange={setDubaiApp} />
            <Slider label={ja ? '日本 期待リターン/年' : 'Japan return / yr'} value={japanRet} display={`${japanRet.toFixed(1)}%`} min={0} max={6} step={0.1} onChange={setJapanRet} />
          </div>
        </div>

        {/* result cards */}
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-sumi/8 bg-sumi/[0.06] sm:grid-cols-3">
          <div className="flex flex-col gap-1.5 bg-washi p-5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-sumi-soft">{ja ? `${years}年後 · この物件` : `This property · ${years}y`}</span>
            <span className="font-en text-2xl font-light" style={{ color: DUBAI }}>{oku(dFinal)}</span>
            <span className="text-[11px] text-sumi-soft/70">AED {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(dFinalAed)}</span>
          </div>
          <div className="flex flex-col gap-1.5 bg-washi p-5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-sumi-soft">{ja ? `${years}年後 · 日本運用` : `Kept in Japan · ${years}y`}</span>
            <span className="font-en text-2xl font-light" style={{ color: JAPAN }}>{oku(jFinal)}</span>
            <span className="text-[11px] text-sumi-soft/70">{ja ? '課税後' : 'after tax'}</span>
          </div>
          <div className="flex flex-col gap-1.5 bg-gold/[0.07] p-5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-sumi-soft">{ja ? '差額' : 'Difference'}</span>
            <span className="font-en text-2xl font-light" style={{ color: gap >= 0 ? DUBAI : JAPAN }}>
              {gap >= 0 ? '+' : ''}{oku(gap)}
            </span>
            <span className="text-[11px] text-sumi-soft/70">{ja ? `${jFinal > 0 ? ((dFinal / jFinal - 1) * 100).toFixed(0) : '—'}% 上振れ` : `+${jFinal > 0 ? ((dFinal / jFinal - 1) * 100).toFixed(0) : '—'}% more`}</span>
          </div>
        </div>

        <p className="mt-6 text-[11px] font-light leading-relaxed text-sumi-soft/70">
          {ja
            ? `※ ${fxLive ? `為替はライブレート（${fxSource}${fxAsOf ? ` · ${fxAsOf}` : ''}）。` : '為替は参考値。'}単純複利による概算で、将来の成果を保証しません。日本運用は譲渡益課税${(JP_CGT * 100).toFixed(1)}%を反映。投資判断は専門家にご相談ください。`
            : `※ ${fxLive ? `FX is a live rate (${fxSource}${fxAsOf ? ` · ${fxAsOf}` : ''}).` : 'FX is illustrative.'} Simple compounding estimate, not a guarantee of returns. Japan path applies ${(JP_CGT * 100).toFixed(1)}% gains tax. Consult a professional before investing.`}
        </p>
      </div>
    </section>
  );
}
