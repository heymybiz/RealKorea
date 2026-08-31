import type { Metadata } from "next";
import Link from "next/link";

import { FilterChips, type FilterChip } from "@/components/site/filter-chips";
import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { PlaceCard } from "@/components/site/place-card";
import { SectionHeading } from "@/components/site/section-heading";
import { getNeighborhoods, getPlaces } from "@/lib/cms";
import type { PlaceVertical } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Places",
  description:
    "Neighborhoods and places across Seoul and the capital region, each with an honest fact stack.",
  alternates: { canonical: "/places" },
};

/**
 * PRD 02 §3.7 asks for filters by neighborhood and by tag
 * (market, cafe, walk, shop-editorial). `walk` and `shop-editorial` are
 * `vertical` values, but `market` and `cafe` are not in the PRD 03 §3.2 schema
 * at all — there is no tag field. Filtering by `vertical` is the honest subset;
 * a real tag taxonomy needs a schema decision first.
 */
const VERTICAL_CHIPS: readonly FilterChip[] = [
  { value: null, label: "All" },
  { value: "eat", label: "Eat & Drink" },
  { value: "shop-editorial", label: "Shop" },
  { value: "walk", label: "Walk" },
  { value: "other", label: "Other" },
];

const VALID_VERTICALS = new Set(
  VERTICAL_CHIPS.flatMap((chip) => (chip.value ? [chip.value] : [])),
);

function readVertical(
  value: string | string[] | undefined,
): PlaceVertical | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && VALID_VERTICALS.has(candidate)
    ? (candidate as PlaceVertical)
    : null;
}

export default async function PlacesIndexPage({
  searchParams,
}: PageProps<"/places">) {
  const vertical = readVertical((await searchParams).vertical);

  const [places, neighborhoods] = await Promise.all([
    getPlaces(vertical ? { vertical } : undefined),
    getNeighborhoods(),
  ]);

  return (
    <div className="content-shell py-16">
      <h1 className="max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        Places
      </h1>

      {/* Neighborhood mosaic */}
      <section className="mt-12">
        <SectionHeading kicker="Neighborhoods" title="Start with an area." />

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {neighborhoods.map((neighborhood) => (
            <li key={neighborhood.id}>
              <Link
                href={`/places/${neighborhood.slug}`}
                className="group block"
              >
                {neighborhood.hero ? null : <MediaPlaceholder ratio="4/5" />}
                <p className="group-hover:text-crimson mt-3 text-[15px] font-medium transition-colors duration-[180ms] ease-out">
                  {neighborhood.nameEn}
                </p>
                <p className="text-ink-soft text-[13px]">
                  {neighborhood.nameKo}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-rule mt-16 border-t pt-12">
        <SectionHeading kicker="All places" title="Everything on the desk." />

        <div className="mb-10">
          <FilterChips
            basePath="/places"
            paramName="vertical"
            chips={VERTICAL_CHIPS}
            active={vertical}
            label="Filter places by kind"
          />
        </div>

        {places.length > 0 ? (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="border-rule bg-paper-warm border p-6">
            <p className="text-ink text-[15px]">
              Nothing filed under this filter yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
