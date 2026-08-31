import Link from "next/link";
import { Search } from "lucide-react";

import { SEARCH_SEEDS } from "@/lib/search-seeds";

/**
 * PRD 04 §5 — the cover search. A plain GET form, so it submits to `/search`
 * with no JavaScript (NFR-010). The header overlay reuses the same field.
 *
 * The field sits on an ink border rather than a hairline so it reads as the
 * primary action on the cover instead of another pale panel.
 */
export function CoverSearch({
  seedCount = 5,
}: {
  /** The cover shows a short list; `/ask` and `/search` show all nine. */
  seedCount?: number;
}) {
  return (
    <div className="mt-8">
      <form action="/search" method="get" role="search" className="max-w-xl">
        <label htmlFor="cover-search" className="sr-only">
          Search Real Korea
        </label>

        <div className="border-ink bg-paper focus-within:border-crimson flex items-center border-2 transition-colors duration-[180ms] ease-out">
          <input
            id="cover-search"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Ask something tourists never get a straight answer to"
            className="text-ink placeholder:text-ink-soft h-14 w-full bg-transparent px-4 text-[15px] outline-none"
          />
          <button
            type="submit"
            className="bg-crimson hover:bg-crimson-dark inline-flex h-14 shrink-0 items-center gap-2 px-5 text-xs tracking-[0.12em] text-white uppercase transition-colors duration-[180ms] ease-out"
          >
            <Search className="size-4" aria-hidden="true" />
            Search
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
          People ask
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {SEARCH_SEEDS.slice(0, seedCount).map((seed) => (
            <li key={seed}>
              <Link
                href={`/search?q=${encodeURIComponent(seed)}`}
                className="text-ink hover:text-crimson decoration-ink/30 hover:decoration-crimson text-[15px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
              >
                {seed}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/ask"
        className="border-ink text-ink hover:bg-ink mt-6 inline-flex items-center border-2 px-5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out hover:text-white"
      >
        Browse questions
      </Link>
    </div>
  );
}
