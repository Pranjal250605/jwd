'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Grain } from '@/components/kintsugi/Grain';

const EASE = [0.16, 1, 0.3, 1] as const;

/** All 13 sections from the sitemap — draft hrefs for now. */
const MENU_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '#about' },
  { key: 'whyDubai', href: '#why-dubai' },
  { key: 'properties', href: '#properties' },
  { key: 'heartOfEurope', href: '#heart-of-europe' },
  { key: 'funds', href: '#funds' },
  { key: 'japanProperties', href: '#japan-properties' },
  { key: 'familyOffice', href: '#family-office' },
  { key: 'simulator', href: '#simulator' },
  { key: 'knowledge', href: '#knowledge' },
  { key: 'stories', href: '#stories' },
  { key: 'consulting', href: '#consulting' },
  { key: 'contact', href: '#contact' },
] as const;

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations('nav');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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

      <div className="mx-auto grid min-h-full max-w-screen-2xl grid-cols-1 gap-12 px-7 py-28 lg:grid-cols-[1fr_auto] lg:px-16">
        {/* Items */}
        <nav className="flex flex-col gap-1">
          {MENU_ITEMS.map(({ key, href }, i) => (
            <motion.a
              key={key}
              href={href}
              onClick={onClose}
              className="group flex items-baseline gap-5 border-b border-sumi/5 py-3 lg:py-4"
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.045, ease: EASE }}
            >
              <span className="font-mono text-[10px] text-gold/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-jp text-2xl font-bold text-sumi transition-all duration-500 group-hover:translate-x-3 group-hover:text-gold lg:text-[2.1rem]">
                {t(key)}
              </span>
            </motion.a>
          ))}
        </nav>

        {/* Side rail */}
        <motion.aside
          className="hidden w-64 flex-col justify-between border-l border-gold/15 pl-10 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex flex-col gap-6">
            <span className="font-en text-xl font-semibold tracking-[0.16em] text-sumi">
              JWD<span className="ml-2 text-[9px] tracking-[0.5em] text-gold">GROUP</span>
            </span>
            <p className="text-xs font-light leading-loose text-sumi-soft">
              {t('tagline')}
            </p>
          </div>
          <div
            className="h-40 w-px self-center"
            style={{ background: 'linear-gradient(to bottom, transparent, #9a7b2d, transparent)' }}
          />
          <a
            href="#contact"
            onClick={onClose}
            className="bg-sumi px-7 py-4 text-center text-[10px] uppercase tracking-[0.3em] text-washi transition-colors duration-500 hover:bg-gold"
          >
            {t('contact')}
          </a>
        </motion.aside>
      </div>
    </motion.div>
  );
}
