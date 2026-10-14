import { NextResponse, type NextRequest } from "next/server";

import { commentTargetExists, createComment } from "@/lib/cms";
import type { CommentTargetType } from "@/lib/content/types";
import { clientKey, consume } from "@/lib/rate-limit";
import {
  COMMENT_MAX,
  COMMENT_MIN,
  isPlausibleEmail,
  NAME_MAX,
  readField,
  type ErrorCode,
} from "@/lib/validation";
import { placeHref, tipHref, guideHref } from "@/lib/ia";

/**
 * FR-020 — comment intake for Question, Tip, Place, and Guide.
 *
 * Same shape as `/api/ask`: plain POST, redirect back to the page the comment
 * belongs to (NFR-010). The email is stored for the editor and never returned
 * to the browser (FR-011).
 */

const HONEYPOT_FIELD = "website";

const TARGET_PATH: Record<CommentTargetType, (slug: string) => string> = {
  question: (slug) => `/ask/${slug}`,
  tip: (slug) => tipHref(slug),
  place: (slug) => placeHref(slug),
  guide: (slug) => guideHref(slug),
};

function isTargetType(value: string): value is CommentTargetType {
  return value in TARGET_PATH;
}

function redirectTo(
  request: NextRequest,
  path: string,
  params: Record<string, string>,
): NextResponse {
  const url = new URL(path, request.nextUrl.origin);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.hash = "comments";
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const form = await request.formData();

  const targetType = readField(form, "targetType");
  const targetSlug = readField(form, "targetSlug");
  const name = readField(form, "name");
  const email = readField(form, "email");
  const body = readField(form, "body");
  const honeypot = readField(form, HONEYPOT_FIELD);

  if (!isTargetType(targetType) || targetSlug.length === 0) {
    // Nowhere trustworthy to redirect, so answer directly.
    return NextResponse.json({ error: "target-invalid" }, { status: 400 });
  }

  const path = TARGET_PATH[targetType](targetSlug);

  const fail = (code: ErrorCode) =>
    redirectTo(request, path, { commentError: code });

  if (honeypot.length > 0) return fail("spam");

  if (!consume(clientKey(request.headers)).allowed) {
    return fail("rate-limit");
  }

  if (!(await commentTargetExists({ type: targetType, slug: targetSlug }))) {
    return fail("target-invalid");
  }

  if (name.length === 0 || name.length > NAME_MAX) {
    return fail("name-required");
  }

  if (email.length === 0) return fail("email-required");
  if (!isPlausibleEmail(email)) return fail("email-invalid");
  if (body.length < COMMENT_MIN) return fail("body-short");
  if (body.length > COMMENT_MAX) return fail("body-long");

  await createComment({
    target: { type: targetType, slug: targetSlug },
    name,
    email,
    body,
  });

  return redirectTo(request, path, { commented: "1" });
}
