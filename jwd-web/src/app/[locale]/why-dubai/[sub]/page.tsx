import { setRequestLocale } from 'next-intl/server';
import { getSection } from '@/content/sections';
import {
  SubsectionPage,
  subsectionMetadata,
} from '@/components/sub/SubsectionPage';

const SECTION = 'why-dubai';

export function generateStaticParams() {
  return getSection(SECTION)!.subsections.map((s) => ({ sub: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sub: string }>;
}) {
  const { locale, sub } = await params;
  setRequestLocale(locale);
  return subsectionMetadata(SECTION, sub);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; sub: string }>;
}) {
  const { locale, sub } = await params;
  setRequestLocale(locale);
  return <SubsectionPage sectionSlug={SECTION} subSlug={sub} />;
}
