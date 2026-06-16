import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Navbar } from '@/components/nav/Navbar';
import { ZenHero } from '@/components/hero/ZenHero';
import { HomeLatestProperties } from '@/components/home/HomeLatestProperties';
import { HomeHighlights } from '@/components/home/HomeHighlights';
import { HomeExplore } from '@/components/home/HomeExplore';
import { HomeCalculator } from '@/components/home/HomeCalculator';
import { HomeMarketNews } from '@/components/home/HomeMarketNews';
import { HomeFeaturedProjects } from '@/components/home/HomeFeaturedProjects';
import { HomeWhyJwd } from '@/components/home/HomeWhyJwd';
import { HomeCTA } from '@/components/home/HomeCTA';
import { Footer } from '@/components/nav/Footer';

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  // HOME (sitemap section 1) presents its own seven blocks, in order:
  // Latest Properties → Investment Highlights → Dubai Market News →
  // Japan Market News → Featured Projects → Why JWD → CTA.
  return (
    <>
      <Navbar />
      <main>
        <ZenHero /> {/* zen photographic cover */}
        <HomeLatestProperties /> {/* washi */}
        <HomeHighlights /> {/* washi-deep, zen */}
        <HomeExplore /> {/* interactive — tabs: what we do */}
        <HomeMarketNews market="dubai" tone="light" /> {/* washi */}
        <HomeMarketNews market="japan" tone="deep" /> {/* washi-deep */}
        <HomeCalculator /> {/* interactive — live yield calculator */}
        <HomeFeaturedProjects /> {/* washi, photographic */}
        <HomeWhyJwd /> {/* washi-deep */}
        <HomeCTA /> {/* zen close */}
      </main>
      <Footer />
    </>
  );
}
