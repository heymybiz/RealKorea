import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Real Korea.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="What you can expect from the desk, and what the desk expects from you."
      sections={[
        {
          heading: "Who publishes what",
          paragraphs: [
            "Editors write and publish the tips, places, guides, and the official answer on a question. Visitors can ask questions and leave comments.",
            "A comment is the commenter's own view. An editor may endorse a comment, which marks it as checked, or unpublish it.",
          ],
        },
        {
          heading: "Accuracy",
          paragraphs: [
            "Details that change carry the date they were last checked. Fares, hours, and payment behaviour move faster than articles do, so confirm anything time-sensitive before you rely on it.",
            "Where the desk has not verified something, the page says so rather than guessing.",
          ],
        },
        {
          heading: "What we do not publish",
          paragraphs: [
            "No medical, legal, financial, or immigration advice. Questions asking for it are declined rather than answered, and no public page is created for them.",
            "Requests to help with anything illegal are declined.",
          ],
        },
        {
          heading: "Comments and questions you send",
          paragraphs: [
            "Keep it civil and on the subject. Editors remove abuse, spam, and anything that targets a person.",
            "By sending a question or comment you allow the desk to publish it, edit it for length and clarity, or use it as the starting point for a tip or guide.",
          ],
        },
        {
          heading: "Still to be settled",
          paragraphs: [
            "Governing law, liability, and the formal terms language have not been drafted or reviewed yet.",
          ],
        },
      ]}
    />
  );
}
