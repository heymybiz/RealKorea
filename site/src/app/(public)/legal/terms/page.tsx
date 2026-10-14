import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal-page";
import { CONTACT_EMAIL, OPERATOR } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use & Disclaimer",
  description: "The short rules for using RealKO, and why you should confirm fares and rules with official sources.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use & Disclaimer"
      intro={`By using RealKO you agree to these short terms. RealKO is run by ${OPERATOR.name} in the Republic of Korea.`}
      sections={[
        {
          heading: "1. Disclaimer: check official sources",
          id: "disclaimer",
          paragraphs: [
            "RealKO is general travel information, not official or professional advice. Fares, card rules, opening hours, visa and entry rules change, sometimes without notice.",
            "Before you rely on anything, check the official source we link (for example the operator, airport or government page). If our page and the official page disagree, the official page wins.",
            "We are not responsible for losses caused by changed fares, schedules, closures or rules, or by third-party services you use.",
          ],
        },
        {
          heading: "2. Using the site",
          paragraphs: [
            "You may read, share links to and print our pages for personal, non-commercial use. Do not copy whole articles, scrape the site in bulk, or present our content as your own.",
            "Photos belong to their authors and are used under the licenses shown on our Image credits page.",
          ],
        },
        {
          heading: "3. What you send us",
          paragraphs: [
            "If you post a question or comment, you confirm it is yours and lawful, and you allow us to edit it for length and publish it on RealKO. Do not post other people's personal information. We may remove anything at our discretion.",
          ],
        },
        {
          heading: "4. Links, partners and ads",
          paragraphs: [
            <>Links to other sites, including our sister site Cozyo and any partner links, are provided for convenience; their own terms apply. See our <Link href="/legal/affiliates">Affiliate Disclosure</Link>.</>,
          ],
        },
        {
          heading: "5. Law and contact",
          paragraphs: [
            "These terms are governed by the laws of the Republic of Korea. Nothing here limits rights you have as a consumer under the law of your country.",
            <>Questions or corrections: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>,
          ],
        },
      ]}
    />
  );
}
