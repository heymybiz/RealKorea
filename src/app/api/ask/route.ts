import { NextResponse, type NextRequest } from "next/server";

import { createQuestion, getNeighborhoodBySlug } from "@/lib/cms";
import { clientKey, consume } from "@/lib/rate-limit";
import {
  QUESTION_MAX,
  QUESTION_MIN,
  isPlausibleEmail,
  isQuestionTopic,
  NAME_MAX,
  readField,
  slugifyQuestion,
  type ErrorCode,
} from "@/lib/validation";

/**
 * FR-010, FR-012 — question intake.
 *
 * Plain POST with a redirect back to `/ask`, so the form works with JavaScript
 * disabled (NFR-010). The submitted question text is echoed back in the query
 * string on failure so nobody has to retype it; the name and email never are.
 */

/** The honeypot field. A real person never sees it, so it must arrive empty. */
const HONEYPOT_FIELD = "website";

function redirectBack(
  request: NextRequest,
  params: Record<string, string>,
): NextResponse {
  const url = new URL("/ask", request.nextUrl.origin);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.hash = "ask-the-desk";
  // 303 so the browser follows up with a GET.
  return NextResponse.redirect(url, 303);
}

function fail(
  request: NextRequest,
  code: ErrorCode,
  echo?: { question?: string; topic?: string },
): NextResponse {
  return redirectBack(request, {
    error: code,
    ...(echo?.question ? { q: echo.question } : {}),
    ...(echo?.topic ? { topic: echo.topic } : {}),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const form = await request.formData();

  const question = readField(form, "question");
  const topic = readField(form, "topic");
  const neighborhood = readField(form, "neighborhood");
  const name = readField(form, "name");
  const email = readField(form, "email");
  const honeypot = readField(form, HONEYPOT_FIELD);

  // Bots fill every field they find. Answer the same way as a rate-limit hit so
  // a script cannot tell which check caught it.
  if (honeypot.length > 0) {
    return fail(request, "spam");
  }

  if (!consume(clientKey(request.headers)).allowed) {
    return fail(request, "rate-limit", { question, topic });
  }

  if (question.length < QUESTION_MIN) {
    return fail(request, "question-short", { question, topic });
  }

  if (question.length > QUESTION_MAX) {
    return fail(request, "question-long", { question, topic });
  }

  if (!isQuestionTopic(topic)) {
    return fail(request, "topic-invalid", { question });
  }

  if (name.length === 0 || name.length > NAME_MAX) {
    return fail(request, "name-required", { question, topic });
  }

  if (email.length === 0) {
    return fail(request, "email-required", { question, topic });
  }

  if (!isPlausibleEmail(email)) {
    return fail(request, "email-invalid", { question, topic });
  }

  // An unknown neighborhood is dropped rather than stored as a dangling ref.
  const neighborhoodSlug =
    neighborhood && (await getNeighborhoodBySlug(neighborhood))
      ? neighborhood
      : null;

  await createQuestion({
    title: question,
    topic,
    neighborhoodSlug,
    askerName: name,
    askerEmail: email,
    slug: slugifyQuestion(question),
  });

  return redirectBack(request, { submitted: "1" });
}
