import type { Place, Question, Tip } from "@/lib/content/types";

import { SEED_GUIDES } from "./guides";
import { SEED_NEIGHBORHOODS } from "./neighborhoods";
import { SEED_PLACES } from "./places";
import { SEED_QUESTIONS } from "./questions";
import { SEED_SHOP_PRODUCTS } from "./shop";
import { SEED_TIPS } from "./tips";

/**
 * The trust model is the product (PRD 06 / 01 §6): a crimson Verified check
 * and a last-verified date mean an editor stands behind the claim. Sample
 * scaffolding must therefore never carry either one.
 *
 * This runs at module load, so a violation fails `next build` rather than
 * shipping a fake trust signal to a reader.
 */
function assertSamplesCarryNoTrustSignal(): void {
  const violations: string[] = [];

  const check = (
    id: string,
    sample: boolean,
    signals: Record<string, unknown>,
  ) => {
    if (!sample) return;

    for (const [field, value] of Object.entries(signals)) {
      if (value === true || (typeof value === "string" && value.length > 0)) {
        violations.push(`${id}: sample document sets ${field}`);
      }
    }
  };

  for (const tip of SEED_TIPS satisfies readonly Tip[]) {
    check(tip.id, tip.sample, {
      editorVerified: tip.editorVerified,
      lastVerifiedAt: tip.lastVerifiedAt,
      publishedAt: tip.publishedAt,
    });
  }

  for (const place of SEED_PLACES satisfies readonly Place[]) {
    check(place.id, place.sample, {
      lastVerifiedAt: place.lastVerifiedAt,
      publishedAt: place.publishedAt,
      isPartner: place.isPartner,
    });
  }

  for (const question of SEED_QUESTIONS satisfies readonly Question[]) {
    check(question.id, question.sample, {
      answerVerified: question.answerVerified,
      answeredAt: question.answeredAt,
      publishedAt: question.publishedAt,
    });

    for (const comment of question.comments) {
      check(question.id, question.sample, {
        [`comment ${comment.id} editorEndorsed`]: comment.editorEndorsed,
      });
    }
  }

  if (violations.length > 0) {
    throw new Error(
      `Sample content must not carry trust signals (PRD 01 §6):\n- ${violations.join("\n- ")}`,
    );
  }
}

assertSamplesCarryNoTrustSignal();

export {
  SEED_GUIDES,
  SEED_NEIGHBORHOODS,
  SEED_PLACES,
  SEED_QUESTIONS,
  SEED_SHOP_PRODUCTS,
  SEED_TIPS,
};
export { FIRST_24_CHECKLIST_ID } from "./guides";
