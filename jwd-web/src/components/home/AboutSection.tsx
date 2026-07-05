'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

export function AboutSection() {
  const t = useTranslations('about');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden bg-washi py-28 lg:py-36">
      {/* Faint ensō in the background */}
      <svg
        aria-hidden
        className="absolute -right-[10%] top-1/2 hidden w-[46vmin] -translate-y-1/2 opacity-[0.05] lg:block"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100" cy="100" r="86" fill="none" stroke="#0097a7" strokeWidth="8"
          strokeLinecap="round" strokeDasharray="430 110" transform="rotate(-100 100 100)"
        />
      </svg>

      <div ref={ref} className="mx-auto grid max-w-screen-xl gap-14 px-7 lg:grid-cols-[5fr_7fr] lg:gap-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="text-[12px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp mt-6 text-3xl font-extrabold leading-snug text-sumi lg:text-[2.6rem]">
            {t('title')}
          </h2>
          <motion.span
            className="mt-8 block h-px"
            style={{ background: 'linear-gradient(90deg, #0097a7, transparent)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          />
        </motion.div>

        <div className="flex flex-col gap-7">
          {(['p1', 'p2'] as const).map((key, i) => (
            <motion.p
              key={key}
              className="text-lg font-light leading-[2.2] text-sumi-soft lg:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease: EASE }}
            >
              {t(key)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
