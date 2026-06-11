'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
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

/* ── Per-character 3D reveal — each glyph rises out of the mist ────────── */
function SplitChars({
  text,
  delay,
  reduce,
}: {
  text: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <span aria-label={text} role="text" style={{ perspective: 800 }} className="inline-block">
      {[...text].map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block will-change-transform"
          initial={
            reduce
              ? false
              : { y: '0.65em', opacity: 0, rotateX: 60, filter: 'blur(10px)' }
          }
          animate={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease: EASE }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * HERO — "Two Horizons"
 *
 * Act I   · The Void: indigo darkness, gold dust, a calligraphy stroke of
 *           light draws the kintsugi crack.
 * Act II  · The Opening: light bleeds through the crack, the darkness
 *           dissolves and two worlds flood in — Japan daylight, Dubai night.
 * Act III · The Passage: scrolling pulls the visitor *through* the crack in
 *           a burst of golden light. Dreams, opening.
 */
export function TwoHorizons() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion() ?? false;
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  /* ── Act III: scroll passage through the crack ── */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });
  const worldScale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1.05, 2.6]);
  const worldOpacityOut = useTransform(scrollYProgress, [0.8, 1], [1, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 0.38], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const gateOpacity = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);
  const stripFade = useTransform(scrollYProgress, [0.12, 0.4], [1, 0]);

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
    const rect = stickyRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      ref={outerRef}
      className="relative"
      style={{ height: reduce ? '100vh' : '220vh' }}
      aria-label={t('subtitle')}
    >
      <div
        ref={stickyRef}
        onMouseMove={onMouseMove}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        {/* ════ THE WORLDS (scaled as one — the zoom into the crack) ════ */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: reduce ? 1 : worldScale,
            opacity: reduce ? 1 : worldOpacityOut,
            transformOrigin: '53% 42%',
          }}
        >
          {/* World 1 · Japan (washi) — base layer */}
          <motion.div
            className="absolute inset-[-2%] z-0"
            style={{ x: washiX, y: washiY }}
          >
            <WashiWorld reduce={reduce} />
          </motion.div>

          {/* World 2 · Dubai (night) — clipped by the seam */}
          <div className="absolute inset-0 z-10" style={{ clipPath: NIGHT_CLIP }}>
            <motion.div
              className="absolute inset-[-2%]"
              style={{ x: nightX, y: nightY }}
              initial={reduce ? false : { opacity: 0, x: 70, scale: 1.08 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.7, delay: 1.15, ease: EASE }}
            >
              <NightWorld reduce={reduce} />
            </motion.div>
          </div>

          {/* Act I → II · The Void: darkness that dissolves as light enters */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: '#070d1c' }}
            initial={reduce ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.6, delay: 1.05, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* The kintsugi seam + gold dust (zoom with the worlds) */}
          <KintsugiSeam reduce={reduce} />
          <GoldParticles reduce={reduce} />
        </motion.div>

        {/* Vignette — quiet focus toward the center */}
        <div
          className="pointer-events-none absolute inset-0 z-[24]"
          style={{
            background:
              'radial-gradient(ellipse 90% 85% at 50% 45%, transparent 55%, rgba(18,22,30,0.16) 100%)',
          }}
        />

        {/* Mobile readability scrim */}
        <motion.div
          className="absolute inset-0 z-[26] md:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          style={{
            background:
              'linear-gradient(to bottom, rgba(250,249,245,0.82) 0%, rgba(250,249,245,0.55) 45%, rgba(250,249,245,0.05) 75%)',
          }}
        />

        {/* Periodic light sweep — a breath of silk across both worlds */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[28]"
            style={{
              background:
                'linear-gradient(100deg, transparent 44%, rgba(230,217,184,0.13) 50%, transparent 56%)',
            }}
            initial={{ x: '-120%' }}
            animate={{ x: '120%' }}
            transition={{
              duration: 3.2,
              delay: 4.5,
              repeat: Infinity,
              repeatDelay: 6,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* ════ CONTENT ════ */}
        <motion.div
          className="relative z-30 w-full max-w-screen-2xl px-7 pb-32 pt-28 sm:px-10 lg:mx-auto lg:px-16"
          style={{
            x: contentX,
            y: reduce ? 0 : contentY,
            opacity: reduce ? 1 : contentOpacity,
          }}
        >
          <div className="max-w-[44rem]">
            {/* Badge */}
            <motion.div
              className="mb-9 flex items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7, ease: EASE }}
            >
              <span
                className="h-px w-14"
                style={{ background: 'linear-gradient(90deg, #9a7b2d, transparent)' }}
              />
              <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline — line 1 rises character by character */}
            <h1
              className="font-jp font-extrabold leading-[1.12] tracking-[-0.015em] text-sumi"
              style={{ fontSize: 'clamp(2.5rem, 6.2vw, 5rem)' }}
            >
              <span className="block">
                <SplitChars text={t('titleLine1')} delay={1.85} reduce={reduce} />
              </span>
              {/* line 2 sweeps in as one golden stroke */}
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="text-gold-gradient block"
                  initial={reduce ? false : { y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.0, delay: 2.45, ease: EASE }}
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
              transition={{ duration: 1.1, delay: 2.7, ease: EASE }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Description */}
            <motion.p
              className="mt-7 max-w-xl text-sm font-light leading-[2.1] text-sumi-soft sm:text-[0.95rem]"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.85, ease: EASE }}
            >
              {t('description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 3.0, ease: EASE }}
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

        {/* Vertical world labels (xl+) */}
        <motion.div
          className="absolute left-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
          style={{ opacity: reduce ? 1 : contentOpacity }}
        >
          <span className="h-14 w-px bg-sumi/20" />
          <span
            className="font-jp text-[10px] tracking-[0.5em] text-sumi/35"
            style={{ writingMode: 'vertical-rl' }}
          >
            {t('japan')} · JAPAN
          </span>
        </motion.div>
        <motion.div
          className="absolute right-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
          style={{ opacity: reduce ? 1 : contentOpacity }}
        >
          <span className="h-14 w-px bg-gold-bright/30" />
          <span
            className="font-jp text-[10px] tracking-[0.5em] text-gold-bright/50"
            style={{ writingMode: 'vertical-rl' }}
          >
            {t('dubai')} · DUBAI
          </span>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-24 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          style={{ opacity: reduce ? 1 : contentOpacity }}
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

        {/* Act III · The golden gate — light floods as you pass through */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[45]"
            style={{
              opacity: gateOpacity,
              background:
                'radial-gradient(circle at 53% 42%, #e6d9b8 0%, rgba(201,168,92,0.92) 26%, rgba(154,123,45,0.65) 46%, rgba(16,24,43,0.97) 80%)',
            }}
          />
        )}

        <DataStrip fade={reduce ? undefined : stripFade} />
        <Grain opacity={0.028} />
      </div>
    </section>
  );
}
