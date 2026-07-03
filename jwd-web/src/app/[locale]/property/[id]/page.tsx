import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { listings } from '@/content/properties';
import { getPriceHistory } from '@/lib/market-data';
import { getFxRate } from '@/lib/fx';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/nav/Footer';
import { PropertyDetail } from '@/components/home/PropertyDetail';

export function generateStaticParams() {
  return listings.map((p) => ({ id: p.id }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const listing = listings.find((p) => p.id === id);
  if (!listing) notFound();

  const [history, fx] = await Promise.all([getPriceHistory(listing), getFxRate()]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-washi pt-36 pb-12 lg:pt-48 lg:pb-24">
        <PropertyDetail listing={listing} locale={locale} history={history} fx={fx} />
      </main>
      <Footer />
    </>
  );
}
