/**
 * Rate limiting — FR-012: three submissions per ten minutes per IP, with the
 * fourth failing politely.
 *
 * KNOWN LIMITATION: this is an in-process sliding window. On a serverless or
 * multi-instance deployment each instance keeps its own counters, so the real
 * ceiling is `limit × instances`. That is acceptable while the deployment
 * target is still open (PRD 01 §11) and the abuse surface is a pre-launch
 * editorial site.
 *
 * To harden it, replace the body of `consume` with a shared store (Upstash
 * Redis or similar). Nothing outside this file needs to change.
 */

const WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_LIMIT = 3;

const hits = new Map<string, number[]>();

/** Keeps the map from growing without bound on a long-lived server. */
function prune(now: number): void {
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((at) => now - at < WINDOW_MS);
    if (fresh.length === 0) hits.delete(key);
    else hits.set(key, fresh);
  }
}

export type RateLimitResult = {
  readonly allowed: boolean;
  readonly remaining: number;
};

export function consume(
  key: string,
  limit: number = DEFAULT_LIMIT,
): RateLimitResult {
  const now = Date.now();

  if (hits.size > 500) prune(now);

  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, remaining: limit - recent.length };
}

/**
 * Best-effort client identity.
 *
 * PRD 05 says to store an IP only if the rate limiter needs it and to rotate
 * it, so the value is hashed into an opaque bucket key and never persisted with
 * a submission. Behind no proxy the header is absent and every caller shares one
 * bucket, which fails closed rather than open.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const raw = forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "";

  if (!raw) return "unknown-client";

  let hash = 0;
  for (let index = 0; index < raw.length; index += 1) {
    hash = (hash * 31 + raw.charCodeAt(index)) | 0;
  }
  return `c${hash}`;
}
