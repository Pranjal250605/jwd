'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { services } from '@/content/services';

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="consulting" className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <div ref={ref} className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <motion.div
          className="mb-16 flex flex-col items-center gap-5 text-center lg:mb-20"
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-sumi lg:text-[2.4rem]">
            {t('title')}
          </h2>
          <p className="max-w-2xl text-sm font-light leading-loose text-sumi-soft">
            {t('intro')}
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden border border-sumi/8 bg-sumi/8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.a
              key={service.id}
              href={`#${service.id}`}
              className="group relative flex flex-col gap-4 bg-washi-deep p-8 transition-colors duration-500 hover:bg-washi"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: EASE }}
            >
              <span className="font-mono text-[10px] text-gold/55">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-jp text-lg font-bold text-sumi transition-colors duration-500 group-hover:text-gold">
                  {locale === 'ja' ? service.titleJa : service.titleEn}
                </h3>
                <p className="font-en mt-1 text-[11px] italic tracking-wide text-gold/70">
                  {service.subtitle}
                </p>
              </div>
              <p className="text-xs font-light leading-[1.9] text-sumi-soft">
                {locale === 'ja' ? service.descJa : service.descEn}
              </p>
              {/* kintsugi underline */}
              <span className="mt-auto block h-px w-6 bg-gold/30 transition-all duration-700 group-hover:w-full group-hover:bg-gold/60" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
