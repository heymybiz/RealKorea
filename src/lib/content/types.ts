/**
 * Content model — PRD 03 §3.
 *
 * These types mirror the CMS schemas exactly so the seed layer can be swapped
 * for Sanity (or Payload) without touching call sites. Two rules are enforced
 * by the type system rather than by convention:
 *
 * 1. Visitor email addresses never appear on a public type. `Question` and
 *    `Comment` keep them for the editor side; `PublicQuestion` and
 *    `PublicComment` structurally cannot carry them (FR-011, FR-020).
 * 2. Anything that reads as a trust signal — `lastVerifiedAt`,
 *    `editorVerified`, `answerVerified` — is nullable/false-able so sample
 *    scaffolding can leave it empty instead of inventing it. See
 *    `assertSampleCarriesNoTrustSignal` in ./seed.
 */

/** PRD 03 §3 — shared by every document. */
export type DocumentStatus = "draft" | "scheduled" | "published" | "archived";

export type ImageRef = {
  readonly src: string;
  /** PRD 03 §6 — factual English alt text, required. */
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

/**
 * Minimal stand-in for portable text. Sanity's portable text replaces this at
 * the CMS boundary; the renderer only needs to learn one new block type.
 */
export type ContentBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading"; readonly level: 2 | 3; readonly text: string };

/** PRD 03 §3.3 — a checklist is a block, never a content type. */
export type ChecklistItem = {
  /** Stable id. `localStorage` keys off this, so never renumber it. */
  readonly id: string;
  readonly label: string;
  readonly help: string | null;
};

export type TipBox = {
  readonly heading: string | null;
  readonly body: string;
};

export type BaseDocument = {
  readonly id: string;
  readonly slug: string;
  readonly status: DocumentStatus;
  readonly seoTitle: string | null;
  readonly seoDescription: string | null;
  readonly ogImage: ImageRef | null;
  /** Null while the document is sample scaffolding. */
  readonly publishedAt: string | null;
  readonly updatedAt: string | null;
  /**
   * True for scaffolding seeded by the build, not by an editor. Sample
   * documents must never render a Verified mark or a last-verified date.
   */
  readonly sample: boolean;
};

/** PRD 03 §3.1 — Tip topics. */
export type TipTopic =
  | "arrival"
  | "transit"
  | "money"
  | "etiquette"
  | "survival"
  | "seasonal";

/**
 * PRD 02 §3.3 — the Ask composer chips are Money, Transit, Food, Etiquette,
 * Survival, Other. Note the deliberate difference from `TipTopic`: questions
 * can be filed under `food`, tips cannot, and only questions have `other`.
 * Kept as a separate union so neither list silently drifts into the other.
 */
export type QuestionTopic =
  | "money"
  | "transit"
  | "food"
  | "etiquette"
  | "survival"
  | "other";

export type NeighborhoodRegion = "Seoul" | "Gyeonggi" | "Capital region";

/** PRD 02 §7 and 03 §3.7. */
export type Neighborhood = BaseDocument & {
  readonly nameEn: string;
  readonly nameKo: string;
  readonly region: NeighborhoodRegion;
  /** PRD 02 §3.8 — 120–160 word editor dek. Null until an editor writes it. */
  readonly dek: string | null;
  readonly hero: ImageRef | null;
};

/** PRD 03 §3.1. */
export type Tip = BaseDocument & {
  readonly title: string;
  readonly dek: string | null;
  readonly topic: TipTopic;
  readonly neighborhoodSlugs: readonly string[];
  readonly body: readonly ContentBlock[];
  readonly tipBoxes: readonly TipBox[];
  /** PRD 03 §3.1 requires this on real Tips. Null only for samples. */
  readonly lastVerifiedAt: string | null;
  /** Drives the "Verified local" micro-label. Never true for a sample. */
  readonly editorVerified: boolean;
  readonly relatedQuestionSlugs: readonly string[];
  readonly relatedPlaceSlugs: readonly string[];
  readonly promotedFromQuestionSlug: string | null;
  readonly image: ImageRef | null;
};

export type PlaceVertical = "eat" | "shop-editorial" | "walk" | "other";
export type PriceBand = 1 | 2 | 3 | 4;
export type AcceptsCards = boolean | "unknown";
export type EnglishOk = "none" | "some" | "comfortable";
export type Reservation = "no" | "recommended" | "required";

/** PRD 03 §3.2 and the fact stack in PRD 02 §3.9. */
export type Place = BaseDocument & {
  /** H1. Editorial, not the venue's legal name. */
  readonly editorialTitle: string;
  /** Null until an editor names the venue. Never guessed. */
  readonly venueNameEn: string | null;
  /** Shown once as `English Name (한글)` — PRD 02 §5. */
  readonly venueNameKo: string | null;
  readonly vertical: PlaceVertical;
  readonly neighborhoodSlug: string;
  /** e.g. "Line 2, Hongik University, Exit 9". Null until verified. */
  readonly transitNote: string | null;
  readonly whyLocal: string | null;
  readonly isTouristTrap: boolean | "unknown";
  readonly touristTrapNote: string | null;
  /** A Place slug, free text, or nothing. */
  readonly localAlternative:
    | { readonly kind: "place"; readonly slug: string }
    | { readonly kind: "note"; readonly text: string }
    | null;
  readonly priceBand: PriceBand | null;
  readonly acceptsCards: AcceptsCards;
  readonly englishOk: EnglishOk | null;
  readonly reservation: Reservation | null;
  /** Not a live hours API in v1. */
  readonly hoursNote: string | null;
  readonly lastVerifiedAt: string | null;
  /** Required before a map embed may render (FR-041). Null blocks the embed. */
  readonly geo: { readonly lat: number; readonly lng: number } | null;
  readonly body: readonly ContentBlock[];
  readonly tipBoxes: readonly TipBox[];
  readonly isPartner: boolean;
  readonly partnerDisclosure: string | null;
  readonly photos: readonly ImageRef[];
};

/** PRD 03 §3.3. */
export type Guide = BaseDocument & {
  readonly title: string;
  readonly dek: string | null;
  readonly body: readonly ContentBlock[];
  readonly tipBoxes: readonly TipBox[];
  readonly checklistId: string;
  readonly checklistItems: readonly ChecklistItem[];
  /** Routes `/first-24-hours` to this guide (FR-051). */
  readonly isFirst24Alias: boolean;
  readonly hero: ImageRef | null;
};

export type QuestionStatus = "pending" | "answered" | "declined" | "merged";

/**
 * What a comment hangs off.
 *
 * PRD 03 §3.5 models this as a single `parentQuestion` reference, but FR-020
 * requires comments on Question, Tip, Place, and Guide. The requirement is the
 * broader of the two, so the reference is generalised here. Flagged in the
 * Turn E report as a PRD inconsistency to confirm.
 */
export type CommentTargetType = "question" | "tip" | "place" | "guide";

export type CommentTarget = {
  readonly type: CommentTargetType;
  readonly slug: string;
};

/**
 * PRD 03 §3.5 — editor-side comment. `email` is hidden and must be stripped
 * before the value reaches a public surface.
 */
export type Comment = {
  readonly id: string;
  readonly target: CommentTarget;
  readonly name: string;
  readonly email: string;
  readonly body: string;
  readonly createdAt: string;
  readonly published: boolean;
  /** Editor endorsement → Verified mark on that comment (FR-022). */
  readonly editorEndorsed: boolean;
};

/** PRD 03 §3.4 — editor-side question, including the private email. */
export type Question = BaseDocument & {
  readonly title: string;
  readonly body: string | null;
  readonly topic: QuestionTopic;
  readonly neighborhoodSlug: string | null;
  readonly askerName: string;
  /**
   * NEVER public, NEVER in JSON-LD (FR-011). Required on visitor submissions
   * (FR-010); null on questions the desk seeded itself.
   */
  readonly askerEmail: string | null;
  readonly questionStatus: QuestionStatus;
  readonly officialAnswer: readonly ContentBlock[] | null;
  readonly answerVerified: boolean;
  readonly answeredAt: string | null;
  readonly promotedToSlug: string | null;
  readonly comments: readonly Comment[];
};

/** PRD 03 §3.6 — only ever queried by `/shop`. */
export type ShopProduct = BaseDocument & {
  readonly title: string;
  readonly why: string;
  readonly image: ImageRef | null;
  /** Null renders a disabled card instead of a broken outbound link. */
  readonly outboundUrl: string | null;
  readonly priceHint: string | null;
  readonly category: string;
};

/* ------------------------------------------------------------------ */
/* Public projections — structurally cannot carry a visitor email      */
/* ------------------------------------------------------------------ */

export type PublicComment = Omit<Comment, "email">;

export type PublicQuestion = Omit<Question, "askerEmail" | "comments"> & {
  readonly comments: readonly PublicComment[];
};

/**
 * Built as an explicit allowlist rather than by spreading and deleting. If a
 * new private field is added to `Comment`, it cannot reach a public surface by
 * accident; if a new public field is added, TypeScript fails here until it is
 * mapped.
 */
export function toPublicComment(comment: Comment): PublicComment {
  return {
    id: comment.id,
    target: comment.target,
    name: comment.name,
    body: comment.body,
    createdAt: comment.createdAt,
    published: comment.published,
    editorEndorsed: comment.editorEndorsed,
  };
}

/**
 * The only sanctioned way to move a Question toward a page or an API response.
 * Drops `askerEmail` and every comment email, and hides comments an editor has
 * unpublished (FR-021).
 */
export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    slug: question.slug,
    status: question.status,
    seoTitle: question.seoTitle,
    seoDescription: question.seoDescription,
    ogImage: question.ogImage,
    publishedAt: question.publishedAt,
    updatedAt: question.updatedAt,
    sample: question.sample,
    title: question.title,
    body: question.body,
    topic: question.topic,
    neighborhoodSlug: question.neighborhoodSlug,
    askerName: question.askerName,
    questionStatus: question.questionStatus,
    officialAnswer: question.officialAnswer,
    answerVerified: question.answerVerified,
    answeredAt: question.answeredAt,
    promotedToSlug: question.promotedToSlug,
    comments: question.comments
      .filter((comment) => comment.published)
      .map(toPublicComment),
  };
}

/** True when a Question may be indexed (FR-013, FR-014). */
export function isIndexableQuestion(question: {
  readonly questionStatus: QuestionStatus;
  readonly officialAnswer: readonly ContentBlock[] | null;
}): boolean {
  return (
    question.questionStatus === "answered" &&
    (question.officialAnswer?.length ?? 0) > 0
  );
}
