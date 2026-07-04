'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';

/** Abstract "The World" archipelago — scattered island dots. */
const ISLANDS: ReadonlyArray<[number, number, number]> = [
  [38, 30, 4], [46, 26, 3], [54, 28, 5], [62, 32, 3.4], [68, 38, 4.4],
  [34, 38, 3], [42, 36, 5.5], [50, 36, 4], [58, 40, 6], [66, 46, 3.6],
  [30, 46, 4.2], [38, 46, 3.2], [46, 44, 5], [54, 48, 4.6], [62, 52, 3],
  [36, 54, 3.8], [44, 54, 4.4], [52, 56, 3.4], [58, 58, 4.8], [48, 62, 3.2],
  [40, 62, 2.8], [56, 66, 3.6], [64, 60, 2.6], [32, 58, 2.4], [70, 52, 2.2],
];

export function HeartOfEuropeSection() {
  const t = useTranslations('hoe');

  return (
    <section
      id="heart-of-europe"
      className="relative overflow-hidden py-32 lg:py-44"
      style={{
        background:
          'linear-gradient(180deg, #070d1c 0%, #0e1830 55%, #131c33 100%)',
      }}
    >
      <Grain opacity={0.03} />

      {/* Sea glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(40,110,210,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 45% at 30% 80%, rgba(0,196,204,0.10) 0%, transparent 70%)',
        }}
      />

      {/* The World archipelago, abstract */}
      <svg
        aria-hidden
        className="absolute right-[-4%] top-1/2 hidden w-[44vmin] -translate-y-1/2 lg:block"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="46" r="40" fill="none" stroke="rgba(0,196,204,0.18)" strokeWidth="0.4" strokeDasharray="2 3" />
        {ISLANDS.map(([x, y, r], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={r}
            ry={r * 0.7}
            fill={i % 4 === 0 ? 'rgba(0,196,204,0.55)' : 'rgba(181,236,231,0.28)'}
          />
        ))}
        {/* the heart island */}
        <ellipse cx={48} cy={44} rx={3.4} ry={2.6} fill="#00c4cc" />
      </svg>

      <div className="relative mx-auto max-w-screen-xl px-7 lg:px-12">
        <div className="max-w-2xl">
          <Reveal className="mb-8 flex items-center gap-4">
            <span
              className="h-px w-14"
              style={{ background: 'linear-gradient(90deg, #00c4cc, transparent)' }}
            />
            <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/80">
              {t('label')}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-jp text-4xl font-extrabold leading-tight text-washi lg:text-[3.2rem]">
              {t('title')}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 text-sm font-light leading-[2.2] text-washi/55 lg:text-[0.95rem]">
              {t('desc')}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3">
            {(['type1', 'type2', 'type3'] as const).map((key) => (
              <span
                key={key}
                className="border border-gold-bright/25 px-5 py-2 font-jp text-xs tracking-[0.2em] text-gold-pale/80"
              >
                {t(key)}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="https://theworld-dubai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-bright px-8 py-4 text-xs uppercase tracking-[0.25em] text-night-deep transition-colors duration-500 hover:bg-gold-pale"
            >
              {t('link1')}
            </a>
            <a
              href="https://theheartofeurope.emirates.expert/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold-bright/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-gold-pale transition-all duration-500 hover:border-gold-bright hover:bg-gold-bright/10"
            >
              {t('link2')}
            </a>
          </Reveal>

          <Reveal delay={0.5} className="mt-8">
            <p className="font-en text-xs italic tracking-wide text-gold-bright/50">
              — {t('experience')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
