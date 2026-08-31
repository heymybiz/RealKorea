import { getTipBySlug } from "@/lib/cms";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Real Korea tip";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tip = await getTipBySlug(slug);

  return renderOgImage({
    kicker: tip ? tip.topic : "Tip",
    title: tip?.title ?? "Tip",
    footnote: tip?.sample ? "Sample — not verified yet" : undefined,
  });
}
