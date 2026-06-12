import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { HeartOfEuropeSection } from '@/components/home/HeartOfEuropeSection';
import { Footer } from '@/components/nav/Footer';

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
        <PageHero image={IMG} alt="Open sea" label={t('label')} title={t('title')} />
        <HeartOfEuropeSection />
      </main>
      <Footer />
    </>
  );
}
