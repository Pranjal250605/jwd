import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/nav/Footer';
import { PageHero } from '@/components/PageHero';
import { Blocks } from '@/components/sub/Blocks';
import { Breadcrumb } from '@/components/sub/Breadcrumb';
import { SubPager } from '@/components/sub/SubPager';
import { SubCTA } from '@/components/sub/SubCTA';
import { getSub } from '@/content/sections';
import type { L } from '@/content/types';

type Lang = 'ja' | 'en';

/**
 * Shared server renderer for every subsection page across sections 2–6.
 * Each dynamic route just forwards its (sectionSlug, subSlug) here.
 */
export async function SubsectionPage({
  sectionSlug,
  subSlug,
}: {
  sectionSlug: string;
  subSlug: string;
}) {
  const found = getSub(sectionSlug, subSlug);
  if (!found) notFound();
  const { section, sub, prev, next } = found;

  const locale = (await getLocale()) as Lang;
  const t = await getTranslations('nav');
  const tx = (l: L) => l[locale] ?? l.en;
  const sectionLabel = t(section.navKey);
  const base = `/${section.slug}`;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          image={sub.image}
          alt={tx(sub.title)}
          label={tx(sub.label)}
          title={tx(sub.title)}
          subtitle={tx(sub.tagline)}
        />
        <Breadcrumb
          items={[
            { label: t('home'), href: '/' },
            { label: sectionLabel, href: base },
            { label: tx(sub.label) },
          ]}
        />
        <Blocks blocks={sub.blocks} />
        <SubPager
          base={base}
          sectionHref={base}
          sectionLabel={sectionLabel}
          prev={prev ? { slug: prev.slug, label: prev.label } : undefined}
          next={next ? { slug: next.slug, label: next.label } : undefined}
        />
        <SubCTA />
      </main>
      <Footer />
    </>
  );
}

/** Build SEO metadata for a subsection. */
export async function subsectionMetadata(
  sectionSlug: string,
  subSlug: string,
) {
  const found = getSub(sectionSlug, subSlug);
  if (!found) return {};
  const locale = (await getLocale()) as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  return {
    title: tx(found.sub.title),
    description: tx(found.sub.tagline),
  };
}
