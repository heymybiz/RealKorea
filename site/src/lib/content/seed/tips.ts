import type { Tip, TipTopic } from "@/lib/content/types";

import { PENDING_BODY, SAMPLE_BASE } from "./shared";

/**
 * Eight of the sixteen launch Tips from PRD 03 §5. Titles are taken from the
 * PRD, not invented here.
 *
 * Every field that would carry a verifiable claim is empty:
 * - `lastVerifiedAt` is null, so no page can show a verification date
 * - `editorVerified` is false, so no page can show the Verified mark
 * - `tipBoxes` is empty rather than holding invented advice
 *
 * The dek states what the finished Tip will answer. It deliberately does not
 * contain the answer.
 */
type TipSeed = {
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly topic: TipTopic;
  readonly neighborhoodSlugs?: readonly string[];
};

const TIP_SEEDS: readonly TipSeed[] = [
  {
    slug: "tap-water-in-seoul",
    title: "Tap water in Seoul apartments and restaurants",
    dek: "What the desk will cover: whether to drink it, and where the answer changes.",
    topic: "survival",
  },
  {
    slug: "t-money-vs-foreign-visa",
    title: "T-money vs tapping a foreign Visa",
    dek: "What the desk will cover: which card to reach for, and when the other one fails.",
    topic: "money",
  },
  {
    slug: "where-mobile-pay-dies",
    title: "Apple Pay and Google Pay: where it dies",
    dek: "What the desk will cover: the places that still refuse a phone.",
    topic: "money",
  },
  {
    slug: "which-map-app-before-you-land",
    title: "Naver Map vs Kakao vs Google, before you land",
    dek: "What the desk will cover: which app to install first, and why one of them struggles underground.",
    topic: "transit",
  },
  {
    slug: "esim-vs-sim-at-icn",
    title: "eSIM vs physical SIM at ICN",
    dek: "What the desk will cover: how to decide before you reach the arrivals hall.",
    topic: "arrival",
  },
  {
    slug: "getting-home-after-midnight",
    title: "Kakao T vs Uber vs metro after midnight",
    dek: "What the desk will cover: the options once the subway stops, and how to pick.",
    topic: "transit",
  },
  {
    slug: "table-for-one",
    title: "Table for one: why you got waved off",
    dek: "What the desk will cover: what that gesture usually means, and what to do next.",
    topic: "etiquette",
    neighborhoodSlugs: ["myeongdong", "hongdae-yeonnam"],
  },
  {
    slug: "pharmacy-hours-and-the-sign",
    title: "Pharmacy hours and the red-cross sign",
    dek: "What the desk will cover: how to find one late, and what the signage means.",
    topic: "survival",
    neighborhoodSlugs: ["hongdae-yeonnam"],
  },
];

export const SEED_TIPS: readonly Tip[] = TIP_SEEDS.map((seed) => ({
  ...SAMPLE_BASE,
  id: `tip-${seed.slug}`,
  slug: seed.slug,
  title: seed.title,
  dek: seed.dek,
  topic: seed.topic,
  neighborhoodSlugs: seed.neighborhoodSlugs ?? [],
  body: PENDING_BODY,
  tipBoxes: [],
  lastVerifiedAt: null,
  editorVerified: false,
  relatedQuestionSlugs: [],
  relatedPlaceSlugs: [],
  promotedFromQuestionSlug: null,
  image: null,
}));
