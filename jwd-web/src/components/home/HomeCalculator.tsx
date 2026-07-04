'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { YieldCalculator } from '@/components/sub/Interactive';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';

const ACCENT = '#0097a7';

/** Interactive moment on the homepage — drag the sliders, watch the numbers. */
export function HomeCalculator() {
  const locale = useLocale();
  const ja = locale === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';

  return (
    <section className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <PremiumBackdrop tone="deep" />
      <div className="relative z-10 mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-12 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {ja ? 'ためしに、動かす' : 'Try it yourself'}
          </span>
          <h2 className={`${display} max-w-2xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {ja ? 'ドバイ不動産の収入を、試算する' : 'Estimate your Dubai rental income'}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-xl text-sm font-light leading-loose text-sumi-soft">
            {ja
              ? '物件価格と想定利回りをスライダーで動かすと、年間賃料と円換算がその場で変わります。'
              : 'Drag the property price and assumed yield — annual rent and the yen conversion update on the spot.'}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <YieldCalculator accent={ACCENT} dark={false} ja={ja} />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-xs font-light italic text-sumi-soft/80">
            {ja
              ? '※ 簡易試算です。実際の利回り・税務は個別相談でご確認ください。'
              : '※ A simplified estimate. Actual yields and tax treatment require consultation.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
