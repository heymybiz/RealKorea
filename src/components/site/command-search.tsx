"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { SEARCH_SEEDS } from "@/lib/search-seeds";

/**
 * PRD 04 §5 — the masthead search opens a command-style overlay carrying the
 * same field as the Home cover, plus the nine canonical queries (FR-015).
 *
 * Progressive enhancement: the trigger is a real link to `/search`, so with
 * JavaScript unavailable the header still works. The overlay only takes over the
 * click once it is interactive, and the form inside is a plain GET as well.
 */
export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <Link
        href="/search"
        aria-label="Search Real Korea"
        aria-haspopup="dialog"
        onClick={(event) => {
          // Let modified clicks and middle clicks behave normally.
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          event.preventDefault();
          setOpen(true);
        }}
        className="text-ink hover:text-crimson inline-flex size-10 items-center justify-center transition-colors duration-[180ms] ease-out"
      >
        <Search className="size-[18px]" aria-hidden="true" />
      </Link>

      {open ? (
        <div
          className="bg-ink/30 fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogId}
            className="border-rule bg-paper w-full max-w-2xl border shadow-lg"
          >
            <div className="border-rule flex items-center justify-between border-b px-5 py-3">
              <h2
                id={dialogId}
                className="text-ink-soft text-xs tracking-[0.12em] uppercase"
              >
                Search the desk
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="text-ink hover:text-crimson inline-flex size-8 items-center justify-center transition-colors duration-[180ms] ease-out"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <form action="/search" method="get" role="search" className="p-5">
              <label htmlFor="command-search-input" className="sr-only">
                Search Real Korea
              </label>
              <div className="border-rule focus-within:border-crimson flex items-center border transition-colors duration-[180ms] ease-out">
                <input
                  ref={inputRef}
                  id="command-search-input"
                  name="q"
                  type="search"
                  autoComplete="off"
                  placeholder="Ask something tourists never get a straight answer to"
                  className="text-ink placeholder:text-ink-soft h-12 w-full bg-transparent px-4 text-[15px] outline-none"
                />
                <button
                  type="submit"
                  className="bg-crimson hover:bg-crimson-dark inline-flex h-12 shrink-0 items-center px-4 text-xs tracking-[0.12em] text-white uppercase transition-colors duration-[180ms] ease-out"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="border-rule border-t px-5 py-4">
              <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
                People ask
              </p>
              <ul className="mt-3 space-y-1.5">
                {SEARCH_SEEDS.map((seed) => (
                  <li key={seed}>
                    <Link
                      href={`/search?q=${encodeURIComponent(seed)}`}
                      onClick={() => setOpen(false)}
                      className="text-ink hover:text-crimson text-[15px] transition-colors duration-[180ms] ease-out"
                    >
                      {seed}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
