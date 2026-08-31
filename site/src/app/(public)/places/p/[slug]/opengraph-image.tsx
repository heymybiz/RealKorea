import { getPlaceBySlug } from "@/lib/cms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Real Korea place";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  return renderOgImage({
    kicker: "Place",
    title: place?.editorialTitle ?? "Place",
    footnote: place?.sample ? "Sample — not verified yet" : undefined,
  });
}
