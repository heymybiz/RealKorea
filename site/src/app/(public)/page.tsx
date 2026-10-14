import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AdSlot, AuthorBox, CheckedBadge, CozyoBanner, PhotoCredit } from "@/components/site/realko-blocks";
import { getQuestions, getTips } from "@/lib/cms";
import { IA_CHANGED_ON, questionHref, SECTIONS, tipHref } from "@/lib/ia";
import { formatFullDate } from "@/lib/format";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** "Pick your problem" tiles, in the content priority order of business plan v2. */
const PROBLEMS = [
  { href: "/getting-around/transit-cards", label: "Which transit card?", sec: "getting-around" },
  { href: "/getting-around/airport-late-night", label: "Airport & late-night rides", sec: "getting-around" },
  { href: "/money-phone/payments-atm", label: "Cards, cash & ATMs", sec: "money-phone" },
  { href: "/arrival/first-24-hours", label: "My first 24 hours", sec: "arrival" },
  { href: "/getting-around/taxi-apps", label: "Taxis & map apps", sec: "getting-around" },
  { href: "/getting-around/subway-bus", label: "Subway & bus", sec: "getting-around" },
  { href: "/neighborhoods#day-trips", label: "Day trips from Seoul", sec: "neighborhoods" },
  { href: "/ask", label: "Ask a local", sec: "ask" },
] as const;

const color = (id: string) => SECTIONS.find((s) => s.id === id)?.color ?? "#f0e2d0";

export default async function HomePage() {
  const [tips, questions] = await Promise.all([getTips(), getQuestions()]);
  const latest = [...tips]
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 3);
  const recentlyChecked = tips.filter((tip) => tip.checkedBy && tip.checkedAt);

  return (
    <div className="rk-w rk-page">
      <section className="rk-hero" aria-labelledby="hero-title">
        <div className="rk-hero-copy">
          <p className="rk-hand">Hi, I&apos;m Kkami — your guide.</p>
          <h1 id="hero-title">Korea travel answers, checked by a real local.</h1>
          <p className="rk-dek">
            Checked in person, dated on the page, updated when it changes. Kkami keeps you company; a real
            local who lives in Seoul checks the facts.
          </p>
          <div className="rk-hero-cta">
            <Link href="/getting-around" className="rk-btn">Start with getting around</Link>
            <Link href="/ask" className="rk-btn ghost">Ask a local</Link>
          </div>
        </div>
        <div className="rk-hero-art" aria-hidden="true">
          <Image src="/brand/kkami-cutout.webp" alt="" width={300} height={280} priority sizes="300px" />
        </div>
      </section>

      <section aria-labelledby="problems" className="rk-hubsec">
        <h2 id="problems" className="rk-hand-h">What are you stuck on?</h2>
        <ul className="rk-problems">
          {PROBLEMS.map((problem) => (
            <li key={problem.href} style={{ "--c": color(problem.sec) } as React.CSSProperties}>
              <Link href={problem.href}>{problem.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="latest" className="rk-hubsec">
        <div className="rk-sechead">
          <h2 id="latest">Latest guides</h2>
          <Link href="/getting-around">All guides →</Link>
        </div>
        <div className="rk-latest">
          <figure className="rk-band">
            <Image src="/photos/subway.webp" alt="Platform of Gimpo Airport station on Seoul Subway Line 5" width={1200} height={900} sizes="(max-width: 900px) 100vw, 420px" />
            <PhotoCredit>
              Photo: LERK, <a href="https://commons.wikimedia.org/wiki/File:Seoul-Metropolitan-Rapid-Transit-5-gimpo-station-platform.jpg">Wikimedia Commons</a>, CC BY 2.5
            </PhotoCredit>
          </figure>
          <ul className="rk-cards one">
            {latest.map((tip) => (
              <li key={tip.id} className="rk-card">
                <h3><Link href={tipHref(tip.slug)}>{tip.title}</Link></h3>
                {tip.dek ? <p>{tip.dek}</p> : null}
                <CheckedBadge checkedBy={tip.checkedBy} checkedAt={tip.checkedAt} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AdSlot placement="home-feed" />

      <div className="rk-two">
        <section className="rk-chg" aria-labelledby="home-changes">
          <h2 id="home-changes">What changed</h2>
          <ul>
            <li><time dateTime={IA_CHANGED_ON}>{IA_CHANGED_ON}</time> New site layout. Old links redirect to the new addresses.</li>
            {recentlyChecked.map((tip) => (
              <li key={tip.id}>
                <time dateTime={tip.checkedAt ?? undefined}>{formatFullDate(tip.checkedAt ?? null)}</time>{" "}
                Checked: <Link href={tipHref(tip.slug)}>{tip.title}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rk-askbox" aria-labelledby="home-ask">
          <h2 id="home-ask">Ask a Local</h2>
          <ul>
            {questions.slice(0, 4).map((q) => (
              <li key={q.id}><Link href={questionHref(q.slug)}>{q.title}</Link></li>
            ))}
          </ul>
          <Link href="/ask" className="rk-ask">Ask your question</Link>
        </section>
      </div>

      <figure className="rk-band">
        <Image src="/photos/airport.webp" alt="Arrival hall of Incheon International Airport Terminal 1" width={1200} height={900} sizes="(max-width: 900px) 100vw, 900px" />
        <PhotoCredit>
          Photo: ノボホショコロトソ, <a href="https://commons.wikimedia.org/wiki/File:Incheon_International_Airport_Terminal_1_Arrival_2.jpg">Wikimedia Commons</a>, CC BY 4.0
        </PhotoCredit>
      </figure>

      <CozyoBanner />
      <AuthorBox />
    </div>
  );
}
