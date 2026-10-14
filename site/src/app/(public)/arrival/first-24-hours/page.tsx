import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideArticle } from "@/components/site/guide-article";
import { GuideJsonLd } from "@/components/site/json-ld";
import { ArticleNotice } from "@/components/site/affiliate-notice";
import {
  AdSlot,
  AuthorBox,
  Breadcrumb,
  changeLog,
  CheckedBadge,
  CozyoBanner,
  WhatChanged,
} from "@/components/site/realko-blocks";
import { getFirst24Guide } from "@/lib/cms";


const PATH = "/arrival/first-24-hours";

export async function generateMetadata(): Promise<Metadata> {
  const guide = await getFirst24Guide();
  if (!guide) return { title: "First 24 hours", robots: { index: false } };
  return {
    title: guide.seoTitle?.replace(/\s*\|\s*Real Korea\s*$/, "") ?? guide.title,
    description: guide.seoDescription ?? guide.dek ?? "What to sort out on your first day after landing at Incheon.",
    alternates: { canonical: PATH },
    robots: guide.sample ? { index: false, follow: true } : undefined,
  };
}

export default async function FirstTwentyFourHoursPage() {
  const guide = await getFirst24Guide();
  if (!guide) notFound();

  return (
    <article className="rk-w rk-page rk-article">
      <Breadcrumb trail={[{ href: "/arrival", label: "Arrival" }, { label: "First 24 hours" }]} />
      <CheckedBadge checkedBy={guide.checkedBy} checkedAt={guide.checkedAt} />
      <AuthorBox />
      <ArticleNotice />
      <GuideArticle guide={guide} />
      <AdSlot placement="article-mid" />
      <CozyoBanner title="Need a bed for the first night?" />
      <WhatChanged
        entries={[
          { date: "2026-10-14", text: "Moved to a new address (was /first-24-hours)." },
          ...changeLog({ updatedAt: guide.updatedAt, oldUrl: null }),
        ]}
      />
      <GuideJsonLd guide={guide} path={PATH} />
    </article>
  );
}
