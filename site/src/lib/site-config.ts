/**
 * One place for site-wide identity values.
 *
 * TODO(domain): the real domain and mailbox are not chosen yet. Both values
 * below are reserved `.example` placeholders (RFC 2606), so nothing points at
 * a domain we do not own. Replace them before the first deploy, or set
 * NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_CONTACT_EMAIL.
 */
export const SITE_URL_DEFAULT = "https://realkorea.example"; // TODO(domain)
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@realkorea.example"; // TODO(domain)

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
