import { getFirst24Guide } from "@/lib/cms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "RealKO: your first 24 hours in Korea";

export default async function Image() {
  const guide = await getFirst24Guide();
  return renderOgImage({ kicker: "Arrival · Guide", title: guide?.title ?? "Your first 24 hours in Korea", color: "#a9d4f2" });
}
