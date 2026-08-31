"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { CommandSearch } from "@/components/site/command-search";
import { Wordmark } from "@/components/site/wordmark";
import { MOBILE_UTILITY_NAV, PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * PRD 02 §2 and FR-070.
 *
 * Fixed nav order, no language switcher, no avatar, no sign-in.
 * The search control is a real link to `/search` so it works without JS
 * (NFR-010); the command overlay is layered on in a later turn.
 */
export function Masthead() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);

  // Close the drawer whenever the route changes, including back/forward
  // navigation. Adjusting state during render is the pattern React recommends
  // over an effect here.
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="border-ink bg-paper border-b">
      <div className="content-shell flex h-16 items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block py-2 text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out",
                      "after:bg-crimson after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-[180ms] after:ease-out",
                      active
                        ? "text-ink after:scale-x-100"
                        : "text-ink-soft hover:text-ink hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <CommandSearch />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-ink hover:text-crimson inline-flex size-10 items-center justify-center transition-colors duration-[180ms] ease-out lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* PRD 02 §2 — paper-sheet drawer: five items plus utilities. */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-rule bg-paper-warm border-t lg:hidden"
        >
          <nav aria-label="Mobile" className="content-shell py-4">
            <ul className="divide-rule divide-y">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={
                      isActive(pathname, item.href) ? "page" : undefined
                    }
                    className={cn(
                      "font-display block py-3 text-lg",
                      isActive(pathname, item.href)
                        ? "text-crimson"
                        : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {MOBILE_UTILITY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-soft hover:text-ink text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
