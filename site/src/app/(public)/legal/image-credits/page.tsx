import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Author, license and source for every photo on RealKO.",
  alternates: { canonical: "/legal/image-credits" },
};

/** Built from content/image-credits.md (copied from docs/image-credits.md by `npm run credits`). */
function inline(text: string): React.ReactNode[] {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part.includes("commons.wikimedia.org") ? "Wikimedia Commons" : "source"}</a>
    ) : (
      part.replace(/`/g, "")
    ),
  );
}

type Block = { kind: "h"; text: string } | { kind: "p"; text: string } | { kind: "t"; rows: string[][] };

function parse(md: string): Block[] {
  const blocks: Block[] = [];
  let table: string[][] | null = null;
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (line.startsWith("|")) {
      const cells = line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
      if (!table) { table = []; blocks.push({ kind: "t", rows: table }); }
      table.push(cells);
      continue;
    }
    table = null;
    if (!line || line.startsWith("# ")) continue;
    if (line.startsWith("#")) blocks.push({ kind: "h", text: line.replace(/^#+\s*/, "") });
    else blocks.push({ kind: "p", text: line.replace(/^[-*]\s+/, "") });
  }
  return blocks;
}

export default function ImageCreditsPage() {
  const md = readFileSync(join(process.cwd(), "content/image-credits.md"), "utf8");
  const blocks = parse(md);
  return (
    <LegalPage
      title="Image credits"
      intro="Every photo on RealKO is free-licensed (CC0, public domain or Creative Commons) or our own. Here is the author, license and source for each one."
    >
      {blocks.map((b, i) =>
        b.kind === "h" ? (
          <h2 key={i} className="rk-legal-h">{b.text}</h2>
        ) : b.kind === "p" ? (
          <p key={i}>{inline(b.text)}</p>
        ) : (
          <div key={i} className="rk-table-wrap">
            <table className="rk-table">
              <thead><tr>{b.rows[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
              <tbody>
                {b.rows.slice(1).map((r, k) => (
                  <tr key={k}>{r.map((c, j) => <td key={j}>{inline(c.replace(/^site\/public/, ""))}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      )}
    </LegalPage>
  );
}
