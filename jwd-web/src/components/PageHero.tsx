'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { SilkRibbon } from '@/components/hero/SilkRibbon';
import { Motif } from '@/components/sub/Motif';
import { DEFAULT_THEME, type MotifKey } from '@/content/themes';

const EASE = [0.22, 1, 0.36, 1] as const;

interface PageHeroProps {
  /** kept for caller compatibility — no longer rendered as a backdrop */
  image?: string;
  alt?: string;
  label: string;
  title: string;
  subtitle?: string;
  accent?: string;
  motif?: MotifKey;
  ribbon?: string[];
}

/**
 * Section / subsection hero in the house style — the same silk-ribbon gradient
 * as the homepage, left-aligned, with a locale-aware display face (modern sans
 * for English, Shippori serif for Japanese). No background photography.
 */
export function PageHero({
  label,
  title,
  subtitle,
  accent = DEFAULT_THEME.accent,
  motif = DEFAULT_THEME.motif,
  ribbon = DEFAULT_THEME.ribbon,
}: PageHeroProps) {
  const reduce = useReducedMotion() ?? false;
  const locale = useLocale();
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';

  return (
    <section className="relative flex min-h-[74vh] items-center overflow-hidden bg-washi">
      <SilkRibbon colors={ribbon} />
      <motion.div
        className="absolute right-[-6%] top-0 z-0 h-[44rem] w-[44rem]"
        initial={reduce ? false : { opacity: 0, scale: 0.84, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { rotate: [0, 6, 0] }}
          transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Motif motif={motif} accent={accent} className="h-full w-full" opacity={0.13} />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-7 pt-32 pb-16 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <motion.div
            className="mb-7 flex items-center gap-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <motion.span
              className="h-px w-12 origin-left"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            />
            <span className="text-[10px] uppercase tracking-[0.38em]" style={{ color: accent }}>
              {label}
            </span>
          </motion.div>

          <h1
            className={`${display} font-semibold leading-[1.05] tracking-[-0.02em] text-sumi`}
            style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.6rem)' }}
          >
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
              >
                {title}
              </motion.span>
            </span>
          </h1>

          {subtitle && (
            <motion.p
              className="mt-6 max-w-xl text-base font-light leading-relaxed text-sumi-soft"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
