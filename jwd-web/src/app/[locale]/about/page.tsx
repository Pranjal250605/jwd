import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { AboutSection } from '@/components/home/AboutSection';
import { HomeExplore } from '@/components/home/HomeExplore';
import { TrustBand } from '@/components/home/TrustBand';
import { SubHubGrid } from '@/components/sub/SubHubGrid';
import { getSection } from '@/content/sections';
import { getTheme } from '@/content/themes';
import { Footer } from '@/components/nav/Footer';

const SECTION = getSection('about')!;
const THEME = getTheme('about');

const IMG =
  'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('about') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  return (
    <>
      <Navbar />
      <main>
        <PageHero image={IMG} alt="Tokyo at night" label={t('label')} title={t('title')} accent={THEME.accent} motif={THEME.motif} ribbon={THEME.ribbon} />
        <AboutSection />
        <HomeExplore /> {/* interactive — tabs: what we do */}
        <TrustBand />
        <SubHubGrid
          base="/about"
          subsections={SECTION.subsections}
          heading={SECTION.blurb}
        />
      </main>
      <Footer />
    </>
  );
}
