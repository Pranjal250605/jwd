'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CountUp } from '@/components/kintsugi/CountUp';
import { SilkRibbon } from './SilkRibbon';

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: 0, suffix: '%', en: 'Income tax', ja: '所得税' },
  { value: 7, suffix: '%', en: 'Avg. Dubai yield', ja: '平均利回り' },
  { value: 10, prefix: '¥', suffix: 'B+', en: 'Transaction volume', ja: '取引総額' },
  { value: 120, suffix: '+', en: 'Families advised', ja: '支援した家族' },
];

const SOURCES: { name: string; url: string }[] = [
  { name: 'Bayut', url: 'https://www.bayut.com/' },
  { name: 'Property Finder', url: 'https://www.propertyfinder.ae/' },
  { name: 'Equiti', url: 'https://www.equiti.com/sc-en/' },
  { name: 'AIX', url: 'https://www.aixinvestment.com/' },
  { name: 'The World', url: 'https://theworld-dubai.com/' },
];

export function StripeHero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const ja = locale === 'ja';
  const reduce = useReducedMotion() ?? false;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section className="relative overflow-hidden bg-washi">
      <SilkRibbon />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 sm:px-10 lg:px-16">
        {/* ── Hero statement (left-aligned, ribbon sweeps right) ── */}
        <div className="flex min-h-[82vh] items-center pt-28 lg:pt-24">
          <div className="max-w-2xl">
            <motion.div
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-sumi/10 bg-washi/70 px-4 py-1.5 backdrop-blur-sm"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-sumi-soft">
                {t('badge')}
              </span>
            </motion.div>

            <h1
              className="font-sans font-semibold text-sumi"
              style={{ fontSize: 'clamp(2.8rem, 6.6vw, 5.6rem)', lineHeight: 1.0, letterSpacing: '-0.035em' }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15, ease: EASE }}
                >
                  {t('titleLine1')}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block text-gold-gradient"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: EASE }}
                >
                  {t('titleLine2')}
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="mt-7 max-w-lg text-base font-light leading-relaxed text-sumi-soft"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              {t('description')}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
            >
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-full bg-sumi px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-washi"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
                <span className="relative">{t('ctaPrimary')}</span>
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-sumi/15 bg-washi/60 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-sumi backdrop-blur-sm transition-colors duration-300 hover:border-gold/50 hover:text-gold"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>

            <motion.p
              className="font-jp mt-7 text-xs font-light tracking-wide text-sumi-soft/80"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8 }}
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div ref={statsRef} className="relative pb-14">
          <div className="grid grid-cols-2 gap-y-10 rounded-2xl border border-sumi/8 bg-washi/85 py-9 backdrop-blur-md lg:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                className={`flex flex-col items-center gap-2 px-4 ${i > 0 ? 'lg:border-l lg:border-sumi/8' : ''}`}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <span className="font-sans text-4xl font-semibold tracking-tight text-sumi lg:text-[2.8rem]">
                  <CountUp to={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} start={statsInView} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-soft">
                  {ja ? s.ja : s.en}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Source / trust strip ── */}
        <div className="pb-16">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-sumi-soft/60">
            {ja ? '信頼できる情報源と提携' : 'Curated across trusted sources'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {SOURCES.map((s) => {
              const isHighlighted = s.name === 'Equiti' || s.name === 'AIX';
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-sans text-sm font-medium tracking-wide transition-all duration-300 ${
                    isHighlighted
                      ? 'rounded-full border border-[#c9a85c]/35 bg-[#c9a85c]/10 px-4 py-1.5 text-[#c9a85c] hover:bg-[#c9a85c]/18'
                      : 'text-sumi/35 hover:text-sumi/70'
                  }`}
                >
                  {s.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
