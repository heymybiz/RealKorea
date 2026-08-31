# Real Korea — Content model, voice, CMS

**Doc:** RK-PRD-1.0 / 03

---

## 1. Content types

Four public types. Checklist is a **block**, not a type. Ranked list is **not a type**.

| Type | URL | Who creates | User can |
|---|---|---|---|
| Tip | `/tips/:slug` | Editor | Comment |
| Place | `/places/p/:slug` | Editor | Comment |
| Guide | `/guides/:slug` | Editor | Comment |
| Question | `/ask/:slug` | Visitor (pending) / Editor (seed) | Comment |

Supporting: Neighborhood, Topic, Author (desk only), Redirect, Legal page, ShopProduct.

---

## 2. Voice

### Body (Time Out editor)

Short declarative sentences. Specific, not rhapsodic. No “hidden gem”. No “bustling”. No “you might want to consider”. Prefer “Do this / skip that”.

Example: `Google Maps still cannot see most basement exits. Download Naver Map before you leave Wi-Fi.`

### Tip box (friend-on-Kakao)

Second person, slightly dry. One to three sentences. May be informal but never slang that dates badly.

Example: `If the BBQ host greets you in English before you sit, assume tourist pricing and walk one more block.`

### Forbidden language

- “Best”, “Top 10”, “bucket list”, “K-culture experience”
- Fake Korean romanization jokes
- Medical/legal commands (“take this drug”, “you will be fine crossing with…”)
- Superlatives that cannot be verified

---

## 3. Schemas

All documents: `slug`, `seoTitle`, `seoDescription`, `ogImage`, `publishedAt`, `updatedAt`, `status` (`draft|scheduled|published|archived`).

### 3.1 Tip

```
title                  string, editorial, ≤ 70
dek                    string, ≤ 140
topic                  enum: arrival | transit | money | etiquette | survival | seasonal
neighborhoods[]        ref Neighborhood
body                   portable text
tipBoxes[]             { heading?, body }   min 1
lastVerifiedAt         datetime, required
editorVerified         boolean (shows “Verified local”)
relatedQuestions[]     ref Question
relatedPlaces[]        ref Place
promotedFromQuestion   ref Question?
```

### 3.2 Place

```
editorialTitle         string (H1)
venueNameEn            string
venueNameKo            string   shown once as (한글)
vertical               enum: eat | shop-editorial | walk | other
neighborhood           ref, required
transitNote            string   e.g. “Line 2, Hongik University, Exit 9”
whyLocal               text, required
isTouristTrap          boolean
touristTrapNote        text
localAlternative       ref Place | string
priceBand              enum: 1|2|3|4
acceptsCards           boolean | 'unknown'
englishOk              enum: none | some | comfortable
reservation            enum: no | recommended | required
hoursNote              string   (not a live hours API in v1)
lastVerifiedAt         datetime, required
geo                    { lat, lng }  required for map embed
body                   portable text
tipBoxes[]             min 1
isPartner              boolean
partnerDisclosure      text
photos[]               images with alt (required)
```

### 3.3 Guide

```
title, dek, body (portable text including checklist block)
checklistId            string  e.g. "first-24"
isFirst24Alias         boolean  → route /first-24-hours
```

Checklist block:

```
items[] { id, label, help }
```

`id` is stable; `localStorage` keys off it.

### 3.4 Question

```
title                  string, 12–140 chars
body                   text optional
topic                  same enum + other
neighborhood           optional
askerName              string  public
askerEmail             string  NEVER public, NEVER in JSON-LD
status                 enum: pending | answered | declined | merged
officialAnswer         portable text
answerVerified         boolean
answeredAt             datetime
promotedTo             ref Tip | Guide
comments[]             Comment
noindexUntilAnswered   always true when status != answered
```

### 3.5 Comment

```
name                   public
email                  hidden
body                   8–1000 chars
createdAt
published              boolean
editorEndorsed         boolean  → Verified mark
parentQuestion         ref
```

### 3.6 ShopProduct

```
title, why, image, outboundUrl, rel=sponsored, priceHint, category
```

Only queried by `/shop`.

### 3.7 Neighborhood

See 02 §7. Fields: `slug`, `nameEn`, `nameKo`, `region`, `dek`, `hero`.

---

## 4. CMS requirements (full, founder C)

Studio must support:

| Capability | v1 |
|---|---|
| CRUD all types | Yes |
| Scheduled publish | Yes |
| Preview draft on site | Yes |
| SEO fields per doc | Yes |
| `lastVerifiedAt` stale view (>180d) | Yes |
| Question queue | Yes |
| Comment unpublish + endorse checkbox | Yes |
| Promote Question → Tip/Guide | Yes (manual: clone + link) |
| i18n field groups | Optional hidden; `en` only used |
| Role: Admin, Editor | Yes. No public users in CMS |

Editors never see a need for a custom React admin if Sanity Studio is used. If Payload: same capabilities.

---

## 5. Launch inventory (minimum, “small MVP”)

### Tips (16) — suggested titles (editable)

1. Tap water in Seoul apartments and restaurants  
2. T-money vs tapping a foreign Visa  
3. Apple Pay / Google Pay: where it dies  
4. Naver Map vs Kakao vs Google (do this before you land)  
5. eSIM vs physical SIM at ICN  
6. Kakao T vs Uber vs metro after midnight  
7. Trash and the hotel room floor  
8. Table for one: why you got waved off  
9. Receipt lottery and why the clerk looks expectant  
10. Convenience-store breakfast that is not a failure  
11. Pharmacy hours and the red-cross sign  
12. Cash still matters at stalls  
13. Subway etiquette the signs won’t say  
14. July humidity packing (seasonal)  
15. What “service” means on a bill (not a tip)  
16. US/EU prescriptions and what not to assume  

### Guides (4)

1. First 24 hours after ICN  
2. Business trip, 72 hours  
3. Repeat visit: skip the palaces  
4. Paying for things in Korea, 2026  

### Places (12) — mix traps and locals

Must include **at least two tourist traps with a local alternative**, so the fact stack is honest.

Coverage: Gwangjang (how to order like a local), a Myeongdong BBQ trap, Seongsu cafe street caution, Hwanghak-dong market, Hongdae late pharmacy as Place or Tip, Suwon or Paju as proof of capital-region scope, ICN arrivals practical Place (SIM booth — compare Shop).

### Questions (10 seeded, already answered)

Use the nine seed queries in 02 §6 plus `Is it rude to eat walking down the street?`

---

## 6. Photography doctrine

- Documentary, lived-in, dusk/rain/CU/fluorescent markets.
- No palace-and-hanbok hero unless the Guide is specifically about that and even then not Home.
- Alt text in English, factual (`Crowded Hwanghak-dong stall aisle at dusk`), not poetic.
- Faces of strangers: avoid identifiable close-ups without release.

---

## 7. JSON-LD

- Article for Tip / Guide / Place  
- FAQPage on Ask index for answered questions  
- LocalBusiness optional on Place **only if** we have address; otherwise skip rather than invent  
- Never emit `askerEmail`
