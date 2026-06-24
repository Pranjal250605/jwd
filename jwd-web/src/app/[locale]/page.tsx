import { setRequestLocale } from 'next-intl/server';
import { getNews } from '@/lib/news';
import { Navbar } from '@/components/nav/Navbar';
import { ZenHero } from '@/components/hero/ZenHero';
import { HomeMarkets } from '@/components/home/HomeMarkets';
import { HomeLatestProperties } from '@/components/home/HomeLatestProperties';
import { HomeHighlights } from '@/components/home/HomeHighlights';
import { HomeExplore } from '@/components/home/HomeExplore';
import { HomeCalculator } from '@/components/home/HomeCalculator';
import { HomeMarketNews } from '@/components/home/HomeMarketNews';
import { HomeFeaturedProjects } from '@/components/home/HomeFeaturedProjects';
import { HomeWhyJwd } from '@/components/home/HomeWhyJwd';
import { HomeCTA } from '@/components/home/HomeCTA';
import { Footer } from '@/components/nav/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const news = await getNews();
  const dubaiNews = news.filter((n) => n.market === 'dubai').slice(0, 4);
  const japanNews = news.filter((n) => n.market === 'japan').slice(0, 4);

  // HOME (sitemap section 1) presents its own seven blocks, in order:
  // Latest Properties → Investment Highlights → Dubai Market News →
  // Japan Market News → Featured Projects → Why JWD → CTA.
  return (
    <>
      <Navbar />
      <main>
        <ZenHero /> {/* zen photographic cover */}
        <HomeMarkets /> {/* Equiti markets — clickable, partner products */}
        <HomeLatestProperties /> {/* washi */}
        <HomeHighlights /> {/* washi-deep, zen */}
        <HomeExplore /> {/* interactive — tabs: what we do */}
        <HomeMarketNews market="dubai" items={dubaiNews} tone="light" /> {/* washi */}
        <HomeMarketNews market="japan" items={japanNews} tone="deep" /> {/* washi-deep */}
        <HomeCalculator /> {/* interactive — live yield calculator */}
        <HomeFeaturedProjects /> {/* washi, photographic */}
        <HomeWhyJwd /> {/* washi-deep */}
        <HomeCTA /> {/* zen close */}
      </main>
      <Footer />
    </>
  );
}
