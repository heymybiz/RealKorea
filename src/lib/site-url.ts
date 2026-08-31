/**
 * The domain is still an open item (PRD 01 §11), so there is no hardcoded host
 * anywhere in the app. `NEXT_PUBLIC_SITE_URL` fills it in once it is chosen.
 *
 * Until then `sitemap.xml` and `robots.txt` emit path-relative URLs. Search
 * engines want absolute URLs in a sitemap, so shipping one built on a guessed
 * host would be worse than shipping one that is obviously unfinished: a wrong
 * canonical host is expensive to unwind.
 */
export function siteUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const base = siteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

export function hasSiteUrl(): boolean {
  return siteUrl() !== null;
}
