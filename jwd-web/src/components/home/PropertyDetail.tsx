'use client';

import Image from 'next/image';
import { ArrowUpRight, BedDouble, Ruler, Building2, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Listing } from '@/content/properties';
import { PropertyAnalysis } from './PropertyAnalysis';

const ACCENT = '#9a7b2d';

export function PropertyDetail({
  listing: p,
  locale,
}: {
  listing: Listing;
  locale: string;
}) {
  const ja = locale === 'ja';
  const name = ja ? p.nameJa : p.nameEn;
  const type = ja ? p.typeJa : p.typeEn;
  const desc = ja ? p.descJa : p.descEn;
  const display = ja ? 'font-jp' : 'font-sans';
  const specs = [
    { Icon: BedDouble, label: ja ? '間取り' : 'Layout', value: p.beds },
    { Icon: Ruler, label: ja ? '広さ' : 'Size', value: `${p.sizeSqft.toLocaleString('en-US')} sqft` },
    { Icon: Building2, label: ja ? 'タイプ' : 'Type', value: type },
  ];

  return (
    <>
    <div className="mx-auto max-w-6xl px-4 lg:px-8">
      <Link href="/dubai-properties" className="mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-sumi-soft transition-colors hover:text-gold">
        ← {ja ? '戻る' : 'Back to properties'}
      </Link>
      <div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-[1.75rem] border border-sumi/8 bg-washi shadow-[0_40px_80px_-20px_rgba(12,14,18,0.1)] lg:grid-cols-[1.1fr_1fr] lg:grid-rows-1">
        {/* image column */}
        <div className="relative h-80 sm:h-96 lg:h-auto">
          <Image src={p.image} alt={name} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, transparent 55%, rgba(154,123,45,0.12)), linear-gradient(to top, rgba(12,14,18,0.55) 0%, transparent 45%)' }} />
          <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-washi/90 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            <span className="font-en text-base font-semibold" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-sumi-soft">{ja ? '目標利回り' : 'Target yield'}</span>
          </div>
        </div>

        {/* details column */}
        <div className="flex flex-col gap-8 p-8 lg:p-12">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
              <MapPin className="h-4 w-4" strokeWidth={1.6} /> {type} · {p.area}
            </span>
            <h1 className={`${display} text-3xl font-semibold leading-tight text-sumi lg:text-4xl`}>{name}</h1>
          </div>

          {/* price + yield */}
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-sumi/8">
            <div className="bg-washi-deep/40 p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-soft">{ja ? '販売価格' : 'Asking price'}</span>
              <div className="font-en mt-1.5 text-3xl font-light leading-none text-sumi">AED {p.priceAed.toLocaleString('en-US')}</div>
            </div>
            <div className="border-l border-sumi/8 p-6" style={{ background: `${ACCENT}0c` }}>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sumi-soft">{ja ? '目標利回り' : 'Target yield'}</span>
              <div className="font-en mt-1.5 text-3xl font-light leading-none" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</div>
            </div>
          </div>

          {/* specs */}
          <div className="grid grid-cols-3 gap-4">
            {specs.map(({ Icon, label, value }, i) => (
              <div key={i} className="flex flex-col items-center gap-2.5 rounded-xl border border-sumi/8 px-2 py-5 text-center">
                <Icon className="h-6 w-6" style={{ color: ACCENT }} strokeWidth={1.5} />
                <span className="font-jp text-sm font-bold text-sumi">{value}</span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-sumi-soft">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-base font-light leading-relaxed text-sumi-soft">{desc}</p>

          {/* actions */}
          <div className="mt-auto flex flex-col gap-4 border-t border-sumi/8 pt-8">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-sumi px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-washi transition-shadow hover:shadow-xl"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden />
              <span className="relative z-10">{ja ? 'この物件について相談する' : 'Enquire about this property'}</span>
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <a href={p.bayut} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi/15 px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-sumi transition-colors hover:border-gold hover:text-gold">
                Bayut <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
              </a>
              <a href={p.pf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-sumi/15 px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-sumi transition-colors hover:border-gold hover:text-gold">
                Property Finder <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
              </a>
            </div>
            <p className="mt-2 text-center text-[10px] font-light italic text-sumi-soft/70">
              {ja ? '※ 価格・利回り・仕様はサンプルです。' : '※ Price, yield and specs are illustrative samples.'}
            </p>
          </div>
        </div>
      </div>
    </div>

    <PropertyAnalysis listing={p} locale={locale} />
    </>
  );
}
