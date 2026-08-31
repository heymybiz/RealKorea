import type { Metadata } from "next";
import Link from "next/link";

import { VerifiedMark } from "@/components/site/verified-mark";
import { FOOTER_NOTE, SITE_PROMISE } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Real Korea exists, how editors verify facts, and who answers the questions.",
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
      <h2 id={id} className="text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-4 max-w-[68ch] space-y-4 text-[17px] leading-7">
        {children}
      </div>
    </section>
  );
}

/**
 * PRD 02 §3.13 — why the site exists, how verification works, who answers,
 * donate, contact.
 *
 * The substance here comes from the PRD's own trust model, so nothing is
 * invented. The two open items from PRD 01 §11 that this page needs — a donation
 * processor and a contact address — are named as pending rather than filled with
 * a placeholder address that would bounce.
 */
export default function AboutPage() {
  return (
    <div className="content-shell py-16">
      <p className="text-crimson text-xs tracking-[0.12em] uppercase">
        About
      </p>

      <h1 className="mt-4 max-w-3xl text-[32px] leading-[1.1] font-semibold sm:text-[44px]">
        {SITE_PROMISE}
      </h1>

      <p className="text-ink-soft mt-6 max-w-2xl text-lg">
        Real Korea is a local desk for English-speaking visitors to Seoul and the
        capital region.
      </p>

      <Section title="Why this exists">
        <p>
          Tourism boards publish the official version. Forums publish volume and
          then contradict each other. Neither answers the small, slightly
          embarrassing questions you would text a friend who lives here.
        </p>
        <p>
          So that is what this is. Short, practical answers about how things
          actually work: paying for things, getting around, ordering food,
          reading a room. Not a brochure, and not a list of the fifty best
          anything.
        </p>
      </Section>

      <Section id="how-we-verify" title="How we verify">
        <p>
          Editors write and publish everything on this site. Visitors ask
          questions and leave comments, but a page is always the desk’s work, not
          a crowd’s.
        </p>
        <p>
          Facts that change — fares, hours, how a payment method behaves — carry
          the date they were last checked. When that date gets old, treat it as
          old. Neighborhoods change faster than articles do.
        </p>
        <p>
          When an editor is willing to stand behind an answer, it gets this mark:
        </p>
        <p>
          <VerifiedMark />
        </p>
        <p>
          It is not a vote count and it cannot be earned by popularity. If a page
          does not carry a checked date or that mark, it has not been verified
          yet, and it says so.
        </p>
      </Section>

      <Section title="Who answers">
        <p>
          The desk. Questions arrive through{" "}
          <Link
            href="/ask"
            className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
          >
            Ask a Local
          </Link>{" "}
          with a name and an email. The email is only used to reply and is never
          published.
        </p>
        <p>
          There are no accounts. Nothing to sign up for, no profile, no
          reputation score.
        </p>
      </Section>

      <Section title="How this is paid for">
        <p>
          Commerce lives in one place:{" "}
          <Link
            href="/shop"
            className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
          >
            Shop
          </Link>
          . Those links are affiliate links and are marked as such. Tips, guides,
          and places carry no product cards.
        </p>
        <p>
          If a place is also a commercial partner, its page shows a Partner
          badge. Read the{" "}
          <Link
            href="/legal/affiliates"
            className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
          >
            affiliate disclosure
          </Link>{" "}
          for the detail.
        </p>
        <p>There are no display ads on this site.</p>
      </Section>

      <Section id="donate" title="Donate">
        <p>
          Reader support is the cleanest way to keep the desk independent of the
          places it writes about.
        </p>
        <p className="text-ink-soft">
          A donation link is not live yet: the payment processor has not been
          chosen. This section will carry a real link rather than a placeholder
          one.
        </p>
      </Section>

      <Section title="Contact">
        <p className="text-ink-soft">
          A contact address is not published yet. Until then,{" "}
          <Link
            href="/ask"
            className="text-ink hover:text-crimson underline underline-offset-4 transition-colors duration-[180ms] ease-out"
          >
            Ask a Local
          </Link>{" "}
          reaches an editor.
        </p>
      </Section>

      <p className="border-rule text-ink-soft mt-12 border-t pt-8 text-[15px]">
        {FOOTER_NOTE}
      </p>
    </div>
  );
}
