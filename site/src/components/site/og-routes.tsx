import { getGuideBySlug, getTipBySlug } from "@/lib/cms";
import { sectionById, type ArticleSectionId } from "@/lib/ia";
import { renderOgImage } from "@/lib/og-image";

/** Shared OG renderer for tip and guide articles in every section. */
export async function articleOgImage(sectionId: ArticleSectionId, slug: string) {
  const section = sectionById(sectionId);
  const tip = await getTipBySlug(slug);
  if (tip) return renderOgImage({ kicker: section.label, title: tip.title, color: section.color });
  const guide = await getGuideBySlug(slug);
  return renderOgImage({ kicker: `${section.label} · Guide`, title: guide?.title ?? section.label, color: section.color });
}
