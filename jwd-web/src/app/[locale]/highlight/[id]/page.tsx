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

  if (!highlight) {
    notFound();
  }

  const tx = (l: L) => l[locale as 'ja' | 'en'] ?? l.en;

  return (
    <main className="relative min-h-screen bg-washi pt-32 pb-24">
      <PremiumBackdrop glow />
      
      <div className="relative mx-auto max-w-3xl px-7 lg:px-12">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sumi-soft transition-colors hover:text-gold"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          {locale === 'ja' ? 'トップに戻る' : 'Back to Home'}
        </Link>

        {/* The Stat Badge */}
        <div className="mb-10 inline-flex flex-col items-start gap-3 rounded-[2rem] border border-sumi/10 bg-washi/80 p-8 shadow-sm backdrop-blur-md">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold">
            {tx(highlight.stat.label)}
          </span>
          <span className="font-en text-5xl font-light text-sumi">
            {highlight.stat.prefix}{highlight.stat.value}{highlight.stat.suffix}
          </span>
        </div>

        <h1 className="font-jp mb-8 text-3xl font-bold leading-snug text-sumi lg:text-4xl">
          {tx(highlight.title)}
        </h1>

        <p className="mb-14 text-base font-light leading-loose text-sumi-soft lg:text-lg">
          {tx(highlight.description)}
        </p>

        <div className="grid gap-8 border-t border-sumi/10 pt-12 md:grid-cols-2">
          {highlight.points.map((point, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10 text-xs text-gold">
                  {i + 1}
                </span>
                <h3 className="font-jp text-base font-semibold text-sumi">
                  {tx(point.title)}
                </h3>
              </div>
              <p className="pl-9 text-sm font-light leading-[1.8] text-sumi-soft">
                {tx(point.text)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-sumi px-10 py-4 text-xs font-medium uppercase tracking-[0.16em] text-washi transition-all hover:shadow-[0_12px_24px_-8px_rgba(32,37,31,0.4)]"
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-bright transition-transform duration-500 ease-out group-hover:scale-x-100"
              aria-hidden
            />
            <span className="relative">
              {locale === 'ja' ? '無料相談を予約する' : 'Book a Consultation'}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
