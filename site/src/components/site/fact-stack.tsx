import Link from "next/link";

import { formatMonthYear, toDateTimeAttribute } from "@/lib/format";
import type { Place } from "@/lib/content/types";
import { placeHref } from "@/lib/ia";

const UNKNOWN = "Unknown";

/**
 * PRD 02 §3.9 — the nine required fields, in the PRD's order, with the PRD's
 * labels.
 *
 * FR-040 is explicit: an unknown value shows `Unknown`, never a dummy "N/A"
 * and never an invented answer. On this site the fact stack is the reader's
 * reason to trust the page, so a blank is more useful than a guess.
 */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-rule border-b py-3 last:border-b-0">
      <dt className="text-ink-soft text-xs tracking-[0.12em] uppercase">
        {label}
      </dt>
      <dd className="text-ink mt-1 text-[15px] leading-6">{children}</dd>
    </div>
  );
}

function Unknown() {
  return <span className="text-ink-soft">{UNKNOWN}</span>;
}

function TrapValue({ value }: { value: Place["isTouristTrap"] }) {
  if (value === true) return <span className="text-trap">Yes</span>;
  if (value === false) return <span className="text-ok">No</span>;
  return <Unknown />;
}

function CardsValue({ value }: { value: Place["acceptsCards"] }) {
  if (value === true) return <span className="text-ok">Yes</span>;
  if (value === false) return <span className="text-trap">No</span>;
  return <Unknown />;
}

const ENGLISH_LABEL = {
  none: "None",
  some: "Some",
  comfortable: "Comfortable",
} as const;

const RESERVATION_LABEL = {
  no: "Not needed",
  recommended: "Recommended",
  required: "Required",
} as const;

export function FactStack({
  place,
  alternativePlace,
}: {
  place: Place;
  /** Resolved when `localAlternative` points at another Place. */
  alternativePlace?: { readonly slug: string; readonly title: string } | null;
}) {
  const lastVerified = formatMonthYear((place.checkedBy ? (place.checkedAt ?? null) : null));

  return (
    <section
      aria-labelledby="fact-stack-heading"
      className="border-rule bg-paper-warm border p-5"
    >
      <h2
        id="fact-stack-heading"
        className="text-ink-soft text-xs tracking-[0.12em] uppercase"
      >
        The facts
      </h2>

      <dl className="mt-3">
        <Row label="Why local">
          {place.whyLocal ?? <Unknown />}
        </Row>

        <Row label="Tourist trap?">
          <TrapValue value={place.isTouristTrap} />
          {place.touristTrapNote ? (
            <span className="text-ink-soft mt-1 block">
              {place.touristTrapNote}
            </span>
          ) : null}
        </Row>

        <Row label="Local alternative">
          {place.localAlternative === null ? (
            <Unknown />
          ) : place.localAlternative.kind === "note" ? (
            place.localAlternative.text
          ) : alternativePlace ? (
            <Link
              href={placeHref(alternativePlace.slug)}
              className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
            >
              {alternativePlace.title}
            </Link>
          ) : (
            <Unknown />
          )}
        </Row>

        <Row label="Price">
          {place.priceBand ? (
            <span aria-label={`Price band ${place.priceBand} of 4`}>
              {"₩".repeat(place.priceBand)}
            </span>
          ) : (
            <Unknown />
          )}
        </Row>

        <Row label="Cards">
          <CardsValue value={place.acceptsCards} />
        </Row>

        <Row label="English">
          {place.englishOk ? ENGLISH_LABEL[place.englishOk] : <Unknown />}
        </Row>

        <Row label="Reservation">
          {place.reservation ? (
            RESERVATION_LABEL[place.reservation]
          ) : (
            <Unknown />
          )}
        </Row>

        <Row label="Transit">
          {place.transitNote ?? <Unknown />}
        </Row>

        <Row label="Last verified">
          {lastVerified ? (
            <time dateTime={toDateTimeAttribute((place.checkedBy ? (place.checkedAt ?? null) : null))}>
              {lastVerified}
            </time>
          ) : (
            <span className="text-ink-soft">Not verified yet</span>
          )}
        </Row>
      </dl>
    </section>
  );
}
