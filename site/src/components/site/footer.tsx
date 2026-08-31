import Link from "next/link";
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
    <footer className="mt-auto border-t-2 border-[var(--ink)] bg-[#121110] text-white">
      <div className="content-shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center border border-white/40 bg-white/5 text-[12px] font-black text-white">
                RK
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white uppercase">
                {SITE_NAME}
              </span>
            </div>
            <p className="furniture mt-3 text-[10px] text-white/60">
              {SITE_PROMISE}
            </p>
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
          <p className="furniture text-[10px] text-white/50">
            {FOOTER_NOTE}
          </p>
          <p className="furniture text-[10px] text-white/40">
            Editors live in Seoul · Verified 2026 · Local Desk Magazine
          </p>
        </div>
      </div>
    </footer>
  );
}
