import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { Navbar } from '@/components/nav/Navbar';
import { TwoHorizons } from '@/components/hero/TwoHorizons';
import { HomeLatestProperties } from '@/components/home/HomeLatestProperties';
import { HomeHighlights } from '@/components/home/HomeHighlights';
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
        <TwoHorizons /> {/* hero */}
        <HomeLatestProperties /> {/* washi */}
        <HomeHighlights /> {/* night */}
        <HomeMarketNews market="dubai" tone="light" /> {/* washi */}
        <HomeMarketNews market="japan" tone="deep" /> {/* washi-deep */}
        <HomeFeaturedProjects /> {/* night, cinematic */}
        <HomeWhyJwd /> {/* washi-deep */}
        <HomeCTA /> {/* night-deep */}
      </main>
      <Footer />
    </>
  );
}
