import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal-page";
import { CookieSettingsButton } from "@/components/site/cookie-consent";
import { CONTACT_EMAIL, GA_RETENTION_MONTHS, OPERATOR } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What RealKO collects, why, how long it is kept, who processes it, and your rights under Korea's PIPA and the EU/UK GDPR.",
  alternates: { canonical: "/legal/privacy" },
};

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what personal information RealKO processes, why, for how long, who helps us process it, and how you can use your rights. It is written to meet the Korean Personal Information Protection Act (PIPA) and the EU and UK General Data Protection Regulation (GDPR)."
      sections={[
        {
          heading: "1. Who is responsible",
          paragraphs: [
            <>RealKO is run by {OPERATOR.name} ({OPERATOR.country}), who is the data controller under the GDPR and the personal information manager under PIPA. Privacy officer: {OPERATOR.name}, {mail}.</>,
          ],
        },
        {
          heading: "2. What we collect and why",
          paragraphs: [
            "You can read everything on RealKO without an account.",
            "Messages you send us (for example an Ask a Local question, a comment or an email): your name or nickname, email address and message. We use them only to answer you and, for questions and comments you choose to publish, to show them on the site. Legal basis: your consent and our legitimate interest in answering readers (GDPR Art. 6(1)(a) and (f); PIPA Art. 15(1)).",
            `Analytics (only if you click "Accept"): Google Analytics 4 collects pseudonymous usage data such as pages viewed, approximate location derived from your IP address, device and browser type, referrer and visit times. We use it to learn which guides help people. Legal basis: your consent (GDPR Art. 6(1)(a); PIPA Art. 15(1)(1)). GA4 does not store full IP addresses.`,
            "Security logs: our host keeps short-lived technical logs (IP address, request time, URL) to keep the site running and to stop spam and abuse. Legal basis: legitimate interest (GDPR Art. 6(1)(f)).",
            "We do not sell personal information, we do not build advertising profiles, and we do not knowingly collect information from children under 14.",
          ],
        },
        {
          heading: "3. Cookies and consent",
          id: "cookies",
          paragraphs: [
            "Strictly necessary storage: we save your cookie choice in your browser's local storage (key rk-consent) so we do not ask again. This needs no consent.",
            "Analytics cookies (_ga, _ga_*): set only after you click Accept. Before that, Google Consent Mode runs with every storage type set to denied and the Google Analytics script is not loaded at all.",
            "Advertising cookies: we do not run ads today. If we add Google AdSense later, we will update this page and ask for consent first where the law requires it.",
            <>You can change your choice at any time: <CookieSettingsButton />. You can also delete cookies in your browser settings.</>,
          ],
        },
        {
          heading: "4. How long we keep it",
          paragraphs: [
            `Google Analytics data: ${GA_RETENTION_MONTHS} months, then Google deletes it automatically.`,
            "Messages, questions and comments: until the matter is resolved, and at most 3 years, unless they are published at your request; published items stay until you ask us to remove them.",
            "Host security logs: kept by the processor for its standard short period (typically up to 30 days).",
            "When a retention period ends, we delete the data without delay so it cannot be restored (PIPA Art. 21).",
          ],
        },
        {
          heading: "5. Processors and transfers abroad",
          paragraphs: [
            "We use these service providers, who process data only on our instructions:",
            "Google LLC / Google Ireland Ltd – Google Analytics 4 (analytics, only with consent).",
            "Google LLC – Firebase Hosting and App Hosting / Google Cloud (hosting, logs, security).",
            "Sanity Inc. – content database, where submitted questions and comments are stored.",
            "These providers may store data in the United States and other countries. Transfer method: over the internet when you use the site. Safeguards: the providers' data processing terms and the European Commission's Standard Contractual Clauses or the EU–US Data Privacy Framework, as applicable. Under PIPA Art. 28-8 you may refuse the transfer by not consenting to analytics and by not sending us messages; the site stays fully usable.",
          ],
        },
        {
          heading: "6. Your rights",
          paragraphs: [
            "You can ask to access, correct, delete or stop the processing of your personal information, withdraw consent at any time, and, under the GDPR, object, restrict processing and receive your data in a portable format.",
            <>Email {mail}. We reply within 10 days (PIPA) and in any case within one month (GDPR). We may ask you to confirm it is your data.</>,
            "You may complain to the Personal Information Protection Commission of Korea (privacy.go.kr, call 182) or the Korea Internet & Security Agency privacy center (privacy.kisa.or.kr, call 118), or, in the EU/UK, to your local data protection authority.",
          ],
        },
        {
          heading: "7. Security",
          paragraphs: [
            "Traffic is encrypted with HTTPS, admin areas need a secret password, and access to stored messages is limited to the operator.",
          ],
        },
        {
          heading: "8. Changes",
          paragraphs: [
            <>If this policy changes, we update the date above and describe the change here. See also our <Link href="/legal/terms">Terms of Use</Link> and <Link href="/legal/affiliates">Affiliate Disclosure</Link>.</>,
          ],
        },
      ]}
    />
  );
}
