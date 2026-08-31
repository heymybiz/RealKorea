import type { SearchDocument, SearchDocumentType } from "@/lib/cms";

/**
 * FR-030 / FR-034 — search over titles, deks, bodies, and questions, grouped by
 * type.
 *
 * Deliberately a plain substring-and-token match rather than FlexSearch or
 * Pagefind. The launch corpus is tens of documents (PRD 01 §9), so an index
 * would be more moving parts than value. When the corpus grows, this is the one
 * function to swap.
 */

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "in",
  "on",
  "at",
  "to",
  "of",
  "or",
  "vs",
  "i",
  "can",
  "do",
  "you",
  "my",
  "it",
]);

function tokenize(query: string): readonly string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9가-힣]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export type SearchResults = {
  readonly query: string;
  readonly total: number;
  readonly groups: readonly {
    readonly type: SearchDocumentType;
    readonly label: string;
    readonly documents: readonly SearchDocument[];
  }[];
};

/** PRD 02 §3.12 — results are grouped in this order. */
const GROUP_ORDER: readonly { type: SearchDocumentType; label: string }[] = [
  { type: "question", label: "Questions" },
  { type: "tip", label: "Tips" },
  { type: "place", label: "Places" },
  { type: "guide", label: "Guides" },
];

function score(document: SearchDocument, tokens: readonly string[]): number {
  const title = document.title.toLowerCase();
  let total = 0;

  for (const token of tokens) {
    if (title.includes(token)) total += 3;
    else if (document.haystack.includes(token)) total += 1;
  }

  return total;
}

export function search(
  corpus: readonly SearchDocument[],
  rawQuery: string,
): SearchResults {
  const query = rawQuery.trim();
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return { query, total: 0, groups: [] };
  }

  const ranked = corpus
    .map((document) => ({ document, score: score(document, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const groups = GROUP_ORDER.map((group) => ({
    ...group,
    documents: ranked
      .filter((entry) => entry.document.type === group.type)
      .map((entry) => entry.document),
  })).filter((group) => group.documents.length > 0);

  return { query, total: ranked.length, groups };
}
