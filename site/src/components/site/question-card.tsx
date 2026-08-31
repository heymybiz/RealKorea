import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { SampleLabel } from "@/components/site/sample-label";
import { VerifiedMark } from "@/components/site/verified-mark";
import {
  isIndexableQuestion,
  type PublicQuestion,
  type QuestionTopic,
} from "@/lib/content/types";

const TOPIC_LABEL: Record<QuestionTopic, string> = {
  money: "Money",
  transit: "Transit",
  food: "Food",
  etiquette: "Etiquette",
  survival: "Survival",
  other: "Other",
};

/** First paragraph of the official answer, used as the card dek. */
function answerDek(question: PublicQuestion): string | null {
  const firstParagraph = question.officialAnswer?.find(
    (block) => block.type === "paragraph",
  );

  return firstParagraph?.text ?? null;
}

/**
 * PRD 04 §5 — title, dek of the answer, Verified when flagged, comment count.
 * No avatars and no upvotes: this is a desk, not a forum (PRD 04 §1).
 */
export function QuestionCard({ question }: { question: PublicQuestion }) {
  const answered = isIndexableQuestion(question);
  const dek = answerDek(question);

  return (
    <article className="heritage-card flex flex-col justify-between border-t-2 border-t-[var(--lacquer)] p-5">
      <Link href={`/ask/${question.slug}`} className="block">
        <div className="flex items-center justify-between">
          <span className="fact-chip bg-[var(--lacquer-light)] text-[var(--lacquer)]">
            {TOPIC_LABEL[question.topic]}
          </span>
          {question.answerVerified ? <VerifiedMark /> : null}
        </div>

        <h3 className="mt-3 text-[19px] leading-snug font-bold transition-colors group-hover:text-[var(--lacquer)]">
          {question.title}
        </h3>

        {dek ? (
          <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-[var(--ink-soft)]">
            {dek}
          </p>
        ) : null}

        <div className="rule-single mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 text-xs">
          <span className="furniture text-[10px] text-[var(--ink-soft)]">
            {answered ? "Official Answered" : "Awaiting Editor"}
          </span>

          <div className="flex items-center gap-2">
            {question.comments.length > 0 ? (
              <span className="furniture inline-flex items-center gap-1 text-[10px] text-[var(--ink-soft)]">
                <MessageSquare className="size-3" aria-hidden="true" />
                {question.comments.length}
              </span>
            ) : null}
            {question.sample ? <SampleLabel /> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
