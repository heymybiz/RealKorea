import type { MetadataRoute } from "next";

import {
  getGuideBySlug,
  getNeighborhoods,
  getPlaces,
  getQuestions,
  getTips,
} from "@/lib/cms";
import { isIndexableQuestion } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site-url";

/**
 * NFR-008 — a sitemap of published, indexable URLs only.
 *
 * Two exclusions matter and are easy to get wrong:
 *
 * 1. Sample scaffolding is left out. Those pages carry `noindex` and no verified
 *    facts, so listing them would ask Google to crawl placeholders.
 * 2. Unanswered questions are left out (FR-014). A question with no editor
 *    answer is a thin page by definition.
 *
 * The result today is a small sitemap: the static surfaces plus whatever real
 * content exists. That is correct rather than broken.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tips, places, neighborhoods, questions, first24] = await Promise.all([
    getTips(),
    getPlaces(),
    getNeighborhoods(),
    getQuestions(),
    getGuideBySlug("first-24-hours-after-icn"),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/ask"), priority: 0.9 },
    { url: absoluteUrl("/tips"), priority: 0.8 },
    { url: absoluteUrl("/eat"), priority: 0.8 },
    { url: absoluteUrl("/places"), priority: 0.8 },
    { url: absoluteUrl("/shop"), priority: 0.5 },
    { url: absoluteUrl("/about"), priority: 0.5 },
    { url: absoluteUrl("/legal/privacy"), priority: 0.2 },
    { url: absoluteUrl("/legal/terms"), priority: 0.2 },
    { url: absoluteUrl("/legal/affiliates"), priority: 0.2 },
  ];

  const tipEntries: MetadataRoute.Sitemap = tips
    .filter((tip) => !tip.sample)
    .map((tip) => ({
      url: absoluteUrl(`/tips/${tip.slug}`),
      lastModified: tip.updatedAt ?? undefined,
      priority: 0.7,
    }));

  const placeEntries: MetadataRoute.Sitemap = places
    .filter((place) => !place.sample)
    .map((place) => ({
      url: absoluteUrl(`/places/p/${place.slug}`),
      lastModified: place.updatedAt ?? undefined,
      priority: 0.7,
    }));

  const neighborhoodEntries: MetadataRoute.Sitemap = neighborhoods
    .filter((neighborhood) => !neighborhood.sample)
    .map((neighborhood) => ({
      url: absoluteUrl(`/places/${neighborhood.slug}`),
      priority: 0.6,
    }));

  const questionEntries: MetadataRoute.Sitemap = questions
    .filter((question) => isIndexableQuestion(question) && !question.sample)
    .map((question) => ({
      url: absoluteUrl(`/ask/${question.slug}`),
      lastModified: question.answeredAt ?? question.updatedAt ?? undefined,
      priority: 0.7,
    }));

  const guideEntries: MetadataRoute.Sitemap =
    first24 && !first24.sample
      ? [{ url: absoluteUrl("/first-24-hours"), priority: 0.8 }]
      : [];

  return [
    ...staticEntries,
    ...tipEntries,
    ...placeEntries,
    ...neighborhoodEntries,
    ...questionEntries,
    ...guideEntries,
  ];
}
