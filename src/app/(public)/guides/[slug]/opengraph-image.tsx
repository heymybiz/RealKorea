import { getGuideBySlug } from "@/lib/cms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Real Korea guide";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  return renderOgImage({
    kicker: "Long-form guide",
    title: guide?.title ?? "Guide",
    footnote: guide?.sample ? "Sample — not verified yet" : undefined,
  });
}
