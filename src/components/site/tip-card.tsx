import Link from "next/link";

import { MediaPlaceholder } from "@/components/site/media-placeholder";
import { SampleLabel } from "@/components/site/sample-label";
import { VerifiedMark } from "@/components/site/verified-mark";
import type { Neighborhood, Tip, TipTopic } from "@/lib/content/types";

const TOPIC_LABEL: Record<TipTopic, string> = {
  arrival: "Arrival",
  transit: "Transit",
  money: "Money",
  etiquette: "Etiquette",
  survival: "Survival",
  seasonal: "Seasonal",
};

/** PRD 04 §5 — image 3:2, kicker, title, dek, optional neighborhood. */
export function TipCard({
  tip,
  neighborhoods,
}: {
  tip: Tip;
  neighborhoods?: readonly Neighborhood[];
}) {
  const neighborhood = neighborhoods?.find((candidate) =>
    tip.neighborhoodSlugs.includes(candidate.slug),
  );

  return (
    <article className="group">
      <Link href={`/tips/${tip.slug}`} className="block">
        {tip.image ? null : (
          <MediaPlaceholder ratio="3/2" label="Photograph pending" />
        )}

        <div className="pt-4">
          <p className="text-crimson text-xs tracking-[0.12em] uppercase">
            {TOPIC_LABEL[tip.topic]}
          </p>

          <h3 className="group-hover:text-crimson mt-2 text-[22px] leading-[1.2] font-semibold transition-colors duration-[180ms] ease-out">
            {tip.title}
          </h3>

          {tip.dek ? (
            <p className="text-ink-soft mt-2 text-[15px] leading-6">
              {tip.dek}
            </p>
          ) : null}

          <div className="text-ink-soft mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            {/* Never rendered for scaffolding: samples carry no verification. */}
            {tip.editorVerified ? <VerifiedMark label="Verified local" /> : null}
            {neighborhood ? (
              <span className="tracking-[0.12em] uppercase">
                {neighborhood.nameEn}
              </span>
            ) : null}
            {tip.sample ? <SampleLabel /> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
