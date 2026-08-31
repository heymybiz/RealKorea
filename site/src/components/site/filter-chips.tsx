import Link from "next/link";

import { cn } from "@/lib/utils";

export type FilterChip = {
  /** Query value. `null` is the "All" chip and drops the parameter. */
  readonly value: string | null;
  readonly label: string;
};

/**
 * PRD 02 §3.4 — single-select filters plus All, driven by the URL
 * (`?topic=transit`, FR-031). Rendered as links rather than buttons so
 * filtering works without JavaScript and every state is shareable.
 */
export function FilterChips({
  basePath,
  paramName,
  chips,
  active,
  label,
}: {
  basePath: string;
  paramName: string;
  chips: readonly FilterChip[];
  active: string | null;
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const isActive = chip.value === active;
          const href = chip.value
            ? `${basePath}?${paramName}=${encodeURIComponent(chip.value)}`
            : basePath;

          return (
            <li key={chip.label}>
              <Link
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-[180ms] ease-out",
                  isActive
                    ? "border-crimson bg-crimson text-white"
                    : "border-rule text-ink hover:border-ink",
                )}
              >
                {chip.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
