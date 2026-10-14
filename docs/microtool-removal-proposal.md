# Proposal: remove Exit Master and other prototype pages (PROPOSAL ONLY — nothing deleted)

Date: 2026-10-14 · Branch: `redesign-v2`

## Why
- The operating rule says "no new microtool pages". Exit Master (commit `2067542`, 2026-09-06 00:58 KST, during the freeze) breaks it.
- Everything under `site/public/` ships as-is on deploy. These files would be publicly reachable at their URLs, outside the new IA, with no redirects, no "Checked by a local" badge and no image credits.

## Candidates
| Path | What it is | Size | Proposal |
|---|---|---|---|
| `site/public/exit-master/index.html` | "Seoul Exit Master" no-stair luggage & transfer navigator prototype (single HTML) | 20 KB | Remove from `public/`. If wanted later, turn the idea into a normal Getting Around guide ("Step-free exits with luggage"). |
| `site/public/concepts/*.html` (6) | Old home/article concept mockups | 62 KB | Move to `docs/archive/concepts/` (not deployed). |
| `site/public/homes/*.html` (6) | Old home concept mockups | 66 KB | Move to `docs/archive/homes/`. |
| `site/public/mockups/*.html` (6) | Old brand mockups (Vercel/Olive Young themes) | 65 KB | Move to `docs/archive/mockups/`. |
| `site/public/{file,globe,next,vercel,window}.svg` | create-next-app leftovers, unused | 3 KB | Remove. |

Note: the original folder `D:\Project\RealKorea` also has an **uncommitted edit** to `site/public/exit-master/index.html`. It was left untouched.

## Suggested commands (run only after approval)
```
git rm -r site/public/exit-master
git mv site/public/concepts docs/archive/concepts
git mv site/public/homes docs/archive/homes
git mv site/public/mockups docs/archive/mockups
git rm site/public/{file,globe,next,vercel,window}.svg
```
Then add `/exit-master/:path*` → `/getting-around` to the redirects.
