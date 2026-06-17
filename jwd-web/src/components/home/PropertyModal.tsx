'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, BedDouble, Ruler, Building2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Listing } from '@/content/properties';

const ACCENT = '#9a7b2d';

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
  const specs = [
    { Icon: BedDouble, label: ja ? '間取り' : 'Layout', value: p.beds },
    { Icon: Ruler, label: ja ? '広さ' : 'Size', value: `${p.sizeSqft.toLocaleString('en-US')} sqft` },
    { Icon: Building2, label: ja ? 'タイプ' : 'Type', value: type },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-sumi/45 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-washi shadow-[0_60px_120px_-30px_rgba(12,14,18,0.7)]"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      >
        {/* image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image src={p.image} alt={name} fill sizes="640px" className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,14,18,0.78) 0%, rgba(12,14,18,0.15) 45%, transparent 75%)' }} />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-washi/90 text-sumi backdrop-blur-sm transition-colors hover:bg-washi"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <div className="absolute right-4 top-16 flex flex-col items-center rounded-xl bg-washi/95 px-3.5 py-2.5 shadow-lg">
            <span className="font-en text-2xl font-semibold leading-none" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.14em] text-sumi-soft">{ja ? '目標利回り' : 'Target yield'}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="text-[11px] uppercase tracking-[0.24em] text-gold-pale/90">{type} · {p.area}</span>
            <h3 className="font-jp mt-1 text-2xl font-bold text-white lg:text-3xl">{name}</h3>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-col gap-7 p-7 lg:p-9">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-sumi-soft">{ja ? '販売価格' : 'Asking price'}</span>
              <div className="font-en text-3xl font-light text-sumi">AED {p.priceAed.toLocaleString('en-US')}</div>
            </div>
          </div>

          {/* specs */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-sumi/8">
            {specs.map(({ Icon, label, value }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-washi-deep/40 px-3 py-5 text-center">
                <Icon className="h-5 w-5" style={{ color: ACCENT }} strokeWidth={1.5} />
                <span className="font-jp text-sm font-bold text-sumi">{value}</span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-sumi-soft">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-[0.95rem] font-light leading-[1.95] text-sumi-soft">{desc}</p>

          {/* actions */}
          <div className="flex flex-col gap-3 border-t border-sumi/8 pt-7 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-sumi px-7 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-washi"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
              <span className="relative">{ja ? '相談を予約' : 'Book a consultation'}</span>
            </Link>
            <a href={p.bayut} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi/15 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-sumi transition-colors hover:border-gold hover:text-gold">
              Bayut <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </a>
            <a href={p.pf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi/15 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-sumi transition-colors hover:border-gold hover:text-gold">
              Property Finder <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </a>
          </div>
          <p className="text-[11px] font-light italic text-sumi-soft/70">
            {ja ? '※ 価格・利回り・仕様はサンプルです。' : '※ Price, yield and specs are illustrative samples.'}
          </p>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
