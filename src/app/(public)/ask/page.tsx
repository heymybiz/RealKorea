import type { Metadata } from "next";
import Link from "next/link";

import { AskComposer } from "@/components/site/ask-composer";
import { FilterChips, type FilterChip } from "@/components/site/filter-chips";
import { FaqJsonLd } from "@/components/site/json-ld";
import { QuestionCard } from "@/components/site/question-card";
import { SelectField, SubmitButton } from "@/components/site/form-parts";
import { getNeighborhoods, getQuestions } from "@/lib/cms";
import type { QuestionTopic } from "@/lib/content/types";
import { SEARCH_SEEDS } from "@/lib/search-seeds";
import {
  isQuestionTopic,
  QUESTION_TOPICS,
  readErrorCode,
  TOPIC_LABEL,
} from "@/lib/validation";

export const metadata: Metadata = {
  title: "Ask a Local",
  description:
    "Ask the question you would text a Korean friend. Editors answer, and good questions become guides.",
  alternates: { canonical: "/ask" },
  // PRD 02 §3.2 — the index itself is index, follow.
  robots: { index: true, follow: true },
};

const STATUS_CHIPS: readonly FilterChip[] = [
  { value: null, label: "All" },
  { value: "answered", label: "Answered" },
  { value: "unanswered", label: "Unanswered" },
];

const TOPIC_CHIPS: readonly FilterChip[] = [
  { value: null, label: "All topics" },
  ...QUESTION_TOPICS.map((topic) => ({
    value: topic,
    label: TOPIC_LABEL[topic],
  })),
];

function single(value: string | string[] | undefined): string | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && candidate.length > 0 ? candidate : null;
}

export default async function AskIndexPage({
  searchParams,
}: PageProps<"/ask">) {
  const query = await searchParams;

  const status = single(query.status);
  const topicParam = single(query.topic);
  const neighborhoodParam = single(query.neighborhood);
  const errorCode = readErrorCode(query.error);

  const topic: QuestionTopic | null = isQuestionTopic(topicParam)
    ? topicParam
    : null;

  const [neighborhoods, questions] = await Promise.all([
    getNeighborhoods(),
    getQuestions({
      answeredOnly: status === "answered",
      unansweredOnly: status === "unanswered",
      ...(topic ? { topic } : {}),
      ...(neighborhoodParam ? { neighborhoodSlug: neighborhoodParam } : {}),
    }),
  ]);

  const neighborhoodValid = neighborhoods.some(
    (candidate) => candidate.slug === neighborhoodParam,
  );

  return (
    <div className="content-shell py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <h1 className="max-w-2xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
            Ask the question you’d text a Korean friend.
          </h1>
          <p className="text-ink-soft mt-5 text-lg">
            Editors answer. Good questions become guides.
          </p>

          {/* FR-015 — the nine canonical queries, verbatim, as text links. */}
          <div className="border-rule mt-10 border-t pt-6">
            <p className="text-ink-soft text-xs tracking-[0.12em] uppercase">
              People ask
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {SEARCH_SEEDS.map((seed) => (
                <li key={seed}>
                  <Link
                    href={`/search?q=${encodeURIComponent(seed)}`}
                    className="text-ink hover:text-crimson decoration-rule hover:decoration-crimson text-[15px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
                  >
                    {seed}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AskComposer
          neighborhoods={neighborhoods}
          error={errorCode}
          submitted={single(query.submitted) === "1"}
          questionValue={single(query.q) ?? ""}
          topicValue={topicParam}
        />
      </div>

      {/* PRD 03 §7 — FAQPage over answered questions only. */}
      <FaqJsonLd questions={questions} />

      <section className="border-rule mt-16 border-t pt-12">
        <h2 className="text-2xl font-semibold">Recently asked</h2>

        {/* PRD 02 §3.2 — Unanswered | Answered | Topic | Neighborhood */}
        <div className="mt-6 space-y-3">
          <FilterChips
            basePath="/ask"
            paramName="status"
            chips={STATUS_CHIPS}
            active={status}
            label="Filter questions by answer state"
          />
          <FilterChips
            basePath="/ask"
            paramName="topic"
            chips={TOPIC_CHIPS}
            active={topic}
            label="Filter questions by topic"
          />

          <form action="/ask" method="get" className="flex flex-wrap gap-2">
            <label htmlFor="neighborhood-filter" className="sr-only">
              Filter questions by neighborhood
            </label>
            <SelectField
              id="neighborhood-filter"
              name="neighborhood"
              defaultValue={neighborhoodValid ? (neighborhoodParam ?? "") : ""}
              className="w-auto"
            >
              <option value="">Any neighborhood</option>
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood.id} value={neighborhood.slug}>
                  {neighborhood.nameEn}
                </option>
              ))}
            </SelectField>
            <SubmitButton className="px-4 py-2.5">Apply</SubmitButton>
          </form>
        </div>

        {questions.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <div className="border-rule bg-paper-warm mt-10 border p-6">
            <p className="text-ink text-[15px]">
              Nothing matches that filter yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
