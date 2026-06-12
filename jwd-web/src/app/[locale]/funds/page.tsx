import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { FundsSection } from '@/components/home/FundsSection';
import { Footer } from '@/components/nav/Footer';

const IMG =
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('funds') };
}

export default async function FundsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('funds');
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMG}
          alt="Market data"
          label={t('label')}
          title={t('title')}
          subtitle={t('intro')}
        />
        <FundsSection />
      </main>
      <Footer />
    </>
  );
}
