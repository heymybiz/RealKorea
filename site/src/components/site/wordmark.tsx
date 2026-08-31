import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Unified Master Brand Lockup for Real Korea
 */
export function Wordmark({
  className,
}: {
  className?: string;
  sealClassName?: string;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3.5 transition-colors",
        className,
      )}
    >
      {/* Integral Seal Emblem */}
      <div className="relative flex size-9 items-center justify-center bg-[var(--ink)] text-white shadow-xs transition-colors duration-200 group-hover:bg-[var(--lacquer)]">
        <span className="font-serif text-[13px] font-black tracking-widest text-white">
          RK
        </span>
        <span className="absolute -top-0.5 -right-0.5 size-1.5 bg-[var(--lacquer)] transition-colors group-hover:bg-white" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[25px] leading-none font-black tracking-[-0.03em] uppercase text-[var(--ink)]">
            Real Korea
          </span>
          <span className="furniture text-[9px] font-bold tracking-widest text-[var(--lacquer)] uppercase">
            · Seoul Desk
          </span>
        </div>
        <span className="furniture mt-1 text-[9px] tracking-[0.14em] text-[var(--ink-soft)] uppercase">
          Local answers. Not the brochure.
        </span>
      </div>
    </Link>
  );
}
