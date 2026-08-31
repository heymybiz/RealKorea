/**
 * CMS Data Boundary Module for Real Korea.
 *
 * All content queries and mutations route strictly through this single file.
 * When NEXT_PUBLIC_SANITY_PROJECT_ID is configured, it queries Sanity Studio via GROQ.
 * In local development / offline build, it uses the type-safe verified seed dataset.
 */

import {
  findQuestion as findDemoQuestion,
  listComments as listDemoComments,
  listQuestions as listDemoQuestions,
  pushComment as pushDemoComment,
  pushQuestion as pushDemoQuestion,
} from "@/lib/content/demo-queue";
import {
  SEED_GUIDES,
  SEED_NEIGHBORHOODS,
  SEED_PLACES,
  SEED_QUESTIONS,
  SEED_SHOP_PRODUCTS,
  SEED_TIPS,
} from "@/lib/content/seed";
import {
  isIndexableQuestion,
  toPublicComment,
  toPublicQuestion,
  type Comment,
  type CommentTarget,
  type CommentTargetType,
  type Guide,
  type Neighborhood,
  type Place,
  type PublicComment,
  type PublicQuestion,
  type Question,
  type QuestionTopic,
  type ShopProduct,
  type Tip,
  type TipTopic,
} from "@/lib/content/types";
import { client } from "@/sanity/lib/client";
import {
  GUIDE_FIRST24_QUERY,
  NEIGHBORHOODS_QUERY,
  PLACES_QUERY,
  PLACE_BY_SLUG_QUERY,
  QUESTIONS_QUERY,
  QUESTION_BY_SLUG_QUERY,
  TIPS_QUERY,
  TIP_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";

function isSanityConfigured(): boolean {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(pid && pid !== "demo-real-korea" && pid.length > 3);
}

/**
 * FR-002 — the public site renders only `published`, plus `scheduled` once its
 * publish time has passed. Anything else must 404 for anonymous visitors.
 */
function isPubliclyVisible(document: {
  readonly status: string;
  readonly publishedAt: string | null;
}): boolean {
  if (document.status === "published") return true;

  if (document.status === "scheduled") {
    if (!document.publishedAt) return false;
    return new Date(document.publishedAt).getTime() <= Date.now();
  }

  return false;
}

/** PRD 02 §3.4 — last verified first, then publish date. */
function byVerifiedThenPublished(
  a: { lastVerifiedAt: string | null; publishedAt: string | null },
  b: { lastVerifiedAt: string | null; publishedAt: string | null },
): number {
  const key = (d: { lastVerifiedAt: string | null; publishedAt: string | null }) =>
    d.lastVerifiedAt ?? d.publishedAt ?? "";

  return key(b).localeCompare(key(a));
}

/* ----------------------------------- Tips ---------------------------------- */

export async function getTips(options?: {
  readonly topic?: TipTopic;
  readonly neighborhoodSlug?: string;
  readonly limit?: number;
}): Promise<readonly Tip[]> {
  if (isSanityConfigured()) {
    try {
      const sanityTips = await client.fetch<Tip[]>(TIPS_QUERY);
      let tips = sanityTips.filter(isPubliclyVisible);

      if (options?.topic) {
        tips = tips.filter((tip) => tip.topic === options.topic);
      }

      if (options?.neighborhoodSlug) {
        tips = tips.filter((tip) =>
          tip.neighborhoodSlugs?.includes(options.neighborhoodSlug as string),
        );
      }

      const sorted = [...tips].sort(byVerifiedThenPublished);
      return options?.limit ? sorted.slice(0, options.limit) : sorted;
    } catch {
      // Fallback
    }
  }

  let tips = SEED_TIPS.filter(isPubliclyVisible);

  if (options?.topic) {
    tips = tips.filter((tip) => tip.topic === options.topic);
  }

  if (options?.neighborhoodSlug) {
    tips = tips.filter((tip) =>
      tip.neighborhoodSlugs.includes(options.neighborhoodSlug as string),
    );
  }

  const sorted = [...tips].sort(byVerifiedThenPublished);
  return options?.limit ? sorted.slice(0, options.limit) : sorted;
}

export async function getTipBySlug(slug: string): Promise<Tip | null> {
  if (isSanityConfigured()) {
    try {
      const tip = await client.fetch<Tip | null>(TIP_BY_SLUG_QUERY, { slug });
      if (tip && isPubliclyVisible(tip)) return tip;
    } catch {
      // Fallback
    }
  }

  return (
    SEED_TIPS.find((tip) => tip.slug === slug && isPubliclyVisible(tip)) ?? null
  );
}

/* ---------------------------------- Places --------------------------------- */

export async function getPlaces(options?: {
  readonly vertical?: Place["vertical"];
  readonly neighborhoodSlug?: string;
  readonly hideTraps?: boolean;
  readonly priceBand?: Place["priceBand"];
  readonly englishOnly?: boolean;
  readonly cardsOnly?: boolean;
  readonly limit?: number;
}): Promise<readonly Place[]> {
  if (isSanityConfigured()) {
    try {
      const sanityPlaces = await client.fetch<Place[]>(PLACES_QUERY);
      let places = sanityPlaces.filter(isPubliclyVisible);

      if (options?.vertical) {
        places = places.filter((place) => place.vertical === options.vertical);
      }

      if (options?.neighborhoodSlug) {
        places = places.filter(
          (place) => place.neighborhoodSlug === options.neighborhoodSlug,
        );
      }

      if (options?.hideTraps) {
        places = places.filter((place) => place.isTouristTrap !== true);
      }

      if (options?.priceBand) {
        places = places.filter((place) => place.priceBand === options.priceBand);
      }

      if (options?.englishOnly) {
        places = places.filter(
          (place) => place.englishOk === "some" || place.englishOk === "comfortable",
        );
      }

      if (options?.cardsOnly) {
        places = places.filter((place) => place.acceptsCards === true);
      }

      const sorted = [...places].sort(byVerifiedThenPublished);
      return options?.limit ? sorted.slice(0, options.limit) : sorted;
    } catch {
      // Fallback
    }
  }

  let places = SEED_PLACES.filter(isPubliclyVisible);

  if (options?.vertical) {
    places = places.filter((place) => place.vertical === options.vertical);
  }

  if (options?.neighborhoodSlug) {
    places = places.filter(
      (place) => place.neighborhoodSlug === options.neighborhoodSlug,
    );
  }

  if (options?.hideTraps) {
    places = places.filter((place) => place.isTouristTrap !== true);
  }

  if (options?.priceBand) {
    places = places.filter((place) => place.priceBand === options.priceBand);
  }

  if (options?.englishOnly) {
    places = places.filter(
      (place) => place.englishOk === "some" || place.englishOk === "comfortable",
    );
  }

  if (options?.cardsOnly) {
    places = places.filter((place) => place.acceptsCards === true);
  }

  const sorted = [...places].sort(byVerifiedThenPublished);
  return options?.limit ? sorted.slice(0, options.limit) : sorted;
}

export async function getPlaceBySlug(slug: string): Promise<Place | null> {
  if (isSanityConfigured()) {
    try {
      const place = await client.fetch<Place | null>(PLACE_BY_SLUG_QUERY, { slug });
      if (place && isPubliclyVisible(place)) return place;
    } catch {
      // Fallback
    }
  }

  return (
    SEED_PLACES.find(
      (place) => place.slug === slug && isPubliclyVisible(place),
    ) ?? null
  );
}

/* ------------------------------ Neighborhoods ------------------------------ */

export async function getNeighborhoods(options?: {
  readonly limit?: number;
}): Promise<readonly Neighborhood[]> {
  if (isSanityConfigured()) {
    try {
      const sanityHoods = await client.fetch<Neighborhood[]>(NEIGHBORHOODS_QUERY);
      if (sanityHoods && sanityHoods.length > 0) {
        return options?.limit ? sanityHoods.slice(0, options.limit) : sanityHoods;
      }
    } catch {
      // Fallback
    }
  }

  const neighborhoods = SEED_NEIGHBORHOODS.filter(isPubliclyVisible);
  return options?.limit ? neighborhoods.slice(0, options.limit) : neighborhoods;
}

export async function getNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | null> {
  const neighborhoods = await getNeighborhoods();
  return (
    neighborhoods.find(
      (neighborhood) =>
        neighborhood.slug === slug && isPubliclyVisible(neighborhood),
    ) ?? null
  );
}

/* --------------------------------- Guides ---------------------------------- */

export async function getGuides(): Promise<readonly Guide[]> {
  return SEED_GUIDES.filter(isPubliclyVisible);
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  if (isSanityConfigured()) {
    try {
      const guide = await client.fetch<Guide | null>(
        `*[_type == "guide" && slug.current == $slug][0] { "id": _id, title, "slug": slug.current, dek, checklistId, checklistItems, body, isFirst24Alias }`,
        { slug }
      );
      if (guide && isPubliclyVisible(guide as unknown as { status: string; publishedAt: string | null })) {
        return guide;
      }
    } catch {
      // Fallback
    }
  }

  return (
    SEED_GUIDES.find(
      (guide) => guide.slug === slug && isPubliclyVisible(guide),
    ) ?? null
  );
}

/** FR-051 — `/first-24-hours` resolves to the guide flagged as the alias. */
export async function getFirst24Guide(): Promise<Guide | null> {
  if (isSanityConfigured()) {
    try {
      const guide = await client.fetch<Guide | null>(GUIDE_FIRST24_QUERY);
      if (guide) return guide;
    } catch {
      // Fallback
    }
  }

  return (
    SEED_GUIDES.find(
      (guide) => guide.isFirst24Alias && isPubliclyVisible(guide),
    ) ?? null
  );
}

/* -------------------------------- Questions -------------------------------- */

function allQuestions(): readonly Question[] {
  return [...listDemoQuestions(), ...SEED_QUESTIONS];
}

function withQueuedComments(question: Question): Question {
  const queued = listDemoComments("question", question.slug);
  if (queued.length === 0) return question;

  return { ...question, comments: [...question.comments, ...queued] };
}

export async function getQuestions(options?: {
  readonly answeredOnly?: boolean;
  readonly unansweredOnly?: boolean;
  readonly topic?: PublicQuestion["topic"];
  readonly neighborhoodSlug?: string;
  readonly limit?: number;
}): Promise<readonly PublicQuestion[]> {
  if (isSanityConfigured()) {
    try {
      const sanityQuestions = await client.fetch<Question[]>(QUESTIONS_QUERY);
      if (sanityQuestions && sanityQuestions.length > 0) {
        let questions = sanityQuestions.filter(isPubliclyVisible);
        if (options?.neighborhoodSlug) {
          questions = questions.filter(
            (q) => q.neighborhoodSlug === options.neighborhoodSlug,
          );
        }
        if (options?.answeredOnly) {
          questions = questions.filter(isIndexableQuestion);
        }
        if (options?.unansweredOnly) {
          questions = questions.filter((q) => !isIndexableQuestion(q));
        }
        if (options?.topic) {
          questions = questions.filter((q) => q.topic === options.topic);
        }
        const projected = questions.map(toPublicQuestion);
        return options?.limit ? projected.slice(0, options.limit) : projected;
      }
    } catch {
      // Fallback
    }
  }

  let questions = allQuestions()
    .filter(isPubliclyVisible)
    .filter(
      (question) =>
        question.questionStatus !== "declined" &&
        question.questionStatus !== "merged",
    );

  if (options?.neighborhoodSlug) {
    questions = questions.filter(
      (question) => question.neighborhoodSlug === options.neighborhoodSlug,
    );
  }

  if (options?.answeredOnly) {
    questions = questions.filter(isIndexableQuestion);
  }

  if (options?.unansweredOnly) {
    questions = questions.filter((question) => !isIndexableQuestion(question));
  }

  if (options?.topic) {
    questions = questions.filter(
      (question) => question.topic === options.topic,
    );
  }

  const ordered = [...questions].sort((a, b) => {
    const aAnswered = isIndexableQuestion(a) ? 0 : 1;
    const bAnswered = isIndexableQuestion(b) ? 0 : 1;
    return aAnswered - bAnswered;
  });

  const projected = ordered.map(withQueuedComments).map(toPublicQuestion);
  return options?.limit ? projected.slice(0, options.limit) : projected;
}

export async function getQuestionBySlug(
  slug: string,
): Promise<PublicQuestion | null> {
  if (isSanityConfigured()) {
    try {
      const q = await client.fetch<Question | null>(QUESTION_BY_SLUG_QUERY, { slug });
      if (q && isPubliclyVisible(q)) {
        return toPublicQuestion(q);
      }
    } catch {
      // Fallback
    }
  }

  const question =
    findDemoQuestion(slug) ??
    allQuestions().find((candidate) => candidate.slug === slug) ??
    null;

  if (!question || !isPubliclyVisible(question)) return null;

  return toPublicQuestion(withQueuedComments(question));
}

/* -------------------------------- Comments --------------------------------- */

export async function getComments(target: {
  readonly type: CommentTargetType;
  readonly slug: string;
}): Promise<readonly PublicComment[]> {
  const queued = listDemoComments(target.type, target.slug);

  let seedComments: readonly Comment[] = [];
  if (target.type === "question") {
    const q = SEED_QUESTIONS.find((item) => item.slug === target.slug);
    seedComments = q?.comments ?? [];
  }

  const all = [...seedComments, ...queued].filter((c) => c.published);
  return all.map(toPublicComment);
}

export async function commentTargetExists(target: {
  readonly type: CommentTargetType;
  readonly slug: string;
}): Promise<boolean> {
  if (target.type === "question") {
    return Boolean(await getQuestionBySlug(target.slug));
  }
  if (target.type === "tip") {
    return Boolean(await getTipBySlug(target.slug));
  }
  if (target.type === "place") {
    return Boolean(await getPlaceBySlug(target.slug));
  }
  if (target.type === "guide") {
    return Boolean(await getGuideBySlug(target.slug));
  }
  return false;
}

/* --------------------------- Writes (visitor input) ------------------------ */

export async function createQuestion(input: {
  readonly title: string;
  readonly topic: QuestionTopic;
  readonly neighborhoodSlug: string | null;
  readonly askerName: string;
  readonly askerEmail: string;
  readonly slug: string;
}): Promise<PublicQuestion> {
  const now = new Date().toISOString();

  const question: Question = {
    id: `question-${input.slug}`,
    slug: input.slug,
    status: "published",
    seoTitle: null,
    seoDescription: null,
    ogImage: null,
    publishedAt: now,
    updatedAt: now,
    title: input.title,
    body: null,
    topic: input.topic,
    neighborhoodSlug: input.neighborhoodSlug,
    askerName: input.askerName.trim() || "Anonymous",
    askerEmail: input.askerEmail.trim(),
    questionStatus: "pending",
    officialAnswer: null,
    answerVerified: false,
    answeredAt: null,
    promotedToSlug: null,
    comments: [],
    sample: false,
  };

  pushDemoQuestion(question);
  return toPublicQuestion(question);
}

export async function createComment(input: {
  readonly target: CommentTarget;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}): Promise<PublicComment> {
  const now = new Date().toISOString();
  const id = `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const comment: Comment = {
    id,
    target: input.target,
    name: input.name.trim() || "Reader",
    email: input.email.trim(),
    body: input.body.trim(),
    createdAt: now,
    published: true,
    editorEndorsed: false,
  };

  pushDemoComment(comment);
  return toPublicComment(comment);
}

/* ------------------------------ Shop Products ------------------------------ */

export async function getShopProducts(options?: {
  readonly category?: ShopProduct["category"];
  readonly limit?: number;
}): Promise<readonly ShopProduct[]> {
  let products = SEED_SHOP_PRODUCTS.filter(isPubliclyVisible);

  if (options?.category) {
    products = products.filter(
      (product) => product.category === options.category,
    );
  }

  return options?.limit ? products.slice(0, options.limit) : products;
}

export async function getShopProductBySlug(
  slug: string,
): Promise<ShopProduct | null> {
  return (
    SEED_SHOP_PRODUCTS.find(
      (product) => product.slug === slug && isPubliclyVisible(product),
    ) ?? null
  );
}

/* ---------------------------------- Search --------------------------------- */

export type SearchDocumentType = "tip" | "place" | "question" | "guide";

export interface SearchDocument {
  readonly type: SearchDocumentType;
  readonly id: string;
  readonly slug: string;
  readonly href: string;
  readonly title: string;
  readonly dek: string | null;
  readonly topicOrCategory: string | null;
  readonly neighborhood: string | null;
  readonly haystack: string;
}

export async function getSearchCorpus(): Promise<readonly SearchDocument[]> {
  const [tips, places, questions, guides] = await Promise.all([
    getTips(),
    getPlaces(),
    getQuestions({ answeredOnly: true }),
    getGuides(),
  ]);

  const corpus: SearchDocument[] = [];

  for (const tip of tips) {
    corpus.push({
      type: "tip",
      id: tip.id,
      slug: tip.slug,
      href: `/tips/${tip.slug}`,
      title: tip.title,
      dek: tip.dek,
      topicOrCategory: tip.topic,
      neighborhood: tip.neighborhoodSlugs[0] ?? null,
      haystack: `${tip.title} ${tip.dek ?? ""} ${tip.topic} ${tip.tipBoxes.map((b) => b.body).join(" ")}`.toLowerCase(),
    });
  }

  for (const place of places) {
    corpus.push({
      type: "place",
      id: place.id,
      slug: place.slug,
      href: `/places/p/${place.slug}`,
      title: place.editorialTitle,
      dek: place.whyLocal ?? null,
      topicOrCategory: place.vertical,
      neighborhood: place.neighborhoodSlug,
      haystack: `${place.editorialTitle} ${place.venueNameEn ?? ""} ${place.venueNameKo ?? ""} ${place.whyLocal ?? ""}`.toLowerCase(),
    });
  }

  for (const question of questions) {
    corpus.push({
      type: "question",
      id: question.id,
      slug: question.slug,
      href: `/ask/${question.slug}`,
      title: question.title,
      dek: question.officialAnswer?.[0]?.text ?? null,
      topicOrCategory: question.topic,
      neighborhood: question.neighborhoodSlug,
      haystack: `${question.title} ${question.topic}`.toLowerCase(),
    });
  }

  for (const guide of guides) {
    corpus.push({
      type: "guide",
      id: guide.id,
      slug: guide.slug,
      href: guide.isFirst24Alias ? "/first-24-hours" : `/guides/${guide.slug}`,
      title: guide.title,
      dek: guide.dek,
      topicOrCategory: "guide",
      neighborhood: null,
      haystack: `${guide.title} ${guide.dek ?? ""}`.toLowerCase(),
    });
  }

  return corpus;
}
