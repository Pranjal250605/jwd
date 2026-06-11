'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NIGHT_CLIP } from './seam';
import { WashiWorld } from './WashiWorld';
import { NightWorld } from './NightWorld';
import { KintsugiSeam } from './KintsugiSeam';
import { GoldParticles } from './GoldParticles';
import { DataStrip } from './DataStrip';
import { Grain } from '@/components/kintsugi/Grain';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * HERO — "Two Horizons"
 * A kintsugi seam fractures the viewport into two worlds: Japan (washi,
 * daylight) and Dubai (indigo night). The gold crack draws itself, the night
 * side breaks open through it, and gold dust drifts along the seam.
 */
export function TwoHorizons() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Mouse parallax ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 38, damping: 18 });
  const smy = useSpring(my, { stiffness: 38, damping: 18 });
  const washiX = useTransform(smx, (v) => v * -7);
  const washiY = useTransform(smy, (v) => v * -5);
  const nightX = useTransform(smx, (v) => v * -14);
  const nightY = useTransform(smy, (v) => v * -9);
  const contentX = useTransform(smx, (v) => v * 5);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label={t('subtitle')}
    >
      {/* ── World 1 · Japan (washi) — base layer ── */}
      <motion.div
        className="absolute inset-[-2%] z-0"
        style={{ x: washiX, y: washiY }}
      >
        <WashiWorld reduce={reduce} />
      </motion.div>

      {/* ── World 2 · Dubai (night) — clipped by the seam, cracks open ── */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: NIGHT_CLIP }}
      >
        <motion.div
          className="absolute inset-[-2%]"
          style={{ x: nightX, y: nightY }}
          initial={reduce ? false : { opacity: 0, x: 60, scale: 1.06 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.9, ease: EASE }}
        >
          <NightWorld reduce={reduce} />
        </motion.div>
      </div>

      {/* ── The kintsugi seam + gold dust ── */}
      <KintsugiSeam reduce={reduce} />
      <GoldParticles reduce={reduce} />

      {/* Mobile readability scrim */}
      <div
        className="absolute inset-0 z-20 md:hidden"
        style={{
          background:
            'linear-gradient(to bottom, rgba(250,249,245,0.82) 0%, rgba(250,249,245,0.55) 45%, rgba(250,249,245,0.05) 75%)',
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-30 w-full max-w-screen-2xl px-7 pb-32 pt-28 sm:px-10 lg:mx-auto lg:px-16"
        style={{ x: contentX }}
      >
        <div className="max-w-[44rem]">
          {/* Badge */}
          <motion.div
            className="mb-9 flex items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
          >
            <span
              className="h-px w-14"
              style={{ background: 'linear-gradient(90deg, #9a7b2d, transparent)' }}
            />
            <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
              {t('badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-jp font-extrabold leading-[1.12] tracking-[-0.015em] text-sumi"
            style={{ fontSize: 'clamp(2.5rem, 6.2vw, 5rem)' }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 1.5, ease: EASE }}
              >
                {t('titleLine1')}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-gold-gradient block"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 1.66, ease: EASE }}
              >
                {t('titleLine2')}
              </motion.span>
            </span>
          </h1>

          {/* EN subline */}
          <motion.p
            className="font-en mt-5 text-base italic tracking-wide text-sumi-soft sm:text-lg"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.95, ease: EASE }}
          >
            {t('subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-7 max-w-xl text-sm font-light leading-[2.1] text-sumi-soft sm:text-[0.95rem]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.05, ease: EASE }}
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.2, ease: EASE }}
          >
            <a
              href="#contact"
              className="group relative overflow-hidden bg-sumi px-9 py-4 text-xs uppercase tracking-[0.25em] text-washi transition-colors duration-500"
            >
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:translate-x-0"
                aria-hidden
              />
              <span className="relative">{t('ctaPrimary')}</span>
            </a>
            <a
              href="#guide"
              className="border border-gold/35 px-9 py-4 text-xs uppercase tracking-[0.25em] text-sumi transition-all duration-500 hover:border-gold hover:bg-gold/5"
            >
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Vertical world labels (xl+) ── */}
      <div className="absolute left-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="h-14 w-px bg-sumi/20" />
        <span
          className="font-jp text-[10px] tracking-[0.5em] text-sumi/35"
          style={{ writingMode: 'vertical-rl' }}
        >
          {t('japan')} · JAPAN
        </span>
      </div>
      <div className="absolute right-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="h-14 w-px bg-gold-bright/30" />
        <span
          className="font-jp text-[10px] tracking-[0.5em] text-gold-bright/50"
          style={{ writingMode: 'vertical-rl' }}
        >
          {t('dubai')} · DUBAI
        </span>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-24 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-sumi/40">
          {t('scroll')}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-sumi/10">
          <span
            className="absolute inset-0 bg-gold"
            style={{
              animation: reduce ? undefined : 'scrollHint 2.4s ease-in-out infinite',
            }}
          />
        </span>
      </motion.div>

      <DataStrip />
      <Grain opacity={0.028} />
    </section>
  );
}
