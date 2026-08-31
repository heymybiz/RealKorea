import type { TipBox as TipBoxData } from "@/lib/content/types";

/**
 * PRD 04 §5 — warm paper, 3px crimson left bar, and the friend-on-Kakao voice
 * from PRD 03 §2. Short and dry, never slang that dates badly.
 */
export function TipBox({ tipBox }: { tipBox: TipBoxData }) {
  return (
    <aside className="bg-paper-warm border-crimson my-8 border-l-[3px] px-5 py-4">
      {tipBox.heading ? (
        <p className="text-ink text-xs tracking-[0.12em] uppercase">
          {tipBox.heading}
        </p>
      ) : (
        <p className="text-crimson text-xs tracking-[0.12em] uppercase">Tip</p>
      )}
      <p className="text-ink mt-2 text-[15px] leading-6">{tipBox.body}</p>
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
