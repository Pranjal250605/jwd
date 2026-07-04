'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight, MapPin, BedDouble, Ruler } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import { listings } from '@/content/properties';

const ACCENT = '#0097a7';
const aed = (n: number) => `AED ${n.toLocaleString('en-US')}`;

export function PropertiesSection() {
  const t = useTranslations('properties');
  const locale = useLocale();
  const ja = locale === 'ja';
  const display = ja ? 'font-jp' : 'font-sans';

  return (
    <section id="properties" className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <PremiumBackdrop />
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-4 lg:mb-18">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">{t('label')}</span>
          <h2 className={`${display} max-w-3xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {t('title')}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-xl text-sm font-light leading-loose text-sumi-soft">{t('intro')}</p>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.08}>
              <Link
                href={`/property/${p.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-sumi/8 bg-washi shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_60px_-30px_rgba(32,37,31,0.42)]"
              >
                {/* photograph */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={ja ? p.nameJa : p.nameEn}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(7,13,28,0.8) 0%, rgba(7,13,28,0.12) 52%, transparent 100%)' }}
                  />
                  <div className="absolute bottom-3.5 left-4 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gold-pale" strokeWidth={1.6} />
                    <span className="font-en text-sm tracking-wide text-washi">{p.area}</span>
                  </div>
                  <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-washi/90 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                    <span className="font-en text-xs font-semibold" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</span>
                  </span>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-gold/70">{ja ? p.typeJa : p.typeEn}</span>
                  <h3 className="font-jp text-[0.95rem] font-bold leading-snug text-sumi">{ja ? p.nameJa : p.nameEn}</h3>
                  <div className="flex items-center gap-3.5 text-[11px] text-sumi-soft">
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5" strokeWidth={1.5} /> {p.beds}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Ruler className="h-3.5 w-3.5" strokeWidth={1.5} /> {p.sizeSqft.toLocaleString('en-US')} sqft
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-sumi/8 pt-3.5">
                    <span className="font-en text-base font-light text-sumi">{aed(p.priceAed)}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-gold opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      {ja ? '詳細' : 'View'} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </span>
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
