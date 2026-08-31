import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CommentSection } from "@/components/site/comment-section";
import { GuideArticle } from "@/components/site/guide-article";
import { GuideJsonLd } from "@/components/site/json-ld";
import { getComments, getGuideBySlug } from "@/lib/cms";
import { readErrorCode } from "@/lib/validation";

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) return { title: "Guide not found", robots: { index: false } };

  return {
    title: guide.seoTitle ?? guide.title,
    description: guide.seoDescription ?? guide.dek ?? undefined,
    alternates: { canonical: `/guides/${slug}` },
    robots: guide.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function GuidePage({
  params,
  searchParams,
}: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;

  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const comments = await getComments({ type: "guide", slug });

  return (
    <article className="content-shell py-16">
      <GuideArticle guide={guide} />

      <GuideJsonLd guide={guide} path={`/guides/${slug}`} />

      <CommentSection
        target={{ type: "guide", slug }}
        comments={comments}
        error={readErrorCode(query.commentError)}
        submitted={query.commented === "1"}
        emphasis="secondary"
      />
    </article>
  );
}
