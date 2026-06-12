import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { FamilyOfficeSection } from '@/components/home/FamilyOfficeSection';
import { Footer } from '@/components/nav/Footer';

const IMG =
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2400&q=80';

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
          alt="Family at sunset"
          label={t('label')}
          title={t('title')}
          subtitle={t('intro')}
        />
        <FamilyOfficeSection />
      </main>
      <Footer />
    </>
  );
}
