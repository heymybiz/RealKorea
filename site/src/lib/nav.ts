/**
 * Global navigation for design D (user-confirmed 2026-10-14).
 * Six sections, in this order. The list itself lives in `ia-map.json`.
 */
import { SECTIONS } from "@/lib/ia";

export type NavItem = {
  readonly href: string;
  readonly label: string;
};

export const PRIMARY_NAV = SECTIONS;

/** Footer: help and trust links. */
export const ARRIVE_NAV: readonly NavItem[] = [
  { href: "/arrival/first-24-hours", label: "First 24 hours" },
  { href: "/about#how-we-check", label: "How a local checks" },
  { href: "/about", label: "Who is the local" },
  { href: "/contact", label: "Contact & corrections" },
] as const;

/** Footer: legal and compliance links for AdSense. */
export const LEGAL_NAV: readonly NavItem[] = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Use" },
  { href: "/legal/terms#disclaimer", label: "Disclaimer" },
  { href: "/legal/affiliates", label: "Affiliate Disclosure" },
  { href: "/legal/image-credits", label: "Image credits" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SITE_NAME = "RealKO";
export const SITE_PROMISE = "Local answers, checked by a real local.";
export const FOOTER_NOTE =
  "Kkami is our guide voice. Every fact is checked in person by a real local, with the date shown.";
export const COZYO_URL = "https://cozyo-seoul.web.app";
