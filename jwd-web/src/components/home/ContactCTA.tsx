'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactCTA() {
  const t = useTranslations('contact');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="relative overflow-hidden bg-washi py-32 lg:py-44">
      {/* Kintsugi line crossing the section */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 72 L18 68 L26 71 L41 64 L52 67 L68 58 L79 61 L100 52"
          fill="none"
          stroke="#00c4cc"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      <div ref={ref} className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-7 text-center">
        <motion.span
          className="border border-gold/30 bg-gold/5 px-5 py-2 font-jp text-[15px] tracking-[0.35em] text-gold"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {t('notice')}
        </motion.span>

        <motion.h2
          className="font-jp text-3xl font-extrabold leading-snug text-sumi lg:text-[2.8rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          className="max-w-xl text-xl font-light leading-loose text-sumi-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          {t('desc')}
        </motion.p>

        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        >
          <a
            href="#contact"
            className="group relative overflow-hidden bg-sumi px-10 py-4 text-sm uppercase tracking-[0.25em] text-washi"
          >
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:translate-x-0"
              aria-hidden
            />
            <span className="relative">{t('ctaPrimary')}</span>
          </a>
          {/* TODO: real wa.me / lin.ee links once client provides numbers */}
          <a
            href="#whatsapp"
            className="border border-gold/35 px-8 py-4 text-sm uppercase tracking-[0.25em] text-sumi transition-all duration-500 hover:border-gold hover:bg-gold/5"
          >
            {t('ctaWhatsApp')}
          </a>
          <a
            href="#line"
            className="border border-gold/35 px-8 py-4 text-sm uppercase tracking-[0.25em] text-sumi transition-all duration-500 hover:border-gold hover:bg-gold/5"
          >
            {t('ctaLine')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
