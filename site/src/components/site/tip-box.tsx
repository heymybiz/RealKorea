import type { TipBox as TipBoxData } from "@/lib/content/types";

/**
 * PRD 04 §5 — warm paper, 3px crimson left bar, and the friend-on-Kakao voice
 * from PRD 03 §2. Short and dry, never slang that dates badly.
 */
export function TipBox({ tipBox }: { tipBox: TipBoxData }) {
  return (
    <aside className="my-8 border-l-4 border-[var(--amber)] bg-[#fef9ee] p-5 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <span className="furniture text-[11px] font-bold text-[var(--amber)]">
          {tipBox.heading ? tipBox.heading : "⚡ Direct Friend Advice"}
        </span>
      </div>
      <p className="mt-2.5 text-[15px] leading-7 text-[var(--ink)]">
        {tipBox.body}
      </p>
    </aside>
  );
}

export function TipBoxes({
  tipBoxes,
}: {
  tipBoxes: readonly TipBoxData[];
}) {
  if (tipBoxes.length === 0) return null;

  return (
    <>
      {tipBoxes.map((tipBox, index) => (
        <TipBox key={`${tipBox.heading ?? "tip"}-${index}`} tipBox={tipBox} />
      ))}
    </>
  );
}
