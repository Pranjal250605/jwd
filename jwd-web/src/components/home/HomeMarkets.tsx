'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import { MARKETS, MARKETS_ALL_URL } from '@/data/markets';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';

const ACCENT = '#9a7b2d';
type Lang = 'ja' | 'en';

/** Cursor-following 3D tilt anchor — matches the stat cards elsewhere on site. */
function TiltLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 16 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16 });
  const glow = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(154,123,45,0.18), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set(-(py - 0.5) * 14);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div className="h-full" style={{ perspective: 1000 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className={className}
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        {children}
      </motion.a>
    </motion.div>
  );
}

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
            <Reveal key={m.key} delay={i * 0.06} className="h-full">
              <TiltLink
                href={jaOutbound(m.url, ja)}
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-sumi/8 bg-washi p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(32,37,31,0.42)]"
              >
                <div style={{ transform: 'translateZ(40px)' }} className="relative flex h-full flex-col gap-5">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ background: `linear-gradient(140deg, ${ACCENT}, #c9a85c)`, boxShadow: `0 12px 26px -10px ${ACCENT}` }}
                  >
                    <m.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className={`${display} text-lg font-semibold text-sumi`}>{ja ? m.ja : m.en}</h3>
                    <p className="text-[13px] font-light leading-relaxed text-sumi-soft">{ja ? m.descJa : m.descEn}</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-gold">
                    {ja ? 'Equitiで取引' : 'Trade on Equiti'}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
                  </span>
                </div>
              </TiltLink>
            </Reveal>
          ))}

          {/* All-markets card */}
          <Reveal delay={MARKETS.length * 0.06} className="h-full">
            <TiltLink
              href={jaOutbound(MARKETS_ALL_URL, ja)}
              className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[1.5rem] bg-sumi p-7 text-washi shadow-[0_20px_50px_-24px_rgba(12,14,18,0.6)] transition-shadow duration-500"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{ background: `radial-gradient(ellipse 70% 60% at 80% 10%, ${ACCENT}40, transparent 60%)` }}
              />
              <div style={{ transform: 'translateZ(40px)' }} className="relative flex h-full flex-col justify-between gap-8">
                <span className="text-[10px] uppercase tracking-[0.28em] text-gold-pale/90">
                  {ja ? 'すべての商品' : 'Full range'}
                </span>
                <div className="flex items-center justify-between">
                  <span className={`${display} whitespace-pre-line text-xl font-semibold leading-snug`}>
                    {ja ? 'すべての\nマーケットを見る' : 'Explore all\nmarkets'}
                  </span>
                  <ArrowRight className="h-6 w-6 shrink-0 text-gold-pale transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
                </div>
              </div>
            </TiltLink>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-8 flex flex-col gap-1.5">
          <p className="text-[10px] tracking-[0.1em] text-sumi/35">
            {ja
              ? '※ 取引はEquitiのプラットフォーム上で行われます。CFD取引にはリスクが伴います。'
              : '※ Trading is executed on Equiti’s platform. CFDs carry risk.'}
          </p>
          {ja && (
            <p className="text-[10px] leading-relaxed tracking-[0.05em] text-sumi/30">
              ※ {JA_PROXY_NOTICE}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
