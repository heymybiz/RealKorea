// Crawl a local build from "/" and verify every old URL redirects to a 200.
import { readFileSync } from "node:fs";
const BASE = "http://localhost:3107";
const ia = JSON.parse(readFileSync("src/lib/ia-map.json", "utf8"));
const seen = new Map(); const queue = ["/"]; const broken = []; const external = new Set();
while (queue.length) {
  const path = queue.shift(); if (seen.has(path)) continue;
  const res = await fetch(BASE + path, { redirect: "follow" }); seen.set(path, res.status);
  if (res.status >= 400) { broken.push(`${res.status} ${path}`); continue; }
  if (!(res.headers.get("content-type") || "").includes("text/html")) continue;
  const html = await res.text();
  for (const m of html.matchAll(/href="([^"#?]*)/g)) {
    const h = m[1]; if (!h) continue;
    if (/^https?:/.test(h)) { external.add(h); continue; }
    if (!h.startsWith("/") || h.startsWith("/_next") || h.startsWith("/studio")) continue;
    if (!seen.has(h)) queue.push(h);
  }
  for (const m of html.matchAll(/src="(\/[^"]+)"/g)) { const s = m[1].replace(/&amp;/g,"&"); if (!seen.has(s)) queue.push(s); }
}
const redirects = []; const rbad = [];
const olds = [...ia.items.filter(i => i.old !== i.new).map(i => [i.old, i.new]), ...ia.staticRedirects.filter(r=>!r.source.includes(":")).map(r => [r.source, r.destination])];
for (const [o, n] of olds) {
  const r = await fetch(BASE + o, { redirect: "manual" });
  const loc = r.headers.get("location") || "";
  const fin = await fetch(BASE + o, { redirect: "follow" });
  const ok = [307,308,301,302].includes(r.status) && loc.replace(BASE,"").split("#")[0] === n.split("#")[0] && fin.status === 200;
  (ok ? redirects : rbad).push(`${r.status} ${o} -> ${loc} (${fin.status})`);
}
console.log(JSON.stringify({ crawled: seen.size, broken, redirectsOk: redirects.length, redirectsBad: rbad, external: [...external] }, null, 1));
