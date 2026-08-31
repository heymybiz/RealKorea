import {
  getFirst24Guide,
  getNeighborhoods,
  getPlaces,
  getQuestions,
  getTips,
} from "@/lib/cms";

/**
 * Internal design previews.
 *
 * Both variants share one palette, one type pairing, and one information
 * architecture — the five-item nav from FR-070 is unchanged. What differs is how
 * much of the screen the colour owns, which is the open question.
 *
 * These routes are noindex and disallowed in robots.txt. Delete `app/design`
 * once a direction is chosen.
 */
export async function loadHomeData() {
  const [tips, eatPlaces, answeredQuestions, neighborhoods, first24] =
    await Promise.all([
      getTips({ limit: 6 }),
      getPlaces({ vertical: "eat", limit: 3 }),
      getQuestions({ answeredOnly: true, limit: 3 }),
      getNeighborhoods({ limit: 8 }),
      getFirst24Guide(),
    ]);

  return { tips, eatPlaces, answeredQuestions, neighborhoods, first24 };
}

export const VARIANTS = [
  {
    slug: "jogakbo",
    name: "Jogakbo",
    summary:
      "Maximum intensity. Whole sections are saturated colour fields and the neighborhood grid is a patchwork. Colour is the first thing you see.",
  },
  {
    slug: "saekdong",
    name: "Saekdong",
    summary:
      "Same palette, held back. Colour arrives in bands and rails against paper, so the type leads and the colour punctuates.",
  },
] as const;

export const NAV = [
  { href: "/ask", label: "Ask a Local" },
  { href: "/tips", label: "Tips" },
  { href: "/eat", label: "Eat & Drink" },
  { href: "/places", label: "Places" },
  { href: "/shop", label: "Shop" },
] as const;

/** Panel classes cycled through the jogakbo grid. Order is the stitch pattern. */
export const JOGAKBO_PANELS = [
  "panel-red",
  "panel-paper",
  "panel-blue",
  "panel-gold",
  "panel-ink",
  "panel-azure",
  "panel-paper",
  "panel-red",
] as const;
