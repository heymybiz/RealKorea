/**
 * Firebase App Hosting (adapter-nextjs) skips copying public/ into the
 * standalone bundle when Next NFT tracing already created a partial
 * public/ (e.g. one file read via readFileSync). Merge-copy the full
 * public/ after build so every static asset is present at runtime.
 * @see https://github.com/firebase/apphosting-adapters/issues/499
 */
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const publicSrc = join(root, "public");
const publicDest = join(standalone, "public");

if (!existsSync(standalone)) {
  console.log("[copy-public-to-standalone] no .next/standalone — skip (not a standalone build)");
  process.exit(0);
}
if (!existsSync(publicSrc)) {
  console.warn("[copy-public-to-standalone] no public/ directory — skip");
  process.exit(0);
}

cpSync(publicSrc, publicDest, { recursive: true });
console.log("[copy-public-to-standalone] merged public/ -> .next/standalone/public");
