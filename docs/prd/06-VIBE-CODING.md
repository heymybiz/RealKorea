# Real Korea — Vibe-coding implementation pack

**Doc:** RK-PRD-1.0 / 06  
Read 01 → 05 before writing code. This file is the **agent brief**.

---

## 0. Agent rules

1. Build a magazine site, not a dashboard, not a community app.
2. No auth libraries. No user table. Email on forms is a field, not an identity system.
3. No `/map`. No AdSense. No “Top 10” content type. No language switcher.
4. If a still and this pack conflict, this pack + 04 tokens win.
5. Copy in 02 (headlines, placeholders, seed queries) is canonical — do not rewrite to be friendlier.
6. Ship with **seeded content** so the preview is not empty (16 tips not required in code seed; **minimum 6 Tips, 4 Places, 4 Questions answered, 1 Guide First 24h, 8 neighborhoods**).

---

## 1. Suggested repo map (Next.js App Router)

```
app/
  (public)/
    layout.tsx              Masthead + Footer, lang=en
    page.tsx                Home
    ask/page.tsx
    ask/[slug]/page.tsx
    tips/page.tsx
    tips/[slug]/page.tsx
    eat/page.tsx
    places/page.tsx
    places/[neighborhood]/page.tsx
    places/p/[slug]/page.tsx
    shop/page.tsx
    guides/[slug]/page.tsx
    first-24-hours/page.tsx
    search/page.tsx
    about/page.tsx
    legal/privacy/page.tsx
    legal/terms/page.tsx
    legal/affiliates/page.tsx
    not-found.tsx
  studio/[[...index]]/page.tsx
  api/ask/route.ts
  api/comment/route.ts
  sitemap.ts
  robots.ts
components/               names in 04 §5
lib/
  sanity.ts | cms.ts
  romanize.ts             first-mention helper
  search.ts
  checklist.ts            localStorage key rk.checklist.v1
  rate-limit.ts
content/seed/             JSON if CMS not wired on day 1
styles/
  tokens.css              04 §2
```

If CMS is not connected on first compile, **seed JSON is acceptable** as long as the schema matches 03 and a `TODO(CMS)` exists in one file only.

---

## 2. Prompt sequence (run in this order)

Paste each block as a single agent turn. Do not skip to Shop before Home exists.

### Turn A — Foundation

> Implement Real Korea per PRD 01–05. Next.js App Router, TypeScript, Tailwind. Tokens from 04. Global masthead nav in this exact order: Ask a Local, Tips, Eat & Drink, Places, Shop. No sign-in. Paper background `#F4EFE6`, ink `#161513`, crimson `#B43A3A`. Wordmark REAL KOREA + small crimson seal. Footer as 02. Create empty routes for all URLs in 02 §1.

### Turn B — Home + search chrome

> Build `/` as 02 §3.1. Cover photo, kicker LOCAL DESK, headline “What locals actually tell friends before you land.”, search placeholder “Ask something tourists never get a straight answer to”. Header search icon opens the same field. Seed 3 tips, 3 eat places, 3 questions, checklist module of 5 items writing to localStorage `rk.checklist.v1`.

### Turn C — CMS schema or seed

> Implement document types Tip, Place, Guide, Question, Comment, Neighborhood, ShopProduct with fields in 03. Comments and asker emails must never be serialized to the public JSON.

### Turn D — Tips + Places

> Tips index filters. Place detail with fact stack and lazy Google Maps embed using `geo`. TipBox component (warm paper, crimson left bar). Partner badge only if isPartner. No review CTA.

### Turn E — Ask a Local

> Composer + feed. POST `/api/ask` with honeypot and rate limit. Unanswered = noindex. Official answer block with Verified mark. Comments via `/api/comment`. Seed the 9 queries as answered questions.

### Turn F — Eat, Shop, Guide, legal

> Eat is Places `vertical=eat` plus Hide traps. Shop is the only affiliate grid, `rel=sponsored nofollow`. First 24 hours guide + alias. Legal pages including affiliate disclosure. About explains editor verification.

### Turn G — SEO / a11y / polish

> Titles, canonicals, sitemap of indexable URLs only, OG, 404, focus rings, contrast, `lang=en`, romanization helper for first Hangul mention. Grep that adsbygoogle and Sign in do not exist.

---

## 3. Seed checklist (definition of not-empty)

A reviewer opening `/` must see:

- [ ] Cover + working search  
- [ ] At least one Verified question in the desk strip  
- [ ] Checklist that remains ticked after reload  
- [ ] A Place that is a trap pointing at an alternative  
- [ ] A Place that is not a trap  
- [ ] Shop with one clearly marked affiliate card  
- [ ] Ask form that persists a pending question (CMS or local demo queue clearly labeled if no backend)

---

## 4. Copy deck (do not paraphrase)

| Surface | Copy |
|---|---|
| Tagline | Local answers. Not the brochure. |
| Home H1 | What locals actually tell friends before you land. |
| Search ph | Ask something tourists never get a straight answer to |
| Ask H1 | Ask the question you’d text a Korean friend. |
| Ask sub | Editors answer. Good questions become guides. |
| Ask submit | Ask the desk |
| Ask success | The desk has it. We publish when an editor can stand behind the answer. |
| Tips H1 | Tips locals send in a group chat. |
| Eat dek | Not a ranking. Places we’d send a friend, and the traps we’d pull them out of. |
| Shop H1 | Stuff we’d actually tell a friend to buy before they fly. |
| Footer note | Editors live in Seoul. Facts are verified; neighborhoods change. |

---

## 5. QA script (human or agent)

1. Home → type `tap water` → land on Tip or Question.  
2. Submit a new question with invalid email → blocked.  
3. Submit valid → success copy; page not in sitemap.  
4. Open a trap Place → fact stack says Yes + alternative + map.  
5. Tick checklist → reload → still ticked.  
6. Click Shop outbound → `rel` contains sponsored.  
7. View source of a question → no email.  
8. Mobile drawer has 5 nav items only (+ utility).  
9. `/map` is 404.  
10. `/studio` is not linked in footer.

---

## 6. File drop for humans

PRD folder: `artifacts/prd/v1.0/`  
Stills: `artifacts/design-mockups/v1/`  
Next visual revision: create `design-mockups/v2/`, do not overwrite v1.
