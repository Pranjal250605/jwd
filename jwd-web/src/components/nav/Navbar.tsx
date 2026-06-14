'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { MenuOverlay } from './MenuOverlay';

const PRIMARY_LINKS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'whyDubai', href: '/why-dubai' },
  { key: 'properties', href: '/dubai-properties' },
  { key: 'heartOfEurope', href: '/heart-of-europe' },
  { key: 'contact', href: '/contact' },
] as const;

function LocaleSwitcher({ light }: { light: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
      {(['ja', 'en'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className={light ? 'text-white/25' : 'text-sumi/20'}>/</span>}
          <Link
            href={pathname}
            locale={l}
            className={
              locale === l
                ? light
                  ? 'text-white'
                  : 'text-gold'
                : light
                  ? 'text-white/40 transition-colors hover:text-white'
                  : 'text-sumi/45 transition-colors hover:text-sumi'
            }
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Over the hero (unscrolled) the bar renders in pure white through
  // mix-blend-difference — dark ink over washi, light over the night city.
  // Once scrolled, it sits on a washi glass bar with brand colors.
  const light = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-700 ${
          scrolled
            ? 'border-b border-sumi/5 bg-washi/85 backdrop-blur-md'
            : 'mix-blend-difference'
        }`}
      >
        {/* 3-zone grid: wordmark · centered nav · controls */}
        <div className="mx-auto grid h-20 max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-12">
          {/* Wordmark */}
          <Link href="/" className="group flex w-fit flex-col leading-none">
            <span
              className={`font-en text-[1.45rem] font-semibold tracking-[0.16em] ${
                light ? 'text-white' : 'text-sumi'
              }`}
            >
              JWD
            </span>
            <span
              className={`text-[7px] tracking-[0.52em] ${
                light ? 'text-white/70' : 'text-gold'
              }`}
            >
              GROUP
            </span>
          </Link>

          {/* Primary links — dead center */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {PRIMARY_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`group relative whitespace-nowrap text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  light
                    ? 'text-white/70 hover:text-white'
                    : 'text-sumi/70 hover:text-sumi'
                }`}
              >
                {t(key)}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    light ? 'bg-white' : 'bg-gold'
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-8">
            <LocaleSwitcher light={light} />

            {/* Menu trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label={t('menu')}
              className="group flex h-10 w-10 flex-col items-end justify-center gap-[7px]"
            >
              <span
                className={`h-px w-7 transition-all duration-500 group-hover:w-5 ${
                  light ? 'bg-white' : 'bg-sumi group-hover:bg-gold'
                }`}
              />
              <span
                className={`h-px w-5 transition-all duration-500 group-hover:w-7 ${
                  light ? 'bg-white' : 'bg-sumi group-hover:bg-gold'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MenuOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
