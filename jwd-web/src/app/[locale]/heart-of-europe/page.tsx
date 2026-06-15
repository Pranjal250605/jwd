import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { HeartOfEuropeSection } from '@/components/home/HeartOfEuropeSection';
import { SubHubGrid } from '@/components/sub/SubHubGrid';
import { getSection } from '@/content/sections';
import { getTheme } from '@/content/themes';
import { Footer } from '@/components/nav/Footer';

const SECTION = getSection('heart-of-europe')!;
const THEME = getTheme('heart-of-europe');

const IMG =
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('heartOfEurope') };
}

export default async function HeartOfEuropePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('hoe');
  return (
    <>
      <Navbar />
      <main>
        <PageHero image={IMG} alt="Open sea" label={t('label')} title={t('title')} accent={THEME.accent} motif={THEME.motif} ribbon={THEME.ribbon} />
        <HeartOfEuropeSection />
        <SubHubGrid
          base="/heart-of-europe"
          subsections={SECTION.subsections}
          heading={SECTION.blurb}
          accent={THEME.accent}
          accentBright={THEME.accentBright}
        />
      </main>
      <Footer />
    </>
  );
}
