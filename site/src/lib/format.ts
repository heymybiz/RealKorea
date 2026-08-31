/**
 * Locale and time zone are pinned so the server and the client always produce
 * the same string. Leaving them to the runtime is a common source of hydration
 * drift, and a date that flickers on a page whose whole promise is verified
 * facts reads as a bug.
 */
const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const FULL_DATE = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function parse(iso: string | null): Date | null {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "Aug 2026" — used for the last-verified line (PRD 02 §3.9). */
export function formatMonthYear(iso: string | null): string | null {
  const date = parse(iso);
  return date ? MONTH_YEAR.format(date) : null;
}

/** "31 Aug 2026" — used for publish and answer dates. */
export function formatFullDate(iso: string | null): string | null {
  const date = parse(iso);
  return date ? FULL_DATE.format(date) : null;
}

/** Machine-readable value for a `<time datetime>` attribute. */
export function toDateTimeAttribute(iso: string | null): string | undefined {
  const date = parse(iso);
  return date ? date.toISOString() : undefined;
}
