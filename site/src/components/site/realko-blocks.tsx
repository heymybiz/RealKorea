import Image from "next/image";
import Link from "next/link";

import { COZYO_URL } from "@/lib/nav";
import { formatMonthYear } from "@/lib/format";

/**
 * Design D signature blocks. None of them invent facts: dates come from the
 * document, and anything still missing is labelled as missing.
 */

export function CheckedBadge({
  lastVerifiedAt,
  sample,
}: {
  lastVerifiedAt: string | null;
  sample: boolean;
}) {
  const date = formatMonthYear(lastVerifiedAt);
  if (sample || !date) {
    return <span className="rk-chk pending">Not yet checked by a local</span>;
  }
  return <span className="rk-chk">Checked by a local · {date}</span>;
}

/** The real human author. No name or photo exists yet, so the box says so. */
export function AuthorBox() {
  return (
    <aside className="rk-author" aria-label="About the author">
      <div className="av" aria-hidden="true">photo</div>
      <div>
        <b>Local author profile pending</b>
        <p>
          A real local who lives in Seoul checks every guide in person. Their
          name and own photo go here; we never use an AI face.
        </p>
        <Link href="/about">Who is the local →</Link>
      </div>
    </aside>
  );
}

export function KkamiTrap({ heading, children }: { heading?: string | null; children: React.ReactNode }) {
  return (
    <aside className="rk-trap" role="note">
      <div className="kimg" aria-hidden="true">
        <Image src="/brand/kkami-cutout.webp" alt="" width={64} height={60} />
      </div>
      <div>
        <p className="t">Kkami&apos;s warning · LOCAL TRAP</p>
        {heading ? <p className="h">{heading}</p> : null}
        <div className="b">{children}</div>
      </div>
    </aside>
  );
}

export type ChangeEntry = { readonly date: string; readonly text: string };

export function WhatChanged({ entries }: { entries: readonly ChangeEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section className="rk-chg" aria-labelledby="what-changed">
      <h2 id="what-changed">What changed</h2>
      <ul>
        {entries.map((entry) => (
          <li key={`${entry.date}-${entry.text}`}>
            <time dateTime={entry.date}>{entry.date}</time> {entry.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function changeLog(input: {
  lastVerifiedAt?: string | null;
  updatedAt?: string | null;
  oldUrl?: string | null;
}): ChangeEntry[] {
  const entries: ChangeEntry[] = [];
  if (input.oldUrl) {
    entries.push({ date: "2026-10-14", text: `Moved to a new address (was ${input.oldUrl}).` });
  }
  if (input.updatedAt) entries.push({ date: input.updatedAt.slice(0, 10), text: "Content updated." });
  if (input.lastVerifiedAt) entries.push({ date: input.lastVerifiedAt.slice(0, 10), text: "Checked in person by a local." });
  return entries;
}

export function CozyoBanner({ title = "Still deciding where to stay?" }: { title?: string }) {
  return (
    <aside className="rk-stay" aria-label="Where to stay">
      <div className="kimg" aria-hidden="true">
        <Image src="/brand/kkami-cutout.webp" alt="" width={72} height={67} />
      </div>
      <div className="txt">
        <span className="k">Kkami&apos;s pick for where to stay</span>
        <b>{title}</b>
        <small>Compare Seoul neighborhoods on our sister site, Cozyo.</small>
      </div>
      <a href={COZYO_URL} target="_blank" rel="noopener">
        Where to stay →
      </a>
    </aside>
  );
}

/** Empty ad slot. Stays empty until AdSense is approved. */
export function AdSlot({ placement }: { placement: string }) {
  return <div className="rk-ad" data-ad-slot={placement} aria-hidden="true">Advertisement</div>;
}

export function Breadcrumb({ trail }: { trail: readonly { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="rk-crumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        {trail.map((step) => (
          <li key={step.label}>
            {step.href ? <Link href={step.href}>{step.label}</Link> : <span aria-current="page">{step.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PhotoCredit({ children }: { children: React.ReactNode }) {
  return <p className="rk-credit">{children}</p>;
}
