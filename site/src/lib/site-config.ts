/**
 * One place for site-wide identity values.
 * The site runs on the Firebase default host until a custom domain is chosen.
 */
export const SITE_URL_DEFAULT = "https://realkorea-travel-13da4.web.app";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "heymybiz@gmail.com";

/** The person legally responsible for the site (PIPA privacy officer / GDPR controller). */
export const OPERATOR = {
  name: "Woo Jae Hyun",
  country: "Republic of Korea",
  email: CONTACT_EMAIL,
} as const;

/** GA4 measurement ID. Empty means analytics never loads, even after consent. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || "";
export const GA_RETENTION_MONTHS = 14;
export const LEGAL_UPDATED = "2026-10-14";

/**
 * The byline. Kkami is RealKO's personified author (a character, not a person).
 * Change the name here and every author box, OG image and JSON-LD follows.
 */
export const AUTHOR = {
  name: "Kkami",
  nameKo: "까미",
  role: "RealKO guide",
  bio: "Kkami is RealKO's guide character. Kkami writes in a friendly local voice; facts get a \"Checked by a local\" badge only after a real person checks them in person.",
  avatar: "/brand/kkami-avatar.webp",
} as const;
