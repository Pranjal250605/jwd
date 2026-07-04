'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Grain } from '@/components/kintsugi/Grain';

const EASE = [0.16, 1, 0.3, 1] as const;
const CARDS = ['card1', 'card2', 'card3'] as const;

export function WhyDubaiSection() {
  const t = useTranslations('whyDubai');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-dubai" className="relative overflow-hidden bg-night py-28 lg:py-36">
      <Grain opacity={0.03} />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 10%, rgba(0,196,204,0.55) 50%, transparent 90%)',
        }}
      />

      <div ref={ref} className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <motion.div
          className="mb-16 flex flex-col gap-5 lg:mb-20"
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/70">
            {t('label')}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-washi lg:text-[2.6rem]">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {CARDS.map((card, i) => (
            <motion.article
              key={card}
              className="group relative border-t border-gold-bright/15 pt-8"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.16, ease: EASE }}
            >
              {/* gold seam grows on hover */}
              <span className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold-bright to-transparent transition-transform duration-700 group-hover:scale-x-100" />
              <span className="font-mono text-xs text-gold-bright/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-jp mt-4 text-xl font-bold text-washi">
                {t(`${card}Title`)}
              </h3>
              <p className="mt-5 text-[0.84rem] font-light leading-[2.1] text-washi/50">
                {t(`${card}Text`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
