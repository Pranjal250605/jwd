'use client';

import { useLocale } from 'next-intl';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { Property3DCarousel } from '@/components/home/Property3DCarousel';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import { home } from '@/content/home';
import type { L } from '@/content/types';

const ACCENT = '#007ec4';
type Lang = 'ja' | 'en';

export function HomeLatestProperties() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.latestProperties;
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';

  return (
    <section className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <PremiumBackdrop />
      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal className="mb-6 flex flex-col gap-4">
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

        {/* drag hint */}
        <Reveal className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-sumi-soft/70">
          <MoveHorizontal className="h-3.5 w-3.5" style={{ color: ACCENT }} strokeWidth={1.6} />
          {locale === 'ja' ? 'ドラッグして回す・カードをクリックで詳細' : 'Drag to explore · click a card for details'}
        </Reveal>
      </div>

      <Property3DCarousel />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <Reveal delay={0.1} className="mt-10">
          <Link
            href="/dubai-properties"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:gap-4 hover:text-sumi"
          >
            <span className="border-b border-gold/40 pb-1 transition-colors group-hover:border-sumi">
              {tx(c.viewAll)}
            </span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
