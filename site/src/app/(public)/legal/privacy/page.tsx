import { CONTACT_EMAIL } from "@/lib/site-config";
import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Disclosures",
  description:
    "Real Korea's data privacy commitments, cookie notices, and third-party advertising disclosures under Google AdSense, PIPA, and GDPR.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Real Korea respects your personal privacy. This policy outlines how information is collected, used, and protected across our digital publication, including our cookie policies and advertising partner disclosures."
      sections={[
        {
          heading: "1. Information We Collect Directly",
          paragraphs: [
            "We do not require user account registration. You may browse all articles, guides, and tips anonymously.",
            "When you voluntarily submit a question through 'Ask a Local' or submit a comment, we collect your submitted name, email address, and message content. Your email is used solely by our editorial desk to respond to your specific inquiry and is never publicly displayed, sold, or added to marketing newsletters.",
          ],
        },
        {
          heading: "2. Google AdSense & Third-Party Advertising Cookies",
          paragraphs: [
            "Real Korea uses Google AdSense and affiliated advertising partners to serve advertisements when you visit our website.",
            "Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads based on your visit to Real Korea and/or other sites on the Internet.",
            "Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on Real Korea, which are sent directly to your browser. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by our third-party ad networks to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see.",
            "You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or through the Digital Advertising Alliance Consumer Choice tool at https://www.aboutads.info/choices.",
          ],
        },
        {
          heading: "3. Log Files, Analytics & Performance Cookies",
          paragraphs: [
            "Like standard web publishers, Real Korea utilizes server log files and Google Analytics 4 (GA4) to measure website performance, user dwell time, and regional engagement trends. Information collected includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, and date/time stamps. This data is aggregated and does not identify individual visitors.",
            "Rate-limiting mechanisms briefly process anonymized IP hashes to protect our serverless form intake APIs from automated spam bots.",
          ],
        },
        {
          heading: "4. Affiliate Marketing Disclosures",
          paragraphs: [
            "Some links on Real Korea are affiliate referral links (e.g., Klook, eSIM providers, and hotel booking engines). When you click an affiliate link, an anonymized tracking cookie is stored by the respective merchant platform to attribute ticket or service commissions. No personal identification data is transferred between Real Korea and these platforms.",
          ],
        },
        {
          heading: "5. Data Subject Rights (GDPR & Republic of Korea PIPA)",
          paragraphs: [
            "Under the European Union General Data Protection Regulation (GDPR) and the Republic of Korea Personal Information Protection Act (PIPA), you have the right to request access to, correction of, or deletion of any personal information (such as previously submitted comments or questions) held in our records.",
            `To exercise your rights or ask questions regarding our privacy practices, contact our Data Protection Officer at ${CONTACT_EMAIL} or reach the editorial desk directly at ${CONTACT_EMAIL}. Inquiries are processed within 10 business days.`,
          ],
        },
        {
          heading: "6. Updates to This Policy",
          paragraphs: [
            "This Privacy Policy is effective as of September 2026. Any future operational or legal modifications will be published directly on this page with an updated revision date.",
          ],
        },
      ]}
    />
  );
}
