import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentSection } from "@/components/site/comment-section";
import {
  AwaitingEditor,
  OfficialAnswer,
} from "@/components/site/official-answer";
import { SampleLabel } from "@/components/site/sample-label";
import {
  getNeighborhoodBySlug,
  getPlaces,
  getQuestionBySlug,
  getTips,
} from "@/lib/cms";
import { isIndexableQuestion } from "@/lib/content/types";
import { formatFullDate, toDateTimeAttribute } from "@/lib/format";
import { readErrorCode, TOPIC_LABEL } from "@/lib/validation";

/**
 * Question thread — PRD 02 §3.3.
 *
 * Not prerendered with `generateStaticParams`: visitor submissions arrive at
 * runtime, so the slug set is not known at build time.
 */
export async function generateMetadata({
  params,
}: PageProps<"/ask/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const question = await getQuestionBySlug(slug);

  if (!question) {
    return { title: "Question not found", robots: { index: false } };
  }

  // FR-013 / FR-014 — indexable only once an editor has published an answer.
  const indexable = isIndexableQuestion(question) && !question.sample;

  return {
    title: question.seoTitle ?? question.title,
    description:
      question.seoDescription ??
      question.officialAnswer?.[0]?.text ??
      question.body ??
      undefined,
    alternates: { canonical: `/ask/${slug}` },
    robots: indexable ? undefined : { index: false, follow: true },
  };
}

export default async function QuestionPage({
  params,
  searchParams,
}: PageProps<"/ask/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;

  const question = await getQuestionBySlug(slug);
  if (!question) notFound();

  const [neighborhood, tips, places] = await Promise.all([
    question.neighborhoodSlug
      ? getNeighborhoodBySlug(question.neighborhoodSlug)
      : Promise.resolve(null),
    getTips({ limit: 3 }),
    getPlaces({ limit: 3 }),
  ]);

  const answered = isIndexableQuestion(question);
  const asked = formatFullDate(question.publishedAt);

  const commentError = readErrorCode(query.commentError);

  return (
    <article className="content-shell py-16">
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">
        {TOPIC_LABEL[question.topic]}
      </p>

      <h1 className="mt-4 max-w-3xl text-[30px] leading-[1.12] font-semibold sm:text-[40px]">
        {question.title}
      </h1>

      {/* PRD 02 §3.3 — meta: topic, neighborhood, date. Never the email. */}
      <div className="border-rule text-ink-soft mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-6 text-xs">
        <span className="tracking-[0.12em] uppercase">
          Asked by {question.askerName}
        </span>

        {neighborhood ? (
          <Link
            href={`/places/${neighborhood.slug}`}
            className="hover:text-crimson tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
          >
            {neighborhood.nameEn}
          </Link>
        ) : null}

        {asked ? (
          <time dateTime={toDateTimeAttribute(question.publishedAt)}>
            {asked}
          </time>
        ) : null}

        {question.sample ? <SampleLabel /> : null}
      </div>

      {question.body ? (
        <p className="text-ink mt-6 max-w-2xl text-[17px] leading-7">
          {question.body}
        </p>
      ) : null}

      {answered && question.officialAnswer ? (
        <OfficialAnswer
          blocks={question.officialAnswer}
          verified={question.answerVerified}
          answeredAt={question.answeredAt}
        />
      ) : (
        <AwaitingEditor />
      )}

      {/*
        PRD 02 §3.3 — the promote-to-Tip control is an editor tool and is
        deliberately never rendered on the public site.
      */}

      <CommentSection
        target={{ type: "question", slug: question.slug }}
        comments={question.comments}
        error={commentError}
        submitted={query.commented === "1"}
      />

      <section className="border-rule mt-16 border-t pt-10">
        <h2 className="text-lg font-semibold">Related from the desk</h2>
        <ul className="mt-4 space-y-2">
          {tips.map((tip) => (
            <li key={tip.id}>
              <Link
                href={`/tips/${tip.slug}`}
                className="text-ink hover:text-crimson text-[15px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
              >
                {tip.title}
              </Link>
            </li>
          ))}
          {places.map((place) => (
            <li key={place.id}>
              <Link
                href={`/places/p/${place.slug}`}
                className="text-ink hover:text-crimson text-[15px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
              >
                {place.editorialTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
