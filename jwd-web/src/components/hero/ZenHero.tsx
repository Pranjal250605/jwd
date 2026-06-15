'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Grain } from '@/components/kintsugi/Grain';

const EASE = [0.22, 1, 0.36, 1] as const;
const INK = [0.16, 1, 0.3, 1] as const;

/** Minimalist Japanese architecture — raked light, deep ma. */
const IMG =
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2600&q=80';

/**
 * 円相 — ensō. A single meditative brushstroke that draws itself, never quite
 * closing. The one deliberate gesture the whole hero is built around.
 */
const ENSO_PATH =
  'M75 26 C87 38 90 60 77 75 C64 90 38 91 22 79 C7 67 7 41 23 26 C37 13 60 12 74 22';

function Enso({ reduce }: { reduce: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="h-full w-full"
      fill="none"
    >
      <motion.path
        d={ENSO_PATH}
        stroke="#9a7b2d"
        strokeWidth={2.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{
          pathLength: { duration: 2.8, delay: 0.6, ease: [0.6, 0, 0.2, 1] },
          opacity: { duration: 1, delay: 0.6 },
        }}
      />
      {/* the brush lifting — a faint final dab of ink */}
      <motion.circle
        cx={74}
        cy={22}
        r={1.8}
        fill="#9a7b2d"
        initial={reduce ? { opacity: 0.4 } : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8, delay: 3.2 }}
      />
    </svg>
  );
}

/** A line that rises from behind a mask — ink settling onto paper. No blur. */
function InkLine({
  children,
  delay,
  reduce,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  reduce: boolean;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Slow-drifting gold motes — a few, light. */
const MOTES = [
  { x: '18%', y: '32%', d: 0, s: 2.5 },
  { x: '72%', y: '24%', d: 1.4, s: 1.8 },
  { x: '84%', y: '58%', d: 0.7, s: 2.2 },
  { x: '30%', y: '70%', d: 2.1, s: 1.6 },
  { x: '60%', y: '78%', d: 1.1, s: 2 },
];

export function ZenHero() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentO = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-washi"
      aria-label={t('subtitle')}
    >
      {/* ── Photographic ma — minimalist architecture under washi veils ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: reduce ? 0 : imgY }}>
        <motion.div
          className="absolute inset-[-4%]"
          initial={reduce ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        >
          <Image
            src={IMG}
            alt="Minimalist Japanese architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.5, filter: 'contrast(1.03) saturate(0.82)' }}
          />
        </motion.div>
      </motion.div>

      {/* Washi veils — keep the left readable, let the right breathe */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.6) 42%, rgba(250,249,245,0.12) 72%, rgba(250,249,245,0) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(250,249,245,0.5) 0%, transparent 26%, transparent 64%, rgba(250,249,245,0.75) 100%)',
        }}
      />
      {/* Warm ma-breathing glow, lower right */}
      <motion.div
        className="absolute bottom-0 right-0 z-0 h-[65%] w-[55%]"
        style={{
          background:
            'radial-gradient(ellipse at 75% 80%, rgba(154,123,45,0.10) 0%, transparent 65%)',
        }}
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Ensō — the single gesture ── */}
      <div className="pointer-events-none absolute right-[-6%] top-1/2 z-0 hidden h-[80vmin] w-[80vmin] -translate-y-1/2 md:block lg:right-[2%]">
        <Enso reduce={reduce} />
      </div>

      {/* Drifting gold motes */}
      {!reduce &&
        MOTES.map((m, i) => (
          <motion.span
            key={i}
            className="absolute z-0 rounded-full"
            style={{
              left: m.x,
              top: m.y,
              width: m.s,
              height: m.s,
              background: 'radial-gradient(circle, rgba(201,168,92,0.9), transparent 70%)',
            }}
            animate={{ y: [0, -14, 0], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 9 + m.s,
              delay: m.d,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-screen-xl px-7 pt-32 pb-24 sm:px-10 lg:px-16"
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentO }}
      >
        <div className="flex flex-col items-end justify-between gap-14 lg:flex-row lg:gap-20">
          {/* Left — the statement */}
          <div className="max-w-2xl">
            <motion.div
              className="mb-9 flex items-center gap-4"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.span
                className="h-px w-12 origin-left"
                style={{ background: 'linear-gradient(90deg, #9a7b2d, transparent)' }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
              />
              <span className="text-[10px] uppercase tracking-[0.42em] text-gold">
                {t('badge')}
              </span>
            </motion.div>

            <h1
              className="font-en text-sumi"
              style={{
                fontSize: 'clamp(2.7rem, 6.4vw, 5.4rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
              }}
            >
              <InkLine delay={0.5} reduce={reduce} className="font-light">
                {t('titleLine1')}
              </InkLine>
              <InkLine
                delay={0.78}
                reduce={reduce}
                className="italic text-gold-gradient"
              >
                {t('titleLine2')}
              </InkLine>
            </h1>

            <motion.div
              className="mt-8 h-px w-28 origin-left"
              style={{ background: 'linear-gradient(90deg, rgba(154,123,45,0.5), transparent)' }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
            />

            <motion.p
              className="font-jp mt-8 text-base font-light tracking-wide text-sumi-soft sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.35, ease: INK }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.p
              className="mt-6 max-w-lg text-sm font-light leading-[2.1] text-sumi-soft/90"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: INK }}
            >
              {t('description')}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.65, ease: INK }}
            >
              <Link
                href="/contact"
                className="group relative overflow-hidden bg-sumi px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-washi"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-700 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
                <span className="relative">{t('ctaPrimary')}</span>
              </Link>
              <Link
                href="/contact"
                className="border border-gold/35 px-9 py-4 text-[11px] uppercase tracking-[0.25em] text-sumi transition-colors duration-500 hover:border-gold hover:bg-gold/5"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>
          </div>

          {/* Right — the quiet trust column */}
          <motion.div
            className="hidden shrink-0 flex-col items-end gap-7 border-l border-gold/15 py-3 pl-10 text-right lg:flex"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 1.5, ease: EASE }}
          >
            <p className="font-jp text-sm font-light leading-loose tracking-wide text-sumi-soft">
              {t('japan')} <span className="text-gold">⇄</span> {t('dubai')}
            </p>
            <span
              className="font-jp text-[10px] tracking-[0.32em] px-5 py-2 text-gold"
              style={{ border: '1px solid rgba(154,123,45,0.25)', background: 'rgba(154,123,45,0.04)' }}
            >
              {t('badge').split('·')[0].trim()}
            </span>
            <div className="flex flex-col items-end gap-1">
              <span className="font-en text-3xl font-light text-sumi">AED/JPY</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sumi-soft/70">
                {t('subtitle').includes('日本') ? 'Live FX · 連動' : 'Pegged to USD'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Vertical side label */}
      <motion.div
        className="absolute right-7 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.4, delay: 2 }}
      >
        <span className="h-16 w-px bg-gold/40" />
        <span
          className="font-en text-[9px] tracking-[0.5em] text-gold"
          style={{ writingMode: 'vertical-rl' }}
        >
          Harmony · Legacy · Continuity
        </span>
        <span className="h-16 w-px bg-gold/40" />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        style={{ opacity: reduce ? 1 : contentO }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-sumi/40">
          {t('scroll')}
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-sumi/10">
          <span
            className="absolute inset-0 bg-gold"
            style={{ animation: reduce ? undefined : 'scrollHint 2.6s ease-in-out infinite' }}
          />
        </span>
      </motion.div>

      <Grain opacity={0.022} />
    </section>
  );
}
