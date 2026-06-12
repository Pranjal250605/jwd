import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { PropertiesSection } from '@/components/home/PropertiesSection';
import { Footer } from '@/components/nav/Footer';

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
        />
        <PropertiesSection />
      </main>
      <Footer />
    </>
  );
}
