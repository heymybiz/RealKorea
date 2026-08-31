import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * PRD 04 §5 — small crimson check plus the word "Verified". Never a green
 * default. This mark is the product's trust signal (PRD 01 §6), so it renders
 * only when an editor has actually set the flag.
 */
export function VerifiedMark({
  label = "Verified",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-crimson inline-flex items-center gap-1 text-xs tracking-[0.08em] uppercase",
        className,
      )}
    >
      <Check className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
