/**
 * Global navigation, PRD 02 §2 and FR-070.
 *
 * The order is fixed by the founder decision: Ask a Local → Tips →
 * Eat & Drink → Places → Shop. Do not reorder, extend, or add a language
 * switcher, an avatar, or a sign-in entry.
 */

export type NavItem = {
  readonly href: string;
  readonly label: string;
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: "/ask", label: "Ask a Local" },
  { href: "/tips", label: "Tips" },
  { href: "/eat", label: "Eat & Drink" },
  { href: "/places", label: "Places" },
  { href: "/shop", label: "Shop" },
] as const;

/** PRD 02 §2 — mobile drawer carries the five items plus these utilities. */
export const MOBILE_UTILITY_NAV: readonly NavItem[] = [
  { href: "/search", label: "Search" },
  { href: "/first-24-hours", label: "First 24 hours" },
  { href: "/about", label: "About" },
] as const;

/** PRD 02 §2 — footer column 3. */
export const ARRIVE_NAV: readonly NavItem[] = [
  { href: "/first-24-hours", label: "First 24 hours" },
  { href: "/about#how-we-verify", label: "How we verify" },
  { href: "/about", label: "About" },
] as const;

/** PRD 02 §2 — footer column 4. Donate target is undecided (PRD 01 §11). */
export const LEGAL_NAV: readonly NavItem[] = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/affiliates", label: "Affiliates" },
  { href: "/about#donate", label: "Donate" },
] as const;

export const SITE_NAME = "Real Korea";
export const SITE_PROMISE = "Local answers. Not the brochure.";
export const FOOTER_NOTE =
  "Editors live in Seoul. Facts are verified; neighborhoods change.";
