import Link from "next/link";

/**
 * PRD 04 §4 — small-caps meta over an editorial heading.
 *
 * The divider is a 2px ink rule above the heading rather than a hairline below
 * it. On a pale paper ground a 1px rule in `--rule` disappears, and the page
 * loses the vertical rhythm that makes a magazine feel edited rather than
 * scrolled.
 */
export function SectionHeading({
  kicker,
  title,
  action,
}: {
  kicker: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="border-ink mb-8 border-t-2 pt-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-crimson text-xs tracking-[0.12em] uppercase">
            {kicker}
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-[32px]">
            {title}
          </h2>
        </div>

        {action ? (
          <Link
            href={action.href}
            className="text-ink hover:text-crimson border-ink hover:border-crimson border-b pb-0.5 text-xs tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
