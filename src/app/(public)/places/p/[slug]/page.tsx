import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FactStack } from "@/components/site/fact-stack";
import { MapEmbed } from "@/components/site/map-embed";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { PartnerBadge } from "@/components/site/partner-badge";
import { PlaceCard } from "@/components/site/place-card";
import { Prose } from "@/components/site/prose";
import { SampleLabel } from "@/components/site/sample-label";
import { SectionHeading } from "@/components/site/section-heading";
import { TipBoxes } from "@/components/site/tip-box";
import { CommentSection } from "@/components/site/comment-section";
import { PlaceJsonLd } from "@/components/site/json-ld";
import {
  getComments,
  getNeighborhoodBySlug,
  getPlaceBySlug,
  getPlaces,
} from "@/lib/cms";
import { firstMention, laterMention } from "@/lib/romanize";
import { readErrorCode } from "@/lib/validation";

/**
 * NOTE: dynamic for now, so these params are not prerendered. The comment
 * notice reads `searchParams` and the comment list is written at runtime by the
 * demo queue. Both go away with a real CMS, and then this list applies again.
 */
export async function generateStaticParams() {
  const places = await getPlaces();
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/places/p/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) return { title: "Place not found", robots: { index: false } };

  return {
    title: place.seoTitle ?? place.editorialTitle,
    description: place.seoDescription ?? place.whyLocal ?? undefined,
    alternates: { canonical: `/places/p/${slug}` },
    robots: place.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function PlacePage({
  params,
  searchParams,
}: PageProps<"/places/p/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const place = await getPlaceBySlug(slug);

  if (!place) notFound();

  const [neighborhood, allPlaces, comments] = await Promise.all([
    getNeighborhoodBySlug(place.neighborhoodSlug),
    getPlaces(),
    getComments({ type: "place", slug }),
  ]);

  const alternativeSlug =
    place.localAlternative?.kind === "place"
      ? place.localAlternative.slug
      : null;

  const alternative = alternativeSlug
    ? (allPlaces.find((candidate) => candidate.slug === alternativeSlug) ?? null)
    : null;

  const nearby = allPlaces.filter(
    (candidate) =>
      candidate.slug !== place.slug &&
      candidate.neighborhoodSlug === place.neighborhoodSlug,
  );

  const venueLabel =
    laterMention(place.venueNameEn, place.venueNameKo) ?? place.editorialTitle;

  return (
    <article className="content-shell py-16">
      <div className="text-ink-soft flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-[0.12em] uppercase">
        {neighborhood ? (
          <Link
            href={`/places/${neighborhood.slug}`}
            className="hover:text-crimson transition-colors duration-[180ms] ease-out"
          >
            {neighborhood.nameEn}
          </Link>
        ) : null}
        {place.isPartner ? <PartnerBadge /> : null}
        {place.sample ? <SampleLabel /> : null}
      </div>

      {/* PRD 02 §3.9 — editorial H1, never the venue's legal name. */}
      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        {place.editorialTitle}
      </h1>

      {/* PRD 02 §5 — the venue's first mention carries the Hangul once. */}
      {firstMention(place.venueNameEn, place.venueNameKo) ? (
        <p className="text-ink-soft mt-3 text-lg">
          {firstMention(place.venueNameEn, place.venueNameKo)}
        </p>
      ) : null}

      {/* PRD 04 §4 — body and fact stack split at 960px. */}
      <div className="mt-10 grid gap-10 min-[960px]:grid-cols-[1.3fr_0.7fr]">
        <div>
          {place.photos.at(0) ? null : (
            <MediaPlaceholder ratio="3/2" label="Photograph pending" />
          )}

          <Prose blocks={place.body} />
          <TipBoxes tipBoxes={place.tipBoxes} />
        </div>

        <div className="min-[960px]:sticky min-[960px]:top-8 min-[960px]:self-start">
          <FactStack
            place={place}
            alternativePlace={
              alternative
                ? { slug: alternative.slug, title: alternative.editorialTitle }
                : null
            }
          />
        </div>
      </div>

      {/* FR-041 — the map comes after the body, lazily, and only with geo. */}
      {place.geo ? (
        <section className="mt-12">
          <h2 className="text-ink-soft mb-4 text-xs tracking-[0.12em] uppercase">
            Map
          </h2>
          <MapEmbed geo={place.geo} venueLabel={venueLabel} />
        </section>
      ) : null}

      {nearby.length > 0 ? (
        <section className="border-rule mt-16 border-t pt-12">
          <SectionHeading kicker="Nearby" title="Also in this area." />
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((candidate) => (
              <PlaceCard key={candidate.id} place={candidate} />
            ))}
          </div>
        </section>
      ) : null}

      {/*
        PRD 02 §3.9 — "Write a review" is forbidden as a primary CTA in v1.
        Comments are allowed at the bottom and stay visually secondary.
      */}
      <PlaceJsonLd place={place} />

      <CommentSection
        target={{ type: "place", slug }}
        comments={comments}
        error={readErrorCode(query.commentError)}
        submitted={query.commented === "1"}
        emphasis="secondary"
      />
    </article>
  );
}
