'use client';

import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { home } from '@/content/home';
import type { L } from '@/content/types';

const ACCENT = '#9a7b2d';
type Lang = 'ja' | 'en';

/** Interactive market-news rail — hover highlights the row, the accent bar
 *  grows, the headline shifts and the arrow lifts into an accent disc. */
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
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';

  return (
    <section className={`relative overflow-hidden ${bg} py-28 lg:py-32`}>
      <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <div className="mb-12 flex items-end justify-between gap-6">
          <Reveal className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
              {tx(c.label)}
            </span>
            <h2 className={`${display} text-[2rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[2.7rem]`}>
              {tx(c.title)}
            </h2>
            <MarkerUnderline accent={ACCENT} className="w-40 lg:w-56" />
          </Reveal>
        </div>

        <div className="flex flex-col gap-1.5">
          {c.items.map((n, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Link
                href={n.href}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl px-4 py-6 transition-colors duration-300 hover:bg-sumi/[0.035] lg:grid-cols-[7rem_auto_1fr_auto] lg:gap-8 lg:px-6"
              >
                {/* accent bar */}
                <span
                  className="absolute left-0 top-1/2 h-7 w-[3px] origin-center -translate-y-1/2 scale-y-0 rounded-full transition-transform duration-500 group-hover:scale-y-100"
                  style={{ background: ACCENT }}
                />
                <span className="font-mono text-[11px] tracking-wide text-sumi-soft">
                  {n.date}
                </span>
                <span
                  className="hidden w-fit rounded-full border px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 lg:inline-block"
                  style={{ borderColor: `${ACCENT}44`, color: ACCENT }}
                >
                  {tx(n.tag)}
                </span>
                <span className={`${display} text-[0.98rem] font-normal leading-relaxed text-sumi transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold lg:text-[1.05rem]`}>
                  {tx(n.title)}
                </span>
                <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-sumi/12 text-sumi transition-all duration-500 group-hover:border-transparent group-hover:text-white">
                  <span
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: ACCENT }}
                  />
                  <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.6} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
