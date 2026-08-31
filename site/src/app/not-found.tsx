import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { Masthead } from "@/components/site/masthead";
import { PRIMARY_NAV } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/** NFR-009 — on-brand 404. */
export default function NotFound() {
  return (
    <>
      <Masthead />
      <main id="main" className="flex-1">
        <div className="content-shell py-20 lg:py-28">
          <p className="text-crimson mb-5 text-xs tracking-[0.12em] uppercase">
            404
          </p>
          <h1 className="max-w-2xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
            The desk doesn’t have this page.
          </h1>
          <p className="text-ink-soft mt-6 max-w-xl text-lg">
            The link may be old, or we may not have written it down yet.
          </p>

          <nav aria-label="Sections" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink hover:text-crimson text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
