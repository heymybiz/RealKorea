import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Real Korea collects when you ask a question or leave a comment, why, and how it is handled.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="There are no accounts here, so there is very little to collect."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you ask a question or leave a comment, we collect the name you type, your email address, and what you wrote. Nothing else is requested.",
            "There is no sign-up, no profile, and no tracking of you across other sites.",
          ],
        },
        {
          heading: "Why we collect it",
          paragraphs: [
            "The name appears with your question or comment, because a reader should know who asked.",
            "The email exists so an editor can reply to you about what you asked. It is never published on the site, never included in structured data for search engines, and is not used for marketing.",
          ],
        },
        {
          heading: "Spam protection",
          paragraphs: [
            "Submissions are rate limited. To do that, the server briefly derives an opaque key from your connection so it can count recent submissions. It is not stored alongside your question.",
          ],
        },
        {
          heading: "Advertising and cookies",
          paragraphs: [
            "There are no display ads and no advertising cookies on this site.",
          ],
        },
        {
          heading: "Retention and your requests",
          paragraphs: [
            "The retention period and the process for correcting or deleting what you sent still need to be set and stated here, with Korean PIPA and GDPR expectations in mind.",
            "A contact route for those requests will be published with the final text.",
          ],
        },
      ]}
    />
  );
}
