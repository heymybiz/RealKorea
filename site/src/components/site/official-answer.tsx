import { Prose } from "@/components/site/prose";
import { VerifiedMark } from "@/components/site/verified-mark";
import type { ContentBlock } from "@/lib/content/types";
import { formatFullDate, toDateTimeAttribute } from "@/lib/format";

/**
 * PRD 02 §3.3 — the official answer sits in a paper inset, bylined
 * "Real Korea editor", with the Verified check when an editor has ticked it.
 *
 * The byline matters: the voice is "people who live here", but authorship of the
 * page is the desk (PRD 01 §6). Nothing here is attributed to a visitor.
 */
export function OfficialAnswer({
  blocks,
  verified,
  answeredAt,
}: {
  blocks: readonly ContentBlock[];
  verified: boolean;
  answeredAt: string | null;
}) {
  const answered = formatFullDate(answeredAt);

  return (
    <section
      aria-labelledby="official-answer-heading"
      className="border-rule bg-paper-warm mt-10 border p-6"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2
          id="official-answer-heading"
          className="text-ink-soft font-sans text-xs tracking-[0.12em] uppercase"
        >
          Real Korea editor
        </h2>
        {verified ? <VerifiedMark /> : null}
        {answered ? (
          <time
            dateTime={toDateTimeAttribute(answeredAt)}
            className="text-ink-soft text-xs"
          >
            {answered}
          </time>
        ) : null}
      </div>

      <div className="mt-2">
        <Prose blocks={blocks} />
      </div>
    </section>
  );
}

/** PRD 02 §3.2 — an unanswered question is never an empty void. */
export function AwaitingEditor() {
  return (
    <section className="border-rule bg-paper-warm mt-10 border p-6">
      <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
        Awaiting editor
      </p>
      <p className="text-ink mt-2 text-[15px] leading-6">
        The desk has this question. We publish when an editor can stand behind
        the answer.
      </p>
    </section>
  );
}
