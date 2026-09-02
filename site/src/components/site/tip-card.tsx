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
    <article className="heritage-card flex flex-col justify-between border-t-2 border-t-[var(--amber)] p-5">
      <div>
        <Link href={`/tips/${tip.slug}`} className="group block overflow-hidden border border-[var(--rule)]">
          {tip.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={tip.image.src}
              alt={tip.image.alt}
              width={tip.image.width}
              height={tip.image.height}
              className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <MediaPlaceholder
              ratio="3/2"
              label="Photograph pending"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <span className="fact-chip bg-[var(--amber-light)] text-[var(--amber)]">
              {TOPIC_LABEL[tip.topic]}
            </span>
            {neighborhood ? (
              <span className="furniture text-[10px] text-[var(--ink-soft)]">
                {neighborhood.nameEn}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-[21px] leading-[1.2] font-bold">
            <Link
              href={`/tips/${tip.slug}`}
              className="transition-colors hover:text-[var(--amber)]"
            >
              {tip.title}
            </Link>
          </h3>

          {tip.dek ? (
            <p className="mt-2 text-[15px] leading-6 text-[var(--ink-soft)]">
              {tip.dek}
            </p>
          ) : null}
        </div>
      </div>

      <div className="rule-single mt-5 flex flex-wrap items-center justify-between gap-2 pt-3">
        <span className="furniture text-[10px] font-bold text-[var(--amber)]">
          Read answer →
        </span>
        {tip.editorVerified ? <VerifiedMark label="Verified local" /> : null}
        {tip.sample ? <SampleLabel /> : null}
      </div>
    </article>
  );
}
