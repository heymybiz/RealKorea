import type {
  Guide,
  Place,
  PublicQuestion,
  Tip,
} from "@/lib/content/types";
import { absoluteUrl } from "@/lib/site-url";

/**
 * PRD 03 §7 — Article for Tip, Guide, and Place; FAQPage on the Ask index for
 * answered questions.
 *
 * Two rules are non-negotiable here:
 *
 * 1. `askerEmail` must never be emitted (FR-011). Structured data only ever
 *    receives a `PublicQuestion`, which cannot carry the field.
 * 2. LocalBusiness is not emitted for a Place. PRD 03 §7 allows it only with a
 *    real address, and the schema has no address field — inventing one to satisfy
 *    a rich result would be exactly the kind of fabrication this site sells
 *    against.
 *
 * Sample scaffolding emits nothing: unverified placeholders should not be
 * offered to search engines as articles.
 */
function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed content, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function articleData(input: {
  headline: string;
  description: string | null;
  path: string;
  published: string | null;
  modified: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    mainEntityOfPage: absoluteUrl(input.path),
    ...(input.published ? { datePublished: input.published } : {}),
    ...(input.modified ? { dateModified: input.modified } : {}),
    author: { "@type": "Organization", name: "Real Korea" },
    publisher: { "@type": "Organization", name: "Real Korea" },
  };
}

export function TipJsonLd({ tip }: { tip: Tip }) {
  if (tip.sample) return null;

  return (
    <Script
      data={articleData({
        headline: tip.title,
        description: tip.dek,
        path: `/tips/${tip.slug}`,
        published: tip.publishedAt,
        modified: tip.updatedAt ?? tip.lastVerifiedAt,
      })}
    />
  );
}

export function PlaceJsonLd({ place }: { place: Place }) {
  if (place.sample) return null;

  return (
    <Script
      data={articleData({
        headline: place.editorialTitle,
        description: place.whyLocal,
        path: `/places/p/${place.slug}`,
        published: place.publishedAt,
        modified: place.updatedAt ?? place.lastVerifiedAt,
      })}
    />
  );
}

export function GuideJsonLd({ guide, path }: { guide: Guide; path: string }) {
  if (guide.sample) return null;

  return (
    <Script
      data={articleData({
        headline: guide.title,
        description: guide.dek,
        path,
        published: guide.publishedAt,
        modified: guide.updatedAt,
      })}
    />
  );
}

/** Only answered questions become FAQ entries. */
export function FaqJsonLd({
  questions,
}: {
  questions: readonly PublicQuestion[];
}) {
  const entries = questions
    .filter((question) => !question.sample && question.officialAnswer?.length)
    .map((question) => ({
      "@type": "Question",
      name: question.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: (question.officialAnswer ?? [])
          .map((block) => block.text)
          .join(" "),
      },
    }));

  if (entries.length === 0) return null;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: entries,
      }}
    />
  );
}
