import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "How Real Korea makes money, where affiliate links appear, and what a Partner badge means.",
  alternates: { canonical: "/legal/affiliates" },
};

export default function AffiliatesPage() {
  return (
    <LegalPage
      title="Affiliate disclosure"
      intro="Money is kept away from the editorial, and where it exists it is labelled."
      sections={[
        {
          heading: "Where commercial links live",
          paragraphs: [
            "Affiliate links appear in Shop and nowhere else. Every card there carries an Affiliate mark, and its outbound link is tagged so search engines treat it as sponsored.",
            "Tips, guides, places, and questions carry no product cards. If the desk recommends something inside an article, there is no commission attached to it.",
          ],
        },
        {
          heading: "What a Partner badge means",
          paragraphs: [
            "A place page shows a Partner badge when there is a commercial relationship with that venue. The badge is not optional and links back to this page.",
            "A partner still gets the same fact stack as anywhere else, including whether the desk considers it a tourist trap. Paying does not buy a better verdict, and it never changes the order places are listed in.",
          ],
        },
        {
          heading: "What we will not do",
          paragraphs: [
            "No display advertising on this site.",
            "No paid placement dressed as editorial, and no sponsored content published without a label.",
          ],
        },
        {
          heading: "Still to be settled",
          paragraphs: [
            "The specific affiliate programmes and partners have not been signed, so this page names no networks yet.",
            "The exact disclosure wording still needs review against Korean advertising rules and FTC-style requirements.",
          ],
        },
      ]}
    />
  );
}
