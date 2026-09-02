import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions of use for Real Korea travel intelligence publication.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="Please review these Terms of Service before using Real Korea. By accessing our articles, guides, and tools, you agree to be bound by the following conditions."
      sections={[
        {
          heading: "1. Editorial Nature of Service",
          paragraphs: [
            "Real Korea operates as an independent digital travel publication providing informational, cultural, and logistical analysis of Seoul and South Korea.",
            "All content is published for general educational and informational purposes only. We do not provide legal, financial, medical, immigration, or consular advisory services. You must verify visa and entry requirements with official government authorities.",
          ],
        },
        {
          heading: "2. Accuracy and Time-Sensitivity of Ground Information",
          paragraphs: [
            "While our editorial desk diligently cross-checks transit timetables, fare structures, and municipal ordinances against primary Korean government sources (.go.kr), real-world conditions (such as late-night taxi surcharges, subway maintenance closures, or merchant operating hours) may change without notice.",
            "Each article features a 'Last Verified' date. Real Korea assumes no legal or financial liability for missed flights, transit fines, currency loss, or itinerary disruptions resulting from third-party operational adjustments.",
          ],
        },
        {
          heading: "3. Intellectual Property Rights",
          paragraphs: [
            "All original articles, editorial formatting, proprietary infographics, and code on Real Korea are the intellectual property of Real Korea and protected under the Copyright Act of the Republic of Korea and international copyright treaties.",
            "You may not scrape, republish, redistribute, or commercially exploit full text articles without prior written authorization from desk@realkorea.com. Brief citations with direct attribution and backlinks are permitted.",
          ],
        },
        {
          heading: "4. User Submissions and Comments",
          paragraphs: [
            "When you submit questions or comments via 'Ask a Local', you grant Real Korea a non-exclusive, royalty-free, perpetual license to publish, excerpt, and edit your submission for clarity and conciseness.",
            "Submissions containing hate speech, harassment, commercial spam, defamation, or illegal solicitations will be removed immediately by moderators.",
          ],
        },
        {
          heading: "5. Disclaimer of Warranties and Limitation of Liability",
          paragraphs: [
            "The website and all content are provided on an 'as is' and 'as available' basis without warranties of any kind, whether express or implied. Real Korea disclaims all warranties, including but not limited to merchantability, fitness for a particular travel purpose, and non-infringement.",
            "To the maximum extent permitted by applicable law, Real Korea and its editorial staff shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your access to or reliance upon our content.",
          ],
        },
        {
          heading: "6. Governing Law and Jurisdiction",
          paragraphs: [
            "These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea, without regard to its conflict of law principles.",
            "Any legal action or proceeding arising out of or related to these Terms or the website shall be instituted exclusively in the competent courts of Seoul, Republic of Korea.",
          ],
        },
      ]}
    />
  );
}
