import type { Metadata } from "next";
import Link from "next/link";

import { PlaceCard } from "@/components/site/place-card";
import { SelectField, SubmitButton } from "@/components/site/form-parts";
import { getPlaces } from "@/lib/cms";
import type { PriceBand } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Eat & Drink",
  description:
    "Places we would send a friend in Seoul and the capital region, and the traps we would pull them out of.",
  alternates: { canonical: "/eat" },
};

function single(value: string | string[] | undefined): string | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && candidate.length > 0 ? candidate : null;
}

function readPriceBand(value: string | null): PriceBand | null {
  if (value === "1" || value === "2" || value === "3" || value === "4") {
    return Number(value) as PriceBand;
  }
  return null;
}

/** PRD 02 §3.6 — the Eat filters are price, hide traps, English, and cards. */
export default async function EatIndexPage({
  searchParams,
}: PageProps<"/eat">) {
  const query = await searchParams;

  const priceBand = readPriceBand(single(query.price));
  const hideTraps = single(query.hideTraps) === "1";
  const englishOnly = single(query.english) === "1";
  const cardsOnly = single(query.cards) === "1";

  const places = await getPlaces({
    vertical: "eat",
    ...(priceBand ? { priceBand } : {}),
    hideTraps,
    englishOnly,
    cardsOnly,
  });

  const toggleHref = (key: string, on: boolean) => {
    const next = new URLSearchParams();
    if (priceBand) next.set("price", String(priceBand));
    if (hideTraps) next.set("hideTraps", "1");
    if (englishOnly) next.set("english", "1");
    if (cardsOnly) next.set("cards", "1");

    if (on) next.delete(key);
    else next.set(key, "1");

    const queryString = next.toString();
    return queryString ? `/eat?${queryString}` : "/eat";
  };

  const toggles = [
    { key: "hideTraps", label: "Hide traps", on: hideTraps },
    { key: "english", label: "English menu", on: englishOnly },
    { key: "cards", label: "Cards accepted", on: cardsOnly },
  ] as const;

  return (
    <div className="content-shell py-16">
      <h1 className="max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        Eat &amp; Drink
      </h1>

      <p className="text-ink-soft mt-5 max-w-2xl text-lg">
        Not a ranking. Places we’d send a friend, and the traps we’d pull them
        out of.
      </p>

      <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-4">
        <nav aria-label="Filter by conditions">
          <ul className="flex flex-wrap gap-2">
            {toggles.map((toggle) => (
              <li key={toggle.key}>
                <Link
                  href={toggleHref(toggle.key, toggle.on)}
                  aria-pressed={toggle.on}
                  className={cn(
                    "inline-flex items-center rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-[180ms] ease-out",
                    toggle.on
                      ? "border-crimson bg-crimson text-white"
                      : "border-rule text-ink hover:border-ink",
                  )}
                >
                  {toggle.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form action="/eat" method="get" className="flex flex-wrap gap-2">
          {hideTraps ? <input type="hidden" name="hideTraps" value="1" /> : null}
          {englishOnly ? <input type="hidden" name="english" value="1" /> : null}
          {cardsOnly ? <input type="hidden" name="cards" value="1" /> : null}

          <label htmlFor="price-filter" className="sr-only">
            Filter by price
          </label>
          <SelectField
            id="price-filter"
            name="price"
            defaultValue={priceBand ? String(priceBand) : ""}
            className="w-auto"
          >
            <option value="">Any price</option>
            <option value="1">₩</option>
            <option value="2">₩₩</option>
            <option value="3">₩₩₩</option>
            <option value="4">₩₩₩₩</option>
          </SelectField>
          <SubmitButton className="px-4 py-2.5">Apply</SubmitButton>
        </form>
      </div>

      {places.length > 0 ? (
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="border-rule bg-paper-warm mt-12 border p-6">
          <p className="text-ink text-[15px]">
            Nothing matches those conditions yet. Price, English, and cards are
            claims about a venue, so a place the desk has not verified is left
            out rather than assumed.
          </p>
        </div>
      )}
    </div>
  );
}
