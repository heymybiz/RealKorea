import { articleOgImage } from "@/components/site/og-routes";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "RealKO guide";

export default async function Image({ params }: { params: Promise<{ hub: string; slug: string }> }) {
  const { slug } = await params;
  return articleOgImage("money-phone", slug);
}
