import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { FamilyOfficeSection } from '@/components/home/FamilyOfficeSection';
import { EcosystemFlower } from '@/components/home/EcosystemFlower';
import { FoaasSuite } from '@/components/foaas/FoaasSuite';
import { WealthJourney } from '@/components/foaas/WealthJourney';
import { TaxStrategies } from '@/components/foaas/TaxStrategies';
import { CaseStudies } from '@/components/foaas/CaseStudies';
import { WealthDashboard } from '@/components/home/WealthDashboard';
import { Footer } from '@/components/nav/Footer';

// Bright, vibrant Dubai daylight skyline for the Family Office hero
const IMG =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('familyOffice') };
}

export default async function FamilyOfficePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('family');
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMG}
          alt="Dubai skyline in bright daylight"
          label={t('label')}
          title={t('title')}
          subtitle={t('intro')}
          accent="#0b2a5b"
        />
        <FamilyOfficeSection />
        <EcosystemFlower />
        <FoaasSuite />
        <WealthJourney />
        <TaxStrategies />
        <CaseStudies />
        <WealthDashboard />
      </main>
      <Footer />
    </>
  );
}
