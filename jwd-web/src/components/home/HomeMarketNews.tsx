'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { home } from '@/content/home';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

/** Reusable market-news rail, used for both Dubai and Japan in sitemap order. */
export function HomeMarketNews({
  market,
  tone = 'light',
}: {
  market: 'dubai' | 'japan';
  tone?: 'light' | 'deep';
}) {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = market === 'dubai' ? home.dubaiNews : home.japanNews;
  const bg = tone === 'deep' ? 'bg-washi-deep' : 'bg-washi';

  return (
    <section className={`relative overflow-hidden ${bg} py-24 lg:py-28`}>
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-12 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {tx(c.label)}
          </span>
          <h2 className="font-jp text-2xl font-extrabold leading-snug text-sumi lg:text-[2rem]">
            {tx(c.title)}
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {c.items.map((n, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Link
                href={n.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-sumi/10 py-6 transition-colors last:border-b lg:gap-10"
              >
                <span className="font-mono text-[11px] tracking-wide text-sumi-soft">
                  {n.date}
                </span>
                <span className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
                  <span className="w-fit border border-gold/30 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-gold">
                    {tx(n.tag)}
                  </span>
                  <span className="text-sm font-light leading-relaxed text-sumi transition-colors group-hover:text-gold lg:text-[0.95rem]">
                    {tx(n.title)}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-gold/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
