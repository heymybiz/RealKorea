import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";

import { getSearchCorpus } from "@/lib/cms";
import { search } from "@/lib/search";
import { SEARCH_SEEDS } from "@/lib/search-seeds";

export const metadata: Metadata = {
  title: "Search",
  description: "Search tips, questions, places, and guides on Real Korea.",
  alternates: { canonical: "/search" },
  // A results page has nothing durable to index.
  robots: { index: false, follow: true },
};

function single(value: string | string[] | undefined): string {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate ?? "";
}

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const query = single((await searchParams).q);
  const corpus = await getSearchCorpus();
  const results = search(corpus, query);

  return (
    <div className="content-shell py-16">
      <h1 className="text-[32px] leading-[1.1] font-semibold sm:text-[40px]">
        Search
      </h1>

      <form action="/search" method="get" role="search" className="mt-8 max-w-xl">
        <label htmlFor="search-input" className="sr-only">
          Search Real Korea
        </label>
        <div className="border-rule bg-paper focus-within:border-crimson flex items-center border transition-colors duration-[180ms] ease-out">
          <input
            id="search-input"
            name="q"
            type="search"
            defaultValue={query}
            autoComplete="off"
            placeholder="Ask something tourists never get a straight answer to"
            className="text-ink placeholder:text-ink-soft h-14 w-full bg-transparent px-4 text-[15px] outline-none"
          />
          <button
            type="submit"
            className="bg-crimson hover:bg-crimson-dark inline-flex h-14 shrink-0 items-center gap-2 px-5 text-xs tracking-[0.12em] text-white uppercase transition-colors duration-[180ms] ease-out"
          >
            <SearchIcon className="size-4" aria-hidden="true" />
            Search
          </button>
        </div>
      </form>

      {query.length === 0 ? (
        <div className="mt-12">
          <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
            People ask
          </p>
          <ul className="mt-4 space-y-2">
            {SEARCH_SEEDS.map((seed) => (
              <li key={seed}>
                <Link
                  href={`/search?q=${encodeURIComponent(seed)}`}
                  className="text-ink hover:text-crimson decoration-rule hover:decoration-crimson text-[17px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
                >
                  {seed}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : results.total === 0 ? (
        /* PRD 02 §3.12 — the zero-result copy is canonical. */
        <div className="border-rule bg-paper-warm mt-12 max-w-2xl border p-6">
          <p className="text-ink text-lg">
            The desk hasn’t written this down. Ask it.
          </p>
          <Link
            href={`/ask?q=${encodeURIComponent(query)}`}
            className="bg-crimson hover:bg-crimson-dark mt-5 inline-flex items-center px-5 py-3 text-xs tracking-[0.12em] text-white uppercase transition-colors duration-[180ms] ease-out"
          >
            Ask the desk
          </Link>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
            {results.total} result{results.total === 1 ? "" : "s"} for “
            {results.query}”
          </p>

          {results.groups.map((group) => (
            <section key={group.type}>
              <h2 className="border-rule border-b pb-3 text-xs tracking-[0.12em] uppercase">
                {group.label}
              </h2>
              <ul className="divide-rule divide-y">
                {group.documents.map((document) => (
                  <li key={document.href} className="py-5">
                    <Link href={document.href} className="group block">
                      <h3 className="group-hover:text-crimson text-xl font-semibold transition-colors duration-[180ms] ease-out">
                        {document.title}
                      </h3>
                      {document.dek ? (
                        <p className="text-ink-soft mt-1 text-[15px] leading-6">
                          {document.dek}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
