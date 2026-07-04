'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';

const CHIPS = ['chip1', 'chip2', 'chip3', 'chip4', 'chip5'] as const;

export function FamilyOfficeSection() {
  const t = useTranslations('family');

  return (
    <section id="family-office" className="relative overflow-hidden bg-night py-28 lg:py-36">
      <Grain opacity={0.03} />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 10%, rgba(0,196,204,0.5) 50%, transparent 90%)',
        }}
      />

      <div className="relative mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-7 text-center lg:px-12">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/70">
            {t('label')}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-jp text-3xl font-extrabold text-washi lg:text-[2.6rem]">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-2xl text-sm font-light leading-[2.1] text-washi/55">
            {t('intro')}
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="border border-gold-bright/25 px-5 py-2.5 font-jp text-xs tracking-[0.15em] text-gold-pale/80 transition-colors duration-500 hover:border-gold-bright hover:text-gold-pale"
            >
              {t(chip)}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
