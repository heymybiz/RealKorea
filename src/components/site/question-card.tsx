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
    <article className="border-ink bg-paper-warm group border-t-2 p-5 pt-4">
      <Link href={`/ask/${question.slug}`} className="block">
        <p className="text-crimson text-xs tracking-[0.12em] uppercase">
          {TOPIC_LABEL[question.topic]}
        </p>

        <h3 className="group-hover:text-crimson mt-2 text-lg leading-snug font-semibold transition-colors duration-[180ms] ease-out">
          {question.title}
        </h3>

        {dek ? (
          <p className="text-ink-soft mt-2 line-clamp-2 text-[15px] leading-6">
            {dek}
          </p>
        ) : null}

        <div className="border-rule text-ink-soft mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-3 text-xs">
          {answered ? (
            <span className="tracking-[0.12em] uppercase">
              Real Korea editor
            </span>
          ) : (
            // PRD 02 §3.2 — never an empty void.
            <span className="tracking-[0.12em] uppercase">Awaiting editor</span>
          )}

          {question.answerVerified ? <VerifiedMark /> : null}

          {question.comments.length > 0 ? (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="size-3.5" aria-hidden="true" />
              {question.comments.length}
              <span className="sr-only"> comments</span>
            </span>
          ) : null}

          {question.sample ? <SampleLabel /> : null}
        </div>
      </Link>
    </article>
  );
}
