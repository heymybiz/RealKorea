import { Breadcrumb, CozyoBanner } from "@/components/site/realko-blocks";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PlaceCard } from "@/components/site/place-card";
import { SampleLabel } from "@/components/site/sample-label";
import { SectionHeading } from "@/components/site/section-heading";
import { TipCard } from "@/components/site/tip-card";
import {
  getNeighborhoodBySlug,
  getNeighborhoods,
  getPlaces,
  getTips,
} from "@/lib/cms";
import { firstMention } from "@/lib/romanize";
import { neighborhoodHref, isDayTrip } from "@/lib/ia";

/**
 * `/places/p/:slug` is a Place; `/places/:neighborhood` is a neighborhood
 * landing. The literal segment `p` belongs to the Place route, so it is never a
 * valid neighborhood slug.
 */
const RESERVED_SEGMENTS = new Set(["p"]);

type AreaProps = { params: Promise<{ area: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const neighborhoods = await getNeighborhoods();
  return neighborhoods.filter((n) => !isDayTrip(n.slug)).map((neighborhood) => ({
    area: neighborhood.slug,
  }));
}

export async function generateMetadata({
  params,
}: AreaProps): Promise<Metadata> {
  const { area: slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return { title: "Neighborhood not found", robots: { index: false } };
  }

  return {
    title: neighborhood.seoTitle ?? neighborhood.nameEn,
    description: neighborhood.seoDescription ?? neighborhood.dek ?? undefined,
    alternates: { canonical: neighborhoodHref(slug) },
    robots: neighborhood.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function NeighborhoodPage({
  params,
}: AreaProps) {
  const { area: slug } = await params;

  if (RESERVED_SEGMENTS.has(slug)) notFound();

  const neighborhood = await getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  // FR-033 — a neighborhood landing lists its Places and its Tips.
  const [places, tips, allNeighborhoods] = await Promise.all([
    getPlaces({ neighborhoodSlug: slug }),
    getTips({ neighborhoodSlug: slug, limit: 3 }),
    getNeighborhoods(),
  ]);

  return (
    <div className="rk-w rk-page">
      <Breadcrumb trail={[{ href: "/neighborhoods", label: "Neighborhoods & Day Trips" }, { label: neighborhood.nameEn }]} />
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">
        {neighborhood.region}
      </p>

      {/* PRD 02 §5 — first mention carries the Hangul, and never leads with it. */}
      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        {firstMention(neighborhood.nameEn, neighborhood.nameKo)}
      </h1>

      {neighborhood.dek ? (
        <p className="text-ink-soft mt-6 max-w-2xl text-lg">
          {neighborhood.dek}
        </p>
      ) : (
        <div className="border-rule bg-paper-warm mt-8 max-w-2xl border p-5">
          <div className="flex items-center gap-3">
            <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
              Editor dek pending
            </p>
            {neighborhood.sample ? <SampleLabel /> : null}
          </div>
        </div>
      )}

      {/* PRD 02 §3.8 — no map required on this page. */}

      <section className="mt-16">
        <SectionHeading kicker="Places" title="What the desk sends people to." />

        {places.length > 0 ? (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="border-rule bg-paper-warm border p-6">
            <p className="text-ink text-[15px]">
              No place has been filed here yet.
            </p>
          </div>
        )}
      </section>

      {tips.length > 0 ? (
        <section className="border-rule mt-16 border-t pt-12">
          <SectionHeading kicker="Tips" title="Worth knowing nearby." />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} neighborhoods={allNeighborhoods} />
            ))}
          </div>
        </section>
      ) : null}
      <CozyoBanner title={`Staying near ${neighborhood.nameEn}?`} />
    </div>
  );
}
