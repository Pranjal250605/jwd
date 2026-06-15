'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { L, Subsection } from '@/content/types';

const EASE = [0.16, 1, 0.3, 1] as const;
type Lang = 'ja' | 'en';

/**
 * The "explore this section" index — turns a section landing page into a hub
 * linking to every subsection page, each a photographic card.
 */
export function SubHubGrid({
  base,
  subsections,
  heading,
}: {
  base: string;
  subsections: Subsection[];
  heading: L;
}) {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const kicker = locale === 'ja' ? 'このセクションを探る' : 'In this section';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-washi-deep py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-screen-xl px-7 lg:px-12">
        <div className="mb-14 flex flex-col gap-5">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">
            {kicker}
          </span>
          <h2 className="font-jp max-w-3xl text-3xl font-extrabold leading-snug text-sumi lg:text-[2.4rem]">
            {tx(heading)}
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {subsections.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="h-full"
              >
              <Link
                href={`${base}/${s.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-sumi/8 bg-washi shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:border-gold/40 hover:shadow-[0_34px_64px_-30px_rgba(32,37,31,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={tx(s.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,16,32,0.62) 0%, rgba(10,16,32,0.05) 55%, transparent 100%)',
                    }}
                  />
                  <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.2em] text-gold-pale/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-gold">
                    {tx(s.label)}
                  </span>
                  <h3 className="font-jp text-lg font-bold leading-snug text-sumi transition-colors group-hover:text-gold">
                    {tx(s.title)}
                  </h3>
                  <p className="text-[0.8rem] font-light leading-[1.9] text-sumi-soft">
                    {tx(s.tagline)}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sumi/45 transition-all duration-500 group-hover:gap-3 group-hover:text-gold">
                    {locale === 'ja' ? '詳しく見る' : 'Explore'}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
