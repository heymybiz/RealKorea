import type { Comment, Question } from "@/lib/content/types";

/**
 * TODO(CMS): temporary write store.
 *
 * PRD 06 §3 allows "a local demo queue clearly labeled if no backend", which is
 * what this is. Submissions live in process memory, so they are lost on restart
 * and are not shared between server instances. The Ask page says so on screen
 * rather than implying a durable inbox.
 *
 * The store hangs off `globalThis` on purpose. Route handlers and page renders
 * are compiled into separate server bundles, so a plain module-level array is
 * not the same array on both sides: a question posted to `/api/ask` would never
 * appear in the `/ask` feed. Verified by submitting a question and finding it
 * missing from the feed before this was changed.
 *
 * Only `lib/cms.ts` may import this file. When Sanity lands, the create
 * functions in `lib/cms.ts` write to the dataset and this module is deleted.
 */

type DemoStore = {
  questions: Question[];
  comments: Comment[];
};

const STORE_KEY = "__realKoreaDemoQueue__";

type GlobalWithStore = typeof globalThis & {
  [STORE_KEY]?: DemoStore;
};

function store(): DemoStore {
  const scope = globalThis as GlobalWithStore;
  scope[STORE_KEY] ??= { questions: [], comments: [] };
  return scope[STORE_KEY];
}

export function pushQuestion(question: Question): void {
  store().questions.unshift(question);
}

export function listQuestions(): readonly Question[] {
  return store().questions;
}

export function findQuestion(slug: string): Question | null {
  return store().questions.find((question) => question.slug === slug) ?? null;
}

export function pushComment(comment: Comment): void {
  store().comments.push(comment);
}

export function listComments(
  targetType: Comment["target"]["type"],
  slug: string,
): readonly Comment[] {
  return store().comments.filter(
    (comment) =>
      comment.target.type === targetType && comment.target.slug === slug,
  );
}
