import { ImageResponse } from "next/og";

/**
 * NFR-006 — an OG image per article, generated from the palette in PRD 04 §2
 * rather than from photography we do not have.
 *
 * Deliberately typographic: paper ground, ink headline, one crimson rule. No
 * stock photo, and no AI-generated "Seoul" that would misrepresent a real place.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#F4EFE6";
const INK = "#161513";
const INK_SOFT = "#5C574E";
const CRIMSON = "#B43A3A";

export function renderOgImage({
  kicker,
  title,
  footnote,
}: {
  kicker: string;
  title: string;
  footnote?: string;
}): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 28, height: 28, background: CRIMSON }} />
          <div
            style={{
              color: INK,
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Real Korea
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: CRIMSON,
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              color: INK,
              fontSize: title.length > 70 ? 56 : 68,
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ width: 120, height: 4, background: CRIMSON }} />
          <div style={{ color: INK_SOFT, fontSize: 26 }}>
            {footnote ?? "Local answers. Not the brochure."}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
