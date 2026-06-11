'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { MenuOverlay } from './MenuOverlay';

const PRIMARY_LINKS = [
  { key: 'whyDubai', href: '#why-dubai' },
  { key: 'properties', href: '#properties' },
  { key: 'heartOfEurope', href: '#heart-of-europe' },
  { key: 'simulator', href: '#simulator' },
  { key: 'contact', href: '#contact' },
] as const;

function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'border-b border-sumi/5 bg-washi/85 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 lg:px-12">
          {/* Wordmark */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-en text-[1.45rem] font-semibold tracking-[0.16em] text-sumi">
              JWD
            </span>
            <span className="text-[7px] tracking-[0.52em] text-gold">
              GROUP
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {/* Primary links */}
            <nav className="hidden items-center gap-7 lg:flex">
              {PRIMARY_LINKS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="group relative text-[11px] uppercase tracking-[0.16em] text-sumi/70 transition-colors duration-300 hover:text-sumi"
                >
                  {t(key)}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <LocaleSwitcher />

            {/* Menu trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label={t('menu')}
              className="group flex h-10 w-10 flex-col items-end justify-center gap-[7px]"
            >
              <span className="h-px w-7 bg-sumi transition-all duration-500 group-hover:w-5 group-hover:bg-gold" />
              <span className="h-px w-5 bg-sumi transition-all duration-500 group-hover:w-7 group-hover:bg-gold" />
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
