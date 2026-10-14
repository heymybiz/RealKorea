import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How RealKO may earn money from links, and how that is kept separate from what we recommend.",
  alternates: { canonical: "/legal/affiliates" },
};

export default function AffiliatesPage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      intro="Some links on RealKO may earn us a commission or benefit a related business, at no extra cost to you. Here is exactly how that works."
      sections={[
        {
          heading: "1. What counts as a partner link",
          paragraphs: [
            "Affiliate links: if we link to a booking, eSIM, ticket or similar service and you buy through it, the seller may pay us a small commission. These links are marked rel=\"sponsored\".",
            `Cozyo: our "where to stay" banners link to Cozyo, a sister site run by the same team. We may benefit if you use it.`,
            "Ads: we do not show ads today. Ad spaces, if added later, will be labelled \"Advertisement\".",
          ],
        },
        {
          heading: "2. How we keep it honest",
          paragraphs: [
            "Partners never pay for a recommendation, a ranking or a removed warning. If a free option is better (for example a public bus or a city card), we say so.",
            "Every article that can contain partner links carries a short notice at the top, and partner banners carry a notice next to the link.",
            "This disclosure follows the Korea Fair Trade Commission guidelines on endorsements and advertising and the US FTC Endorsement Guides.",
          ],
        },
        {
          heading: "3. Questions",
          paragraphs: [<>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>],
        },
      ]}
    />
  );
}
