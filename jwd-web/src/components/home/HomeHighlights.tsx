'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocale } from 'next-intl';
import { CountUp } from '@/components/kintsugi/CountUp';
import { Grain } from '@/components/kintsugi/Grain';
import { home } from '@/content/home';
import type { L } from '@/content/types';

const EASE = [0.16, 1, 0.3, 1] as const;
type Lang = 'ja' | 'en';

export function HomeHighlights() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.highlights;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-night py-24 lg:py-32">
      <Grain opacity={0.03} />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 10%, rgba(201,168,92,0.55) 50%, transparent 90%)',
        }}
      />
      <div ref={ref} className="relative mx-auto max-w-screen-xl px-7 lg:px-12">
        <div className="mb-16 flex flex-col gap-5">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/75">
            {tx(c.label)}
          </span>
          <h2 className="font-jp max-w-2xl text-3xl font-extrabold leading-snug text-washi lg:text-[2.4rem]">
            {tx(c.title)}
          </h2>
          <p className="max-w-xl text-sm font-light leading-loose text-washi/55">
            {tx(c.intro)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {c.stats.map((s, i) => (
            <motion.div
              key={i}
              className="border-t pt-6"
              style={{ borderColor: 'rgba(201,168,92,0.25)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <div className="font-en text-4xl font-light text-washi lg:text-5xl">
                <CountUp
                  to={s.value}
                  decimals={s.decimals ?? 0}
                  start={inView}
                  prefix={s.prefix ?? ''}
                  suffix={s.suffix ?? ''}
                />
              </div>
              <div className="mt-3 text-[0.7rem] uppercase tracking-[0.18em] text-washi/55">
                {tx(s.label)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
