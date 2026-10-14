import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal-page";
import { AUTHOR, CONTACT_EMAIL, OPERATOR } from "@/lib/site-config";
import { SITE_PROMISE } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About RealKO",
  description: "Who runs RealKO, who Kkami is, how a local checks each guide, and how we make money.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage
      title="About RealKO"
      intro={`${SITE_PROMISE} RealKO answers the practical questions visitors to Korea get stuck on: transit cards, airport runs, money, phones and neighborhoods.`}
      sections={[
        {
          heading: "Who runs RealKO",
          paragraphs: [
            <>RealKO is an independent site run by {OPERATOR.name}, based in the {OPERATOR.country}. Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
          ],
        },
        {
          heading: `Meet ${AUTHOR.name}, our guide`,
          paragraphs: [
            <>
              <Image src={AUTHOR.avatar} alt="" width={56} height={56} className="rk-legal-av" />
              {AUTHOR.name} ({AUTHOR.nameKo}) is RealKO&apos;s guide character and the byline on our articles. {AUTHOR.name} is a character, not a person: the voice is friendly, but the facts come from official sources and from real people.
            </>,
          ],
        },
        {
          heading: "How a local checks",
          id: "how-we-check",
          paragraphs: [
            "Each guide links the official sources it relies on. A \"Checked by a local\" badge appears only when a real person has checked the page in person, and it shows who and when. Pages without that check show no badge.",
            "When something changes, the What changed box at the bottom of the page records it.",
            <>Fares and rules change, so always confirm with the official source; see our <Link href="/legal/terms#disclaimer">disclaimer</Link>.</>,
          ],
        },
        {
          heading: "How we make money",
          paragraphs: [
            <>Some links may earn a commission, and our where-to-stay banners point to our sister site Cozyo. Details: <Link href="/legal/affiliates">Affiliate Disclosure</Link>. Photos: <Link href="/legal/image-credits">Image credits</Link>.</>,
          ],
        },
      ]}
    />
  );
}
