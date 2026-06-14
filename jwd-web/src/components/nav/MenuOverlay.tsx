'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Grain } from '@/components/kintsugi/Grain';
import { SECTIONS } from '@/content/sections';
import type { L } from '@/content/types';

const EASE = [0.16, 1, 0.3, 1] as const;
const MotionLink = motion.create(Link);
type Lang = 'ja' | 'en';

/** All 13 sections from the sitemap — each a dedicated route. */
const MENU_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'whyDubai', href: '/why-dubai' },
  { key: 'properties', href: '/dubai-properties' },
  { key: 'heartOfEurope', href: '/heart-of-europe' },
  { key: 'funds', href: '/funds' },
  { key: 'japanProperties', href: '/japan-properties' },
  { key: 'familyOffice', href: '/family-office' },
  { key: 'simulator', href: '/simulator' },
  { key: 'knowledge', href: '/knowledge' },
  { key: 'stories', href: '/stories' },
  { key: 'consulting', href: '/consulting' },
  { key: 'contact', href: '/contact' },
] as const;

/** slug → subsection list, for the hover mega-panel and mobile sub-lists. */
const SUBS = Object.fromEntries(
  SECTIONS.map((s) => [s.slug, s.subsections]),
);

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations('nav');
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const activeSubs = active ? SUBS[active] : undefined;

  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto bg-washi"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: EASE }}
      role="dialog"
      aria-modal="true"
    >
      <Grain opacity={0.025} />

      {/* Close */}
      <button
        onClick={onClose}
        aria-label={t('close')}
        className="group fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center lg:right-12"
      >
        <span className="absolute h-px w-7 rotate-45 bg-sumi transition-colors group-hover:bg-gold" />
        <span className="absolute h-px w-7 -rotate-45 bg-sumi transition-colors group-hover:bg-gold" />
      </button>

      <div className="mx-auto grid min-h-full max-w-screen-2xl grid-cols-1 gap-12 px-7 py-28 lg:grid-cols-[1.1fr_1fr] lg:px-16">
        {/* Items */}
        <nav className="flex flex-col gap-1" onMouseLeave={() => setActive(null)}>
          {MENU_ITEMS.map(({ key, href }, i) => {
            const slug = href.replace('/', '');
            const subs = SUBS[slug];
            return (
              <div key={key} onMouseEnter={() => setActive(subs ? slug : null)}>
                <MotionLink
                  href={href}
                  onClick={onClose}
                  className="group flex items-baseline gap-5 border-b border-sumi/5 py-3 lg:py-3.5"
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.04, ease: EASE }}
                >
                  <span className="font-mono text-[10px] text-gold/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-jp text-2xl font-bold transition-all duration-500 group-hover:translate-x-3 group-hover:text-gold lg:text-[2rem] ${
                      active === slug ? 'text-gold' : 'text-sumi'
                    }`}
                  >
                    {t(key)}
                  </span>
                  {subs && (
                    <span className="ml-auto self-center font-mono text-[10px] text-gold/40">
                      {String(subs.length).padStart(2, '0')}
                    </span>
                  )}
                </MotionLink>

                {/* Mobile: inline subsection links */}
                {subs && (
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 py-3 pl-9 lg:hidden">
                    {subs.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`${href}/${sub.slug}`}
                        onClick={onClose}
                        className="text-xs font-light tracking-wide text-sumi-soft transition-colors hover:text-gold"
                      >
                        {tx(sub.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mega panel (desktop): subsections of the hovered section, else brand */}
        <aside className="hidden border-l border-gold/15 pl-12 lg:flex lg:flex-col lg:justify-between">
          <AnimatePresence mode="wait">
            {activeSubs ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col gap-1"
              >
                <span className="mb-5 text-[10px] uppercase tracking-[0.38em] text-gold">
                  {locale === 'ja' ? 'このセクション' : 'In this section'}
                </span>
                {activeSubs.map((sub, i) => (
                  <MotionLink
                    key={sub.slug}
                    href={`/${active}/${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 border-b border-sumi/5 py-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  >
                    <span className="font-mono text-[10px] text-gold/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-jp text-base font-bold text-sumi transition-colors group-hover:text-gold">
                        {tx(sub.label)}
                      </span>
                      <span className="text-[11px] font-light leading-snug text-sumi-soft/80">
                        {tx(sub.title)}
                      </span>
                    </span>
                  </MotionLink>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <span className="font-en text-xl font-semibold tracking-[0.16em] text-sumi">
                  JWD<span className="ml-2 text-[9px] tracking-[0.5em] text-gold">GROUP</span>
                </span>
                <p className="max-w-xs text-xs font-light leading-loose text-sumi-soft">
                  {t('tagline')}
                </p>
                <p className="max-w-xs text-[11px] font-light leading-loose text-sumi/40">
                  {locale === 'ja'
                    ? 'メニューにカーソルを合わせると、各セクションの詳細が表示されます。'
                    : 'Hover a section to preview the pages within.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/contact"
            onClick={onClose}
            className="mt-10 w-fit bg-sumi px-7 py-4 text-[10px] uppercase tracking-[0.3em] text-washi transition-colors duration-500 hover:bg-gold"
          >
            {t('contact')}
          </Link>
        </aside>
      </div>
    </motion.div>
  );
}
