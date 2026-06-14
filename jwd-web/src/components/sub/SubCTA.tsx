'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';

/** Closing consultation band shared across every subsection page. */
export function SubCTA() {
  const t = useTranslations('contact');
  return (
    <section className="relative overflow-hidden bg-night-deep py-24 text-center lg:py-28">
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
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(201,168,92,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-2xl px-7">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/80">
            {t('label')}
          </span>
          <h2 className="font-jp mt-6 text-3xl font-extrabold leading-snug text-washi lg:text-[2.4rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-loose text-washi/55">
            {t('desc')}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gold-bright px-9 py-4 text-xs uppercase tracking-[0.24em] text-night-deep transition-colors duration-500 hover:bg-gold-pale"
            >
              {t('ctaPrimary')}
            </Link>
            <span className="text-[10px] uppercase tracking-[0.24em] text-washi/40">
              {t('notice')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
