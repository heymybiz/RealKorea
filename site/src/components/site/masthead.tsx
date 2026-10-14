"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

import { sectionForPath } from "@/lib/ia";
import { PRIMARY_NAV } from "@/lib/nav";

/**
 * Design D navbar: logo left, six sections centred with equal spacing,
 * search and "Ask a local" right. Each section shows its own pastel underline
 * on hover and keyboard focus; the current section keeps it.
 */
export function Masthead() {
  const pathname = usePathname();
  const active = sectionForPath(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);

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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="rk-header-wrap">
      <div className="rk-header">
        <Link href="/" className="rk-logo" aria-label="RealKO home">
          <Image src="/brand/kkami-avatar.webp" alt="" width={36} height={36} className="rk-kav" priority />
          <span>
            Real<b>KO</b>
          </span>
        </Link>

        <nav aria-label="Primary" className="rk-nav">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              data-sec={item.id}
              style={{ "--c": item.color } as React.CSSProperties}
              aria-current={active === item.id ? "page" : undefined}
              className={active === item.id ? "on" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="rk-hright">
          <Link href="/search" className="rk-srch" aria-label="Search guides">
            <Search className="size-4" aria-hidden="true" />
            <span className="t">Search guides</span>
          </Link>
          <Link href="/ask" className="rk-ask">
            <Image src="/brand/kkami-avatar.webp" alt="" width={24} height={24} />
            Ask a local
          </Link>
          <button
            type="button"
            className="rk-burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="rk-drawer">
          <nav aria-label="Mobile">
            <ul>
              {PRIMARY_NAV.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    style={{ "--c": item.color } as React.CSSProperties}
                    aria-current={active === item.id ? "page" : undefined}
                    className={active === item.id ? "on" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="rk-drawer-cta">
              <Link href="/search" className="rk-srch wide">
                <Search className="size-4" aria-hidden="true" /> Search guides
              </Link>
              <Link href="/ask" className="rk-ask">Ask a local</Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
