import type { Place } from "@/lib/content/types";

import { PENDING_BODY, SAMPLE_BASE } from "./shared";

/**
 * Five Places covering the mix PRD 03 §5 asks for: a market, a flea-market
 * strip, a grilled-meat area, a cafe district, and airport arrivals.
 *
 * Two deliberate restraints:
 *
 * 1. Only publicly known districts and markets are named. No individual
 *    business is named, because calling a specific restaurant a tourist trap
 *    without verification would be both unverified and unfair.
 * 2. `isTouristTrap` is `"unknown"` everywhere, and `geo`, `transitNote`,
 *    `hoursNote`, `priceBand`, and `lastVerifiedAt` are null. The v2 mockups
 *    disagree with each other on Hwanghak-dong's station and line, which is
 *    exactly why mockups are not a source of facts.
 *
 * PRD 03 §5 also wants at least two confirmed traps with a local alternative.
 * That needs an editor on the ground; see the Turn C report.
 */
type PlaceSeed = Pick<
  Place,
  "slug" | "editorialTitle" | "venueNameEn" | "venueNameKo" | "vertical"
> & {
  readonly neighborhoodSlug: string;
};

const PLACE_SEEDS: readonly PlaceSeed[] = [
  {
    slug: "gwangjang-market",
    editorialTitle: "Gwangjang Market, and how to order without pointing",
    venueNameEn: "Gwangjang Market",
    venueNameKo: "광장시장",
    vertical: "eat",
    neighborhoodSlug: "jongno",
  },
  {
    slug: "hwanghak-dong-flea-stalls",
    editorialTitle: "Hwanghak-dong flea stalls, not Myeongdong souvenirs",
    venueNameEn: "Hwanghak-dong",
    venueNameKo: "황학동",
    vertical: "shop-editorial",
    neighborhoodSlug: "euljiro",
  },
  {
    slug: "myeongdong-grilled-meat-strip",
    editorialTitle: "The Myeongdong grilled-meat strip, and what to check first",
    venueNameEn: "Myeongdong",
    venueNameKo: "명동",
    vertical: "eat",
    neighborhoodSlug: "myeongdong",
  },
  {
    slug: "seongsu-cafe-streets",
    editorialTitle: "Seongsu cafe streets, on a weekday",
    venueNameEn: "Seongsu",
    venueNameKo: "성수",
    // Cafes belong to Eat & Drink, so this sits in the `/eat` grid.
    vertical: "eat",
    neighborhoodSlug: "seongsu",
  },
  {
    slug: "icn-arrivals-floor",
    editorialTitle: "The ICN arrivals floor, in the order you will need it",
    venueNameEn: "Incheon International Airport",
    venueNameKo: "인천국제공항",
    vertical: "other",
    neighborhoodSlug: "icn-songdo",
  },
];

export const SEED_PLACES: readonly Place[] = PLACE_SEEDS.map((seed) => ({
  ...SAMPLE_BASE,
  id: `place-${seed.slug}`,
  slug: seed.slug,
  editorialTitle: seed.editorialTitle,
  venueNameEn: seed.venueNameEn,
  venueNameKo: seed.venueNameKo,
  vertical: seed.vertical,
  neighborhoodSlug: seed.neighborhoodSlug,
  transitNote: null,
  whyLocal: null,
  isTouristTrap: "unknown",
  touristTrapNote: null,
  localAlternative: null,
  priceBand: null,
  acceptsCards: "unknown",
  englishOk: null,
  reservation: null,
  hoursNote: null,
  lastVerifiedAt: null,
  geo: null,
  body: PENDING_BODY,
  tipBoxes: [],
  isPartner: false,
  partnerDisclosure: null,
  photos: [],
}));
