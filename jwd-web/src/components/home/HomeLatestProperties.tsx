'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { home } from '@/content/home';
import { listings } from '@/content/properties';
import type { L } from '@/content/types';

const ACCENT = '#9a7b2d';
type Lang = 'ja' | 'en';

export function HomeLatestProperties() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.latestProperties;
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';

  return (
    <section className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <div className="mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {tx(c.label)}
          </span>
          <h2 className={`${display} max-w-3xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {tx(c.title)}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-xl text-sm font-light leading-loose text-sumi-soft">
            {tx(c.intro)}
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="h-full"
              >
                <Link
                  href="/dubai-properties"
                  className="group block h-full overflow-hidden rounded-2xl border border-sumi/8 bg-washi shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_34px_64px_-30px_rgba(32,37,31,0.4)]"
                >
                  {/* photograph */}
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={locale === 'ja' ? p.nameJa : p.nameEn}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.12]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(12,14,18,0.82) 0%, rgba(12,14,18,0.25) 40%, transparent 70%)' }}
                    />
                    {/* yield badge */}
                    <div className="absolute right-3.5 top-3.5 flex flex-col items-center rounded-xl bg-washi/95 px-3 py-2 backdrop-blur-sm shadow-lg">
                      <span className="font-en text-lg font-semibold leading-none" style={{ color: ACCENT }}>
                        {p.yieldPct.toFixed(1)}%
                      </span>
                      <span className="mt-0.5 text-[7px] uppercase tracking-[0.14em] text-sumi-soft">
                        {tx(c.yieldLabel)}
                      </span>
                    </div>
                    {/* area + type */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-gold-pale/90">
                        {locale === 'ja' ? p.typeJa : p.typeEn}
                      </span>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/85">
                        {p.area}
                      </div>
                    </div>
                  </div>

                  {/* details */}
                  <div className="flex flex-col gap-4 p-5">
                    <h3 className={`${display} text-[0.95rem] font-semibold leading-snug text-sumi transition-colors group-hover:text-gold`}>
                      {locale === 'ja' ? p.nameJa : p.nameEn}
                    </h3>
                    <div className="flex items-center justify-between border-t border-sumi/8 pt-4">
                      <span className="font-en text-lg font-light text-sumi">
                        AED {p.priceAed.toLocaleString('en-US')}
                      </span>
                      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-sumi/15 text-sumi transition-all duration-500 group-hover:border-transparent group-hover:text-white">
                        <span
                          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{ background: ACCENT }}
                        />
                        <ArrowUpRight className="relative h-4 w-4" strokeWidth={1.7} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <Link
            href="/dubai-properties"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:gap-4 hover:text-sumi"
          >
            <span className="border-b border-gold/40 pb-1 transition-colors group-hover:border-sumi">{tx(c.viewAll)}</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
