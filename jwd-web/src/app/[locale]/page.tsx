import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Navbar } from '@/components/nav/Navbar';
import { TwoHorizons } from '@/components/hero/TwoHorizons';
import { AboutSection } from '@/components/home/AboutSection';
import { WhyDubaiSection } from '@/components/home/WhyDubaiSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TrustBand } from '@/components/home/TrustBand';
import { PropertiesSection } from '@/components/home/PropertiesSection';
import { HeartOfEuropeSection } from '@/components/home/HeartOfEuropeSection';
import { FundsSection } from '@/components/home/FundsSection';
import { JapanSection } from '@/components/home/JapanSection';
import { FamilyOfficeSection } from '@/components/home/FamilyOfficeSection';
import { SimulatorSection } from '@/components/home/SimulatorSection';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { StoriesSection } from '@/components/home/StoriesSection';
import { ContactCTA } from '@/components/home/ContactCTA';
import { Footer } from '@/components/nav/Footer';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  // Sections alternate the two brand voices: washi (Japan, light) and
  // night (Dubai, dark) — the scroll itself retells the two-worlds story.
  return (
    <>
      <Navbar />
      <main>
        <TwoHorizons />
        <AboutSection /> {/* washi */}
        <WhyDubaiSection /> {/* night */}
        <ServicesSection /> {/* washi-deep */}
        <TrustBand /> {/* night */}
        <PropertiesSection /> {/* washi */}
        <HeartOfEuropeSection /> {/* night, cinematic */}
        <FundsSection /> {/* washi-deep */}
        <JapanSection /> {/* washi */}
        <FamilyOfficeSection /> {/* night */}
        <SimulatorSection /> {/* washi-deep, interactive */}
        <KnowledgeSection /> {/* washi */}
        <StoriesSection /> {/* night-deep */}
        <ContactCTA /> {/* washi */}
      </main>
      <Footer />
    </>
  );
}
