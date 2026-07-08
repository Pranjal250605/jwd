'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, BedDouble, Ruler, Building2, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Listing } from '@/content/properties';

const ACCENT = '#0097a7';

export function PropertyModal({
  listing: p,
  onClose,
  ja,
}: {
  listing: Listing;
  onClose: () => void;
  ja: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  const name = ja ? p.nameJa : p.nameEn;
  const type = ja ? p.typeJa : p.typeEn;
  const desc = ja ? p.descJa : p.descEn;
  const display = ja ? 'font-jp' : 'font-sans';
  const specs = [
    { Icon: BedDouble, label: ja ? '間取り' : 'Layout', value: p.beds },
    { Icon: Ruler, label: ja ? '広さ' : 'Size', value: `${p.sizeSqft.toLocaleString('en-US')} sqft` },
    { Icon: Building2, label: ja ? 'タイプ' : 'Type', value: type },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-sumi/50 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative grid max-h-[90vh] w-full max-w-4xl grid-rows-[auto_1fr] overflow-hidden rounded-[1.75rem] bg-washi shadow-[0_60px_120px_-30px_rgba(12,14,18,0.7)] lg:grid-cols-[1.05fr_1fr] lg:grid-rows-1"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      >
        {/* image column */}
        <div className="relative h-60 sm:h-80 lg:h-auto">
          <Image src={p.image} alt={name} fill sizes="(max-width:1024px) 100vw, 540px" className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, transparent 55%, rgba(0,151,167,0.12)), linear-gradient(to top, rgba(12,14,18,0.55) 0%, transparent 45%)' }} />
          <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-washi/90 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            <span className="font-en text-sm font-semibold" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</span>
            <span className="text-sm uppercase tracking-[0.16em] text-sumi-soft">{ja ? '目標利回り' : 'Target yield'}</span>
          </div>
        </div>

        {/* details column */}
        <div className="flex flex-col gap-7 overflow-y-auto p-7 lg:p-9">
          <div className="flex flex-col gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} /> {type} · {p.area}
            </span>
            <h3 className={`${display} text-2xl font-semibold leading-tight text-sumi lg:text-[1.9rem]`}>{name}</h3>
          </div>

          {/* price + yield */}
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-sumi/8">
            <div className="bg-washi-deep/40 p-5">
              <span className="text-sm uppercase tracking-[0.2em] text-sumi-soft">{ja ? '販売価格' : 'Asking price'}</span>
              <div className="font-en mt-1 text-2xl font-light leading-none text-sumi">AED {p.priceAed.toLocaleString('en-US')}</div>
            </div>
            <div className="border-l border-sumi/8 p-5" style={{ background: `${ACCENT}0c` }}>
              <span className="text-sm uppercase tracking-[0.2em] text-sumi-soft">{ja ? '目標利回り' : 'Target yield'}</span>
              <div className="font-en mt-1 text-2xl font-light leading-none" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</div>
            </div>
          </div>

          {/* specs */}
          <div className="grid grid-cols-3 gap-3">
            {specs.map(({ Icon, label, value }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 rounded-xl border border-sumi/8 px-2 py-4 text-center">
                <Icon className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={1.5} />
                <span className="font-jp text-sm font-bold text-sumi">{value}</span>
                <span className="text-sm uppercase tracking-[0.16em] text-sumi-soft">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-lg font-light leading-[1.9] text-sumi-soft">{desc}</p>

          {/* actions */}
          <div className="mt-auto flex flex-col gap-3 border-t border-sumi/8 pt-6">
            <Link
              href="/contact"
              onClick={onClose}
              className="group relative overflow-hidden rounded-full bg-sumi px-7 py-3.5 text-center text-sm font-medium uppercase tracking-[0.18em] text-washi"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
              <span className="relative">{ja ? 'この物件について相談する' : 'Enquire about this property'}</span>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={p.bayut} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sumi/15 px-4 py-3 text-sm font-medium uppercase tracking-[0.16em] text-sumi transition-colors hover:border-gold hover:text-gold">
                Bayut <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
              </a>
              <a href={p.pf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-sumi/15 px-4 py-3 text-sm font-medium uppercase tracking-[0.16em] text-sumi transition-colors hover:border-gold hover:text-gold">
                Property Finder <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
              </a>
            </div>
            <p className="text-sm font-light italic text-sumi-soft/70">
              {ja ? '※ 価格・利回り・仕様はサンプルです。' : '※ Price, yield and specs are illustrative samples.'}
            </p>
          </div>
        </div>

        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-washi/90 text-sumi shadow-md backdrop-blur-sm transition-colors hover:bg-washi"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </motion.div>
    </div>,
    document.body,
  );
}
