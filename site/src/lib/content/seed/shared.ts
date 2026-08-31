import type { BaseDocument, ContentBlock } from "@/lib/content/types";

/**
 * Shared defaults for sample scaffolding.
 *
 * `status` is `published` so the routes render and the layout can be reviewed;
 * `sample: true` is what the UI keys off to label the entry and to suppress
 * every trust signal. Publish dates stay null — a fabricated date is a
 * fabricated fact.
 */
export const SAMPLE_BASE = {
  status: "published",
  seoTitle: null,
  seoDescription: null,
  ogImage: null,
  publishedAt: null,
  updatedAt: null,
  sample: true,
} as const satisfies Omit<BaseDocument, "id" | "slug">;

/** Body used wherever real editorial copy would carry factual claims. */
export const PENDING_BODY: readonly ContentBlock[] = [
  {
    type: "paragraph",
    text: "Editor copy pending. This entry is wired to the content model so layout and navigation can be reviewed. The desk has not written or verified it, so it carries no fares, hours, routes, or recommendations yet.",
  },
];
