/**
 * PRD 02 §6 — the canonical suggested queries. FR-015 requires these exact
 * strings on the Home search overlay and on `/ask`. Do not reword them.
 */
export const SEARCH_SEEDS: readonly string[] = [
  "Can I drink tap water in Seoul?",
  "Apple Pay on a Seoul bus",
  "eSIM vs SIM at ICN",
  "Naver Map vs Google Maps",
  "Tourist-trap Korean BBQ",
  "Late-night pharmacy in Hongdae",
  "Table for one refused",
  "T-money vs just tapping a Visa",
  "Kakao T vs Uber",
] as const;
