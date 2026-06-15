import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { PropertiesSection } from '@/components/home/PropertiesSection';
import { SubHubGrid } from '@/components/sub/SubHubGrid';
import { getSection } from '@/content/sections';
import { getTheme } from '@/content/themes';
import { Footer } from '@/components/nav/Footer';

const SECTION = getSection('dubai-properties')!;
const THEME = getTheme('dubai-properties');

const IMG =
  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('properties') };
}

export default async function DubaiPropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('properties');
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMG}
          alt="Dubai Marina"
          label={t('label')}
          title={t('title')}
          subtitle={t('intro')}
          accent={THEME.accent}
          motif={THEME.motif}
          ribbon={THEME.ribbon}
        />
        <PropertiesSection />
        <SubHubGrid
          base="/dubai-properties"
          subsections={SECTION.subsections}
          heading={SECTION.blurb}
        />
      </main>
      <Footer />
    </>
  );
}
