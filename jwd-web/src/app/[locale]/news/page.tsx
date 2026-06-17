import { setRequestLocale, getLocale } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/nav/Footer';
import { NewsList } from '@/components/news/NewsList';
import { getNews } from '@/lib/news';
import { getTheme } from '@/content/themes';

export async function generateMetadata() {
  const locale = await getLocale();
  return { title: locale === 'ja' ? 'マーケットニュース' : 'Market News' };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ja = locale === 'ja';
  const news = await getNews();
  const theme = getTheme('why-dubai');

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={ja ? 'マーケットニュース' : 'Market News'}
          title={ja ? '市場の、動きを追う' : 'The markets, as they move'}
          subtitle={
            ja
              ? '日本とドバイの市場・税制・ビザ・為替の動きを、JWDの視点で厳選してお届けします。'
              : 'Curated movements across the Japan and Dubai markets — tax, visas, currency and yield — through JWD’s lens.'
          }
          accent={theme.accent}
          motif={theme.motif}
          ribbon={theme.ribbon}
        />
        <section className="relative overflow-hidden bg-washi py-24 lg:py-28">
          <div className="mx-auto max-w-screen-xl px-7 lg:px-12">
            <NewsList items={news} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
