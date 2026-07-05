'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { home } from '@/content/home';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

export function HomeWhyJwd() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.whyJwd;

  return (
    <section className="relative overflow-hidden bg-washi-deep py-24 lg:py-32">
      {/* Faint ensō */}
      <svg
        aria-hidden
        className="absolute -right-[8%] top-1/2 hidden w-[42vmin] -translate-y-1/2 opacity-[0.05] lg:block"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100" cy="100" r="86" fill="none" stroke="#0097a7" strokeWidth="8"
          strokeLinecap="round" strokeDasharray="430 110" transform="rotate(-100 100 100)"
        />
      </svg>

      <div className="relative mx-auto max-w-screen-xl px-7 lg:px-12">
        <Reveal className="mb-14 flex flex-col gap-5">
          <span className="text-[12px] uppercase tracking-[0.38em] text-gold">
            {tx(c.label)}
          </span>
          <h2 className="font-jp max-w-2xl text-3xl font-extrabold leading-snug text-sumi lg:text-[2.6rem]">
            {tx(c.title)}
          </h2>
          <p className="max-w-xl text-xl font-light leading-loose text-sumi-soft">
            {tx(c.intro)}
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {c.items.map((it, i) => (
            <Reveal key={i} delay={0.15 + i * 0.12}>
              <article className="group relative border-t border-sumi/10 pt-8">
                <span className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                <span className="font-mono text-xs text-gold/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-jp mt-4 text-lg font-bold text-sumi">
                  {tx(it.title)}
                </h3>
                <p className="mt-4 text-lg font-light leading-[2.1] text-sumi-soft">
                  {tx(it.text)}
                </p>
                {it.action && (
                  it.action.href === '/advisor' ? (
                    <button
                      onClick={() => window.dispatchEvent(new Event('open-advisor-chat'))}
                      className="group/btn mt-6 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-[13px] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold hover:text-gold-bright"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                      </span>
                      {tx(it.action.label)}
                    </button>
                  ) : (
                    <Link
                      href={it.action.href}
                      className="mt-6 inline-block w-fit border-b border-gold/40 pb-1 text-[13px] uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold hover:text-sumi"
                    >
                      {tx(it.action.label)}
                    </Link>
                  )
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
