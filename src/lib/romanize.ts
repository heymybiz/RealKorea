/**
 * Romanization rule — PRD 02 §5 and FR-071.
 *
 * First mention is `English Name (한글)`, every mention after that is English
 * only. A heading never leads with Hangul, and the Hangul is never dropped
 * from the first mention.
 */

export function firstMention(
  english: string | null,
  hangul: string | null,
): string | null {
  if (english && hangul) return `${english} (${hangul})`;
  if (english) return english;
  // Falling back to Hangul alone is a content gap, not a display choice: an
  // editor still owes us the English name.
  return hangul;
}

/** Every mention after the first. */
export function laterMention(
  english: string | null,
  hangul: string | null,
): string | null {
  return english ?? hangul;
}
