import { cn } from "@/lib/utils";

/**
 * Stands in for documentary photography that does not exist yet.
 *
 * PRD 03 §6 asks for lived-in, documentary images. The v2 mockups are
 * image-generated, so using them here would pass AI renderings off as
 * photographs of real Seoul.
 *
 * Deliberately an INK surface rather than a beige one. A magazine layout gets
 * its contrast from dark photography sitting on pale paper; a light placeholder
 * flattens every page to a single value and the whole site reads washed out.
 * This keeps the page composed the way it will look once real photographs land,
 * while still being obviously not a photograph.
 */
export function MediaPlaceholder({
  ratio = "3/2",
  label,
  className,
}: {
  ratio?: "3/2" | "16/9" | "1/1" | "4/5";
  label?: string;
  className?: string;
}) {
  const aspect = {
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-video",
    "1/1": "aspect-square",
    "4/5": "aspect-[4/5]",
  }[ratio];

  return (
    <div
      role="presentation"
      className={cn(
        "bg-ink relative flex items-end overflow-hidden",
        aspect,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(244,239,230,0.10) 0 1px, transparent 1px 16px)",
        }}
      />
      {/* A quiet crimson tick, so the placeholder still reads as ours. */}
      <span
        aria-hidden="true"
        className="bg-crimson absolute top-0 left-0 h-[3px] w-10"
      />
      {label ? (
        <span className="relative p-3 text-[11px] tracking-[0.12em] text-[color:rgba(244,239,230,0.55)] uppercase">
          {label}
        </span>
      ) : null}
    </div>
  );
}
