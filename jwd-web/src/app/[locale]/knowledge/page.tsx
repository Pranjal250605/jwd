import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { Footer } from '@/components/nav/Footer';

const IMG =
  'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2400&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('knowledge') };
}

export default async function KnowledgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('knowledge');
  return (
    <>
      <Navbar />
      <main>
        <PageHero image={IMG} alt="Library" label={t('label')} title={t('title')} />
        <KnowledgeSection />
      </main>
      <Footer />
    </>
  );
}
