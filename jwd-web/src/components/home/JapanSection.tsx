'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';

const ITEMS = ['item1', 'item2', 'item3', 'item4'] as const;

export function JapanSection() {
  const t = useTranslations('japanProps');

  return (
    <section id="japan-properties" className="relative overflow-hidden bg-washi py-28 lg:py-36">
      {/* faint rising sun */}
      <div
        className="absolute -left-[8%] top-[10%] h-[40vmin] w-[40vmin] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(0,196,204,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-5">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-sumi lg:text-[2.4rem]">
            {t('title')}
          </h2>
        </Reveal>

        <div className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={item} delay={0.12 + i * 0.09}>
              <div className="group border-l border-gold/25 pl-7 transition-colors duration-500 hover:border-gold">
                <h3 className="font-jp text-lg font-bold text-sumi">
                  {t(`${item}Title`)}
                </h3>
                <p className="mt-3 text-[0.85rem] font-light leading-[2] text-sumi-soft">
                  {t(`${item}Text`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
