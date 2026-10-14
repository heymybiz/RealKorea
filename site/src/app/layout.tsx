import type { Metadata, Viewport } from "next";
import { Gaegu, Nunito } from "next/font/google";

import { CookieConsent } from "@/components/site/cookie-consent";
import { GA_MEASUREMENT_ID } from "@/lib/site-config";
import { MotionProvider } from "@/components/motion-provider";
import { SITE_NAME, SITE_PROMISE } from "@/lib/nav";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";
import "./realko.css";

/** Design D: Nunito for reading, Gaegu (hand-written) for the logo and headings. */
const body = Nunito({ variable: "--font-body", subsets: ["latin"], display: "swap", weight: ["400", "700", "900"] });
const hand = Gaegu({ variable: "--font-hand", subsets: ["latin"], display: "swap", weight: ["700"] });

/**
 * `metadataBase` is set only when `NEXT_PUBLIC_SITE_URL` exists. A guessed host
 * would bake a wrong absolute URL into every canonical and OG tag.
 */
const base = siteUrl();

export const metadata: Metadata = {
  ...(base ? { metadataBase: new URL(base) } : {}),
  title: {
    default: `${SITE_NAME} · Korea travel answers checked by a real local`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Transit cards, airport runs, money, phones and neighborhoods for visitors to Korea. Every guide is checked in person by a real local, with the date shown.",
  applicationName: SITE_NAME,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  other: { promise: SITE_PROMISE },
  verification: { google: "I6nBJOTstHEiG6WLIT22GwbRmqTmTYITBNhv1eNMW_E" },
};

export const viewport: Viewport = { themeColor: "#fff8ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${hand.variable} h-full`}>
      <body className="rk-body-root flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
        <CookieConsent gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
