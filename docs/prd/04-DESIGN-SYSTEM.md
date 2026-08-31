# Real Korea — Design system (vibe spec)

**Doc:** RK-PRD-1.0 / 04  
**Art direction stills:** `artifacts/design-mockups/v2/` (v1 frozen)  
**North star:** Time Out city magazine × Monocle whitespace × Korean modern (hanji, ink, dancheong crimson).  
**Not:** Visit Seoul teal, SaaS indigo, neon-Seoul cyberpunk, Disney-palace Korea.

JPEG stills are **mood**. Tokens below are **law**.

---

## 1. Principles

1. Paper, not screenshine. Background is a surface, not a gradient.
2. One accent. Crimson is for action, active nav, Verified, Partner outline. Never as a fill on large regions.
3. Photography does the Korea. UI does not (no taegeuk wallpaper, no brush-script headings).
4. Magazine rhythm: large serif H1, small-caps meta, generous margins.
5. Q&A is a desk, not a forum: no avatars, no upvote triangles, no stacked comic speech bubbles.

---

## 2. Color (Atelier Seoul Palette)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FAF7F2` | Page ground (warm hanji paper) |
| `--paper-warm` | `#F0EBE1` | Arrival guide panel & checklist ground |
| `--card-bg` | `#FFFFFF` | Editorial documentary card background |
| `--ink` | `#141210` | Primary text, heavy rules, dark buttons |
| `--charcoal` | `#23201D` | Card border hover, seal overlays |
| `--ink-soft` | `#5E5953` | Meta, captions, secondary body |
| `--rule` | `rgba(20,18,16,0.12)` | Hairline dividers |
| `--rule-strong` | `rgba(20,18,16,0.32)` | Active dividers & text decorations |
| `--lacquer` | `#A31C1C` | Lacquer Red: Verified seal, Ask theme, primary active accents |
| `--amber` | `#B45309` | Amber Gold: Tips & The Desk theme, friend tipbox border |
| `--chili` | `#881337` | Chili Burgundy: Eat & Drink theme, caution/trap alerts |
| `--pine` | `#0F4C42` | Pine Celadon: Places & Neighborhoods theme |
| `--indigo` | `#1E3A8A` | Royal Indigo: Shop & Guide accents |

Dark mode: **out of v1**. Do not add a toggle.

---

## 3. Type

| Role | Spec |
|---|---|
| Display / H1 | Editorial serif, 40–56px desktop, 32–36px mobile, tracking -0.02em. Suggest **Fraunces** or **Newsreader** |
| Wordmark | Same family, small-caps or condensed uppercase `REAL KOREA` |
| Body | Humanist sans, 17px / 28px. Suggest **Source Sans 3** or **IBM Plex Sans** |
| Meta / nav | 12px, letter-spacing 0.12em, uppercase |
| Tip box | Body size, slightly tighter, no serif |

Do not use: Pretendard as the English UI face (Korean later). Do not use Inter as the display face.

Hangul in first-mention parentheses: same sans, do not switch to a costume brush font.

---

## 4. Layout

- Max content width: **1120px**. Cover may go full bleed.
- Page padding: 24px mobile, 48–64px desktop.
- Vertical rhythm: 8px grid.
- Place detail: `grid-template-columns: 1.3fr 0.7fr` above 960px.
- Cards: 16px radius **maximum** (prefer 8–12). No 24px squircles.

---

## 5. Components (build these, nothing else if possible)

| Component | Behavior |
|---|---|
| `Masthead` | Seal + wordmark + 5 links + search icon |
| `CoverSearch` | Overlay on photo; input submits to `/search` and offers Ask if zero |
| `TipCard` | Image 3:2, kicker, title, dek, optional neighborhood |
| `PlaceCard` | Image, editorial title, price dots, trap flag if true |
| `FactStack` | Definition list, paper panel, hairline rules |
| `TipBox` | Warm paper, 3px crimson left bar, Kakao-voice copy |
| `VerifiedMark` | Small crimson check + word `Verified`. Never green default |
| `PartnerBadge` | Outline only, links `/legal/affiliates` |
| `AskComposer` | Question, chips, name, email, submit |
| `QuestionCard` | Title, dek of answer, verified, comment count |
| `ChecklistModule` | 5 rows, localStorage, not a todo app skin |
| `MapEmbed` | 16:9 iframe, lazy, title=`Map of {venue}` |
| `ShopCard` | Image, why, Affiliate mark, outbound `rel="sponsored nofollow"` |
| `CommandSearch` | Header overlay, grouped results |
| `Footer` | Four columns on paper-warm |

Buttons: primary = crimson fill, white type, 0 radius-sm (4px). Secondary = ink outline on paper.

---

## 6. Motion

- 180ms ease-out on hover underline and buttons.
- Cover image: no Ken Burns auto-zoom (feels like a template).
- Checklist check: instant + 120ms fade. No confetti.

---

## 7. Imagery in UI chrome

Allowed: one small seal derived from a simplified won-shape or square stamp — geometric, not a cartoon palace.

Forbidden in chrome: hanbok icons, namsan tower favicon cliché, pixel taegeuk unless redrawn as a 2-color stamp at 16px.

Favicon: crimson seal on paper.

---

## 8. Mapping stills → code

Use **`design-mockups/v2/`** (v1 is historical).

| Still | Take | Ignore |
|---|---|---|
| 01 home desktop | Cover + search + paper cards | Extra About, Hangul in the search field |
| 02 tips index | Chip filters + documentary grid | Extra Discover, Hangul card titles |
| 03 place | Fact stack + tip box + map last | Reviews nav, Hangul-led H1, stars |
| 04 ask | Paper composer, quiet cards | Extra Questions nav, Hangul headlines |
| 05 shop | Affiliate grid isolated from Eat | Hangul product titles as primary |
| 06 guide | Checklist inside longform | Hangul H1 |
| 07–09 mobile | Stacked magazine, checklist, fact stack | Extra nav labels, Hangul heroes |

---

## 9. Accessibility

- Contrast: ink on paper and white on crimson must pass WCAG AA.
- Search field always has a visible label or `aria-label="Search Real Korea"`.
- Map iframe titled.  
- Comments: `email` input `autocomplete="email"`, never in the DOM as visible text after submit.
- Focus rings: 2px crimson offset.

---

## 10. What “Time Out + Q&A blog” means in pixels

- Time Out: masthead, cover, card grids, serif display, city-desk confidence.
- Not Time Out: numeric “Best 27 dumplings”, yellow screamers, nightlife chrome.
- Blog/Q&A: composer, official answer block, comments as a quiet list.
- Together: a magazine that happens to take questions at the desk.
