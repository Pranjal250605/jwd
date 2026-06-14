'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { home } from '@/content/home';
import { listings } from '@/content/properties';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

export function HomeLatestProperties() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.latestProperties;

  return (
    <section className="relative overflow-hidden bg-washi py-24 lg:py-32">
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-5">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {tx(c.label)}
          </span>
          <h2 className="font-jp max-w-3xl text-3xl font-extrabold leading-snug text-sumi lg:text-[2.4rem]">
            {tx(c.title)}
          </h2>
          <p className="max-w-xl text-sm font-light leading-loose text-sumi-soft">
            {tx(c.intro)}
          </p>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden border border-sumi/8 bg-washi transition-colors duration-500 hover:border-gold/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${p.hues[0]} 0%, ${p.hues[1]} 100%)`,
                    }}
                  />
                  <div className="absolute right-3 top-3 bg-gold-bright/90 px-2.5 py-1 font-mono text-[10px] tracking-wide text-night-deep">
                    {p.yieldPct.toFixed(1)}%
                  </div>
                  <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-washi/80">
                    {p.area}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
                    {locale === 'ja' ? p.typeJa : p.typeEn}
                  </span>
                  <h3 className="font-jp text-base font-bold leading-snug text-sumi">
                    {locale === 'ja' ? p.nameJa : p.nameEn}
                  </h3>
                  <div className="mt-auto flex items-baseline justify-between border-t border-sumi/8 pt-3">
                    <span className="font-en text-lg font-light text-sumi">
                      AED {p.priceAed.toLocaleString()}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.18em] text-sumi-soft">
                      {tx(c.yieldLabel)}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <Link
            href="/dubai-properties"
            className="inline-flex items-center gap-3 border-b border-gold/40 pb-1 text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:gap-4 hover:border-gold hover:text-sumi"
          >
            {tx(c.viewAll)}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
