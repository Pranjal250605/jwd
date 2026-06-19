'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import type { L, Subsection } from '@/content/types';

const EASE = [0.22, 1, 0.36, 1] as const;
type Lang = 'ja' | 'en';

/**
 * "Explore this section" — immersive, interactive cards. The photograph fills
 * the card, the tagline reveals on hover, an arrow lifts into an accent disc,
 * and the whole tile tints to the section accent.
 */
export function SubHubGrid({
  base,
  subsections,
  heading,
  accent = '#9a7b2d',
  accentBright = '#c9a85c',
}: {
  base: string;
  subsections: Subsection[];
  heading: L;
  accent?: string;
  accentBright?: string;
}) {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';

  return (
    <section className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <PremiumBackdrop accent={accent} />
      <div ref={ref} className="relative z-10 mx-auto max-w-screen-2xl px-7 lg:px-12">
        <div className="mb-14 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em]" style={{ color: accent }}>
            {locale === 'ja' ? 'このセクションを探る' : 'In this section'}
          </span>
          <h2 className={`${display} max-w-3xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {tx(heading)}
          </h2>
          <MarkerUnderline accent={accent} className="w-44 lg:w-64" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subsections.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <Link
                  href={`${base}/${s.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
                >
                  {/* photograph */}
                  <Image
                    src={s.image}
                    alt={tx(s.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.12]"
                  />
                  {/* base legibility gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(12,14,18,0.92) 0%, rgba(12,14,18,0.45) 38%, rgba(12,14,18,0.05) 62%, transparent 100%)',
                    }}
                  />
                  {/* accent wash blooms on hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to top, ${accent}cc 0%, ${accent}22 45%, transparent 75%)` }}
                  />

                  {/* number */}
                  <span className="absolute left-6 top-6 font-en text-2xl font-light text-white/55">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* arrow disc */}
                  <span
                    className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-transparent"
                    style={{ background: 'transparent' }}
                  >
                    <span
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: accentBright }}
                    />
                    <ArrowUpRight className="relative h-5 w-5 transition-transform duration-500 group-hover:rotate-0" strokeWidth={1.6} />
                  </span>

                  {/* content */}
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: accentBright }}>
                      {tx(s.label)}
                    </span>
                    <h3 className={`${display} mt-2 text-xl font-semibold leading-snug text-white transition-transform duration-500 group-hover:-translate-y-1 lg:text-2xl`}>
                      {tx(s.title)}
                    </h3>
                    {/* tagline reveals on hover */}
                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <p className="overflow-hidden text-[0.84rem] font-light leading-relaxed text-white/80">
                        <span className="mt-3 block">{tx(s.tagline)}</span>
                      </p>
                    </div>
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
