'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { Grain } from '@/components/kintsugi/Grain';
import { home } from '@/content/home';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

export function HomeFeaturedProjects() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.featured;

  return (
    <section className="relative overflow-hidden bg-washi py-28 lg:py-36">
      <Grain opacity={0.02} />
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

        <div className="grid gap-7 lg:grid-cols-3">
          {c.items.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Link
                href={p.href}
                className="group block h-full overflow-hidden border border-sumi/8 bg-washi transition-colors duration-500 hover:border-gold/40"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={tx(p.title)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(7,13,28,0.85) 0%, rgba(7,13,28,0.15) 55%, transparent 100%)',
                    }}
                  />
                  <span className="absolute bottom-4 left-5 text-[12px] uppercase tracking-[0.24em] text-gold-pale/90">
                    {tx(p.meta)}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <h3 className="font-jp text-lg font-bold text-sumi transition-colors group-hover:text-gold">
                    {tx(p.title)}
                  </h3>
                  <p className="text-lg font-light leading-[1.95] text-sumi-soft">
                    {tx(p.text)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-gold transition-all duration-500 group-hover:gap-3">
                    {locale === 'ja' ? '詳しく見る' : 'Explore'}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
