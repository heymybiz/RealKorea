import Link from "next/link";

import { Seal } from "@/components/site/seal";
import {
  ARRIVE_NAV,
  FOOTER_NOTE,
  LEGAL_NAV,
  PRIMARY_NAV,
  SITE_NAME,
  SITE_PROMISE,
} from "@/lib/nav";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-ink-soft font-sans text-xs tracking-[0.12em] uppercase">
      {children}
    </h2>
  );
}

function ColumnLinks({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={`${item.href}-${item.label}`}>
          <Link
            href={item.href}
            className="text-ink hover:text-crimson text-[15px] transition-colors duration-[180ms] ease-out"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** PRD 02 §2 — four columns on paper-warm. */
export function Footer() {
  return (
    <footer className="border-rule bg-paper-warm mt-auto border-t">
      <div className="content-shell py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-ink flex items-center gap-2.5">
              <span className="font-display text-lg leading-none font-semibold tracking-[0.06em] uppercase">
                {SITE_NAME}
              </span>
              <Seal className="size-3.5 shrink-0" />
            </div>
            <p className="text-ink-soft mt-4 text-[15px]">{SITE_PROMISE}</p>
          </div>

          <div>
            <ColumnHeading>Desk</ColumnHeading>
            <ColumnLinks items={PRIMARY_NAV} />
          </div>

          <div>
            <ColumnHeading>Arrive</ColumnHeading>
            <ColumnLinks items={ARRIVE_NAV} />
          </div>

          <div>
            <ColumnHeading>Legal</ColumnHeading>
            <ColumnLinks items={LEGAL_NAV} />
          </div>
        </div>

        <p className="border-rule text-ink-soft mt-10 border-t pt-6 text-[13px]">
          {FOOTER_NOTE}
        </p>
      </div>
    </footer>
  );
}
