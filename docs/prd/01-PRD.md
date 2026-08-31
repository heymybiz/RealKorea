# Real Korea PRD v1.0

**Document ID:** RK-PRD-1.0  
**Date:** 2026-08-31  
**Classification:** Product baseline for implementation  
**Owner:** Founder (HeyMyAi)  
**Consumers:** Vibe-coding agents, future contractors  

### Revision

| Ver | Date | Change |
|---|---|---|
| 1.0 | 2026-08-31 | Locked from founder Q&A Rounds 1–2 + C1–C3 |

### Approval (logical)

| Decision | Locked value |
|---|---|
| Name | Real Korea |
| Language v1 | English only (i18n-ready schema) |
| Geography v1 | Seoul + capital region, staged expansion |
| Accounts | None. Ask/comment = name + email |
| Publishing | Editors only. User comments allowed |
| Visual north star | Time Out × Monocle, hanji / ink / dancheong crimson |
| Information model | Q&A-led editorial blog, **not** ranked listicles |
| Monetization v1 | Affiliates + Shop partners + donations. No AdSense |

---

## 1. Executive summary

Real Korea is a **local-intelligence magazine for English-speaking visitors** to Seoul and the capital region.

Public tourism sites (VisitKorea, Visit Seoul) publish official facts. TripAdvisor and blogs publish volume. Real Korea publishes **the things a resident would actually say**: which BBQ street is priced for tourists, why Google Maps dies underground, what to do when a restaurant waves away a table-for-one.

The product is not a community. It is not a booking engine. It is **editor-voiced**, **question-driven**, and **visually a city magazine**.

**v1 success:** a first-time visitor can land, search a privately embarrassing question, get a verified local answer, and save a 24-hour arrival checklist — without creating an account.

---

## 2. Problem and positioning

### 2.1 Problem

Foreign visitors (first trip, repeat, short business) hold questions they will not ask a tour desk:

- Is Seoul tap water actually fine?
- Why did that restaurant refuse me alone?
- Apple Pay on the bus — real or not?
- Which Myeongdong BBQ is a trap, and where do locals go instead?

Official channels answer the public version. Forums answer loudly and contradict. There is no **small, verified, local** desk.

### 2.2 Positioning statement

For English-speaking travelers about to visit or walking around Seoul, **Real Korea** is the **local desk** that answers unofficial, practical questions in magazine form. Unlike tourism boards, we do not reprint public facts. Unlike ranking media, we do not publish “50 best”. Unlike forums, we do not leave the reader to vote.

### 2.3 Brand promise

> Local answers. Not the brochure.

### 2.4 Explicit anti-goals

| We are not | Because |
|---|---|
| A sightseeing inventory | Public information already exists |
| An ads-dressed restaurant list | Destroys the local-trust claim |
| A UGC community | Noise; trust model is editorial |
| Time Out clone with Top 50 lists | Founder: niche / reality / Q&A |
| A Korean-language product in v1 | Stage-1 audience is English-speaking |

---

## 3. Goals and KPIs

### 3.1 Business goals (v1)

1. Become the **first bookmark** for “how does this actually work in Seoul”.
2. Collect a pipeline of real visitor questions (content engine).
3. Keep editorial trust high enough that affiliates in Shop never contaminate Tips.

### 3.2 Product KPIs

| ID | Metric | v1 target (90 days post-launch) |
|---|---|---|
| KPI-01 | Organic search: head queries in §8.4 of 02 | 8 / 12 queries in top 20 |
| KPI-02 | Search/Ask submit rate | ≥ 8% of sessions |
| KPI-03 | Tip or Place read depth | ≥ 2.5 pages / session |
| KPI-04 | Checklist interaction (First 24h) | ≥ 15% of new sessions |
| KPI-05 | Question submissions | ≥ 20 / month |
| KPI-06 | Bounce on Home | < 55% |
| KPI-07 | Core Web Vitals | All “good” on mobile |

Vanity traffic is not a v1 goal. Trust and answer-quality are.

---

## 4. Users

### 4.1 Primary (build for these)

**P1 — First-timer, English-speaking**  
3–7 days, anxious about transit/payment/etiquette. Reads on the plane and in a CU aisle. Needs short cards + a 24h checklist.

**P2 — Repeat visitor**  
Has done palaces. Wants neighborhoods and “where locals actually…”. Needs Place cards and Eat & Drink.

**P3 — Short business trip**  
36–72 hours, Gangnam / Gwanghwamun / COEX. Needs compressed guides, SIM/eSIM, taxi vs subway, one non-trap dinner.

### 4.2 Out of primary focus (do not warp IA)

Working holiday, students, digital nomads, gyopo family visits — useful later, not v1 IA.

### 4.3 Jobs to be done

| Job | Surface |
|---|---|
| Ask a slightly dumb question without being judged | Ask a Local + Home search |
| Confirm a rumor before acting | Tip |
| Pick a place that is not a trap | Place / Eat & Drink |
| Survive the first 24 hours | Guide + checklist module |
| Buy a SIM / beauty item without getting farmed | Shop (labeled affiliate) |

---

## 5. Scope

### 5.1 In scope — v1 (MVP, “small but real media site”)

- 5-item global nav: Ask a Local, Tips, Eat & Drink, Places, Shop
- Home = magazine cover + search
- Content types: **Tip, Place, Guide** + public **Question**
- Editor answers + user comments (name + email, email never public)
- Editor `Verified` flag on an official answer and on endorsed comments
- Search over titles, bodies, questions, tags
- Filters: topic, neighborhood, (Eat) cuisine / price
- Google (or Mapbox) **embed on Place pages only**
- First 24 hours checklist module (not a top-nav item)
- Full CMS: types, SEO, schedule, neighborhoods, Q&A moderation
- Affiliate disclosure, partner badge, Shop-only commerce links
- Donation CTA (footer / About)
- Legal: Privacy, Terms, Affiliate disclosure
- English UI; Hangul only as first-mention helper

### 5.2 Explicitly out of v1

- User accounts, OAuth, profiles, likes-as-social-graph
- Dedicated Map page / neighborhood polygons
- AdSense / in-article display ads
- Ranked “Best of” listicles as a content type
- Nightlife as its own nav vertical
- Booking engines (stay, flight, table)
- Dating, politics, medical diagnosis, legal advice, club guest lists
- Anything restricted by Korean or advertiser law (alcohol to minors, unlicensed medical, etc.)
- Localization of UI (schema may be ready)
- Push/newsletter (nice-to-have, not blocking)

### 5.3 Later stages (do not implement now, do not block schema)

| Stage | Geography / language / product |
|---|---|
| v1.1 | Accounts optional, bookmarks sync, newsletter |
| v2 | AdSense after traffic + layout slots already reserved |
| v2 | Cities: Busan, Jeju, Gyeongju |
| v3 | Japanese / Chinese UI |

---

## 6. Trust model (non-negotiable)

1. **Only editors publish** Tip, Place, Guide, and the official Answer.
2. Visitors **ask questions** and **comment** (name + email).
3. An editor may tick `verified` on the official answer and on selected comments. That checkbox is the product’s trust mark — not crowd votes.
4. Voice is “people who live here”, but **authorship of the page is the desk**.
5. Every Place and factual Tip has `last_verified_at`. Stale (> 180 days) shows a visible “Verify before you go” hint in CMS and optionally on-page.
6. Partner / affiliate is **never** visually identical to editorial. See monetization rules.

---

## 7. Monetization rules

| Channel | v1 | Placement rule |
|---|---|---|
| Editorial | Unmonetized | Tips index, Ask feed, Guide body: no product cards |
| Place `Partner` badge | Allowed | Only if `is_partner = true`. Badge + disclosure link |
| Shopping affiliation | Allowed | **Shop section only** + disclosure |
| Travel affiliation (SIM, rail, stay) | Allowed | Shop or clearly labeled module, never inside a Tip body as if editorial |
| Donations | Allowed | Footer, About |
| AdSense / display | **Forbidden in v1** | Layout may reserve `aside` slots but must ship empty |

If a Place is both editorial and partner, the Partner badge is mandatory. Default sort of Eat & Drink is **editorial**, never paid-first.

---

## 8. Recommended stack (founder: “recommend”)

Chosen for vibe-coding speed, editorial CMS, and English SEO.

| Layer | Choice | Why |
|---|---|---|
| App | **Next.js (App Router) + TypeScript** | SEO, static + ISR for a magazine |
| UI | **Tailwind CSS + a small Radix set** | Matches design-system tokens |
| CMS | **Sanity** (or Payload if one-repo is required) | Scheduled publish, preview, localized fields later |
| Hosting | **Vercel** | Matches Next |
| Search v1 | CMS GROQ / fetch + **FlexSearch or Pagefind** | Enough for MVP corpus |
| Maps | **Google Maps embed iframe** on Place only | Foreigners already have Google; article teaches Naver |
| Forms | Server actions + CMS dataset `question` / `comment` | No Auth.js |
| Email | Resend / Postmark to editors on new question | No user-facing mail product |
| Analytics | Plausible or GA4 | KPI-01…07 |
| Media | Sanity CDN or Cloudinary | Hero photography |

**Do not** introduce a custom map app, a user table, or an ad server in v1.

i18n: next-intl **wired with `en` only**. No language switcher.

---

## 9. Phasing of content volume (v1 = small)

| Type | Launch count | Notes |
|---|---|---|
| Tip | 16 | Weighted to transit, money, etiquette, survival |
| Place | 12 | Mix Eat, Shop, neighborhood texture |
| Guide | 4 | Must include “First 24 hours” and “Business trip 72h” |
| Question (seeded) | 10 | With editor answers, to avoid an empty desk |
| Neighborhoods | 12 | See 03 |

Quality over inventory. Empty sections are worse than a short Shop.

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| Looks like Visit Seoul | Photography + anti-brochure voice + Q&A desk |
| Looks like a forum | No avatars grid, no upvotes, editor answer is visually primary |
| Affiliate rot | Shop isolation + Partner badge + disclosure |
| Stale facts (transit fares) | `last_verified_at` + CMS stale view |
| Spam questions | Email + honeypot + rate limit + editor queue |
| Legal | Medical/legal/dating out; Korean advertising marks on partners |

---

## 11. Open items (do not block v1)

- Exact domain (`realkorea.com` vs `.guide` vs `.co`)
- Map vendor if Google pricing is an issue → Mapbox static
- Donation processor (Buy Me a Coffee / Toss / Stripe)
- Photography licensing (founder-shot vs stock; prefer documentary)

---

## 12. Definition of a shippable v1

A vibe-coding agent is done when:

1. All pages in 02 render with the design tokens in 04.
2. CMS can create Tip / Place / Guide / Question / Comment / Neighborhood.
3. Home search queries the corpus including seeded questions.
4. Ask form creates a Question awaiting editor answer; comments attach with hidden email.
5. Place pages embed a map and show fact stack + tip box.
6. Shop is the only surface with product affiliate cards.
7. No login UI exists.
8. Lighthouse a11y ≥ 90, SEO basics (title, canonical, OG) present.
9. Empty, loading, 404, and spam-failure states exist.
10. Launch inventory in 03 can be entered without schema changes.
