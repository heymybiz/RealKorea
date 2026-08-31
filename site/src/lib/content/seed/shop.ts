import type { ShopProduct } from "@/lib/content/types";

import { SAMPLE_BASE } from "./shared";

/**
 * Three ShopProducts so Turn F can prove the affiliate zone is isolated from
 * editorial (FR-061) and that outbound links carry `rel="sponsored nofollow"`
 * (FR-060).
 *
 * `outboundUrl` is null on every sample. An invented affiliate URL would be
 * both a dead link and an undisclosed commercial claim, so the card renders in
 * its disabled state until a real partner link exists. `why` is the editor's
 * recommendation, which is exactly the kind of claim left to the desk.
 */
export const SEED_SHOP_PRODUCTS: readonly ShopProduct[] = (
  [
    ["korea-esim", "eSIM for Korea", "connectivity"],
    ["compact-power-adapter", "Compact power adapter", "power"],
    ["collapsible-market-tote", "Collapsible tote for markets", "bags"],
  ] as const
).map(([slug, title, category]) => ({
  ...SAMPLE_BASE,
  id: `shop-${slug}`,
  slug,
  title,
  why: "Editor recommendation pending.",
  image: null,
  outboundUrl: null,
  priceHint: null,
  category,
}));
