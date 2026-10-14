# Redesign v2 (design D) — what changed

- Branch `redesign-v2`, worktree `D:\Project\RealKorea-v2` (original `D:\Project\RealKorea` untouched).
- Six sections: Getting Around, Money & Phone, Arrival, Neighborhoods & Day Trips, Ask a Local, About.
- IA source of truth: `site/src/lib/ia-map.json` (links, sitemap and redirects all read it). Helpers in `site/src/lib/ia.ts`.
- New routes: `/getting-around|money-phone|arrival/[hub]/[slug]`, `/arrival/first-24-hours`, `/neighborhoods`, `/neighborhoods/[area]`, `/neighborhoods/local-rules/[slug]`, `/day-trips/[place]`, `/places/[slug]`.
- Removed routes (all redirected): `/tips`, `/guides`, `/eat`, `/shop`, `/first-24-hours`, `/places/p/*`, `/places/[neighborhood]`.
- Signature blocks: `site/src/components/site/realko-blocks.tsx` (Checked badge, Author box, Kkami's warning, What changed, Cozyo banner, empty Ad slot).
- Theme: `site/src/app/realko.css`.
- Not done (needs a decision): real author name/photo, ad code, deploy.
