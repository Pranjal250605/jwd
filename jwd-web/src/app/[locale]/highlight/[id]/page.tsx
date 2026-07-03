import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { highlights } from '@/content/highlights';
import { PremiumBackdrop } from '@/components/kintsugi/PremiumBackdrop';
import type { L } from '@/content/types';

export default async function HighlightPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const highlight = highlights[id];

  if (!highlight) notFound();

  const tx = (l: L) => l[locale as 'ja' | 'en'] ?? l.en;

  return (
    <main className="relative min-h-screen overflow-hidden bg-washi pt-36 pb-24">
      <PremiumBackdrop glow />
      
      <div className="relative mx-auto max-w-5xl px-7 lg:px-12">
        <Link
          href="/"
          className="group mb-16 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-sumi-soft transition-colors hover:text-gold"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          {locale === 'ja' ? 'トップに戻る' : 'Back to Home'}
        </Link>

        {/* Hero Area */}
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col">
            <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              {tx(highlight.stat.label)}
            </span>
            <span className="bg-gradient-to-br from-gold to-gold-bright bg-clip-text font-en text-7xl font-light leading-none text-transparent lg:text-[8rem]">
              {highlight.stat.prefix}{highlight.stat.value}{highlight.stat.suffix}
            </span>
          </div>

          <div className="max-w-lg pb-2">
            <h1 className="font-jp text-3xl font-bold leading-[1.3] text-sumi lg:text-[2.6rem]">
              {tx(highlight.title)}
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="my-20 h-px w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />

        {/* Content Area */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          <div className="lg:w-5/12">
            <p className="text-base font-light leading-[2.2] text-sumi-soft lg:text-[1.05rem]">
              {tx(highlight.description)}
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:w-7/12">
            {highlight.points.map((point, i) => (
              <div key={i} className="group relative">
                <div className="absolute -left-7 top-1 text-[10px] font-mono text-gold/40">
                  0{i + 1}
                </div>
                <h3 className="font-jp mb-3 text-lg font-semibold text-sumi">
                  {tx(point.title)}
                </h3>
                <p className="text-sm font-light leading-[1.9] text-sumi-soft">
                  {tx(point.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-32 flex justify-center border-t border-sumi/5 pt-20">
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full border border-gold/30 bg-washi px-14 py-5 text-[11px] font-medium uppercase tracking-[0.2em] text-sumi shadow-[0_4px_20px_-10px_rgba(0,176,225,0.3)] transition-all hover:border-gold hover:shadow-[0_8px_30px_-12px_rgba(0,176,225,0.5)]"
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold/10 to-gold/5 transition-transform duration-500 ease-out group-hover:scale-x-100"
              aria-hidden
            />
            <span className="relative">
              {locale === 'ja' ? '詳細を問い合わせる' : 'Inquire for Details'}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
