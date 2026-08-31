# Real Korea — Functional and non-functional requirements

**Doc:** RK-PRD-1.0 / 05  
Priority: **P0** must ship, **P1** should ship in v1 if cheap, **P2** later.

Acceptance is binary. “Looks nice” is not acceptance; tokens in 04 are.

---

## FR — Functional

### Publishing

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-001 | P0 | Editors create/edit/schedule Tip, Place, Guide, Neighborhood, ShopProduct | Studio round-trip; preview works |
| FR-002 | P0 | Public site renders only `published` and `scheduled≤now` | Draft URL 404 for anonymous |
| FR-003 | P0 | `lastVerifiedAt` displayed on Tip and Place | Visible date |
| FR-004 | P1 | CMS list of docs with lastVerifiedAt older than 180 days | Filter exists |

### Ask a Local

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-010 | P0 | Visitor submits question (title, topic, optional neighborhood, name, email) without an account | Record in CMS `pending` |
| FR-011 | P0 | Email never rendered publicly or in JSON-LD | Source + schema check |
| FR-012 | P0 | Honeypot + rate limit (e.g. 3 / 10 min / IP) | Fourth submit fails politely |
| FR-013 | P0 | Editor publishes official answer; page becomes indexable | `answered` + index |
| FR-014 | P0 | Unanswered questions are `noindex` | robots / meta |
| FR-015 | P0 | Suggested 9 queries on Home overlay and Ask | Exact strings from 02 §6 |
| FR-016 | P1 | Before submit, show closest existing Tip/Question | At least exact title match |
| FR-017 | P1 | Editor can set `promotedFromQuestion` on a Tip/Guide | Field round-trip |

### Comments

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-020 | P0 | Comment on Question, Tip, Place, Guide: name, email, body | Stored; email hidden |
| FR-021 | P0 | Editor unpublish | Disappears |
| FR-022 | P0 | Editor `editorEndorsed` → Verified mark on that comment | Visible only when true |
| FR-023 | P0 | No accounts, no OAuth, no “Sign in” chrome | Grep UI |

### Discovery

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-030 | P0 | Search corpus: titles + dek + body + questions | The 9 seeds find something once seeded |
| FR-031 | P0 | Tips filter by topic | URL `?topic=transit` |
| FR-032 | P0 | Eat filter by price and `Hide traps` | Client or server |
| FR-033 | P0 | Neighborhood landing lists its Places and Tips | |
| FR-034 | P0 | `/search` groups by type | |

### Place / map

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-040 | P0 | Fact stack binds all required Place fields | No dummy “N/A” if unknown — show `Unknown` |
| FR-041 | P0 | Map embed on Place only, lazy iframe | No `/map` route |
| FR-042 | P0 | Partner badge iff `isPartner` | |

### Checklist

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-050 | P0 | First 24h module on Home; state in localStorage `rk.checklist.v1` | Survives reload |
| FR-051 | P0 | `/first-24-hours` shows the Guide | |

### Shop / money

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-060 | P0 | Shop cards `rel="sponsored nofollow"` | |
| FR-061 | P0 | No ShopProduct on Tip body | Schema + UI |
| FR-062 | P0 | Affiliate disclosure page | |
| FR-063 | P0 | Donate link in footer/About | External OK |
| FR-064 | P0 | No AdSense snippet | Grep `adsbygoogle` empty |

### Chrome / IA

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| FR-070 | P0 | Nav order Ask, Tips, Eat & Drink, Places, Shop | Exact |
| FR-071 | P0 | Romanization: first mention `En (한글)` | Helper in article template |
| FR-072 | P0 | Legal pages | Privacy, Terms, Affiliates |

---

## NFR — Non-functional

| ID | Pri | Requirement | Accept |
|---|---|---|---|
| NFR-001 | P0 | LCP < 2.5s on Home 4G Fast, mobile | Lighthouse / field later |
| NFR-002 | P0 | CLS < 0.1 (set image dimensions, no late fonts swap on H1) | |
| NFR-003 | P0 | WCAG 2.2 AA for text contrast and focus | |
| NFR-004 | P0 | Semantic HTML: one H1, nav, main, footer | |
| NFR-005 | P0 | Unique title + meta description + canonical | |
| NFR-006 | P0 | OG image per article | |
| NFR-007 | P0 | `lang="en"` | |
| NFR-008 | P0 | Sitemap.xml of published indexable URLs | |
| NFR-009 | P0 | 404 page on-brand | |
| NFR-010 | P0 | Forms work with JS disabled or degrade to POST | Prefer POST |
| NFR-011 | P0 | Personal data: emails encrypted at rest if DB; never logged in full in client | |
| NFR-012 | P0 | Korean PIPA + GDPR-minded privacy copy: purpose = contact on the question, retention stated | |
| NFR-013 | P0 | No third-party ad cookies in v1 | |
| NFR-014 | P1 | Preview protection for `/studio` | |
| NFR-015 | P0 | i18n folder structure exists with `en` only; no switcher | |
| NFR-016 | P0 | English UI copy only in chrome | |

---

## Legal / compliance notes for implementation

- Affiliate: Korean and FTC-like disclosure. `Partner` and `Affiliate` labels are not optional.
- Do not give medical dosages or “you can bring Adderall” advice. The seed Tip on prescriptions must be “check your embassy / do not assume”, not a how-to.
- User questions may request illegal topics; editors **decline** (status=`declined`), no public page.
- Comments: store IP only if needed for rate limit, rotate.

---

## Traceability (vibe-coding)

| Founder choice | Spec |
|---|---|
| C1-A | FR-010, FR-020, FR-023, FR-050 |
| C2-C + comments | FR-001, FR-013, FR-021, FR-022 |
| C3-A+C | 04 Design + no ranked type in 03 |
| Nav F,A,B,C,D | FR-070 |
| Map embed only | FR-041 |
| Ads later | FR-064 |
| English first-mention Hangul | FR-071 |
