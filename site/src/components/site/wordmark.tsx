import Link from "next/link";

import { Seal } from "@/components/site/seal";
import { cn } from "@/lib/utils";

/**
 * PRD 02 §2 — condensed editorial wordmark in ink plus a small crimson seal.
 */
export function Wordmark({
  className,
  sealClassName,
}: {
  className?: string;
  sealClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-ink hover:text-crimson inline-flex items-center gap-2.5 transition-colors duration-[180ms] ease-out",
        className,
      )}
    >
      <span className="font-display text-xl leading-none font-semibold tracking-[0.06em] uppercase sm:text-2xl">
        Real Korea
      </span>
      <Seal className={cn("size-3.5 shrink-0", sealClassName)} />
    </Link>
  );
}
