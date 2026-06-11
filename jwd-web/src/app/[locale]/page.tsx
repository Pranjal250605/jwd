import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Navbar } from '@/components/nav/Navbar';
import { TwoHorizons } from '@/components/hero/TwoHorizons';
import { TrustBand } from '@/components/home/TrustBand';
import { Footer } from '@/components/nav/Footer';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <TwoHorizons />
        <TrustBand />
      </main>
      <Footer />
    </>
  );
}
