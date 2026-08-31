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
  themeColor = "default",
}: {
  kicker: string;
  title: string;
  action?: { href: string; label: string };
  themeColor?: "default" | "amber" | "chili" | "pine" | "lacquer";
}) {
  const ruleClass = {
    default: "rule-double",
    amber: "rule-double-amber",
    chili: "rule-double-chili",
    pine: "rule-double-pine",
    lacquer: "rule-double",
  }[themeColor];

  const kickerColor = {
    default: "text-[var(--lacquer)]",
    amber: "text-[var(--amber)]",
    chili: "text-[var(--chili)]",
    pine: "text-[var(--pine)]",
    lacquer: "text-[var(--lacquer)]",
  }[themeColor];

  return (
    <div className="mb-10">
      <div className={ruleClass} />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`furniture text-[11px] font-bold ${kickerColor}`}>
            {kicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-[40px]">
            {title}
          </h2>
        </div>

        {action ? (
          <Link
            href={action.href}
            className="furniture inline-flex items-center gap-1 border-b-2 border-[var(--ink)] pb-1 text-[11px] text-[var(--ink)] transition-colors hover:border-[var(--lacquer)] hover:text-[var(--lacquer)]"
          >
            {action.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
