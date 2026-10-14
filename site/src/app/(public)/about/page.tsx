import { CONTACT_EMAIL } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

import { VerifiedMark } from "@/components/site/verified-mark";
import { FOOTER_NOTE, SITE_PROMISE } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About Us & Editorial Standards",
  description:
    "Real Korea's mission, local editorial team in Seoul, strict fact-checking methodology, and E-E-A-T standards.",
  alternates: { canonical: "/about" },
};

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-rule mt-12 border-t pt-10">
      <h2 id={id} className="text-2xl font-bold text-white">
        {title}
      </h2>
      <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-7 text-stone-300">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="content-shell py-16">
      <p className="text-crimson text-xs font-semibold tracking-[0.12em] uppercase">
        About Real Korea
      </p>

      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.15] font-bold text-white sm:text-[44px]">
        {SITE_PROMISE}
      </h1>

      <p className="text-ink-soft mt-6 max-w-2xl text-lg leading-relaxed">
        Real Korea is an independent, boots-on-the-ground travel intelligence publication for international visitors to Seoul and South Korea, written and curated by local editors living here.
      </p>

      <Section title="Why Real Korea Exists">
        <p>
          Official tourism boards promote rosy marketing brochures. Travel forums drown readers in conflicting anecdotes. Generic AI aggregators spin hallucinated blogs using outdated fares, non-existent app functions, and fictional curfew rules.
        </p>
        <p>
          Real Korea was established to solve one specific problem: <strong>eliminating the institutional and physical friction foreign travelers face in South Korea</strong>. From the 40% midnight taxi surcharge and non-reloadable foreign transit kiosks to solo-dining meat minimums and Korean spatial data security laws that limit Google Maps, we explain <em>why</em> things work the way they do and provide actionable, verified protocols.
        </p>
      </Section>

      <Section id="how-we-verify" title="Boots-on-the-Ground Verification Methodology">
        <p>
          Every recommendation and figure on Real Korea passes through a three-tier verification standard:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>1st-Party Government & Municipal Domain Locking:</strong> Fares, transit schedules, and legal curfews are confirmed directly with primary administrative sources (.go.kr, Seoul Metropolitan Government, Incheon Airport Authority, KORAIL, and T-money).
          </li>
          <li>
            <strong>In-Person Physical Auditing:</strong> Editors walk subway transfer corridors, test international ATM debit cards at convenience stores, and verify restaurant seating rules anonymously.
          </li>
          <li>
            <strong>Automated Fact-Checking Linter:</strong> Our publishing pipeline runs automated scans against known historical policy changes (e.g. 2025 Seoul metro fare increases, Bukchon Hanok curfew ordinances).
          </li>
        </ol>
        <p>
          When an article has been independently vetted by our staff, it carries our editorial verification mark:
        </p>
        <div className="py-2">
          <VerifiedMark />
        </div>
        <p>
          All guides and tips display a prominent <strong>Last Verified Date</strong>. In a fast-moving city like Seoul, information older than 6 months is flagged for field re-inspection.
        </p>
      </Section>

      <Section title="Who We Are (Editorial Desk)">
        <p>
          Our team comprises bilingual Korean residents, local journalists, and long-term expatriates based in central Seoul neighborhoods (Jongno, Euljiro, Mapo, and Yongsan).
        </p>
        <p>
          We operate without algorithmic clickbait. Visitor questions submitted via{" "}
          <Link
            href="/ask"
            className="text-amber-400 underline underline-offset-4 hover:text-amber-300"
          >
            Ask a Local
          </Link>{" "}
          are routed directly to working editors who answer based on direct daily experience.
        </p>
      </Section>

      <Section title="Ethics, Independence & Monetization">
        <p>
          To maintain absolute editorial integrity:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>No Paid Reviews:</strong> We never accept sponsored restaurant meals, free hotel stays, or gifts in exchange for favorable coverage.
          </li>
          <li>
            <strong>Transparent Affiliate Disclosures:</strong> We may earn a standard referral commission when you purchase utility essentials (such as eSIMs, Klook AREX express train tickets, or capsule hotel bookings) through our links. These are governed strictly by our{" "}
            <Link
              href="/legal/affiliates"
              className="text-amber-400 underline underline-offset-4 hover:text-amber-300"
            >
              Affiliate Disclosure
            </Link>{" "}
            and marked with rel=&quot;sponsored&quot;.
          </li>
          <li>
            <strong>Advertising Disclosures:</strong> We display compliant programmatic advertisements to support our independent local reporting. For details on cookies and ad partners, please see our{" "}
            <Link
              href="/legal/privacy"
              className="text-amber-400 underline underline-offset-4 hover:text-amber-300"
            >
              Privacy Policy
            </Link>.
          </li>
        </ul>
      </Section>

      <Section title="Contact & Errata Reports">
        <p>
          If you spot a fare change, a closed business, or a newly instituted local rule, we invite you to report it immediately. Visit our dedicated{" "}
          <Link
            href="/contact"
            className="text-amber-400 underline underline-offset-4 hover:text-amber-300"
          >
            Contact & Corrections Desk
          </Link>{" "}
          or email <span className="font-mono text-amber-300">{CONTACT_EMAIL}</span>.
        </p>
      </Section>

      <p className="border-rule text-ink-soft mt-12 border-t pt-8 text-[15px]">
        {FOOTER_NOTE}
      </p>
    </div>
  );
}
