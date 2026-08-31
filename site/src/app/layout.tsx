import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
import { SITE_NAME, SITE_PROMISE } from "@/lib/nav";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

/**
 * PRD 04 §3 — editorial serif for display, humanist sans for body.
 * `adjustFontFallback` (on by default for Google fonts) keeps the metric
 * fallback close enough to protect CLS (NFR-002).
 */
const display = Fraunces({
  variable: "--font-display-serif",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/**
 * `metadataBase` is set only when `NEXT_PUBLIC_SITE_URL` exists. The domain is
 * still an open item (PRD 01 §11), and a guessed host is worse than none: it
 * would bake a wrong absolute URL into every canonical and OG tag.
 *
 * Without it Next.js warns and falls back to `localhost:3000` for OG image URLs,
 * which is correct behaviour for a site that has no domain yet. Set the env var
 * before the first deploy so social previews resolve.
 */
const base = siteUrl();

export const metadata: Metadata = {
  ...(base ? { metadataBase: new URL(base) } : {}),
  title: {
    default: `${SITE_NAME} — Local answers, not the brochure`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Local answers for English-speaking visitors to Seoul and the capital region. Practical questions, answered by editors who live here.",
  applicationName: SITE_NAME,
  other: { promise: SITE_PROMISE },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning={false}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
