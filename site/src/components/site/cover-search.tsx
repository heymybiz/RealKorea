import Link from "next/link";
import { SEARCH_SEEDS } from "@/lib/search-seeds";

/**
 * PRD 04 §5 — the cover search. A plain GET form, so it submits to `/search`
 * with no JavaScript (NFR-010). The header overlay reuses the same field.
 *
 * The field sits on an ink border rather than a hairline so it reads as the
 * primary action on the cover instead of another pale panel.
 */
export function CoverSearch({
  seedCount = 4,
}: {
  /** The cover shows a short list; `/ask` and `/search` show all nine. */
  seedCount?: number;
}) {
  return (
    <div className="mt-10 max-w-xl">
      <form action="/search" method="get" role="search">
        <label htmlFor="cover-search" className="sr-only">
          Search Real Korea
        </label>

        <div className="flex items-stretch border-2 border-[var(--ink)] bg-white shadow-sm transition-shadow focus-within:shadow-md">
          <input
            id="cover-search"
            name="q"
            type="search"
            autoComplete="off"
            placeholder="Ask something tourists never get a straight answer to..."
            className="h-14 w-full bg-transparent px-5 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]/70"
          />
          <button
            type="submit"
            className="btn-action btn-ink-solid shrink-0"
          >
            <span>Search Desk →</span>
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="furniture text-[10px] text-[var(--amber)]">
          Popular:
        </span>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {SEARCH_SEEDS.slice(0, seedCount).map((seed) => (
            <li key={seed}>
              <Link
                href={`/search?q=${encodeURIComponent(seed)}`}
                className="text-[14px] text-[var(--ink-soft)] underline decoration-[var(--rule-strong)] underline-offset-4 transition-colors hover:text-[var(--lacquer)] hover:decoration-[var(--lacquer)]"
              >
                {seed}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
