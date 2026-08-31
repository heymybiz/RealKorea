# v2 notes — Real Korea visual direction

Status: **review**  
Date: 2026-08-31  
Supersedes v1 for art direction. v1 folder is frozen.

## Why v2

v1 had the right paper / ink / crimson mood but:

- extra nav items (Beauty, Checklist, Plan, Reviews)
- Hangul in chrome and heroes
- missing Shop, Guide, mobile Ask/Place
- “Write a review” on Place
- broken wordmarks (`KORF A`, `YIPS`)

## Screens

| File | Screen | New vs v1 |
|---|---|---|
| 01-home-desktop.jpg | Home | Tighter cover + search |
| 02-tips-index.jpg | Tips | Cleaner card grid |
| 03-place-detail.jpg | Place | Fact stack + tip box; no review CTA in spec |
| 04-ask-a-local.jpg | Ask | Desk composer |
| 05-shop.jpg | Shop | **New** — affiliate-only zone |
| 06-guide-first-24.jpg | Guide | **New** — checklist in article |
| 07-home-mobile.jpg | Home mobile | Wordmark lockup |
| 08-ask-mobile.jpg | Ask mobile | **New** |
| 09-place-mobile.jpg | Place mobile | **New** |

## Canonical (still from PRD, not from JPEG type)

Nav (only these five): Ask a Local · Tips · Eat & Drink · Places · Shop  

Home H1: `What locals actually tell friends before you land.`  
Search: `Ask something tourists never get a straight answer to`  
Ask H1: `Ask the question you’d text a Korean friend.`  
Tips H1: `Tips locals send in a group chat.`  
Shop H1: `Stuff we’d actually tell a friend to buy before they fly.`  
Place H1 pattern: English editorial title; Hangul once in parentheses.

Palette: paper `#F4EFE6`, ink `#161513`, crimson `#B43A3A`.

## Still ignore in the JPEGs

Image models still invent type. Do **not** implement:

- Extra Discover / About / Reviews / Questions in the top nav
- Hangul as the primary headline
- Duplicate search fields in the header
- Star ratings or Write a review
- Korean body as default UI language

## What v2 gets right (use this)

- Hanji paper, one crimson accent, serif display
- Lived-in photography (alley, market, airport, CU) not palace postcards
- Home = cover story + search
- Tips = filter chips + documentary cards
- Place = editorial column + fact stack
- Ask = composer on paper, not a forum
- Shop = product grid with Affiliate marks, isolated from Eat
- Guide = longform + checklist, not a SaaS onboarding
- Mobile = stacked magazine, not a Super App

## Suggested v3 only if needed

Pixel-accurate English type is a job for **code**, not another JPEG. Only run v3 if the founder wants a different mood (darker, more crimson, different photography).
