import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Prose } from "@/components/site/prose";
import { SampleLabel } from "@/components/site/sample-label";
import { TipBoxes } from "@/components/site/tip-box";
import { VerifiedMark } from "@/components/site/verified-mark";
import { CommentSection } from "@/components/site/comment-section";
import { TipJsonLd } from "@/components/site/json-ld";
import {
  getComments,
  getNeighborhoods,
  getPlaces,
  getQuestions,
  getTipBySlug,
  getTips,
} from "@/lib/cms";
import type { TipTopic } from "@/lib/content/types";
import { formatMonthYear, toDateTimeAttribute } from "@/lib/format";
import { readErrorCode } from "@/lib/validation";

const TOPIC_LABEL: Record<TipTopic, string> = {
  arrival: "Arrival",
  transit: "Transit",
  money: "Money",
  etiquette: "Etiquette",
  survival: "Survival",
  seasonal: "Seasonal",
};

/**
 * NOTE: this route renders dynamically at the moment, so these params are not
 * prerendered. Reading `searchParams` for the comment notice, and reading
 * comments that arrive at runtime, both opt the page out of static rendering.
 *
 * That is a property of the in-memory demo queue, not of the design. Once the
 * CMS lands, comments come from a tagged fetch and the page can go back to
 * static with on-demand revalidation, at which point this list matters again.
 */
export async function generateStaticParams() {
  const tips = await getTips();
  return tips.map((tip) => ({ slug: tip.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tip = await getTipBySlug(slug);

  if (!tip) return { title: "Tip not found", robots: { index: false } };

  return {
    title: tip.seoTitle ?? tip.title,
    description: tip.seoDescription ?? tip.dek ?? undefined,
    alternates: { canonical: `/tips/${slug}` },
    // Scaffolding is not indexable. The flag flips on its own once an editor
    // replaces the seed with verified copy.
    robots: tip.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function TipPage({
  params,
  searchParams,
}: PageProps<"/tips/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const tip = await getTipBySlug(slug);

  if (!tip) notFound();

  const [neighborhoods, relatedPlaces, relatedQuestions, comments] =
    await Promise.all([
      getNeighborhoods(),
      getPlaces(),
      getQuestions(),
      getComments({ type: "tip", slug }),
    ]);

  const tipNeighborhoods = neighborhoods.filter((neighborhood) =>
    tip.neighborhoodSlugs.includes(neighborhood.slug),
  );

  const places = relatedPlaces.filter((place) =>
    tip.relatedPlaceSlugs.includes(place.slug),
  );

  const questions = relatedQuestions.filter((question) =>
    tip.relatedQuestionSlugs.includes(question.slug),
  );

  const lastVerified = formatMonthYear(tip.lastVerifiedAt);

  return (
    <article className="content-shell py-16">
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">
        {TOPIC_LABEL[tip.topic]}
      </p>

      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        {tip.title}
      </h1>

      {tip.dek ? (
        <p className="text-ink-soft mt-5 max-w-2xl text-lg">{tip.dek}</p>
      ) : null}

      {/* FR-003 — the verification state is always visible on a Tip. */}
      <div className="border-rule text-ink-soft mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b pb-6 text-xs">
        {lastVerified ? (
          <span className="tracking-[0.12em] uppercase">
            Last verified{" "}
            <time dateTime={toDateTimeAttribute(tip.lastVerifiedAt)}>
              {lastVerified}
            </time>
          </span>
        ) : (
          <span className="tracking-[0.12em] uppercase">Not verified yet</span>
        )}

        {tip.editorVerified ? <VerifiedMark label="Verified local" /> : null}

        {tipNeighborhoods.map((neighborhood) => (
          <Link
            key={neighborhood.id}
            href={`/places/${neighborhood.slug}`}
            className="hover:text-crimson tracking-[0.12em] uppercase transition-colors duration-[180ms] ease-out"
          >
            {neighborhood.nameEn}
          </Link>
        ))}

        {tip.sample ? <SampleLabel /> : null}
      </div>

      <Prose blocks={tip.body} />

      {/* PRD 03 §3.1 requires at least one tip box on a finished Tip. */}
      <TipBoxes tipBoxes={tip.tipBoxes} />

      {questions.length > 0 ? (
        <section className="border-rule mt-12 border-t pt-8">
          <h2 className="text-xs tracking-[0.12em] uppercase">
            Related questions
          </h2>
          <ul className="mt-4 space-y-2">
            {questions.map((question) => (
              <li key={question.id}>
                <Link
                  href={`/ask/${question.slug}`}
                  className="text-ink hover:text-crimson text-[15px] underline underline-offset-4 transition-colors duration-[180ms] ease-out"
                >
                  {question.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {places.length > 0 ? (
        <section className="border-rule mt-8 border-t pt-8">
          <h2 className="text-xs tracking-[0.12em] uppercase">
            Related places
          </h2>
          <ul className="mt-4 space-y-2">
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
      ) : null}

      {/* PRD 02 §3.5 and FR-061: no affiliate modules on a Tip. */}

      <TipJsonLd tip={tip} />

      <CommentSection
        target={{ type: "tip", slug }}
        comments={comments}
        error={readErrorCode(query.commentError)}
        submitted={query.commented === "1"}
        emphasis="secondary"
      />
    </article>
  );
}
