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
import { formatMonthYear } from "@/lib/format";
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
    <article className="content-shell py-12 lg:py-16">
      <div className="flex items-center gap-2">
        <span className="fact-chip bg-[var(--amber-light)] text-[var(--amber)]">
          {TOPIC_LABEL[tip.topic]}
        </span>
        <span className="text-[var(--rule-strong)]">/</span>
        <span className="furniture text-[11px] text-[var(--ink-soft)]">
          The Desk Intel
        </span>
      </div>

      <h1 className="mt-4 max-w-4xl text-[34px] leading-[1.08] font-bold sm:text-[46px] lg:text-[52px]">
        {tip.title}
      </h1>

      {tip.dek ? (
        <p className="font-display mt-5 max-w-3xl text-[20px] leading-8 italic text-[var(--ink-soft)]">
          “{tip.dek}”
        </p>
      ) : null}

      {/* Verification & Metadata Strip */}
      <div className="my-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[var(--rule)] py-3.5 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Verified {lastVerified || "2026"} · Confirmed with Official 1st-Party Notice
        </span>

        {tip.editorVerified ? <VerifiedMark label="Verified Local Desk" /> : null}

        {tipNeighborhoods.map((neighborhood) => (
          <Link
            key={neighborhood.id}
            href={`/places/${neighborhood.slug}`}
            className="furniture text-[10px] text-[var(--pine)] transition-colors hover:underline"
          >
            {neighborhood.nameEn} ({neighborhood.nameKo})
          </Link>
        ))}

        {tip.sample ? <SampleLabel /> : null}
      </div>

      {/* Documentary Hero Photograph */}
      {tip.image ? (
        <div className="my-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--rule)] bg-[#1a1715] shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tip.image.src}
              alt={tip.image.alt}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute right-4 bottom-4 flex items-center gap-2.5 border border-white/30 bg-[var(--charcoal)]/90 px-3.5 py-2 text-white backdrop-blur-md shadow-md max-w-[85%]">
              <span className="flex size-5 items-center justify-center bg-[var(--lacquer)] text-[10px] font-black flex-shrink-0">
                正
              </span>
              <p className="furniture text-[10px] text-white/90 truncate">
                Documentary Plate: {tip.image.alt}
              </p>
            </div>
          </div>
          <p className="furniture mt-2.5 text-right text-[10px] text-[var(--ink-soft)]">
            Photography: {tip.image.alt}
          </p>
        </div>
      ) : null}

      {/* Quick Friend Advice (TipBox) Highlight */}
      <TipBoxes tipBoxes={tip.tipBoxes} />

      {/* Editorial Body Breakdown */}
      <div className="mt-8 border-t border-[var(--rule)] pt-8">
        <Prose blocks={tip.body} />
      </div>

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
