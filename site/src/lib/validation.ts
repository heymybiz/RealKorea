/**
 * Field rules for the two public forms.
 *
 * Limits come from PRD 03 §3.4 (question title 12–140 chars), PRD 03 §3.5
 * (comment body 8–1000 chars), and PRD 02 §3.2 (question min 12 chars, email
 * required).
 *
 * Error codes travel in the URL after a POST redirect, so they are short,
 * stable, and safe to render.
 */

import type { QuestionTopic } from "@/lib/content/types";

export const QUESTION_MIN = 12;
export const QUESTION_MAX = 140;
export const COMMENT_MIN = 8;
export const COMMENT_MAX = 1000;
export const NAME_MAX = 60;
export const EMAIL_MAX = 254;

export type ErrorCode =
  | "question-short"
  | "question-long"
  | "name-required"
  | "email-required"
  | "email-invalid"
  | "topic-invalid"
  | "body-short"
  | "body-long"
  | "target-invalid"
  | "spam"
  | "rate-limit";

export const ERROR_MESSAGE: Record<ErrorCode, string> = {
  "question-short": `Give us at least ${QUESTION_MIN} characters so an editor knows what you are asking.`,
  "question-long": `Keep it under ${QUESTION_MAX} characters.`,
  "name-required": "Add a name. It appears with your question.",
  "email-required": "An email is required so an editor can reply.",
  "email-invalid": "That email does not look right.",
  "topic-invalid": "Pick one of the topics.",
  "body-short": `Comments need at least ${COMMENT_MIN} characters.`,
  "body-long": `Keep comments under ${COMMENT_MAX} characters.`,
  "target-invalid": "That page no longer accepts comments.",
  // PRD 02 §3.2 — the spam and rate-limit copy is deliberately polite.
  spam: "That’s too fast. Try again in a few minutes.",
  "rate-limit": "That’s too fast. Try again in a few minutes.",
};

export const QUESTION_TOPICS: readonly QuestionTopic[] = [
  "money",
  "transit",
  "food",
  "etiquette",
  "survival",
  "other",
];

export const TOPIC_LABEL: Record<QuestionTopic, string> = {
  money: "Money",
  transit: "Transit",
  food: "Food",
  etiquette: "Etiquette",
  survival: "Survival",
  other: "Other",
};

/** Reads an error code straight off `searchParams`, ignoring anything unknown. */
export function readErrorCode(
  value: string | string[] | undefined,
): ErrorCode | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && candidate in ERROR_MESSAGE
    ? (candidate as ErrorCode)
    : null;
}

export function isQuestionTopic(value: unknown): value is QuestionTopic {
  return (
    typeof value === "string" &&
    (QUESTION_TOPICS as readonly string[]).includes(value)
  );
}

/**
 * Deliberately permissive. The point is to catch typos before an editor wastes
 * a reply, not to police valid addresses out of existence.
 */
export function isPlausibleEmail(value: string): boolean {
  if (value.length > EMAIL_MAX) return false;
  return /^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(value);
}

export function readField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Slug for a freshly submitted question. */
export function slugifyQuestion(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)
    .replace(/^-+|-+$/g, "");

  const suffix = Math.random().toString(36).slice(2, 7);
  return base ? `${base}-${suffix}` : `question-${suffix}`;
}
