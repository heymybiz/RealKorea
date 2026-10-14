import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { AUTHOR } from "@/lib/site-config";

/**
 * Design D OG card: cream ground, RealKO wordmark, the article title and Kkami.
 * Typographic on purpose: no stock photo, no AI picture of a real place.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const BG = "#FFF8EE";
const INK = "#3B2F2A";
const MUTE = "#6F6158";
const ACC = "#B8452F";

let kkami: string | null = null;
function kkamiDataUrl(): string | null {
  if (kkami !== null) return kkami || null;
  try {
    const buf = readFileSync(join(process.cwd(), "public/brand/kkami-og.png"));
    kkami = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    kkami = "";
  }
  return kkami || null;
}

export function renderOgImage({
  kicker,
  title,
  color = "#9fdcc4",
  footnote,
}: {
  kicker: string;
  title: string;
  color?: string;
  footnote?: string;
}): ImageResponse {
  const art = kkamiDataUrl();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, padding: 56 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#ffffff",
            borderRadius: 40,
            padding: "48px 56px",
            borderBottom: `14px solid ${color}`,
          }}
        >
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: INK }}>
            Real<span style={{ color: ACC }}>KO</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: art ? 760 : 1000 }}>
            <div style={{ color: ACC, fontSize: 26, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              {kicker}
            </div>
            <div style={{ color: INK, fontSize: title.length > 70 ? 50 : 62, lineHeight: 1.12, fontWeight: 800 }}>
              {title}
            </div>
          </div>
          <div style={{ display: "flex", color: MUTE, fontSize: 24 }}>
            {footnote ?? `by ${AUTHOR.name} · Korea travel answers from a local`}
          </div>
        </div>
        {art ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={art} width={300} height={280} style={{ position: "absolute", right: 70, bottom: 70 }} />
        ) : null}
      </div>
    ),
    OG_SIZE,
  );
}
