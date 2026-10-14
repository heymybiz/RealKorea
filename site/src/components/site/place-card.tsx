import Link from "next/link";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SampleLabel } from "@/components/site/sample-label";
import type { Place, PriceBand } from "@/lib/content/types";
import { placeHref } from "@/lib/ia";

/** Price band as filled dots. Unknown renders nothing rather than a guess. */
function PriceDots({ band }: { band: PriceBand | null }) {
  if (!band) return null;

  return (
    <span className="inline-flex items-center gap-0.5" title={`Price ${band} of 4`}>
      <span className="sr-only">{`Price band ${band} of 4`}</span>
      {([1, 2, 3, 4] as const).map((step) => (
        <span
          key={step}
          aria-hidden="true"
          className={
            step <= band
              ? "bg-ink size-1.5 rounded-full"
              : "bg-rule size-1.5 rounded-full"
          }
        />
      ))}
    </span>
  );
}

/** PRD 04 §5 — image, editorial title, price dots, trap flag if true. */
export function PlaceCard({ place }: { place: Place }) {
  const firstPhoto = place.photos.at(0);

  return (
    <article className="heritage-card flex flex-col justify-between border-t-2 border-t-[var(--chili)] p-5">
      <div>
        <Link href={placeHref(place.slug)} className="group block overflow-hidden border border-[var(--rule)]">
          {firstPhoto ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={firstPhoto.src}
              alt={firstPhoto.alt}
              width={firstPhoto.width}
              height={firstPhoto.height}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <MediaPlaceholder
              ratio="3/2"
              label={place.venueNameEn || "Venue Photo"}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <p className="furniture text-[10px] font-bold text-[var(--chili)]">
              {place.neighborhoodSlug.toUpperCase()}
            </p>
            <PriceDots band={place.priceBand} />
          </div>

          <h3 className="mt-2 text-[21px] leading-[1.2] font-bold">
            <Link
              href={placeHref(place.slug)}
              className="transition-colors hover:text-[var(--chili)]"
            >
              {place.editorialTitle}
            </Link>
          </h3>

          {place.venueNameEn ? (
            <p className="mt-1 text-[13px] text-[var(--ink-soft)]">
              {place.venueNameEn} {place.venueNameKo ? `(${place.venueNameKo})` : null}
            </p>
          ) : null}

          {place.whyLocal ? (
            <p className="mt-2.5 text-[14px] leading-6 text-[var(--ink-soft)] line-clamp-2">
              {place.whyLocal}
            </p>
          ) : null}
        </div>
      </div>

      <div className="rule-single mt-5 flex flex-wrap items-center justify-between gap-2 pt-3">
        <span className="furniture text-[10px] font-bold text-[var(--chili)]">
          Fact stack &amp; map →
        </span>

        {place.isTouristTrap === true ? (
          <span className="fact-chip bg-[var(--lacquer-light)] text-[var(--lacquer)]">
            ⚠️ Trap Warning
          </span>
        ) : null}

        {place.isPartner ? (
          <span className="fact-chip bg-[var(--amber-light)] text-[var(--amber)]">
            Partner
          </span>
        ) : null}

        {place.sample ? <SampleLabel /> : null}
      </div>
    </article>
  );
}
