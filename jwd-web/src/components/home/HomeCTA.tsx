'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';
import { home } from '@/content/home';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

export function HomeCTA() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.cta;

  return (
    <section className="relative overflow-hidden bg-night-deep py-28 text-center lg:py-32">
      <Grain opacity={0.04} />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,92,0.5), transparent)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(201,168,92,0.14) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-2xl px-7">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/80">
            {tx(c.label)}
          </span>
          <h2 className="font-jp mt-6 text-3xl font-extrabold leading-snug text-washi lg:text-[2.6rem]">
            {tx(c.title)}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-loose text-washi/55">
            {tx(c.desc)}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full bg-gold-bright px-9 py-4 text-xs uppercase tracking-[0.24em] text-night-deep transition-colors duration-500 hover:bg-gold-pale sm:w-auto"
            >
              {tx(c.primary)}
            </Link>
            <Link
              href="/contact"
              className="w-full border border-gold-bright/40 px-9 py-4 text-xs uppercase tracking-[0.24em] text-gold-pale transition-all duration-500 hover:border-gold-bright hover:bg-gold-bright/10 sm:w-auto"
            >
              {tx(c.secondary)}
            </Link>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-washi/40">
            {tx(c.note)}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
