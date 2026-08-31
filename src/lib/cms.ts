/**
 * TODO(CMS): this module is the only boundary between the site and its content
 * source. Everything below reads from the typed seed in `./content/seed`.
 *
 * Swapping in Sanity (PRD 01 §8) means replacing the bodies of these functions
 * with GROQ queries. Do not add a second data source anywhere else, and do not
 * import from `./content/seed` outside this file — that is what keeps the
 * migration to one file.
 *
 * Every accessor is async even though the seed is synchronous, so call sites
 * do not change when the queries become network calls.
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
  let places = SEED_PLACES.filter(isPubliclyVisible);

  if (options?.vertical) {
    places = places.filter((place) => place.vertical === options.vertical);
  }

  if (options?.neighborhoodSlug) {
    places = places.filter(
      (place) => place.neighborhoodSlug === options.neighborhoodSlug,
    );
  }

  // FR-032 — "Hide traps" only removes confirmed traps. `"unknown"` is not a
  // trap, and must not be treated as one.
  if (options?.hideTraps) {
    places = places.filter((place) => place.isTouristTrap !== true);
  }

  if (options?.priceBand) {
    places = places.filter((place) => place.priceBand === options.priceBand);
  }

  // These two filters are claims about a venue, so an unverified place is
  // excluded rather than optimistically included.
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
  const neighborhoods = SEED_NEIGHBORHOODS.filter(isPubliclyVisible);
  return options?.limit ? neighborhoods.slice(0, options.limit) : neighborhoods;
}

export async function getNeighborhoodBySlug(
  slug: string,
): Promise<Neighborhood | null> {
  return (
    SEED_NEIGHBORHOODS.find(
      (neighborhood) =>
        neighborhood.slug === slug && isPubliclyVisible(neighborhood),
    ) ?? null
  );
}

/* --------------------------------- Guides ---------------------------------- */

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  return (
    SEED_GUIDES.find(
      (guide) => guide.slug === slug && isPubliclyVisible(guide),
    ) ?? null
  );
}

/** FR-051 — `/first-24-hours` resolves to the guide flagged as the alias. */
export async function getFirst24Guide(): Promise<Guide | null> {
  return (
    SEED_GUIDES.find(
      (guide) => guide.isFirst24Alias && isPubliclyVisible(guide),
    ) ?? null
  );
}

/* -------------------------------- Questions -------------------------------- */

/**
 * Returns public projections only. `askerEmail` and comment emails are dropped
 * here, so no route or API response can leak them (FR-011, FR-020).
 */
/** Seed corpus plus anything submitted this session, newest submissions first. */
function allQuestions(): readonly Question[] {
  return [...listDemoQuestions(), ...SEED_QUESTIONS];
}

/** Attaches comments held in the demo queue to a question's own list. */
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

  // PRD 02 §3.2 — answered questions lead the feed.
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
  const question =
    findDemoQuestion(slug) ??
    allQuestions().find((candidate) => candidate.slug === slug) ??
    null;

  if (!question || !isPubliclyVisible(question)) return null;

  return toPublicQuestion(withQueuedComments(question));
}

/* --------------------------- Writes (visitor input) ------------------------ */

/**
 * FR-010 — a visitor submits a question without an account. The record starts
 * as `pending`, so it renders as "Awaiting editor" and stays out of the index
 * until an editor publishes an answer (FR-013, FR-014).
 */
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
    // A real visitor submission, not build scaffolding.
    sample: false,
    title: input.title,
    body: null,
    topic: input.topic,
    neighborhoodSlug: input.neighborhoodSlug,
    askerName: input.askerName,
    askerEmail: input.askerEmail,
    questionStatus: "pending",
    officialAnswer: null,
    answerVerified: false,
    answeredAt: null,
    promotedToSlug: null,
    comments: [],
  };

  pushDemoQuestion(question);
  return toPublicQuestion(question);
}

/**
 * FR-020 — a comment carries a name, a hidden email, and a body. Published
 * immediately with an editor tool to unpublish, which PRD 02 §F-COMMENT names
 * as the default.
 */
export async function createComment(input: {
  readonly target: CommentTarget;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}): Promise<PublicComment> {
  const comment: Comment = {
    id: `comment-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    target: input.target,
    name: input.name,
    email: input.email,
    body: input.body,
    createdAt: new Date().toISOString(),
    published: true,
    editorEndorsed: false,
  };

  pushDemoComment(comment);
  return toPublicComment(comment);
}

/** Public comments for any commentable document. Emails are stripped here. */
export async function getComments(
  target: CommentTarget,
): Promise<readonly PublicComment[]> {
  return listDemoComments(target.type, target.slug)
    .filter((comment) => comment.published)
    .map(toPublicComment);
}

/** True when the slug names a document that accepts comments (FR-020). */
export async function commentTargetExists(
  target: CommentTarget,
): Promise<boolean> {
  switch (target.type) {
    case "question":
      return (await getQuestionBySlug(target.slug)) !== null;
    case "tip":
      return (await getTipBySlug(target.slug)) !== null;
    case "place":
      return (await getPlaceBySlug(target.slug)) !== null;
    case "guide":
      return (await getGuideBySlug(target.slug)) !== null;
  }
}

/* ---------------------------------- Shop ----------------------------------- */

/** FR-061 — only `/shop` may call this. Never render these on editorial. */
export async function getShopProducts(): Promise<readonly ShopProduct[]> {
  return SEED_SHOP_PRODUCTS.filter(isPubliclyVisible);
}

/* --------------------------------- Search ---------------------------------- */

export type SearchDocumentType = "question" | "tip" | "place" | "guide";

export type SearchDocument = {
  readonly type: SearchDocumentType;
  readonly title: string;
  readonly href: string;
  readonly dek: string | null;
  /** Lowercased haystack: title, dek, and body text (FR-030). */
  readonly haystack: string;
};

function blocksToText(
  blocks: readonly { readonly text: string }[] | null,
): string {
  return (blocks ?? []).map((block) => block.text).join(" ");
}

/**
 * FR-030 / FR-034 — one flat corpus over titles, deks, bodies, and questions,
 * grouped by type at render time.
 */
export async function getSearchCorpus(): Promise<readonly SearchDocument[]> {
  const [tips, places, questions] = await Promise.all([
    getTips(),
    getPlaces(),
    getQuestions(),
  ]);

  const guides = SEED_GUIDES.filter(isPubliclyVisible);

  const documents: SearchDocument[] = [
    ...questions.map((question) => ({
      type: "question" as const,
      title: question.title,
      href: `/ask/${question.slug}`,
      dek: question.body,
      haystack: [
        question.title,
        question.body ?? "",
        blocksToText(question.officialAnswer),
      ]
        .join(" ")
        .toLowerCase(),
    })),
    ...tips.map((tip) => ({
      type: "tip" as const,
      title: tip.title,
      href: `/tips/${tip.slug}`,
      dek: tip.dek,
      haystack: [tip.title, tip.dek ?? "", blocksToText(tip.body)]
        .join(" ")
        .toLowerCase(),
    })),
    ...places.map((place) => ({
      type: "place" as const,
      title: place.editorialTitle,
      href: `/places/p/${place.slug}`,
      dek: place.whyLocal,
      haystack: [
        place.editorialTitle,
        place.venueNameEn ?? "",
        place.venueNameKo ?? "",
        place.whyLocal ?? "",
        blocksToText(place.body),
      ]
        .join(" ")
        .toLowerCase(),
    })),
    ...guides.map((guide) => ({
      type: "guide" as const,
      title: guide.title,
      href: `/guides/${guide.slug}`,
      dek: guide.dek,
      haystack: [guide.title, guide.dek ?? "", blocksToText(guide.body)]
        .join(" ")
        .toLowerCase(),
    })),
  ];

  return documents;
}
