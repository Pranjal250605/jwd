import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/nav/Footer';
import { AdvisorPageContent } from './AdvisorPageContent';

const IMG =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'advisor' });
  return { title: t('title') };
}

export default async function AdvisorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('advisor');

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMG}
          alt="AI Investment Advisor"
          label={t('label')}
          title={t('title')}
          subtitle={t('intro')}
        />
        <AdvisorPageContent />
      </main>
      <Footer />
    </>
  );
}
