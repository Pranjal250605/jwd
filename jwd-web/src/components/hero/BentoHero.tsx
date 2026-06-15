'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CountUp } from '@/components/kintsugi/CountUp';
import { Grain } from '@/components/kintsugi/Grain';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scattered "World Islands" dots — a code-drawn motif for the flagship cell. */
const ISLANDS: ReadonlyArray<[number, number, number]> = [
  [30, 34, 2.4], [42, 28, 1.8], [54, 32, 2.8], [64, 40, 2], [38, 44, 3],
  [50, 46, 2.2], [60, 52, 3.2], [34, 56, 2], [46, 58, 2.6], [56, 64, 1.8],
];

function Cell({
  className = '',
  delay = 0,
  children,
  reduce,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
  reduce: boolean;
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden bg-washi p-7 lg:p-9 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function StatCell({
  kicker,
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  note,
  delay,
  reduce,
}: {
  kicker: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  note?: string;
  delay: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <Cell delay={delay} reduce={reduce} className="flex flex-col justify-between gap-6 transition-colors duration-500 hover:bg-washi-deep">
      <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{kicker}</span>
      <div ref={ref} className="flex flex-col gap-2">
        <span className="font-en text-[2.7rem] font-light leading-none text-sumi lg:text-[3.2rem]">
          <CountUp to={value} decimals={decimals} prefix={prefix} suffix={suffix} start={inView} />
        </span>
        {note && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft/70">
            {note}
          </span>
        )}
      </div>
    </Cell>
  );
}

export function BentoHero() {
  const t = useTranslations('hero');
  const d = useTranslations('data');
  const locale = useLocale();
  const reduce = useReducedMotion() ?? false;
  const ja = locale === 'ja';

  return (
    <section className="relative overflow-hidden bg-washi pt-28 pb-16 lg:pt-32 lg:pb-20">
      <Grain opacity={0.02} />
      {/* faint warm wash, lower right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-2/3 w-1/2"
        style={{ background: 'radial-gradient(ellipse at 80% 90%, rgba(154,123,45,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-5 sm:px-8 lg:px-12">
        {/* Kintsugi-jointed bento grid — gaps are the gold seams */}
        <div
          className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: 'rgba(154,123,45,0.18)' }}
        >
          {/* ── A · The statement (2×2) ── */}
          <Cell
            reduce={reduce}
            delay={0}
            className="flex flex-col justify-between gap-10 p-9 sm:col-span-2 lg:row-span-2 lg:p-14"
          >
            {/* faint ensō motif */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-[26rem] w-[26rem] opacity-[0.05]"
              viewBox="0 0 100 100"
              fill="none"
            >
              <motion.path
                d="M75 26 C87 38 90 60 77 75 C64 90 38 91 22 79 C7 67 7 41 23 26 C37 13 60 12 74 22"
                stroke="#9a7b2d"
                strokeWidth={2}
                strokeLinecap="round"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.6, delay: 0.4, ease: [0.6, 0, 0.2, 1] }}
              />
            </svg>

            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <motion.span
                  className="h-px w-12 origin-left"
                  style={{ background: 'linear-gradient(90deg, #9a7b2d, transparent)' }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: EASE }}
                />
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold">{t('badge')}</span>
              </div>

              <h1
                className="font-en text-sumi"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.8rem)', lineHeight: 1.02, letterSpacing: '-0.015em' }}
              >
                <span className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className="block font-light"
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.45, ease: EASE }}
                  >
                    {t('titleLine1')}
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className="block italic text-gold-gradient"
                    style={{ fontWeight: 600 }}
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.62, ease: EASE }}
                  >
                    {t('titleLine2')}
                  </motion.span>
                </span>
              </h1>
            </div>

            <div className="relative flex flex-col gap-7">
              <p className="font-jp max-w-md text-sm font-light leading-[2] tracking-wide text-sumi-soft">
                {t('subtitle')}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group/btn relative overflow-hidden bg-sumi px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-washi"
                >
                  <span
                    className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-700 ease-out group-hover/btn:scale-x-100"
                    aria-hidden
                  />
                  <span className="relative">{t('ctaPrimary')}</span>
                </Link>
                <Link
                  href="/contact"
                  className="border border-gold/35 px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-sumi transition-colors duration-500 hover:border-gold hover:bg-gold/5"
                >
                  {t('ctaSecondary')}
                </Link>
              </div>
            </div>
          </Cell>

          {/* ── B · Live FX ── */}
          <Cell delay={0.1} reduce={reduce} className="flex flex-col justify-between gap-6 transition-colors duration-500 hover:bg-washi-deep">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{d('fxLabel')}</span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold/60" style={{ animation: reduce ? undefined : 'pulseDot 2s ease-in-out infinite' }} />
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-gold/70">{d('live')}</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-en text-[2.7rem] font-light leading-none text-sumi lg:text-[3.2rem]">
                <CountUp to={40.8} decimals={1} duration={1.4} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft/70">
                {ja ? '1 AED = 40.8 円' : '1 AED = 40.8 JPY'}
              </span>
            </div>
          </Cell>

          {/* ── C · Zero income tax ── */}
          <StatCell
            kicker={d('taxLabel')}
            value={0}
            suffix="%"
            note={ja ? '所得税・キャピタルゲイン' : 'Income & capital gains'}
            delay={0.16}
            reduce={reduce}
          />

          {/* ── D · Avg yield with mini bar ── */}
          <Cell delay={0.22} reduce={reduce} className="flex flex-col justify-between gap-6 transition-colors duration-500 hover:bg-washi-deep">
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold">{d('yieldLabel')}</span>
            <div className="flex flex-col gap-3">
              <span className="font-en text-[2.7rem] font-light leading-none text-sumi lg:text-[3.2rem]">
                <CountUp to={7} suffix="%" />
              </span>
              <div className="h-1 w-full overflow-hidden bg-sumi/8">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-gold to-gold-bright"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sumi-soft/70">
                {ja ? '東京の約2倍' : '~2× Tokyo gross'}
              </span>
            </div>
          </Cell>

          {/* ── E · Families advised ── */}
          <StatCell
            kicker={ja ? '支援した投資家' : 'Families advised'}
            value={120}
            suffix="+"
            note={ja ? 'ドバイ5年の実績' : '5 years in Dubai'}
            delay={0.28}
            reduce={reduce}
          />

          {/* ── F · Flagship: Heart of Europe (wide) ── */}
          <Link href="/heart-of-europe" className="contents">
            <Cell delay={0.34} reduce={reduce} className="flex items-center justify-between gap-6 transition-colors duration-500 hover:bg-washi-deep sm:col-span-2">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.28em] text-gold">
                  {ja ? '旗艦プロジェクト' : 'Flagship Project'}
                </span>
                <span className="font-jp text-xl font-bold text-sumi transition-colors group-hover:text-gold lg:text-2xl">
                  {ja ? 'ハート・オブ・ヨーロッパ' : 'The Heart of Europe'}
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sumi-soft transition-all duration-500 group-hover:gap-3 group-hover:text-gold">
                  {ja ? '詳しく見る' : 'Explore'} <span aria-hidden>→</span>
                </span>
              </div>
              <svg aria-hidden viewBox="0 0 100 100" className="h-24 w-24 shrink-0 opacity-80">
                <circle cx="50" cy="48" r="40" fill="none" stroke="rgba(154,123,45,0.2)" strokeWidth="0.4" strokeDasharray="2 3" />
                {ISLANDS.map(([x, y, r], i) => (
                  <circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 0 ? '#9a7b2d' : 'rgba(154,123,45,0.4)'} />
                ))}
              </svg>
            </Cell>
          </Link>

          {/* ── G · Two markets / by introduction (wide) ── */}
          <Cell delay={0.4} reduce={reduce} className="flex items-center justify-between gap-6 transition-colors duration-500 hover:bg-washi-deep sm:col-span-2">
            <div className="flex flex-col gap-2">
              <span className="font-jp text-2xl font-light tracking-wide text-sumi lg:text-3xl">
                {t('japan')} <span className="text-gold">⇄</span> {t('dubai')}
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-sumi-soft/70">
                {ja ? 'クロスボーダー資産設計' : 'Cross-border wealth'}
              </span>
            </div>
            <span
              className="font-jp shrink-0 px-5 py-2 text-[10px] tracking-[0.3em] text-gold"
              style={{ border: '1px solid rgba(154,123,45,0.25)', background: 'rgba(154,123,45,0.04)' }}
            >
              {t('badge').split('·')[0].trim()}
            </span>
          </Cell>
        </div>
      </div>
    </section>
  );
}
