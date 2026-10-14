import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal-page";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact & Corrections",
  description: "How to reach RealKO for questions, corrections, privacy requests and partnerships.",
  alternates: { canonical: "/contact" },
};

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact & Corrections"
      intro="One inbox handles everything."
      sections={[
        { heading: "Email", paragraphs: [mail] },
        {
          heading: "Spotted a changed fare or rule?",
          paragraphs: ["Tell us the page, what changed and, if you can, the official link. We check it and log the fix in the page's What changed box."],
        },
        {
          heading: "Travel questions",
          paragraphs: [<>Use <Link href="/ask">Ask a Local</Link> so the answer can help other visitors too.</>],
        },
        {
          heading: "Privacy requests",
          paragraphs: [<>To access, correct or delete your data, email {mail}. See the <Link href="/legal/privacy">Privacy Policy</Link>.</>],
        },
      ]}
    />
  );
}
