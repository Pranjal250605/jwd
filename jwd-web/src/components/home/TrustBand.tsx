'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CountUp } from '@/components/kintsugi/CountUp';
import { Grain } from '@/components/kintsugi/Grain';

const EASE = [0.16, 1, 0.3, 1] as const;

// PLACEHOLDER figures — replace with client-confirmed numbers before launch.
const STATS = [
  { labelKey: 'stat1Label', suffixKey: 'stat1Suffix', value: 8, decimals: 0 },
  { labelKey: 'stat2Label', suffixKey: 'stat2Suffix', value: 120, decimals: 0 },
  { labelKey: 'stat3Label', suffixKey: 'stat3Suffix', value: 200, decimals: 0 },
  { labelKey: 'stat4Label', suffixKey: 'stat4Suffix', value: 6.9, decimals: 1 },
] as const;

export function TrustBand() {
  const t = useTranslations('trust');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-night py-28">
      <Grain opacity={0.03} />
      {/* Kintsugi divider */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 10%, rgba(0,196,204,0.6) 50%, transparent 90%)',
        }}
      />

      <div className="mx-auto max-w-screen-xl px-7 lg:px-12" ref={ref}>
        <motion.div
          className="mb-16 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="text-[12px] uppercase tracking-[0.4em] text-gold-bright/70">
            {t('subheading')}
          </span>
          <h2 className="font-jp text-3xl font-bold text-washi lg:text-4xl">
            {t('heading')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              className="flex flex-col items-center gap-3 text-center"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              <span className="font-mono text-4xl text-gold-bright lg:text-5xl">
                <CountUp
                  to={stat.value}
                  decimals={stat.decimals}
                  start={inView}
                  duration={2}
                  suffix={t(stat.suffixKey)}
                />
              </span>
              <span className="max-w-[12rem] text-[13px] leading-relaxed tracking-[0.12em] text-washi/45">
                {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
