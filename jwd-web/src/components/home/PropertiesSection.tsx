'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { listings } from '@/content/properties';

const aed = (n: number) => `AED ${n.toLocaleString('en-US')}`;

export function PropertiesSection() {
  const t = useTranslations('properties');
  const locale = useLocale();
  const ja = locale === 'ja';

  return (
    <section id="properties" className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-5 lg:mb-18">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp text-3xl font-extrabold text-sumi lg:text-[2.4rem]">
            {t('title')}
          </h2>
          <p className="max-w-xl text-sm font-light leading-loose text-sumi-soft">
            {t('intro')}
          </p>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.08}>
              <Link href={`/property/${p.id}`} className="group flex h-full flex-col border border-sumi/8 bg-washi transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_18px_50px_-24px_rgba(32,37,31,0.35)]">
                {/* code-drawn visual */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{
                    background: `linear-gradient(150deg, ${p.hues[0]} 0%, ${p.hues[1]} 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 55% at 50% 100%, rgba(201,168,92,0.35) 0%, transparent 70%)',
                    }}
                  />
                  <span className="font-en absolute bottom-4 left-5 text-lg italic tracking-wide text-washi/90">
                    {p.area}
                  </span>
                  {/* yield badge */}
                  <span className="absolute right-4 top-4 bg-gold-bright/90 px-3 py-1.5 font-mono text-[11px] font-medium text-night-deep">
                    {t('yieldLabel')} {p.yieldPct}%
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold/70">
                    {ja ? p.typeJa : p.typeEn}
                  </span>
                  <h3 className="font-jp text-base font-bold leading-snug text-sumi">
                    {ja ? p.nameJa : p.nameEn}
                  </h3>
                  <p className="font-mono text-sm text-sumi-soft">{aed(p.priceAed)}</p>
                  <div className="mt-auto pt-3 text-[11px] uppercase tracking-[0.16em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    {ja ? '詳細を見る →' : 'View details →'}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-8">
          <p className="text-[10px] tracking-[0.1em] text-sumi/35">{t('note')}</p>
        </Reveal>
      </div>
    </section>
  );
}
