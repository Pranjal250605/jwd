'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

export interface PagerLink {
  slug: string;
  label: L;
}

/** Prev / next subsection navigation + a return-to-section link. */
export function SubPager({
  base,
  sectionHref,
  sectionLabel,
  prev,
  next,
}: {
  base: string;
  sectionHref: string;
  sectionLabel: string;
  prev?: PagerLink;
  next?: PagerLink;
}) {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const backLabel = locale === 'ja' ? '一覧に戻る' : 'Back to overview';
  const prevWord = locale === 'ja' ? '前へ' : 'Previous';
  const nextWord = locale === 'ja' ? '次へ' : 'Next';

  return (
    <nav className="border-t border-sumi/8 bg-washi">
      <div className="mx-auto max-w-screen-xl px-7 py-14 lg:px-12">
        <div className="grid gap-px overflow-hidden border border-sumi/8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`${base}/${prev.slug}`}
              className="group flex flex-col gap-2 bg-washi p-7 transition-colors duration-500 hover:bg-washi-deep"
            >
              <span className="text-sm uppercase tracking-[0.24em] text-gold/70">
                ← {prevWord}
              </span>
              <span className="font-jp text-base font-bold text-sumi transition-colors group-hover:text-gold lg:text-lg">
                {tx(prev.label)}
              </span>
            </Link>
          ) : (
            <span className="hidden bg-washi sm:block" />
          )}

          {next ? (
            <Link
              href={`${base}/${next.slug}`}
              className="group flex flex-col items-end gap-2 bg-washi p-7 text-right transition-colors duration-500 hover:bg-washi-deep"
            >
              <span className="text-sm uppercase tracking-[0.24em] text-gold/70">
                {nextWord} →
              </span>
              <span className="font-jp text-base font-bold text-sumi transition-colors group-hover:text-gold lg:text-lg">
                {tx(next.label)}
              </span>
            </Link>
          ) : (
            <span className="hidden bg-washi sm:block" />
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={sectionHref}
            className="inline-block border-b border-gold/40 pb-1 text-sm uppercase tracking-[0.22em] text-gold transition-colors hover:border-gold hover:text-sumi"
          >
            ↑ {sectionLabel} — {backLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}
