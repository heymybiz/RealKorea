import Link from "next/link";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SampleLabel } from "@/components/site/sample-label";
import type { Place, PriceBand } from "@/lib/content/types";

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
    <article className="group">
      <Link href={`/places/p/${place.slug}`} className="block">
        {firstPhoto ? null : (
          <MediaPlaceholder ratio="3/2" label="Photograph pending" />
        )}

        <div className="pt-4">
          <h3 className="group-hover:text-crimson text-[22px] leading-[1.2] font-semibold transition-colors duration-[180ms] ease-out">
            {place.editorialTitle}
          </h3>

          <div className="text-ink-soft mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <PriceDots band={place.priceBand} />

            {/* Only a confirmed trap is flagged. "unknown" says nothing. */}
            {place.isTouristTrap === true ? (
              <span className="text-trap tracking-[0.12em] uppercase">
                Tourist trap
              </span>
            ) : null}

            {place.isPartner ? (
              <span className="text-crimson border-crimson border px-1.5 py-0.5 text-[11px] tracking-[0.12em] uppercase">
                Partner
              </span>
            ) : null}

            {place.sample ? <SampleLabel /> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
