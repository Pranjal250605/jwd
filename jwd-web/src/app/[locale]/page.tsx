import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Navbar } from '@/components/nav/Navbar';
import { TwoHorizons } from '@/components/hero/TwoHorizons';
import { AboutSection } from '@/components/home/AboutSection';
import { WhyDubaiSection } from '@/components/home/WhyDubaiSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TrustBand } from '@/components/home/TrustBand';
import { ContactCTA } from '@/components/home/ContactCTA';
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
        <AboutSection />
        <WhyDubaiSection />
        <ServicesSection />
        <TrustBand />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
