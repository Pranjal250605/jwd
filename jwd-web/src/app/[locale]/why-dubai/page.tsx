import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { WhyDubaiSection } from '@/components/home/WhyDubaiSection';
import { SubHubGrid } from '@/components/sub/SubHubGrid';
import { getSection } from '@/content/sections';
import { Footer } from '@/components/nav/Footer';

const SECTION = getSection('why-dubai')!;

const IMG =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('whyDubai') };
}

export default async function WhyDubaiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('whyDubai');
  return (
    <>
      <Navbar />
      <main>
        <PageHero image={IMG} alt="Dubai skyline" label={t('label')} title={t('title')} />
        <WhyDubaiSection />
        <SubHubGrid
          base="/why-dubai"
          subsections={SECTION.subsections}
          heading={SECTION.blurb}
        />
      </main>
      <Footer />
    </>
  );
}
