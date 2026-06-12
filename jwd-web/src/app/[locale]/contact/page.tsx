import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { ContactCTA } from '@/components/home/ContactCTA';
import { Footer } from '@/components/nav/Footer';

const IMG =
  'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('contact') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={IMG}
          alt="Dubai at night"
          label={t('label')}
          title={t('title')}
          subtitle={t('desc')}
        />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
