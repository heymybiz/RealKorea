import type { MetadataRoute } from "next";

import { getGuides, getNeighborhoods, getPlaces, getQuestions, getTips } from "@/lib/cms";
import { isIndexableQuestion } from "@/lib/content/types";
import { guideHref, HUBS, neighborhoodHref, placeHref, SECTIONS, tipHref } from "@/lib/ia";
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
    ...SECTIONS.map((section) => ({ url: absoluteUrl(section.href), priority: 0.9 })),
    ...Object.entries(HUBS).flatMap(([section, hubs]) =>
      hubs.map((hub) => ({ url: absoluteUrl(`/${section}/${hub.id}`), priority: 0.8 })),
    ),
    { url: absoluteUrl("/contact"), priority: 0.5 },
    { url: absoluteUrl("/legal/privacy"), priority: 0.3 },
    { url: absoluteUrl("/legal/terms"), priority: 0.3 },
    { url: absoluteUrl("/legal/affiliates"), priority: 0.3 },
    { url: absoluteUrl("/legal/image-credits"), priority: 0.2 },
  ];

  return [
    ...staticEntries,
    ...tips.filter((t) => !t.sample).map((t) => ({ url: absoluteUrl(tipHref(t.slug)), lastModified: t.updatedAt ?? t.lastVerifiedAt ?? undefined, priority: 0.7 })),
    ...places.filter((p) => !p.sample).map((p) => ({ url: absoluteUrl(placeHref(p.slug)), lastModified: p.updatedAt ?? undefined, priority: 0.7 })),
    ...neighborhoods.filter((n) => !n.sample).map((n) => ({ url: absoluteUrl(neighborhoodHref(n.slug)), priority: 0.6 })),
    ...questions
      .filter((q) => isIndexableQuestion(q) && !q.sample)
      .map((q) => ({ url: absoluteUrl(`/ask/${q.slug}`), lastModified: q.answeredAt ?? q.updatedAt ?? undefined, priority: 0.7 })),
    ...guides.filter((g) => !g.sample).map((g) => ({ url: absoluteUrl(guideHref(g.slug)), lastModified: g.updatedAt ?? undefined, priority: 0.8 })),
  ];
}
