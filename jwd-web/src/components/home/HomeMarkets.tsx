'use client';

import { useLocale } from 'next-intl';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import { MARKETS, MARKETS_ALL_URL } from '@/data/markets';

const ACCENT = '#9a7b2d';
type Lang = 'ja' | 'en';

export function HomeMarkets() {
  const locale = useLocale() as Lang;
  const ja = locale === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';

  return (
    <section className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <PremiumBackdrop />
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-4 lg:mb-18">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {ja ? 'Equiti と提携' : 'In partnership with Equiti'}
          </span>
          <h2 className={`${display} max-w-3xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {ja ? '世界のマーケットへ、ひとつの窓口から' : 'Global markets, one gateway'}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-xl text-sm font-light leading-loose text-sumi-soft">
            {ja
              ? 'パートナーであるEquitiを通じて、外国為替から商品・株式・暗号資産まで。気になる市場を選ぶと、Equitiの取引ページへ進みます。'
              : 'Through our partner Equiti — from forex to commodities, shares and crypto. Choose a market to continue on Equiti’s trading page.'}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MARKETS.map((m, i) => (
            <Reveal key={m.key} delay={i * 0.06}>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-sumi/8 bg-washi p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(32,37,31,0.42)]"
              >
                {/* corner glow on hover */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${ACCENT}20, transparent 70%)` }}
                />
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                  style={{ background: `linear-gradient(140deg, ${ACCENT}, #c9a85c)`, boxShadow: `0 12px 26px -10px ${ACCENT}` }}
                >
                  <m.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="relative flex flex-col gap-2">
                  <h3 className={`${display} text-lg font-semibold text-sumi`}>{ja ? m.ja : m.en}</h3>
                  <p className="text-[13px] font-light leading-relaxed text-sumi-soft">{ja ? m.descJa : m.descEn}</p>
                </div>
                <span className="relative mt-auto inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-gold">
                  {ja ? 'Equitiで取引' : 'Trade on Equiti'}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
                </span>
              </a>
            </Reveal>
          ))}

          {/* All-markets card */}
          <Reveal delay={MARKETS.length * 0.06}>
            <a
              href={MARKETS_ALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[1.5rem] bg-sumi p-7 text-washi shadow-[0_20px_50px_-24px_rgba(12,14,18,0.6)] transition-all duration-500 hover:-translate-y-1.5"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{ background: `radial-gradient(ellipse 70% 60% at 80% 10%, ${ACCENT}40, transparent 60%)` }}
              />
              <span className="relative text-[10px] uppercase tracking-[0.28em] text-gold-pale/90">
                {ja ? 'すべての商品' : 'Full range'}
              </span>
              <div className="relative flex items-center justify-between">
                <span className={`${display} whitespace-pre-line text-xl font-semibold leading-snug`}>
                  {ja ? 'すべての\nマーケットを見る' : 'Explore all\nmarkets'}
                </span>
                <ArrowRight className="h-6 w-6 shrink-0 text-gold-pale transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
              </div>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-8">
          <p className="text-[10px] tracking-[0.1em] text-sumi/35">
            {ja
              ? '※ 取引はEquitiのプラットフォーム上で行われます。CFD取引にはリスクが伴います。'
              : '※ Trading is executed on Equiti’s platform. CFDs carry risk.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
