import type { Section, Subsection } from '../types';
import { about } from './about';
import { whyDubai } from './why-dubai';
import { dubaiProperties } from './dubai-properties';
import { heartOfEurope } from './heart-of-europe';
import { funds } from './funds';

/** Sections 2–6 of the sitemap, each with its subsection pages. */
export const SECTIONS: Section[] = [
  about,
  whyDubai,
  dubaiProperties,
  heartOfEurope,
  funds,
];

export function getSection(slug: string): Section | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export interface SubResult {
  section: Section;
  sub: Subsection;
  index: number;
  prev?: Subsection;
  next?: Subsection;
}

export function getSub(
  sectionSlug: string,
  subSlug: string,
): SubResult | undefined {
  const section = getSection(sectionSlug);
  if (!section) return undefined;
  const index = section.subsections.findIndex((s) => s.slug === subSlug);
  if (index === -1) return undefined;
  return {
    section,
    sub: section.subsections[index],
    index,
    prev: section.subsections[index - 1],
    next: section.subsections[index + 1],
  };
}
