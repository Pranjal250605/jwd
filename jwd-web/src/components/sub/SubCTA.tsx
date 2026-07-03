'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';

/** Closing consultation band shared across every subsection page. */
export function SubCTA() {
  const t = useTranslations('contact');
  return (
    <section className="relative overflow-hidden bg-washi-deep py-24 text-center lg:py-28">
      <Grain opacity={0.02} />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,126,196,0.45), transparent)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,126,196,0.1) 0%, transparent 70%)',
        }}
      />
      {/* faint ensō echo */}
      <svg
        aria-hidden
        className="absolute left-1/2 top-1/2 z-0 h-[32vmin] w-[32vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M75 26 C87 38 90 60 77 75 C64 90 38 91 22 79 C7 67 7 41 23 26 C37 13 60 12 74 22"
          stroke="#007ec4"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      <div className="relative mx-auto max-w-2xl px-7">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {t('label')}
          </span>
          <h2 className="font-jp mt-6 text-3xl font-extrabold leading-snug text-sumi lg:text-[2.4rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-loose text-sumi-soft">
            {t('desc')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-sumi px-9 py-4 text-xs uppercase tracking-[0.24em] text-washi"
            >
              <span
                className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-700 ease-out group-hover:scale-x-100"
                aria-hidden
              />
              <span className="relative">{t('ctaPrimary')}</span>
            </Link>
            <span className="text-[10px] uppercase tracking-[0.24em] text-sumi/45">
              {t('notice')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
