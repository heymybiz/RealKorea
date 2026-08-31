import { ImageResponse } from "next/og";

/**
 * PRD 04 §7 — a crimson seal on paper. Not a Namsan tower cliché, not a taegeuk.
 * Generated so the mark stays in step with the palette tokens.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#B43A3A",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#F4EFE6",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          RK
        </div>
      </div>
    ),
    size,
  );
}
