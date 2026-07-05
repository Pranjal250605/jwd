'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';

const CHIPS = ['chip1', 'chip2', 'chip3'] as const;

export function StoriesSection() {
  const t = useTranslations('stories');

  return (
    <section id="stories" className="relative overflow-hidden bg-night-deep py-28 lg:py-36">
      <Grain opacity={0.03} />
      {/* gold ambient */}
      <div
        className="absolute bottom-0 left-1/3 h-[260px] w-[640px]"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,196,204,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 px-7 text-center">
        <Reveal>
          <span className="text-[12px] uppercase tracking-[0.38em] text-gold-bright/70">
            {t('label')}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <blockquote className="font-jp text-2xl font-bold leading-relaxed text-washi lg:text-[2.1rem]">
            <span className="font-en text-4xl italic text-gold-bright/60">“</span>
            {t('quote')}
            <span className="font-en text-4xl italic text-gold-bright/60">”</span>
          </blockquote>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col items-center gap-1">
          <span className="font-en text-base italic tracking-wide text-gold-pale">
            {t('name')}
          </span>
          <span className="text-[12px] tracking-[0.3em] text-washi/40">
            {t('role')}
          </span>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-wrap items-center justify-center gap-3">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="border border-gold-bright/25 px-5 py-2.5 font-jp text-xs tracking-[0.15em] text-gold-pale/80 transition-colors duration-500 hover:border-gold-bright"
            >
              {t(chip)}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
