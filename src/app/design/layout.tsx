import type { Metadata } from "next";
import Link from "next/link";

import { display, furniture } from "./fonts";
import { VARIANTS } from "./shared";

import "./type.css";

export const metadata: Metadata = {
  title: "Design preview",
  robots: { index: false, follow: false },
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${furniture.variable}`}>
      <div className="sticky top-0 z-50 bg-[#14110f] text-[#f7f4ec]">
        <div className="content-shell flex flex-wrap items-center gap-x-6 gap-y-2 py-2.5">
          <span className="text-[11px] tracking-[0.16em] text-[rgba(247,244,236,0.6)] uppercase">
            Internal preview
          </span>

          <nav aria-label="Design variants">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {VARIANTS.map((variant) => (
                <li key={variant.slug}>
                  <Link
                    href={`/design/${variant.slug}`}
                    className="text-[11px] tracking-[0.12em] uppercase underline decoration-[rgba(247,244,236,0.35)] underline-offset-4 transition-colors duration-[180ms] ease-out hover:text-white"
                  >
                    {variant.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/"
            className="ml-auto text-[11px] tracking-[0.12em] uppercase underline decoration-[rgba(247,244,236,0.35)] underline-offset-4 hover:text-white"
          >
            Current build
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
