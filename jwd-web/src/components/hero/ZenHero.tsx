'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CountUp } from '@/components/kintsugi/CountUp';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: 0, suffix: '%', en: 'Income tax', ja: '所得税' },
  { value: 7, suffix: '%', en: 'Avg. Dubai yield', ja: '平均利回り' },
  { value: 10, prefix: '¥', suffix: 'B+', en: 'Transaction volume', ja: '取引総額' },
  { value: 120, suffix: '+', en: 'Families advised', ja: '支援した家族' },
];
const SOURCES = ['Bayut', 'Property Finder', 'Equiti', 'AIX', 'The World'];

/**
 * Home cover — the zen photograph (minimalist Japanese architecture) full-bleed
 * beneath washi veils, with the headline, CTAs, stats and source strip.
 */
export function ZenHero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const ja = locale === 'ja';
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-washi">
      {/* ── zen cover photograph ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: reduce ? 0 : imgY }}>
        <motion.div
          className="absolute inset-[-4%]"
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image
            src="/zen-cover.png"
            alt="Minimalist Japanese architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.6, filter: 'contrast(1.04) saturate(0.9)' }}
          />
        </motion.div>
      </motion.div>

      {/* washi veils — keep the left readable, let the image breathe right */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(100deg, rgba(250,249,245,0.94) 0%, rgba(250,249,245,0.7) 38%, rgba(250,249,245,0.25) 66%, rgba(250,249,245,0.05) 100%)' }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, rgba(250,249,245,0.55) 0%, transparent 24%, transparent 55%, rgba(250,249,245,0.85) 100%)' }}
      />
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 sm:px-10 lg:px-16">
        {/* ── statement ── */}
        <div className="flex min-h-[88vh] items-center pt-28">
          <div className="max-w-2xl">
            <motion.div
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-sumi/10 bg-washi/70 px-4 py-1.5 backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-sumi-soft">{t('badge')}</span>
            </motion.div>

            <h1 className="font-en font-semibold text-sumi" style={{ fontSize: 'clamp(2.8rem, 6.6vw, 5.6rem)', lineHeight: 1.12, letterSpacing: '-0.035em' }}>
              <motion.span
                className="block"
                initial={reduce ? false : { opacity: 0, y: '0.4em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
              >
                {t('titleLine1')}
              </motion.span>
              <motion.span
                className="block pb-[0.12em] text-gold-gradient"
                initial={reduce ? false : { opacity: 0, y: '0.4em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
              >
                {t('titleLine2')}
              </motion.span>
            </h1>

            <motion.p className="mt-7 max-w-lg text-base font-light leading-relaxed text-sumi-soft"
              initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: EASE }}>
              {t('description')}
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.62, ease: EASE }}>
              <Link href="/contact" className="group relative overflow-hidden rounded-full bg-sumi px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-washi">
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
                <span className="relative">{t('ctaPrimary')}</span>
              </Link>
              <Link href="/contact" className="rounded-full border border-sumi/15 bg-washi/60 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-sumi backdrop-blur-sm transition-colors duration-300 hover:border-gold/50 hover:text-gold">
                {t('ctaSecondary')}
              </Link>
            </motion.div>

            <motion.p className="font-jp mt-7 text-xs font-light tracking-wide text-sumi-soft/80"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.8 }}>
              {t('subtitle')}
            </motion.p>
          </div>
        </div>

        {/* ── stats bar ── */}
        <div ref={statsRef} className="relative pb-14">
          <div className="grid grid-cols-2 gap-y-10 rounded-2xl border border-sumi/8 bg-washi/85 py-9 backdrop-blur-md lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div key={i} className={`flex flex-col items-center gap-2 px-4 ${i > 0 ? 'lg:border-l lg:border-sumi/8' : ''}`}
                initial={reduce ? false : { opacity: 0, y: 16 }} animate={statsInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}>
                <span className="font-en text-4xl font-semibold tracking-tight text-sumi lg:text-[2.8rem]">
                  <CountUp to={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} start={statsInView} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-soft">{ja ? s.ja : s.en}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── source strip ── */}
        <div className="pb-16">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-sumi-soft/60">
            {ja ? '信頼できる情報源と提携' : 'Curated across trusted sources'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {SOURCES.map((s) => (
              <span key={s} className="font-sans text-sm font-medium tracking-wide text-sumi/35 transition-colors duration-300 hover:text-sumi/70">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
