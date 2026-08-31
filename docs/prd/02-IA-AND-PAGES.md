# Real Korea — IA, URLs, page specifications

**Doc:** RK-PRD-1.0 / 02  
**Related stills:** `design-mockups/v1/01` Home, `02` Tips, `03` Place, `04` Ask, `05` Home mobile

---

## 1. Sitemap

```
/                           Home
/ask                        Ask a Local index
/ask/:slug                  Question thread
/tips                       Tips index
/tips/:slug                 Tip
/eat                        Eat & Drink index (Places where vertical=eat)
/places                     Places / neighborhoods index
/places/:neighborhood       Neighborhood landing
/places/p/:slug             Place
/shop                       Shop (affiliate zone)
/shop/:slug                 Shop story or partner collection
/guides/:slug               Guide (no index in v1 nav; linked from Home/footer)
/search?q=                  Search results
/about                      About + how we verify
/first-24-hours             Alias to the First 24h Guide
/legal/privacy
/legal/terms
/legal/affiliates
/404
```

Admin / Studio: `/studio` (not in public nav).

---

## 2. Global chrome

### Header (desktop)

```
[crimson seal] REAL KOREA
ASK A LOCAL    TIPS    EAT & DRINK    PLACES    SHOP          [search icon]
```

- Wordmark: condensed editorial serif, ink. Seal is 12–16px, dancheong crimson, not a tourist taegeuk.
- Nav order is **fixed** (founder): Ask → Tips → Eat → Places → Shop.
- Active item: crimson underline, 2px, 8px below type.
- Search icon opens a command-style overlay (same field as Home hero).
- No language switcher. No avatar. No “Sign in”.

### Header (mobile)

Wordmark left, search icon, menu icon. Menu is a paper-sheet drawer with the five items + Search + First 24 hours + About.

### Footer

Four columns:

1. Real Korea — one-line promise  
2. Desk — Ask, Tips, Eat, Places, Shop  
3. Arrive — First 24 hours, How we verify, About  
4. Legal — Privacy, Terms, Affiliates, Donate  

Small type: “Editors live in Seoul. Facts are verified; neighborhoods change.”

---

## 3. Page specs

Every page lists **purpose, sections (top → bottom), empty/error, SEO**. Copy in quotes is canonical English UI.

### 3.1 Home `/`  — still `01`, mobile `05`

**Purpose:** Feel like a magazine cover; convert the private question into search or Ask.

**Sections**

1. **Cover** — full-bleed documentary photo (lived-in Seoul, never Gyeongbokgung postcard). Overlay:
   - Kicker: `LOCAL DESK`
   - Headline (canonical v1): `What locals actually tell friends before you land.`
   - Search field placeholder: `Ask something tourists never get a straight answer to`
   - Ghost button: `Browse questions`
2. **Desk strip** — 3 featured Tips (editorial, not paid).
3. **First 24 hours** — compact checklist module (5 items). CTA `Open the full guide`.
4. **Eat now** — 3 Place cards, vertical=eat.
5. **From the desk** — 3 recent Questions with editor answers.
6. **Neighborhood filmstrip** — 8 neighborhoods, image + name.

**Empty:** If CMS has <3 tips, hide the strip rather than fake cards.  
**SEO title:** `Real Korea — Local answers, not the brochure`

### 3.2 Ask index `/ask` — still `04`

**Purpose:** The differentiator. A magazine desk, not Reddit.

**Sections**

1. Headline: `Ask the question you’d text a Korean friend.`
2. Sub: `Editors answer. Good questions become guides.`
3. **Compose** — 140-char question, optional neighborhood, topic chips (Money, Transit, Food, Etiquette, Survival, Other), name, email, submit `Ask the desk`.
4. Suggested queries (text links, not tags soup) — see §8.
5. Feed: questions with editor answer first. Each card: question title, topic, one-line answer dek, `Verified` if flagged, comment count.
6. Filters: Unanswered | Answered | Topic | Neighborhood.

**States**

- Submit success: `The desk has it. We publish when an editor can stand behind the answer.`
- Validation: question min 12 chars; email required.
- Spam / rate limit: `That’s too fast. Try again in a few minutes.`
- Unanswered card: shows `Awaiting editor` — never empty void.

**SEO:** index, follow. Individual unanswered questions: `noindex` until answered (avoid thin pages).

### 3.3 Question `/ask/:slug`

1. Question title as H1  
2. Meta: topic, neighborhood, date  
3. **Official answer** block (paper inset, byline `Real Korea editor`, optional Verified check)  
4. Tip-box excerpts if the answer quotes a Tip  
5. Promote CTA (editors only, not public): not shown on public site  
6. **Comments** — name + body. Email field labeled `Email (never published)`.  
7. Related Tips / Places  

No upvote. No reply trees deeper than 1 (comment on question only).

### 3.4 Tips index `/tips` — still `02`

Headline: `Tips locals send in a group chat.`

Filters (single-select + All): Arrival, Transit, Money, Etiquette, Survival, Seasonal.

Grid: 2 cols desktop / 1 mobile. Card: documentary thumb, kicker, title, 2-line dek, neighborhood if any, `Verified local` micro-label if `editor_verified`.

Sort: last_verified desc, then publish desc.

### 3.5 Tip `/tips/:slug`

- H1, dek, meta (topic, last verified)
- Body (Time Out editor voice)
- **Tip box** component (chat voice) — at least one per Tip
- Related questions
- Related places
- No affiliate modules

### 3.6 Eat & Drink `/eat`

Same card grid as Places, prefiltered `vertical=eat`. Extra filters: price `₩–₩₩₩₩`, tourist-trap toggle `Hide traps`, English-menu, cards-accepted.

Intro dek: `Not a ranking. Places we’d send a friend, and the traps we’d pull them out of.`

### 3.7 Places `/places`

Neighborhood mosaic + all Place cards (eat + other). Filter by neighborhood and tag (market, cafe, walk, shop-editorial).

### 3.8 Neighborhood `/places/:neighborhood`

Short editor dek (120–160 words), map **not** required, 6+ Place cards, 3 Tips tagged to that neighborhood.

### 3.9 Place `/places/p/:slug` — still `03`

**Layout:** 7-col body + 5-col fact stack (stack drops under body on mobile).

**Title pattern:** editorial, not the venue legal name as H1.  
Example: `Hwanghak-dong flea stalls, not Myeongdong souvenirs`  
First mention of the place: `Hwanghak-dong (황학동)`.

**Fact stack (required fields)**

| Field | UI label |
|---|---|
| why_local | Why local |
| is_tourist_trap | Tourist trap? |
| local_alternative | Local alternative (link to another Place or short text) |
| price_band | Price |
| accepts_cards | Cards |
| english_ok | English |
| reservation | Reservation |
| transit | Transit |
| last_verified_at | Last verified |

Then: map embed (16:9, lazy).  
Then: related.  
If `is_partner`: crimson-outline badge `Partner` + link to `/legal/affiliates`.

**Forbidden on this page in v1:** “Write a review” as primary CTA. Comments are allowed at the bottom, visually secondary.

### 3.10 Shop `/shop`

The only page whose primary grid is **commerce**.

Headline: `Stuff we’d actually tell a friend to buy before they fly.`  
Every card: product, short why, `Affiliate` mark, outbound.

No mixing of unlabelled editorial Places here.

### 3.11 Guide `/guides/:slug`

Long-form. Must support a **checklist block**.  
`/first-24-hours` routes to the designated Guide.

Voice: editor body + tip boxes.

### 3.12 Search `/search?q=`

Groups results: Questions, Tips, Places, Guides.  
Zero results: `The desk hasn’t written this down. Ask it.` + compose shortcut.

### 3.13 About `/about`

- Why Real Korea exists (anti-brochure)
- How verification works (editor, last_verified, checkbox)
- Who answers (the desk, not a crowd)
- Donate
- Contact email

---

## 4. Key flows

### F-ASK

1. Home search or `/ask` compose  
2. If the query fuzzy-matches an answered question or Tip, show it **before** submit  
3. Else submit Question (status=`pending`)  
4. Editor notified  
5. Editor publishes Answer → status=`answered`, page becomes indexable  
6. Optional: editor clones into a Tip or Guide (`promoted_from_question`)

### F-COMMENT

1. Name + email + body  
2. Stored `pending_spam_check`  
3. Visible after simple checks (or immediately if honeypot clean — implementation choice, default **immediate with editor tool to unpublish**)  
4. Editor may set `editor_endorsed=true` → small Verified mark on that comment

### F-ARRIVE

1. Home checklist module  
2. Check items persist in `localStorage` key `rk.checklist.v1`  
3. Full Guide for explanation  

No account. Clearing storage clears checks — acceptable for v1.

---

## 5. Romanization rule (UI + body)

- First mention: `English Name (한글)`  
- After: English only  
- Example: `Gwangjang Market (광장시장)` then `Gwangjang Market`  
- Station names: `Hongik University Station (홍대입구역)` once  
- Never lead a heading with Hangul  
- Never drop Hangul entirely on first mention of a place

---

## 6. Suggested search seeds (home + ask)

Canonical list the search overlay and Ask page must display:

1. Can I drink tap water in Seoul?  
2. Apple Pay on a Seoul bus  
3. eSIM vs SIM at ICN  
4. Naver Map vs Google Maps  
5. Tourist-trap Korean BBQ  
6. Late-night pharmacy in Hongdae  
7. Table for one refused  
8. T-money vs just tapping a Visa  
9. Kakao T vs Uber  

---

## 7. Neighborhoods v1 (recommended, founder chose “recommend”)

Use slugs below. Display English; Hangul on first mention on the neighborhood page.

| Slug | English | Hangul | Region |
|---|---|---|---|
| jongno | Jongno–Gwanghwamun | 종로·광화문 | Seoul |
| ikseon-bukchon | Ikseon–Bukchon | 익선·북촌 | Seoul |
| myeongdong | Myeongdong–Namdaemun | 명동·남대문 | Seoul |
| hongdae-yeonnam | Hongdae–Yeonnam–Mangwon | 홍대·연남·망원 | Seoul |
| itaewon-hannam | Itaewon–Hannam | 이태원·한남 | Seoul |
| euljiro | Euljiro | 을지로 | Seoul |
| seongsu | Seongsu | 성수 | Seoul |
| gangnam-sinsa | Gangnam–Sinsa | 강남·신사 | Seoul |
| jamsil | Jamsil | 잠실 | Seoul |
| suwon | Suwon | 수원 | Gyeonggi |
| paju | Paju (Heyri) | 파주 | Gyeonggi |
| icn-songdo | ICN–Songdo | 인천공항·송도 | Capital region |

Incheon is included for traveler reality (airport), even though it is not Gyeonggi-do.
