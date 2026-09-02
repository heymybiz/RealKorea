import type { MetadataRoute } from "next";

import {
  getGuides,
  getNeighborhoods,
  getPlaces,
  getQuestions,
  getTips,
} from "@/lib/cms";
import { isIndexableQuestion } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tips, places, neighborhoods, questions, guides] = await Promise.all([
    getTips(),
    getPlaces(),
    getNeighborhoods(),
    getQuestions(),
    getGuides(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/ask"), priority: 0.9 },
    { url: absoluteUrl("/tips"), priority: 0.8 },
    { url: absoluteUrl("/guides"), priority: 0.85 },
    { url: absoluteUrl("/eat"), priority: 0.8 },
    { url: absoluteUrl("/places"), priority: 0.8 },
    { url: absoluteUrl("/shop"), priority: 0.5 },
    { url: absoluteUrl("/about"), priority: 0.6 },
    { url: absoluteUrl("/contact"), priority: 0.6 },
    { url: absoluteUrl("/legal/privacy"), priority: 0.3 },
    { url: absoluteUrl("/legal/terms"), priority: 0.3 },
    { url: absoluteUrl("/legal/affiliates"), priority: 0.3 },
  ];

  const tipEntries: MetadataRoute.Sitemap = tips
    .filter((tip) => !tip.sample)
    .map((tip) => ({
      url: absoluteUrl(`/tips/${tip.slug}`),
      lastModified: tip.updatedAt ?? tip.lastVerifiedAt ?? undefined,
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

  const guideEntries: MetadataRoute.Sitemap = guides
    .filter((guide) => !guide.sample)
    .map((guide) => ({
      url: absoluteUrl(guide.isFirst24Alias ? "/first-24-hours" : `/guides/${guide.slug}`),
      lastModified: guide.updatedAt ?? undefined,
      priority: 0.8,
    }));

  return [
    ...staticEntries,
    ...tipEntries,
    ...placeEntries,
    ...neighborhoodEntries,
    ...questionEntries,
    ...guideEntries,
  ];
}
