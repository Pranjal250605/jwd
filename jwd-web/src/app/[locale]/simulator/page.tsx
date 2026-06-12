import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { SimulatorSection } from '@/components/home/SimulatorSection';
import { Footer } from '@/components/nav/Footer';

const IMG =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('simulator') };
}

export default async function SimulatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('simulator');
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMG}
          alt="Analytics dashboard"
          label={t('label')}
          title={t('title')}
          subtitle={t('intro')}
        />
        <SimulatorSection />
      </main>
      <Footer />
    </>
  );
}
