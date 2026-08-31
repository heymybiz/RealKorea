import type { Guide } from "@/lib/content/types";

import { PENDING_BODY, SAMPLE_BASE } from "./shared";

/**
 * The one Guide PRD 06 §0.6 requires in the code seed: First 24 hours,
 * flagged as the `/first-24-hours` alias (FR-051).
 *
 * The five checklist items are actions, not claims. There are no amounts, no
 * durations, and no "buy it here" instructions — `help` stays null until an
 * editor writes it. The ids are stable because `localStorage` keys off them
 * (PRD 03 §3.3); renumbering them would silently reset every reader's
 * progress.
 */
export const FIRST_24_CHECKLIST_ID = "first-24";

export const SEED_GUIDES: readonly Guide[] = [
  {
    ...SAMPLE_BASE,
    id: "guide-first-24-hours",
    slug: "first-24-hours-after-icn",
    title: "First 24 hours after ICN.",
    dek: "What the desk will cover: the order to sort things out on day one.",
    body: PENDING_BODY,
    tipBoxes: [],
    checklistId: FIRST_24_CHECKLIST_ID,
    checklistItems: [
      {
        id: "first-24-connectivity",
        label: "Sort out data before leaving the terminal",
        help: null,
      },
      {
        id: "first-24-maps",
        label: "Install the map app you will actually use",
        help: null,
      },
      { id: "first-24-transit", label: "Set up transit payment", help: null },
      {
        id: "first-24-messaging",
        label: "Test your messaging app",
        help: null,
      },
      { id: "first-24-cash", label: "Keep some cash on you", help: null },
    ],
    isFirst24Alias: true,
    hero: null,
  },
];
