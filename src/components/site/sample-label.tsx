import { cn } from "@/lib/utils";

/**
 * Marks scaffolding that an editor has not written or verified.
 *
 * This exists so a reader is never left guessing whether a card carries real,
 * checked information. It disappears on its own: the label is driven by the
 * document's `sample` flag, so it stops rendering the moment real content
 * replaces the seed.
 */
export function SampleLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "border-rule text-ink-soft inline-flex items-center border px-1.5 py-0.5 text-[11px] tracking-[0.12em] uppercase",
        className,
      )}
    >
      Sample
    </span>
  );
}
