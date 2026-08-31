import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GuideArticle } from "@/components/site/guide-article";
import { GuideJsonLd } from "@/components/site/json-ld";
import { getFirst24Guide } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const guide = await getFirst24Guide();

  if (!guide) return { title: "First 24 hours", robots: { index: false } };

  return {
    title: guide.seoTitle ?? guide.title,
    description:
      guide.seoDescription ??
      guide.dek ??
      "What to sort out on your first day after landing at Incheon.",
    alternates: { canonical: "/first-24-hours" },
    robots: guide.sample ? { index: false, follow: true } : undefined,
  };
}

/**
 * FR-051 — this route renders the Guide flagged `isFirst24Alias`.
 *
 * The canonical points here rather than at `/guides/:slug`, because this is the
 * URL the Home checklist and the footer link to. The guide route stays reachable
 * and carries its own canonical, which is a duplicate worth revisiting once a
 * domain exists and Search Console can show which one earns the clicks.
 */
export default async function FirstTwentyFourHoursPage() {
  const guide = await getFirst24Guide();
  if (!guide) notFound();

  return (
    <article className="content-shell py-16">
      <GuideArticle guide={guide} />

      <GuideJsonLd guide={guide} path="/first-24-hours" />

      <p className="border-rule text-ink-soft mt-16 border-t pt-8 text-[15px]">
        Looking for the rest of the desk?{" "}
        <Link
          href="/tips"
          className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
        >
          Browse the tips
        </Link>
        .
      </p>
    </article>
  );
}
