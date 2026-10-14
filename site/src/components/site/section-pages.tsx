import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentSection } from "@/components/site/comment-section";
import { GuideArticle } from "@/components/site/guide-article";
import { GuideJsonLd, TipJsonLd } from "@/components/site/json-ld";
import { Prose } from "@/components/site/prose";
import { ArticleNotice } from "@/components/site/affiliate-notice";
import {
  AdSlot,
  AuthorBox,
  Breadcrumb,
  changeLog,
  CheckedBadge,
  CozyoBanner,
  KkamiTrap,
  WhatChanged,
} from "@/components/site/realko-blocks";
import { getComments, getGuideBySlug, getGuides, getPlaces, getQuestions, getTipBySlug, getTips } from "@/lib/cms";
import {
  type ArticleSectionId,
  hubById,
  hubsFor,
  itemsIn,
  oldUrlFor,
  placeHref,
  questionHref,
  sectionById,
} from "@/lib/ia";
import { readErrorCode } from "@/lib/validation";

type Query = Record<string, string | string[] | undefined>;

type Card = { href: string; title: string; dek: string | null; kind: string; checkedBy?: string | null; checkedAt?: string | null };

async function cardsFor(section: string, hub: string): Promise<Card[]> {
  const [tips, guides] = await Promise.all([getTips(), getGuides()]);
  return itemsIn(section, hub).flatMap((item): Card[] => {
    if (item.type === "tip") {
      const tip = tips.find((t) => t.slug === item.slug);
      return tip ? [{ href: item.new, title: tip.title, dek: tip.dek, kind: "Fix & how-to", checkedBy: tip.checkedBy, checkedAt: tip.checkedAt }] : [];
    }
    if (item.type === "guide") {
      const guide = guides.find((g) => g.slug === item.slug);
      return guide ? [{ href: item.new, title: guide.title, dek: guide.dek, kind: "Long guide", checkedBy: guide.checkedBy, checkedAt: guide.checkedAt }] : [];
    }
    return [];
  });
}

function CardGrid({ cards }: { cards: readonly Card[] }) {
  if (cards.length === 0) return <p className="rk-empty">Kkami is still collecting guides for this topic.</p>;
  return (
    <ul className="rk-cards">
      {cards.map((card) => (
        <li key={card.href} className="rk-card">
          <span className="kind">{card.kind}</span>
          <h3>
            <Link href={card.href}>{card.title}</Link>
          </h3>
          {card.dek ? <p>{card.dek}</p> : null}
          <CheckedBadge checkedBy={card.checkedBy} checkedAt={card.checkedAt} />
        </li>
      ))}
    </ul>
  );
}

export function sectionMetadata(sectionId: ArticleSectionId, description: string): Metadata {
  const section = sectionById(sectionId);
  return { title: section.label, description, alternates: { canonical: section.href } };
}

export async function SectionHub({ sectionId, intro, extra }: { sectionId: ArticleSectionId; intro: string; extra?: React.ReactNode }) {
  const section = sectionById(sectionId);
  const hubs = hubsFor(sectionId);
  const groups = await Promise.all(hubs.map(async (hub) => ({ hub, cards: await cardsFor(sectionId, hub.id) })));

  return (
    <div className="rk-w rk-page">
      <Breadcrumb trail={[{ label: section.label }]} />
      <header className="rk-hubhead" style={{ "--c": section.color } as React.CSSProperties}>
        <h1>{section.label}</h1>
        <p>{intro}</p>
      </header>
      {extra}
      {groups.map(({ hub, cards }, index) => (
        <section key={hub.id} className="rk-hubsec" aria-labelledby={`hub-${hub.id}`}>
          <div className="rk-sechead">
            <h2 id={`hub-${hub.id}`}>{hub.label}</h2>
            <Link href={`${section.href}/${hub.id}`}>All {hub.label.toLowerCase()} →</Link>
          </div>
          <p className="rk-mute">{hub.blurb}</p>
          <CardGrid cards={cards} />
          {index === 0 ? <AdSlot placement="hub-between" /> : null}
        </section>
      ))}
      <CozyoBanner />
    </div>
  );
}

export function hubParams(sectionId: ArticleSectionId) {
  return hubsFor(sectionId).map((hub) => ({ hub: hub.id }));
}

export function hubMetadata(sectionId: ArticleSectionId, hubId: string): Metadata {
  const section = sectionById(sectionId);
  const hub = hubById(sectionId, hubId);
  if (!hub) return { title: "Not found", robots: { index: false } };
  return { title: `${hub.label} · ${section.label}`, description: hub.blurb, alternates: { canonical: `${section.href}/${hub.id}` } };
}

export async function SubHub({ sectionId, hubId }: { sectionId: ArticleSectionId; hubId: string }) {
  const section = sectionById(sectionId);
  const hub = hubById(sectionId, hubId);
  if (!hub) notFound();
  const cards = await cardsFor(sectionId, hub.id);
  return (
    <div className="rk-w rk-page">
      <Breadcrumb trail={[{ href: section.href, label: section.label }, { label: hub.label }]} />
      <header className="rk-hubhead" style={{ "--c": section.color } as React.CSSProperties}>
        <h1>{hub.label}</h1>
        <p>{hub.blurb}</p>
      </header>
      <CardGrid cards={cards} />
      <CozyoBanner />
    </div>
  );
}

export function articleParams(sectionId: ArticleSectionId) {
  return itemsIn(sectionId)
    .filter((item) => (item.type === "tip" || item.type === "guide") && item.hub)
    .map((item) => ({ hub: item.hub as string, slug: item.slug }));
}

function lookup(sectionId: ArticleSectionId, hubId: string, slug: string) {
  return itemsIn(sectionId, hubId).find((item) => item.slug === slug && (item.type === "tip" || item.type === "guide")) ?? null;
}

export async function articleMetadata(sectionId: ArticleSectionId, hubId: string, slug: string): Promise<Metadata> {
  const item = lookup(sectionId, hubId, slug);
  if (!item) return { title: "Not found", robots: { index: false } };
  const doc = item.type === "tip" ? await getTipBySlug(slug) : await getGuideBySlug(slug);
  if (!doc) return { title: "Not found", robots: { index: false } };
  const title = doc.seoTitle?.replace(/\s*\|\s*Real Korea\s*$/, "") ?? doc.title;
  const description = doc.seoDescription ?? doc.dek ?? undefined;
  const image = doc.ogImage?.src;
  return {
    title,
    description,
    alternates: { canonical: item.new },
    openGraph: { type: "article", title, description, url: item.new, ...(image ? { images: [image] } : {}) },
    robots: doc.sample ? { index: false, follow: true } : undefined,
  };
}

export async function ArticlePage({
  sectionId,
  hubId,
  slug,
  query,
}: {
  sectionId: ArticleSectionId;
  hubId: string;
  slug: string;
  query: Query;
}) {
  const item = lookup(sectionId, hubId, slug);
  if (!item) notFound();
  const section = sectionById(sectionId);
  const hub = hubById(sectionId, hubId);
  const trail = [
    { href: section.href, label: section.label },
    ...(hub ? [{ href: `${section.href}/${hub.id}`, label: hub.label }] : []),
  ];

  if (item.type === "guide") {
    const guide = await getGuideBySlug(slug);
    if (!guide) notFound();
    const comments = await getComments({ type: "guide", slug });
    return (
      <article className="rk-w rk-page rk-article">
        <Breadcrumb trail={[...trail, { label: guide.title }]} />
        <CheckedBadge checkedBy={guide.checkedBy} checkedAt={guide.checkedAt} />
        <AuthorBox />
        <ArticleNotice />
        <GuideArticle guide={guide} />
        <AdSlot placement="article-mid" />
        <CozyoBanner />
        <WhatChanged entries={changeLog({ updatedAt: guide.updatedAt, oldUrl: oldUrlFor("guide", slug) })} />
        <GuideJsonLd guide={guide} path={item.new} />
        <CommentSection target={{ type: "guide", slug }} comments={comments} error={readErrorCode(query.commentError)} submitted={query.commented === "1"} emphasis="secondary" />
      </article>
    );
  }

  const tip = await getTipBySlug(slug);
  if (!tip) notFound();
  const [places, questions, comments] = await Promise.all([getPlaces(), getQuestions(), getComments({ type: "tip", slug })]);
  const relatedPlaces = places.filter((place) => tip.relatedPlaceSlugs.includes(place.slug));
  const relatedQuestions = questions.filter((question) => tip.relatedQuestionSlugs.includes(question.slug));

  return (
    <article className="rk-w rk-page rk-article">
      <Breadcrumb trail={[...trail, { label: tip.title }]} />
      <h1 className="rk-h1">{tip.title}</h1>
      {tip.dek ? <p className="rk-dek">{tip.dek}</p> : null}
      <CheckedBadge checkedBy={tip.checkedBy} checkedAt={tip.checkedAt} />
      <AuthorBox />
        <ArticleNotice />

      {tip.image ? (
        <figure className="rk-hero-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tip.image.src} alt={tip.image.alt} loading="eager" decoding="async" />
          <figcaption>{tip.image.alt}</figcaption>
        </figure>
      ) : null}

      {tip.tipBoxes.map((box, index) => (
        <KkamiTrap key={`${box.heading ?? "trap"}-${index}`} heading={box.heading}>
          <p>{box.body}</p>
        </KkamiTrap>
      ))}

      <div className="rk-body">
        <Prose blocks={tip.body} />
      </div>

      <AdSlot placement="article-mid" />
      <CozyoBanner />
      <WhatChanged entries={changeLog({ checkedAt: tip.checkedAt, updatedAt: tip.updatedAt, oldUrl: oldUrlFor("tip", slug) })} />

      {relatedQuestions.length > 0 || relatedPlaces.length > 0 ? (
        <section className="rk-related" aria-labelledby="related">
          <h2 id="related">Related</h2>
          <ul>
            {relatedQuestions.map((question) => (
              <li key={question.id}><Link href={questionHref(question.slug)}>{question.title}</Link></li>
            ))}
            {relatedPlaces.map((place) => (
              <li key={place.id}><Link href={placeHref(place.slug)}>{place.editorialTitle}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}

      <TipJsonLd tip={tip} />
      <CommentSection target={{ type: "tip", slug }} comments={comments} error={readErrorCode(query.commentError)} submitted={query.commented === "1"} emphasis="secondary" />
    </article>
  );
}
