'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import type { L } from '@/content/types';
import type { NewsEntry } from '@/lib/news';

const ACCENT = '#0097a7';
const PAGE = 8;
type Market = 'all' | 'dubai' | 'japan';

export function NewsList({ items }: { items: NewsEntry[] }) {
  const locale = useLocale();
  const ja = locale === 'ja';
  const tx = (l: L) => (ja ? l.ja : l.en);
  const [market, setMarket] = useState<Market>('all');
  const [count, setCount] = useState(PAGE);

  const filtered = useMemo(
    () => items.filter((n) => market === 'all' || n.market === market),
    [items, market],
  );
  const shown = filtered.slice(0, count);

  const filters: { id: Market; label: string }[] = [
    { id: 'all', label: ja ? 'すべて' : 'All' },
    { id: 'dubai', label: ja ? 'ドバイ' : 'Dubai' },
    { id: 'japan', label: ja ? '日本' : 'Japan' },
  ];

  return (
    <div>
      {/* filter chips */}
      <div className="mb-10 flex flex-wrap items-center gap-2.5">
        {filters.map((f) => {
          const on = market === f.id;
          return (
            <button
              key={f.id}
              onClick={() => {
                setMarket(f.id);
                setCount(PAGE);
              }}
              className={`rounded-full border px-5 py-2 text-[15px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${on ? 'text-washi' : 'text-sumi-soft hover:text-sumi'}`}
              style={on ? { background: ACCENT, borderColor: ACCENT } : { borderColor: 'rgba(32,37,31,0.14)' }}
            >
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto self-center text-[15px] tracking-wide text-sumi-soft/60">
          {filtered.length} {ja ? '件' : 'articles'}
        </span>
      </div>

      {/* list */}
      <div className="flex flex-col gap-1.5">
        {shown.map((n, i) => (
          <Reveal key={`${n.date}-${i}`} delay={Math.min(i, 6) * 0.05}>
            <Link
              href={n.href}
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl px-4 py-6 transition-colors duration-300 hover:bg-sumi/[0.035] lg:grid-cols-[7rem_auto_1fr_auto] lg:gap-8 lg:px-6"
            >
              <span className="absolute left-0 top-1/2 h-7 w-[3px] origin-center -translate-y-1/2 scale-y-0 rounded-full transition-transform duration-500 group-hover:scale-y-100" style={{ background: ACCENT }} />
              <span className="font-mono text-[15px] tracking-wide text-sumi-soft">{n.date}</span>
              <span className="hidden items-center gap-2.5 lg:flex">
                <span className="text-sm uppercase tracking-[0.2em] text-sumi-soft/60">
                  {n.market === 'dubai' ? (ja ? 'ドバイ' : 'Dubai') : ja ? '日本' : 'Japan'}
                </span>
                <span className="rounded-full border px-3 py-1 text-sm uppercase tracking-[0.2em]" style={{ borderColor: `${ACCENT}44`, color: ACCENT }}>
                  {tx(n.tag)}
                </span>
              </span>
              <span className={`text-[0.98rem] font-normal leading-relaxed text-sumi transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold lg:text-[1.05rem] ${ja ? 'font-jp' : 'font-sans'}`}>
                {tx(n.title)}
              </span>
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-sumi/12 text-sumi transition-all duration-500 group-hover:border-transparent group-hover:text-white">
                <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: ACCENT }} />
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.6} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* load more */}
      {count < filtered.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setCount((c) => c + PAGE)}
            className="inline-flex items-center gap-2.5 rounded-full border border-sumi/15 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-sumi transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" strokeWidth={1.6} />
            {ja ? 'もっと見る' : 'Show more'}
            <span className="text-sumi-soft/60">+{Math.min(PAGE, filtered.length - count)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
