import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { JapanSection } from '@/components/home/JapanSection';
import { Footer } from '@/components/nav/Footer';

const IMG =
  'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('japanProperties') };
}

export default async function JapanPropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('japanProps');
  return (
    <>
      <Navbar />
      <main>
        <PageHero image={IMG} alt="Mount Fuji and cherry blossoms" label={t('label')} title={t('title')} />
        <JapanSection />
      </main>
      <Footer />
    </>
  );
}
