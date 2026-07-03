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
  { key: 'familyOffice', href: '/family-office' },
  { key: 'contact', href: '/contact' },
] as const;

function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-[12px] tracking-[0.2em]">
      {(['ja', 'en'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-sumi/20">/</span>}
          <Link
            href={pathname}
            locale={l}
            className={
              locale === l
                ? 'text-gold'
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Always dark ink on the light washi canvas; gain a glass bar once scrolled.
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'border-b border-sumi/8 bg-washi/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto grid h-24 max-w-screen-2xl grid-cols-[auto_1fr_auto] items-center gap-8 px-6 lg:px-12">
          {/* Wordmark */}
          <Link href="/" className="group flex w-fit flex-col leading-none">
            <span className="font-en text-[1.7rem] font-semibold tracking-[0.16em] text-sumi">
              JWD
            </span>
            <span className="text-[8px] tracking-[0.52em] text-gold">GROUP</span>
          </Link>

          {/* Primary links — centered */}
          <nav className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
            {PRIMARY_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="group relative whitespace-nowrap text-[12.5px] uppercase tracking-[0.15em] text-sumi/70 transition-colors duration-300 hover:text-sumi"
              >
                {t(key)}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="hidden whitespace-nowrap rounded-full bg-sumi px-6 py-2.5 text-[12px] uppercase tracking-[0.18em] text-washi transition-colors duration-300 hover:bg-gold sm:inline-block"
            >
              {t('contact')}
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label={t('menu')}
              className="group flex h-12 w-12 flex-col items-end justify-center gap-[8px]"
            >
              <span className="h-px w-8 bg-sumi transition-all duration-500 group-hover:w-6 group-hover:bg-gold" />
              <span className="h-px w-6 bg-sumi transition-all duration-500 group-hover:w-8 group-hover:bg-gold" />
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
