import type { Tip } from "@/lib/content/types";

import { SAMPLE_BASE } from "./shared";

const AREX_LATE_NIGHT_TIP: Tip = {
  ...SAMPLE_BASE,
  sample: false,
  id: "tip-incheon-late-night-arex-survival",
  slug: "incheon-late-night-arex-survival",
  status: "published",
  seoTitle: "Landing Past 23:30 at Incheon: The Local Late-Night Protocol | Real Korea",
  seoDescription:
    "Why you will miss the 23:56 last train, how to catch Night Bus N6001 without cash panic, and exact steps to dodge $150 arrival hall taxi touts.",
  ogImage: null,
  publishedAt: "2026-08-30T10:00:00Z",
  updatedAt: "2026-08-30T10:00:00Z",
  title: "Landing past 23:30 at Incheon: Express AREX is closed — here is your late-night protocol.",
  dek: "The orange Express train stops at 22:48, and the blue All-Stop train locks its gates at 23:56. If your wheels touch down after 23:00, stop running for the train—here is what local Seoulites do instead.",
  topic: "arrival",
  neighborhoodSlugs: ["icn-songdo", "jongno"],
  lastVerifiedAt: "2026-08-30T00:00:00Z",
  editorVerified: true,
  relatedQuestionSlugs: ["does-uber-work-in-seoul", "tipping-culture-south-korea"],
  relatedPlaceSlugs: ["dongwon-jip-euljiro"],
  promotedFromQuestionSlug: null,
  image: {
    src: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=85",
    alt: "Incheon International Airport Terminal 1 at Night",
    width: 1200,
    height: 800,
  },
  tipBoxes: [
    {
      heading: "⚡ The 23:00 Luggage Reality Check",
      body: "If your flight lands at 23:00, do NOT sprint to the basement train station. Between taxiing to the gate, immigration fingerprinting, and waiting for luggage on Carousel 8, you will exit customs at 23:50 at the earliest. The long escalator down to the train is cordoned off at exactly 23:55. Save your breath and switch to the Night Bus plan immediately.",
    },
    {
      heading: "💵 Pull 20,000 KRW Before Customs Exit Doors",
      body: "Night bus drivers CANNOT process foreign credit cards (Visa/Mastercard tap will beep red and fail). While waiting at the baggage carousel, walk over to the Woori or Shinhan Global ATM right next to Belt 9. Withdraw two 10,000 KRW notes or charge your physical T-money card at the convenience store right after customs.",
    },
    {
      heading: "🚖 The $150 'Black Van' Trap vs. Official Line 5C",
      body: "Men in dark suits standing by Arrivals Gate B holding laminated badges that say 'Official Airport Limousine' are private van operators targeting tired foreigners for 150,000–200,000 KRW flat. Walk straight out through Exit 5 to the outdoor taxi queue. An official metered orange/silver sedan to Jongno or Hongdae is ~72,000 KRW plus the ~6,600 KRW toll.",
    },
  ],
  body: [
    {
      type: "heading",
      level: 2,
      text: "1. The Last Train Mirage: What the Timetable Actually Means",
    },
    {
      type: "paragraph",
      text: "Airport brochures promote AREX as a 43-minute breeze into Seoul Station. What they don't highlight in bold is the cutoff: the Non-Stop Express (orange livery) ends at 22:40 from Terminal 2 and 22:48 from Terminal 1. The regular blue Commuter Train departs Terminal 2 at 23:32 and Terminal 1 at 23:56. At 23:56 sharp, station staff pull down the metal rolling shutters. If you are stuck in line at immigration when the clock hits 23:30, accept that rail travel is off the table.",
    },
    {
      type: "heading",
      level: 2,
      text: "2. Night Bus N6001 (Seoul Station) & N6000 (Gangnam)",
    },
    {
      type: "paragraph",
      text: "Between 00:00 and 05:00, your primary public transit lifelines are the dedicated Seoul Night Airport Buses. At Terminal 1, head outside to 1F Bus Stop 6A. At Terminal 2, take the elevator down to B1 Transportation Center Stop 25. Route N6001 runs directly to Seoul Station via Yongsan, while Route N6000 heads south to Express Bus Terminal in Gangnam. Buses depart roughly every 45 to 55 minutes (00:15, 01:05, 02:00, 02:55, 03:45, 04:40).",
    },
    {
      type: "paragraph",
      text: "Crucial boarding tip: Unlike regular city buses, highway law forbids standing passengers on airport routes. Once all 45 seats fill, the driver shuts the door and drives off. Queue up near the yellow boarding line at least 15 minutes before the scheduled departure time rather than waiting inside the heated waiting room.",
    },
    {
      type: "heading",
      level: 2,
      text: "3. Taking a Late-Night Taxi Without Language Friction",
    },
    {
      type: "paragraph",
      text: "If you have 3+ large bags or are traveling as a pair, the metered taxi queue is often worth the 70,000–85,000 KRW fare. Walk outside past midnight and follow the overhead signs to Taxi Platform 5C (Standard Sedan). Do not attempt to spell your hotel name in English to the driver. Open Naver Map or KakaoMap on your phone, pull up the Korean destination page with the Korean road-name address (도로명주소) in large text, and show the screen to the driver. The meter starts automatically with a 20% midnight surcharge (00:00–04:00).",
    },
    {
      type: "heading",
      level: 2,
      text: "4. Stuck Until 05:30? The Terminal 1/2 Capsule Hideout",
    },
    {
      type: "paragraph",
      text: "If your Airbnb has strict daytime check-in hours and you refuse to wander midnight streets with three suitcases, head to 'Darakhyu' (다락휴). Run by Walkerhill Hotel, this capsule hotel is located inside Terminal 1 (Transportation Center 1F) and Terminal 2 (B1F East). A compact single cabin with soundproofing, high-speed Wi-Fi, and private shower costs around 32,000–48,000 KRW for a 3-hour daytime/night block—infinitely better than freezing on arrival hall metal chairs.",
    },
  ],
};

const FULL_16_TIPS: readonly Tip[] = [
  AREX_LATE_NIGHT_TIP,
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-tmoney-vs-climate-card",
    slug: "tmoney-vs-climate-card",
    status: "published",
    seoTitle: "T-money vs. Climate Card: Which Transit Pass Do You Actually Need? | Real Korea",
    seoDescription: "The Climate Card saves money only if you ride subway 4+ times every day. Breakdown of costs, excluded lines, and when to buy regular T-money.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "T-money vs. Climate Card: Which transit pass do you actually need?",
    dek: "The tourist Climate Card saves money only if you swipe four or more times every single day. Most 3–5 day visitors lose money on it.",
    topic: "transit",
    neighborhoodSlugs: ["jongno", "myeongdong"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["climate-card-vs-tmoney-short-trip", "apple-pay-on-a-seoul-bus"],
    relatedPlaceSlugs: ["dongwon-jip-euljiro"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
      alt: "Seoul subway station platform transit card turnstiles",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "⚡ The 4-Rides-A-Day Math",
        body: "A 3-day Climate Card costs 10,000 KRW plus a 3,000 KRW non-refundable plastic card purchase fee. That is 13,000 KRW upfront. A standard T-money subway ride is 1,400 KRW with free bus transfers within 30 minutes. Unless you take 10+ completely separate metro journeys across 3 days, standard T-money is significantly cheaper.",
      },
      {
        heading: "🚫 Excluded Lines That Trigger Station Alarms",
        body: "Climate Cards DO NOT WORK on the AREX Non-Stop Express, the Shinbundang Line (Gangnam to Pangyo/Suwon), or red suburban Gyeonggi commuter buses. If you tap into an excluded station, the barrier alarm rings red and you must press the emergency help bell for manual staff override.",
      },
      {
        heading: "💳 WOWPASS & T-Money Integration",
        body: "If you buy an all-in-one WOWPASS card at the airport kiosk, it already contains a built-in standard T-money chip on the back. You do NOT need to buy a separate Climate Card or T-money card—just top up the transit balance with KRW cash at any subway ticket kiosk.",
      },
      {
        heading: "💵 Cash-Only Top Up Rule",
        body: "Neither T-money nor physical Climate Cards can be reloaded using international credit cards at subway vending machines or convenience store cash registers. You MUST insert physical Korean Won paper banknotes.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Tourist Pass Illusion: Unlimited vs. Real Walking Habits",
      },
      {
        type: "paragraph",
        text: "The Seoul Metropolitan Government heavily markets the short-term Tourist Climate Card (available in 1, 2, 3, 5, and 7-day passes) as the ultimate transit companion for foreign travelers. The concept of unlimited subway and bus rides sounds like an obvious budget hack. However, for 85% of visitors staying in central downtown areas, it is actually a losing financial proposition.",
      },
      {
        type: "paragraph",
        text: "Seoul is an intensely pedestrian-friendly city where primary historical and cultural districts cluster tightly together. Strolling from Jongno to Ikseon-dong takes 4 minutes; walking from Myeongdong to Euljiro takes 7 minutes; heading from Anguk to Bukchon is a direct scenic walk. On a standard sightseeing itinerary, you will take the subway from your hotel in the morning, ride once to an afternoon neighborhood, and ride once back at night. That is 3 rides per day—totaling 4,200 KRW.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Hidden 3,000 KRW Plastic Card Surcharge",
      },
      {
        type: "paragraph",
        text: "Unlike Korean residents who can download the digital Climate Card for free on Android smartphones via Mobile T-money (which requires domestic resident verification), international visitors MUST purchase a physical plastic card for 3,000 KRW cash. This 3,000 KRW is completely non-refundable.",
      },
      {
        type: "paragraph",
        text: "Let's examine the real cost breakdown for a 3-Day trip: The 3-day pass recharge fee is 10,000 KRW + 3,000 KRW card fee = 13,000 KRW total investment. With standard T-money, 8 subway trips cost 11,200 KRW. By purchasing the Climate Card, you pay 1,800 KRW more for zero extra benefit.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Boundary Traps: When Climate Cards Leave You Stranded",
      },
      {
        type: "paragraph",
        text: "The Climate Card was engineered specifically for Seoul municipal tax-funded transit lines. If your travel itinerary extends even slightly beyond Seoul city borders, the card fails abruptly. Excluded routes include:",
      },
      {
        type: "paragraph",
        text: "• The entire Shinbundang Line (the fastest route connecting Gangnam, Yangjae, Pangyo, and Gwanggyo/Suwon). If you tap in at Gangnam on this line, the gate turns red and beeps.",
      },
      {
        type: "paragraph",
        text: "• Red Gyeonggi Metropolitan Express Buses (e.g. buses heading to Everland, Korean Folk Village, or DMZ borders).",
      },
      {
        type: "paragraph",
        text: "• AREX Non-Stop Express Train to Incheon Airport (though it is valid on the All-Stop Commuter Train within Seoul city limits up to Gimpo Airport).",
      },
      {
        type: "heading",
        level: 2,
        text: "4. The Desk Recommendation: Why Standard T-Money Wins",
      },
      {
        type: "paragraph",
        text: "For almost all visitors staying in Seoul for under two weeks, the traditional T-money card remains the vastly superior option. A standard T-money card costs 4,000 KRW (often decorated with cute Kakao Friends or BTS designs), never expires, and works universally across every subway line, city bus, intercity bus, island ferry, and taxi in all 17 provinces of South Korea—from Seoul to Busan, Gangneung, and Jeju Island.",
      },
      {
        type: "paragraph",
        text: "Furthermore, any remaining cash balance under 20,000 KRW on your T-money card can be refunded instantly in cash at any GS25, CU, or 7-Eleven convenience store right before you board your flight home for a negligible 500 KRW service fee.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-naver-map-english-setup",
    slug: "naver-map-english-setup",
    status: "published",
    seoTitle: "Why Google Maps Fails in Korea (And How to Setup Naver Map in English) | Real Korea",
    seoDescription: "Korean national security laws block Google Maps walking navigation. Exact steps to search Korean addresses by phone number and find subway exits.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Why Google Maps fails in Korea (and how to set up Naver Map in English)",
    dek: "National security laws restrict Google's walking directions. Naver Map and KakaoMap are non-negotiable survival tools in Seoul.",
    topic: "survival",
    neighborhoodSlugs: ["jongno", "euljiro"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["naver-map-vs-google-maps"],
    relatedPlaceSlugs: ["dongwon-jip-euljiro", "sunhee-bindaetteok-gwangjang"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
      alt: "Pedestrians navigating Seoul downtown alleys using mobile maps",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "⚡ The Phone Number Search Trick",
        body: "English romanization in Korea is wildly inconsistent (e.g. Gwangjang vs Kwangjang; Dongwon vs Dong-won). In Naver Map, copy and paste the restaurant's 9- or 10-digit Korean landline phone number (e.g. 02-2265-3790) into the search bar. It snaps instantly to the exact location pin regardless of spelling.",
      },
      {
        heading: "🚇 The Subway Exit Number Check",
        body: "Always tap route details to check the designated Subway Exit Number (e.g. Exit 8 or Exit 3-1). Crossing under massive multi-line transfer stations like Jongno 3-ga or Express Bus Terminal from the wrong exit can add 15 minutes of underground stairs and tunnel walking.",
      },
      {
        heading: "🚪 Subway Car Door Alignment",
        body: "Naver Map displays the fastest subway train car and door numbers (e.g., 'Fast Transfer: Car 4, Door 2'). Look down at the subway platform edge for the numbers painted on the safety doors to save substantial walking time during transfers.",
      },
      {
        heading: "📶 Offline Map Pre-Caching",
        body: "Before leaving your hotel Wi-Fi, star your key locations into custom bookmark lists. Naver Map caches vector map tiles along your starred routes, ensuring you don't lose navigation if your mobile data drops in underground basements.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 1:5,000 Spatial Data Law: Why Google Maps Is Crippled",
      },
      {
        type: "paragraph",
        text: "First-time visitors to South Korea are frequently shocked when opening Google Maps upon landing. The map tiles appear blurry, walking routing is completely grayed out with the error message 'Walking directions are not available in this area,' and transit arrival times are frequently inaccurate or hours out of date.",
      },
      {
        type: "paragraph",
        text: "This is not a technical bug. Under South Korea's National Spatial Data Industry Promotion Act, domestic high-precision vector mapping data (at 1:5,000 scale) is legally classified as national defense infrastructure due to the ongoing armistice with North Korea. Foreign corporations are prohibited from exporting this detailed spatial data onto foreign cloud servers unless sensitive military installations, power plants, and government facilities are permanently blurred.",
      },
      {
        type: "paragraph",
        text: "Google has historically refused to comply with South Korean domestic server hosting requirements or mandatory blurring policies. As a result, Google Maps is forced to rely on low-resolution global satellite imagery without walking algorithms. In Korea, navigating with Google Maps is like exploring London with a 1995 paper atlas.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Setting Up Naver Map English UI in 60 Seconds",
      },
      {
        type: "paragraph",
        text: "Download 'Naver Map' (네이버 지도) from the Apple App Store or Google Play Store before your flight departs. Upon launch, follow these exact setup steps:",
      },
      {
        type: "paragraph",
        text: "1. Tap the three-line hamburger menu icon in the top left corner. 2. Tap the gear icon (Settings) in the top right. 3. Tap 'Language' (언어) and select 'English'. The entire user interface, street names, subway line color coding, bus stop names, and voice guidance will immediately switch to clear English.",
      },
      {
        type: "paragraph",
        text: "Unlike Google Maps, Naver Map gives you real-time GPS positioning updated every second, accurate walking compass direction arrows, live countdown timers for approaching city buses (down to the number of remaining stops and crowd density), and detailed indoor floor maps of major subway stations.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Master the Search: Korean Road Names vs. Phone Numbers",
      },
      {
        type: "paragraph",
        text: "Searching for Korean places in English can occasionally yield zero results if your spelling differs from the official government Revised Romanization. For instance, searching for 'Tosokchon' might fail if the database indexed it as 'To-sok-chon' or 'Tosok-chon'.",
      },
      {
        type: "paragraph",
        text: "The local secret weapon is the Korean phone number search. Every business in South Korea has a unique registered landline number starting with the regional area code (02 for Seoul, 031 for Gyeonggi, 051 for Busan). When researching places on blogs or Instagram, copy the phone number (e.g. '02-737-7444'). Paste those digits directly into the Naver Map search bar. The app bypasses all language parsing and drops a pin directly on the storefront rooftop.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Decoding Korean Subway Platform Graphics",
      },
      {
        type: "paragraph",
        text: "When Naver Map calculates a subway journey involving a line transfer (for example, transferring from Line 1 to Line 3 at Jongno 3-ga), look closely at the route summary card. You will see a small train icon with numbers such as '4-2' or '7-4'.",
      },
      {
        type: "paragraph",
        text: "This indicates Car 4, Door 2. When you board the train, stand in front of the platform screen door marked 4-2. When the train stops at your transfer station, the doors will open directly aligned with the transfer stairs or escalator, saving you up to 300 meters of brisk walking through crowded underground tunnels.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-currency-exchange-rates-seoul",
    slug: "currency-exchange-rates-seoul",
    status: "published",
    seoTitle: "Never Exchange Cash at Airport Counters: Seoul Currency Guide | Real Korea",
    seoDescription: "Airport bank booths take 8-12% spreads. The exact street in Myeongdong with 0.3% spot rates and how to use Global ATMs.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Never exchange cash at Incheon Airport counters",
    dek: "Airport banks charge 8–12% spread markups. Private licensed booths in Myeongdong trade within 0.3% of the interbank rate.",
    topic: "money",
    neighborhoodSlugs: ["myeongdong", "icn-songdo"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tax-refund-immediate-vs-airport"],
    relatedPlaceSlugs: ["myeongdong-street-food-trap"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85",
      alt: "Currency exchange counter signs in Myeongdong Seoul",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "💵 The Chinese Embassy Exchange Alley",
        body: "Walk to the pedestrian alley facing the Chinese Embassy in Myeongdong (near Hansung Chinese Primary School). The two booths named 'Money Box Myeongdong' and 'Ambassador Exchange' (대사관앞환전소) offer Seoul's tightest exchange margins on USD, EUR, JPY, SGD, and TWD.",
      },
      {
        heading: "🚫 Crisp $100 Bills Only",
        body: "Private currency booths require crisp, untorn banknotes without pen marks or creases. Smaller denominations ($1, $5, $20) receive inferior exchange rates (1–3% lower). Bring fresh, unblemished $100 or €100 notes for maximum value.",
      },
      {
        heading: "🏧 Beware DCC at Global ATMs",
        body: "When withdrawing Korean Won from a Global ATM using your home bank debit card, always select 'Continue Without Conversion' or 'Bill in KRW'. If you select your home currency (USD/EUR), the local ATM charges a predatory 5–8% conversion spread.",
      },
      {
        heading: "💳 WOWPASS Cash Infeed Machine",
        body: "You can insert foreign cash directly into orange WOWPASS kiosks located at airport stations and subway hubs. The machine converts your home currency directly into a KRW prepaid card with near-Myeongdong spot rates.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 100,000 KRW Airport Spread Trap",
      },
      {
        type: "paragraph",
        text: "Stepping off a 14-hour long-haul flight into the Incheon Airport arrivals hall, the glowing bank counters (Woori Bank, Shinhan Bank, Hana Bank) look reassuring and official. Exchanging all your spending cash right there is the single most expensive mistake first-time travelers make.",
      },
      {
        type: "paragraph",
        text: "Airport bank branches operate on massive operational overhead and captive tourist convenience. They apply an 8% to 12% spread markup against the official Google/Reuters mid-market exchange rate. If you exchange $1,000 USD at an airport counter, you will receive approximately 1,280,000 KRW. Take that exact same $1,000 USD to a licensed private exchange booth in Myeongdong, and you will receive over 1,365,000 KRW.",
      },
      {
        type: "paragraph",
        text: "That 85,000 KRW ($65 USD) difference is not pocket change—it easily pays for two lavish Korean BBQ dinners with drinks or three days of luxury coffee and bakery visits.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Myeongdong Currency Exchange Cluster",
      },
      {
        type: "paragraph",
        text: "For decades, the pedestrian alleyway directly in front of the Embassy of the People's Republic of China in Myeongdong (Myeongdong 2-ga) has served as Seoul's unofficial open-air currency exchange capital. Over a dozen licensed, government-registered currency exchange businesses compete side-by-side within a 50-meter radius.",
      },
      {
        type: "paragraph",
        text: "Because of intense local price competition, booths such as 'Ambassador Exchange' (대사관앞환전소), 'Money Box', and 'Ilpumhyang Exchange' trade with razor-thin margins of 0.2% to 0.5% off the real-time interbank rate. There are zero hidden transaction fees, zero commissions, and the digital rate boards display the exact cash payout down to the single Won.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. The Banknote Condition Rule",
      },
      {
        type: "paragraph",
        text: "Private exchange booths in Korea are extremely meticulous regarding physical paper currency quality. Tellers inspect every bill under high-magnification ultraviolet scanners. If your foreign banknote has minor ink stamps, tears along the crease, heavy wrinkling, or dog-eared corners, the teller will either reject the bill entirely or deduct a 3% to 5% damaged-note penalty.",
      },
      {
        type: "paragraph",
        text: "Always visit your home bank before departure and specifically request brand new, uncirculated $100 USD (Series 2013 or newer) or €100 / €50 EUR notes. Keep them flat in a rigid passport wallet during travel.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Global ATM Cash Withdrawals: Avoiding the DCC Scam",
      },
      {
        type: "paragraph",
        text: "If you prefer withdrawing cash directly using a zero-foreign-transaction-fee debit card (such as Charles Schwab, Wise, or Revolut), look specifically for ATM machines marked with the blue 'Global ATM' logo in major subway stations and commercial bank branches.",
      },
      {
        type: "paragraph",
        text: "During the transaction, the screen will ask: 'Would you like to be billed in KRW or [Your Home Currency]?' This is Dynamic Currency Conversion (DCC). ALWAYS choose KRW (Korean Won). If you choose your home currency, the local Korean ATM operator performs the exchange at a brutal 6% markup. If you choose KRW, your home bank handles the conversion at the true interbank rate with zero spread.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-korean-bbq-ordering-rules",
    slug: "korean-bbq-ordering-rules",
    status: "published",
    seoTitle: "K-BBQ Etiquette: Why Ordering 1 Portion of Pork Belly Is Forbidden | Real Korea",
    seoDescription: "Why Korean meat houses require 2-portion minimums, table etiquette, scissors usage, and how solo diners can eat comfortably.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "K-BBQ Etiquette: Why ordering 1 portion of pork belly is forbidden",
    dek: "Charcoal grill houses require a minimum 2-person initial meat order even if you are dining alone. Here is how the table etiquette works.",
    topic: "etiquette",
    neighborhoodSlugs: ["euljiro", "gangnam-sinsa"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["table-for-one-refused-kbbq", "tipping-culture-south-korea"],
    relatedPlaceSlugs: ["chamsoot-charcoal-kbbq-sinsa", "daedo-sikdang-wangsimni"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
      alt: "Pork belly grilling over oak charcoal with metal banchan dishes",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "⚡ The Solo Diner Entrance Phrase",
        body: "To avoid awkward crossed-arm rejections at the door, say clearly upon entering: 'Honbap gwaenchan-ayo? 2-inboon jumun-halgeyo' (혼밥 괜찮아요? 2인분 주문할게요 — Solo dining OK? I will order 2 portions). You pay ~32,000 KRW for two portions of pork belly, and the staff will happily prepare a full table.",
      },
      {
        heading: "✂️ Scissors & Tongs Etiquette",
        body: "The diner holding the metal tongs cuts the meat into bite-sized strips along the grain once the exterior has seared. Never use the dining table scissors to cut raw garlic or fresh salad in front of the owner—they are reserved strictly for hot meat and aged kimchi.",
      },
      {
        heading: "🥬 The One-Bite Ssam Rule",
        body: "When building a lettuce or perilla leaf wrap (ssam), fold it into a compact parcel and put the entire wrap into your mouth in a SINGLE bite. Biting a wrap in half causes juices and sauce to spill and is considered clumsy in Korean dining etiquette.",
      },
      {
        heading: "💨 Exhaust Hood Placement",
        body: "Do not push the metallic ceiling exhaust hood all the way up. Pull it down until it hovers roughly 5–10 cm directly above the meat to prevent smoke from filling the room and triggering fire alarms.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Economics of the Charcoal Table: Why 1 Portion Is Refused",
      },
      {
        type: "paragraph",
        text: "Solo travelers in Seoul frequently walk into authentic neighborhood K-BBQ restaurants (Gogijip), attempt to order one portion of Samgyeopsal (pork belly), and are immediately met with crossed arms and a polite refusal. Many assume this is xenophobia or anti-solo discrimination. In reality, it is purely an economic calculation.",
      },
      {
        type: "paragraph",
        text: "Lighting a bucket of red-hot hardwood lump oak charcoal costs the restaurant 4,000 to 6,000 KRW in raw fuel and labor before a single slice of meat touches the grill. Furthermore, every table receives an extensive spread of complimentary banchan (aged kimchi, seasoned scallions, garlic cloves, ssamjang paste, pickled radishes, fresh lettuce, and often a boiling complimentary doenjang stew)—all of which include unlimited free refills.",
      },
      {
        type: "paragraph",
        text: "If a solo diner occupies a 4-person dining booth during prime dinner hours (18:00–21:00) and orders only a single 15,000 KRW portion of pork, the restaurant loses money on the table. The 2-portion minimum is a universal operational rule across all charcoal meat establishments.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. How Solo Diners Can Feast Like Royalty",
      },
      {
        type: "paragraph",
        text: "If you are traveling solo, you do not need to deprive yourself of Seoul's incredible charcoal barbecue culture. Simply walk in with confidence, hold up two fingers, and tell the server you will order two portions for yourself.",
      },
      {
        type: "paragraph",
        text: "Two standard portions of pork belly total approximately 300 to 400 grams of meat—an entirely manageable and satisfying dinner for an active adult walking 20,000 steps a day. The server will happily light the charcoal, set out the entire banquet of side dishes, and treat you with warm hospitality.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. The Art of the Ssam (쌈) Wrap",
      },
      {
        type: "paragraph",
        text: "Eating Korean BBQ properly is an interactive ritual. Follow the traditional multi-layer construction protocol:",
      },
      {
        type: "paragraph",
        text: "1. Place a fresh green lettuce leaf flat on your palm. Layer a perilla leaf (kkaennip) on top for its fragrant herbal aroma. 2. Take a golden, crispy slice of grilled pork belly fresh off the charcoal wire. 3. Dip the meat lightly in toasted sesame oil with sea salt (gireumjang) or dab with ssamjang (red soybean-chili paste).",
      },
      {
        type: "paragraph",
        text: "4. Add a slice of grilled garlic clove, a pinch of seasoned scallion salad (pajeori), and a strand of grilled kimchi. 5. Fold the leaves around the ingredients into a tight, sealed bite-sized sphere. Place the entire parcel into your mouth at once.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. The Kkakdugi Fried Rice & Cold Noodle Finale",
      },
      {
        type: "paragraph",
        text: "In Korea, meat is considered only the first course of a barbecue meal. When only 2 or 3 pieces of meat remain on your grill, wave to the staff and order your 'Hugik' (post-meal finisher).",
      },
      {
        type: "paragraph",
        text: "If dining at a cast-iron pan restaurant (like Daedo Sikdang), order 'Bokkeumbap' (볶음밥). The staff will toss steamed rice, fermented radish, and seaweed flakes into the rendered beef fat remaining on the skillet, pressing it down until a crackling golden crust forms on the bottom. If dining over charcoal, order a chilled metal bowl of 'Mul-naengmyeon' (물냉면)—the ice-cold beef broth and chewy buckwheat noodles instantly cut through the rich pork oils on your palate.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-olive-young-instant-tax-refund",
    slug: "olive-young-instant-tax-refund",
    status: "published",
    seoTitle: "Olive Young Tax Refund: Instant Checkout Discount vs Airport Customs | Real Korea",
    seoDescription: "Spend 15,000 KRW and show your physical passport to skip airport tax queues. Max limits and duty-free seal rules explained.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Olive Young Tax Refund: Instant checkout discount vs Airport customs",
    dek: "Show your physical passport at the register for purchases over 15,000 KRW to get an immediate 7–8% VAT deduction on the spot.",
    topic: "money",
    neighborhoodSlugs: ["myeongdong", "hongdae-yeonnam"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tax-refund-immediate-vs-airport"],
    relatedPlaceSlugs: ["myeongdong-street-food-trap"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85",
      alt: "Olive Young cosmetics store interior aisle shelves in Seoul",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "🛂 Physical Passport Mandatory",
        body: "Cashiers are legally prohibited by Korean customs law from accepting passport photos on smartphones or photocopies. You must hand over your original physical passport booklet before items are scanned.",
      },
      {
        heading: "🛍️ Tamper-Evident Bag Rules",
        body: "If the cashier seals your cosmetics inside a clear duty-free bag with red tamper-evident tape, do NOT open it if you intend to bring liquid skincare over 100ml in your carry-on luggage. Pack liquids into your checked bags instead.",
      },
      {
        heading: "⏰ The 21:30 Checkout Rush",
        body: "Flagship Olive Young stores in Myeongdong and Hongdae suffer 45-minute checkout queues between 21:00 and 22:30. Shop in residential neighborhood branches (e.g., Jongno 3-ga, Gongdeok, or Mapo) for identical stock with zero line.",
      },
      {
        heading: "💰 15,000 KRW Threshold",
        body: "South Korea lowered the immediate tax deduction threshold to 15,000 KRW (down from 30,000 KRW). You qualify for an instant tax cut on almost any purchase containing 2–3 sheet masks or a serum.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 15,000 KRW Minimum: Immediate Discount at the Register",
      },
      {
        type: "paragraph",
        text: "South Korea has one of the world's most seamless tourist tax refund systems, but many visitors still needlessly waste hours in long lines at Incheon Airport customs kiosks on their departure day.",
      },
      {
        type: "paragraph",
        text: "In 2024, the South Korean National Tax Service lowered the minimum qualification threshold for 'Immediate Tax Refund' (현장 즉시 환급) to just 15,000 KRW per single transaction. At major retail chains displaying the Tax-Free logo—including Olive Young, Daiso flagship stores, ABC Mart, Uniqlo, and Gentle Monster—the 7% to 8% Value Added Tax (VAT) is deducted directly at the point of sale.",
      },
      {
        type: "paragraph",
        text: "When you approach the cash register, simply say 'Tax Free' and hand over your physical passport. The cashier scans your passport machine-readable barcode. The register calculates the net tax-free total, and your international credit card is charged only the discounted price. There are zero receipts to mail, zero stamps required, and zero airport kiosk queues.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Legal Limits: 1,000,000 KRW Per Transaction",
      },
      {
        type: "paragraph",
        text: "Immediate in-store tax refunds are subject to official legal transaction ceilings designed to prevent commercial export fraud:",
      },
      {
        type: "paragraph",
        text: "• Single Transaction Maximum: 1,000,000 KRW (inclusive of tax). If you purchase luxury skincare, high-end electronics, or designer fashion totaling over 1,000,000 KRW in a single receipt, the store cannot deduct the tax immediately. They will issue an official Tax-Free Slip with a barcode that you must scan at the airport customs terminal before luggage drop-off.",
      },
      {
        type: "paragraph",
        text: "• Total Trip Maximum: 5,000,000 KRW cumulative across your entire stay in South Korea. Any purchases exceeding this cumulative threshold must be processed via airport customs inspection.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. The Liquid Carry-On Security Trap",
      },
      {
        type: "paragraph",
        text: "The most common and painful airport mistake involves skincare liquids. When tourists receive instant tax refunds on sunscreens, toners, cleansing oils, and ampoules, they often pack them into their carry-on backpacks assuming the sealed tax-free bag bypasses aviation security.",
      },
      {
        type: "paragraph",
        text: "Airport security checkpoint staff DO NOT care about your tax-free status. International aviation security law strictly limits carry-on liquids, gels, and aerosols to 100ml per container. If you have full-sized 150ml toner bottles in your carry-on, security officers will confiscate and throw them into the trash bin immediately.",
      },
      {
        type: "paragraph",
        text: "Always pack all cosmetic bottles, creams, and serums into your checked luggage BEFORE you drop your bags at the airline check-in counter.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Dodging the Myeongdong Olive Young Stampede",
      },
      {
        type: "paragraph",
        text: "The massive Olive Young Myeongdong Town flagship store is notoriously overcrowded. Between 19:30 and 22:30, the store resembles a subway platform during rush hour, with hundreds of tourists clutching shopping baskets and waiting 35 to 50 minutes in serpentine checkout queues.",
      },
      {
        type: "paragraph",
        text: "Here is the local insider strategy: Olive Young operates over 1,300 retail locations nationwide. If you take the subway just two stops away to Jongno 3-ga, Euljiro 4-ga, or Mapo, the residential branch carries the exact same promotional sale items, 1+1 bundle specials, and tax refund scanning terminals with virtually zero checkout wait time.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-kakaot-taxi-foreign-card-guide",
    slug: "kakaot-taxi-foreign-card-guide",
    status: "published",
    seoTitle: "Calling Kakao T Without a Korean Credit Card: Step-by-Step | Real Korea",
    seoDescription: "How to bypass domestic identity verification in Kakao Taxi and pay drivers directly with foreign Visa/Mastercard.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Calling Kakao T without a Korean credit card",
    dek: "Select 'General Request' and choose 'Pay to driver directly' to summon regular taxis and swipe your foreign Visa/Mastercard in person.",
    topic: "transit",
    neighborhoodSlugs: ["hongdae-yeonnam", "gangnam-sinsa"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["kakao-taxi-foreign-credit-card", "does-uber-work-in-seoul"],
    relatedPlaceSlugs: ["chamsoot-charcoal-kbbq-sinsa"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
      alt: "Seoul taxi driving along brightly lit city boulevard at night",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "⚡ The 'Pay Directly' Toggle",
        body: "When confirming your ride, do NOT select Kakao Pay or Automatic Card. Swipe the horizontal payment carousel to the far right until you see 'Pay to Driver Directly' (기사님께 직접 결제). This bypasses the Korean domestic identity verification wall completely.",
      },
      {
        heading: "🚖 Uber / UT as Backup",
        body: "Your home country Uber app works seamlessly in Seoul (branded as UT). It links to your international credit card automatically without requiring Korean verification. However, Uber has fewer registered drivers in outer districts than Kakao T.",
      },
      {
        heading: "🌃 00:00 Midnight Dispatch Hacks",
        body: "Between 23:30 and 01:30 in nightlife hotspots like Hongdae or Gangnam, regular General Taxis reject short distance calls. Upgrade to 'Kakao T Blue' or 'Kakao Venti' (which pays drivers higher dispatch bonuses) to secure an instant vehicle.",
      },
      {
        heading: "💳 Physical Card Tap in Taxi",
        body: "Every registered taxi in South Korea has a digital card reader mounted between the front seats. When you arrive, simply tap your foreign Visa/Mastercard or T-money card against the console. A printed tax receipt is issued automatically.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. Why Kakao T Fails International Credit Cards in App",
      },
      {
        type: "paragraph",
        text: "Kakao T (Kakao Taxi) is South Korea's dominant ride-hailing application, commanding over 90% of the nationwide taxi dispatch market. However, when international tourists download the app and attempt to add their foreign Visa, Mastercard, or American Express cards to the in-app payment profile, they hit an inescapable roadblock.",
      },
      {
        type: "paragraph",
        text: "South Korean financial cybersecurity regulations require all automatic in-app billing systems to authenticate via domestic Korean Resident Registration Numbers (RRN) or Alien Registration Cards (ARC) linked to a Korean mobile telecom carrier. Because foreign cards lack this domestic authentication token, registering them inside Kakao T is technically impossible.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Step-by-Step 'Pay to Driver' Bypass Method",
      },
      {
        type: "paragraph",
        text: "You do not need a Korean bank account to summon taxis on Kakao T. Follow this exact workflow to bypass the registration wall:",
      },
      {
        type: "paragraph",
        text: "1. Open Kakao T and set your pickup point and destination using the English search or map pin. 2. Select 'General Request' (일반호출). 3. On the ride confirmation screen, look at the payment method carousel above the blue Call button.",
      },
      {
        type: "paragraph",
        text: "4. Swipe the payment options horizontally all the way to the far right. 5. Tap the gray button that says 'Pay to Driver Directly' (기사님께 직접 결제). 6. Tap Call Taxi. The app will immediately dispatch the nearest available metered sedan.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Settling Payment Inside the Vehicle",
      },
      {
        type: "paragraph",
        text: "When your driver arrives, confirm the 4-digit license plate number shown in your app before entering. The driver's dashboard tablet will already have your destination GPS route pre-loaded, eliminating all language barriers.",
      },
      {
        type: "paragraph",
        text: "When you reach your destination, the driver presses the taximeter total button. You can pay using your physical foreign credit card (Visa, Mastercard, Amex), your T-money transit card, or cash. Every licensed taxi in Korea is legally mandated to operate a fully functional card terminal connected directly to the National Tax Service.",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Nightlife Peak Hours: When Standard Taxis Refuse Calls",
      },
      {
        type: "paragraph",
        text: "If you are trying to leave Hongdae, Itaewon, Apgujeong, or Gangnam Station between 23:30 and 01:30 on Friday or Saturday nights, standard 'General Request' calls will frequently time out without any driver accepting your fare—especially for short trips under 10,000 KRW.",
      },
      {
        type: "paragraph",
        text: "In this scenario, switch to 'Kakao T Blue' or 'Kakao Venti' (large luxury vans). These premium tiers use an automatic algorithmic dispatch system where drivers cannot see your destination before accepting the fare and cannot refuse the call. Alternatively, open your foreign Uber app to ping nearby UT partner drivers.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-tap-water-arisu-safety",
    slug: "tap-water-arisu-safety",
    status: "published",
    seoTitle: "Can You Drink Tap Water in Seoul? The Arisu Reality & Old Pipe Risks | Real Korea",
    seoDescription: "Seoul tap water (Arisu) passes 350 WHO tests, but old building pipes and rooftop water tanks remain a real risk. Filter showerheads and restaurant water rules.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Can you drink tap water in Seoul? The Arisu reality vs. old pipe risks",
    dek: "Seoul municipal water (Arisu) is 100% safe at the plant. The problem is the 30-year-old galvanized pipes inside older villas and hanoks.",
    topic: "survival",
    neighborhoodSlugs: ["jongno", "euljiro", "hongdae-yeonnam"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["can-i-drink-tap-water-in-seoul"],
    relatedPlaceSlugs: ["dongwon-jip-euljiro"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=85",
      alt: "Clean drinking water pouring into a clear glass in a modern Seoul cafe",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "🚰 Arisu Municipal Quality",
        body: "Seoul's tap water brand 'Arisu' (아리수) is rigorously purified across 6 major water plants and tested for 350 quality indicators—exceeding WHO drinking water guidelines. You can safely brush your teeth and boil water anywhere in the city.",
      },
      {
        heading: "🏢 Old Villa & Hanok Caution",
        body: "If staying in an Airbnb inside a red-brick multi-unit villa built before 1994, the building may still have aging galvanized steel pipes or uncleaned rooftop water tanks. Buy 2-liter bottled water (Samdasoo) at convenience stores for 1,100 KRW for unboiled drinking.",
      },
      {
        heading: "🍽️ Restaurant Water Bottles",
        body: "The stainless-steel water carafes or plastic bottles placed on dining tables in Korean restaurants contain cold filtered water from dedicated multi-stage filtration dispensers (Coway/ChungHo). It is completely clean and complimentary.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Arisu Paradox: World-Class Purification, Low Domestic Consumption",
      },
      {
        type: "paragraph",
        text: "The Seoul Metropolitan Government has invested billions of dollars into advanced membrane filtration and ozone disinfection technology, producing municipal tap water branded as 'Arisu'. Chemical testing consistently proves that Seoul tap water is as clean and mineral-rich as Evian.",
      },
      {
        type: "paragraph",
        text: "Despite this, fewer than 5% of Seoul residents drink unboiled water directly from the kitchen faucet. This national habit stems from the rapid urban industrialization era of the 1980s and 1990s, when aging plumbing created widespread skepticism that persists across generations.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Building Vintage Factor: 1994 Plumbing Cutoff",
      },
      {
        type: "paragraph",
        text: "The water leaving the Seoul municipal treatment plant is pristine. However, its quality at your faucet depends entirely on the pipes inside your specific building. In 1994, South Korea banned the use of corrosion-prone galvanized steel water pipes in residential construction.",
      },
      {
        type: "paragraph",
        text: "If you are staying in a modern high-rise hotel or newly constructed officetel (built after 2000), the internal pipes are stainless steel or corrosion-free PVC, making direct tap water safe. If your accommodation is an older walk-up villa in Yeonnam-dong or an unrestored traditional hanok in Bukchon, rust particles and mineral sediment can leach into standing tap water overnight.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Practical Rules for Travelers",
      },
      {
        type: "paragraph",
        text: "• Teeth Brushing & Face Washing: Completely safe with tap water in every hotel, hostel, and apartment in Korea.",
      },
      {
        type: "paragraph",
        text: "• Boiling for Tea/Ramen: Boiling tap water in an electric kettle eliminates all chlorine aroma and makes it 100% safe to consume.",
      },
      {
        type: "paragraph",
        text: "• Raw Cold Drinking Water: Grab a 2-liter bottle of Jeju Samdasoo (제주 삼다수) or Baeksansoo (백산수) from any convenience store for ~1,100 KRW ($0.80 USD), or use the hot/cold filtered water dispenser located in your hotel lobby or guesthouse kitchen.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-convenience-store-atm-withdrawal",
    slug: "convenience-store-atm-withdrawal",
    status: "published",
    seoTitle: "Convenience Store ATM Fees vs. Bank Global ATMs: How to Avoid the 6,000 KRW Penalty | Real Korea",
    seoDescription: "Why standalone GS25/CU ATMs charge massive third-party transaction fees and how to find true Global ATMs at major Korean banks.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Convenience store ATM fees vs. bank Global ATMs",
    dek: "Standalone convenience store cash machines charge steep third-party access fees. Major bank branches offer fee-free Global ATM transactions.",
    topic: "money",
    neighborhoodSlugs: ["hongdae-yeonnam", "jongno", "gangnam-sinsa"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tax-refund-immediate-vs-airport"],
    relatedPlaceSlugs: ["myeongdong-street-food-trap"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85",
      alt: "Bank ATM kiosk lobby in downtown Seoul",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "🏦 Bank Branch Hours (09:00–16:00)",
        body: "Major retail banks (Shinhan, Woori, Hana, KB Kookmin) have automated ATM glass vestibules that remain open from 07:00 to 23:30 even when bank branch teller desks close at 16:00.",
      },
      {
        heading: "🚫 White Box ATMs in Convenience Stores",
        body: "White unbranded ATM machines inside CU or 7-Eleven run on third-party private ATM networks (Nice, CyberNet). They charge a 3,500 to 6,000 KRW domestic surcharge on international Visa/Mastercard debit cards on top of your home bank fees.",
      },
      {
        heading: "🏧 Look for the 'Global ATM' Blue Decal",
        body: "Only bank ATMs labeled with the silver/blue 'Global ATM' (글로벌 ATM) logo have multi-language firmware that accepts international 4-digit and 6-digit PIN numbers without card rejection.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Independent ATM Fee Squeeze",
      },
      {
        type: "paragraph",
        text: "When you need quick cash at midnight in Hongdae to pay for street food, walking into the nearest convenience store seems effortless. However, standalone convenience store cash dispensers are operated by independent ATM concessionaires rather than commercial banks.",
      },
      {
        type: "paragraph",
        text: "These private machines hit international cards with an automatic 3,800–6,000 KRW access fee per withdrawal. If your home bank also charges a $3 to $5 out-of-network foreign ATM fee, pulling out a modest 50,000 KRW ($38 USD) can incur nearly $10 in combined transaction penalties.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. Finding True Commercial Bank Global ATMs",
      },
      {
        type: "paragraph",
        text: "To avoid unnecessary fees, look for the official branches of South Korea's big four commercial banks: Shinhan Bank (신한은행), Woori Bank (우리은행), Hana Bank (하나은행), and KB Kookmin Bank (KB국민은행).",
      },
      {
        type: "paragraph",
        text: "Inside the bank's ATM vestibule, locate the specific machine displaying the 'Global ATM' emblem. Tap 'Foreign Card / English' on the touchscreen. If you use a zero-fee travel debit card (such as Wise, Revolut, or Charles Schwab), the bank ATM charges zero local operator markup.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-pojangmacha-cash-price-rules",
    slug: "pojangmacha-cash-price-rules",
    status: "published",
    seoTitle: "Jongno Pojangmacha Street Tents: Cash Rules, Minimum Spend & Card Refusal | Real Korea",
    seoDescription: "Why orange street tent bars in Jongno 3-ga refuse credit cards, typical dish prices (15,000-20,000 KRW), and how to order like a local.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Jongno Pojangmacha street tents: Cash rules & price reality",
    dek: "Iconic orange street tent bars in Jongno 3-ga and Euljiro are cash or bank-transfer only. Prices run 15,000–25,000 KRW per main dish.",
    topic: "etiquette",
    neighborhoodSlugs: ["jongno", "euljiro"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tipping-culture-south-korea"],
    relatedPlaceSlugs: ["dongwon-jip-euljiro", "sunhee-bindaetteok-gwangjang"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
      alt: "Glowing orange pojangmacha tent street stalls at night in Jongno",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "💵 Cash-Only Operation",
        body: "Street tent bars operate without fixed landline POS credit card terminals. Prepare 30,000–50,000 KRW in physical cash before sitting down on the plastic stools.",
      },
      {
        heading: "🍢 1-Dish-Per-Table Minimum",
        body: "You cannot sit down at a pojangmacha just to order a single bottle of soju and snack on free broth. Every table must order at least one hot stir-fried main dish (Anju) starting from 15,000 KRW.",
      },
      {
        heading: "🍲 Complimentary Eomuk Broth",
        body: "Every tent provides free bowls of steaming fish cake radish broth (Eomuk-guk). Staff will refill your hot broth for free throughout your drinking session.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The K-Drama Romance vs. Real Street Tent Economics",
      },
      {
        type: "paragraph",
        text: "The glowing orange vinyl tents lining the streets around Jongno 3-ga Station (Exits 3, 4, and 6) and Euljiro are iconic symbols of Seoul night culture. Travelers envision eating cheap 3,000 KRW street food under the plastic tarps.",
      },
      {
        type: "paragraph",
        text: "In reality, a Pojangmacha (포장마차) is not a cheap snack cart—it is a full-fledged open-air drinking pub. Main stir-fried dishes (such as spicy stir-fried hagfish, chicken gizzard, spicy pork cartilage, or grilled sea snails) range between 15,000 and 25,000 KRW per plate. A casual drinking session for two with two dishes and four bottles of soju/beer quickly tallies 45,000 to 60,000 KRW.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Bank Transfer (Gyejwa-Iche) Culture",
      },
      {
        type: "paragraph",
        text: "Because street tents are mobile temporary structures, they lack merchant card terminals. Domestic Korean customers pay using instant mobile bank transfer (계좌이체) by scanning the owner's bank account number taped to the tent roof frame.",
      },
      {
        type: "paragraph",
        text: "Since international tourists cannot execute domestic Korean bank wires without an ARC card, you must hand over physical Korean Won cash banknotes. Always check your wallet before claiming a stool.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-jimjilbang-sauna-sleepover",
    slug: "jimjilbang-sauna-sleepover",
    status: "published",
    seoTitle: "Seoul Jimjilbang Sleepover Survival Guide: Lockers, Etiquette & Overnight Rules | Real Korea",
    seoDescription: "How to stay overnight in a Korean bathhouse for 15,000 KRW. Complete guide to gender segregation, locker wristbands, mat etiquette, and sauna rules.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Seoul Jimjilbang sleepover: Lockers, sauna etiquette & overnight rules",
    dek: "Overnight Korean bathhouses offer heated ondol floor sleeping for ~16,000 KRW. Here is the exact protocol to avoid cultural confusion.",
    topic: "survival",
    neighborhoodSlugs: ["jongno", "hongdae-yeonnam", "gangnam-sinsa"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tipping-culture-south-korea"],
    relatedPlaceSlugs: ["darakhyu-capsule-incheon"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=85",
      alt: "Heated wooden pine sauna interior in a traditional Korean bathhouse",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "🧼 Full Nudity in Gender-Segregated Baths",
        body: "Swimsuits are strictly prohibited in the hot soaking pools (Mokyoktang). You must shower thoroughly with soap at the seated washing stalls before entering any communal hot or cold tub.",
      },
      {
        heading: "👕 Unisex Jimjilbang Loungewear",
        body: "After bathing, change into the matching cotton t-shirt and shorts (Jimjilbok) provided at check-in. The common heated floor halls, salt kilns, snack bars, and sleeping zones are fully co-ed.",
      },
      {
        heading: "🥚 Sikhye & Baked Egg Tradition",
        body: "At the 24-hour snack counter, order chilled sweet fermented rice punch (Sikhye, ~3,500 KRW) and brown kiln-baked eggs (Maekbanseok Gyeran, ~2,500 KRW for 3). Crack the egg shell against your friend's forehead or the wooden floor.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 16,000 KRW Overnight Shelter",
      },
      {
        type: "paragraph",
        text: "If you miss the midnight subway train or arrive in Seoul on a late red-eye flight without an active hotel reservation, a 24-hour Jimjilbang (찜질방) is the quintessential Korean emergency sleep sanctuary. For 15,000 to 18,000 KRW, you receive 12 to 24 hours of access to hot mineral baths, sauna kilns, and communal heated ondol sleeping floors.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Check-in & Keycard Protocol",
      },
      {
        type: "paragraph",
        text: "At the entrance front desk, state 'Jimjilbang' to receive your locker key wristband and two towels. 1. Remove your shoes and lock them in the numbered shoe locker matching your wristband. 2. Proceed to the gender-segregated changing room and locate your large luggage/clothing locker. 3. Strip down completely, grab your small towel, and enter the wet bath area.",
      },
      {
        type: "paragraph",
        text: "Your electronic wristband acts as a digital charge card inside the facility. When you buy snacks, drinks, or massage chair sessions, simply tap the wristband at the counter. All expenses are settled at the front desk when you check out the next morning.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Sleeping Comfort & Mat Etiquette",
      },
      {
        type: "paragraph",
        text: "In the large common hall, locate the stacks of foam sleeping mats (maeteu) and hard faux-leather cylinder pillows (mokbege). Claim an open floor space away from the main walking paths. Korean ondol floors are heated from underneath, providing comforting warmth during autumn and winter nights. Earplugs and an eye mask in your backpack will drastically improve your sleep quality.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-seoul-bus-color-coding",
    slug: "seoul-bus-color-coding",
    status: "published",
    seoTitle: "Seoul City Buses Decoded: Blue, Green, Red, Yellow Fares & Tag-Off Penalty Rules | Real Korea",
    seoDescription: "Why forgetting to tap your T-money card when exiting Seoul buses charges maximum penalty fares. Complete guide to bus colors, routes, and transfer windows.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Seoul City buses decoded: Colors, fares & the tag-off penalty rule",
    dek: "Blue, Green, Red, and Yellow buses serve different distances. Always tap your T-money card when exiting to avoid double-fare penalties.",
    topic: "transit",
    neighborhoodSlugs: ["jongno", "gangnam-sinsa", "hongdae-yeonnam"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["apple-pay-on-a-seoul-bus"],
    relatedPlaceSlugs: ["dongwon-jip-euljiro"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
      alt: "Blue and Green city buses stopped along central Seoul transit avenue",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "⚡ The Tag-Off Requirement",
        body: "Always tap your transit card on the rear exit door reader when stepping off the bus. If you fail to tap out, the transit computer assumes you rode to the absolute end of the route and deducts a maximum distance surcharge on your next journey.",
      },
      {
        heading: "🔄 30-Minute Free Transfer Window",
        body: "Transferring between different bus routes or from bus to subway is 100% free (or requires only a small distance top-up of 100–200 KRW) if you tap into your next transit vehicle within 30 minutes of exiting the previous one (extended to 60 minutes after 21:00).",
      },
      {
        heading: "🚫 Front In, Rear Out Rule",
        body: "Board strictly through the front door beside the driver and tap the card reader. Exit strictly through the wider rear middle doors. Never attempt to board through the rear door unless the driver explicitly waves you in during severe overcrowding.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 4-Color Bus Network Hierarchy",
      },
      {
        type: "paragraph",
        text: "Seoul operates one of the most punctual and extensive surface bus networks in the world, with color-coded liveries indicating vehicle speed and operational scope:",
      },
      {
        type: "paragraph",
        text: "• Blue Buses (간선버스, Trunk Lines): Connect major outer districts directly to downtown Seoul (Jongno, City Hall, Gangnam) along central dedicated highway median lanes. Base fare: 1,500 KRW.",
      },
      {
        type: "paragraph",
        text: "• Green Buses (지선버스, Feeder Lines): Shorter neighborhood routes connecting residential hill communities and alleys to the nearest subway transfer hub. Includes small green village buses (Maeul Bus, 1,200 KRW). Base fare: 1,500 KRW.",
      },
      {
        type: "paragraph",
        text: "• Red Buses (광역버스, Express Commuter Lines): High-speed coaches that bypass local stops to transport commuters from distant Gyeonggi satellite cities (Bundang, Suwon, Incheon) into central Seoul. Base fare: 3,000 KRW.",
      },
      {
        type: "paragraph",
        text: "• Yellow Buses (순환버스, Circular Lines): Downtown loop routes operating around major commercial tourism zones like Namsan Seoul Tower and Myeongdong.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Boarding & Egress Etiquette",
      },
      {
        type: "paragraph",
        text: "Seoul bus drivers accelerate and brake briskly. When boarding, tap your card on the front console reader and grab a handrail or seat immediately. Press the red 'Stop' (하차) bell on the wall or ceiling as soon as your upcoming stop name is broadcast over the loudspeaker. Walk toward the rear exit door and tap your card against the reader while the bus is coming to a stop.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-trash-bins-and-t-money-waste",
    slug: "trash-bins-and-t-money-waste",
    status: "published",
    seoTitle: "Where Are the Public Trash Cans in Seoul? Pay-Per-Bag Laws & Convenience Store Etiquette | Real Korea",
    seoDescription: "Why public trash bins vanished from Seoul sidewalks, volume-based waste disposal laws (Jongnyangje), and how to dispose of trash politely.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Where are the trash bins in Seoul? The Pay-Per-Bag reality",
    dek: "Seoul sidewalks have almost zero public trash cans due to 1995 volume-rate waste laws. Here is where you can legally dispose of litter.",
    topic: "survival",
    neighborhoodSlugs: ["myeongdong", "hongdae-yeonnam", "jongno"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tipping-culture-south-korea"],
    relatedPlaceSlugs: ["myeongdong-street-food-trap"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
      alt: "Pristine pedestrian sidewalk street corner in downtown Seoul",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "🥤 The Takeout Cup Bus Ban",
        body: "Seoul city law strictly forbids passengers from boarding city buses holding open takeout coffee cups or uncovered street food skewers. Drivers will wave you off at the door. Finish your beverage before boarding.",
      },
      {
        heading: "🏪 Convenience Store Sorting Bins",
        body: "Every GS25, CU, and 7-Eleven has dedicated recycling sorting receptacles near the door (Plastic, Cans, Paper, General Trash). You can politely dispose of food wrappers and drink cups there if you purchased items at the store.",
      },
      {
        heading: "🚇 Subway Station Platform Bins",
        body: "The most reliable public trash receptacles are located inside subway stations right beside the customer service booth or near restroom entrances.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 1995 Volume-Based Garbage Disposal Law (Jongnyangje)",
      },
      {
        type: "paragraph",
        text: "One of the first culture shocks international visitors encounter in Seoul is holding an empty iced Americano plastic cup for 45 minutes while walking miles through downtown without seeing a single public trash can.",
      },
      {
        type: "paragraph",
        text: "In 1995, South Korea enacted the 'Jongnyangje' (종량제) volume-rate waste disposal system to enforce nationwide recycling. Under this law, residents must purchase government-certified plastic trash bags to throw away domestic household garbage. When public street bins were common, local residents began dumping their household garbage into street bins to evade bag fees, prompting municipal district offices to systematically remove over 80% of outdoor sidewalk trash cans.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Local Carry-It-With-You Rule",
      },
      {
        type: "paragraph",
        text: "Seoulites carry small plastic bags inside their backpacks or tote bags to store personal litter until returning home. Never leave empty coffee cups on top of fire hydrants, electric transformer boxes, or subway window sills—doing so is considered severe anti-social behavior and can incur a 50,000–100,000 KRW municipal littering fine.",
      },
      {
        type: "paragraph",
        text: "When finished with street snacks, hand the wooden skewer and paper cup back to the stall vendor who sold it to you—they maintain private commercial trash bins behind their cart and will gladly discard it for you.",
      },
    ],
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "tip-bukchon-quiet-hours-curfew",
    slug: "bukchon-quiet-hours-curfew",
    status: "published",
    seoTitle: "Bukchon Hanok Village Night Curfew & Fines: Mandatory Tourist Rules | Real Korea",
    seoDescription: "Jongno-gu's 17:00 to 09:00 tourist entry curfew in Bukchon Hanok residential red zones, 100,000 KRW fines, and respectful visit etiquette.",
    ogImage: null,
    publishedAt: "2026-08-30T10:00:00Z",
    updatedAt: "2026-08-30T10:00:00Z",
    title: "Bukchon Hanok Village night curfew: 17:00 cutoff & fine rules",
    dek: "Residential 'Red Zones' in Bukchon restrict tourist access between 17:00 and 09:00 with 100,000 KRW fines to protect local residents.",
    topic: "etiquette",
    neighborhoodSlugs: ["ikseon-bukchon", "jongno"],
    lastVerifiedAt: "2026-08-30T00:00:00Z",
    editorVerified: true,
    relatedQuestionSlugs: ["tipping-culture-south-korea"],
    relatedPlaceSlugs: ["tosokchon-samgyetang-seochon", "ikseon-artisan-brewery"],
    promotedFromQuestionSlug: null,
    image: {
      src: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=85",
      alt: "Traditional tiled hanok rooftops and stone alleys in Bukchon Village",
      width: 1200,
      height: 800,
    },
    tipBoxes: [
      {
        heading: "⏰ 17:00 Evening Curfew",
        body: "The residential core of Bukchon (Bukchon-ro 11-gil, designated as the Red Zone) is legally closed to tourists from 17:00 (5 PM) to 09:00 the following morning. Municipal enforcement wardens patrol the alley entrances.",
      },
      {
        heading: "⚠️ 100,000 KRW Fines",
        body: "Violating the evening curfew in designated residential zones carries a mandatory 100,000 KRW administrative fine under the Tourism Promotion Act Special Over-Tourism Ordinance.",
      },
      {
        heading: "🤫 Silence in Residential Alleys",
        body: "Bukchon is an active residential neighborhood where families, elders, and children live. Never peer over courtyard walls, shout, use loudspeakers, or fly drones over residential rooftops.",
      },
    ],
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Living Village Reality: Why Curfews Were Enacted",
      },
      {
        type: "paragraph",
        text: "Bukchon Hanok Village is not an outdoor theme park or open-air museum—it is a 600-year-old living residential neighborhood where real Seoul citizens reside in private homes. Due to severe over-tourism, noise pollution, and unauthorized intrusions into private courtyards, the local Jongno District Office enacted mandatory tourist curfew regulations.",
      },
      {
        type: "paragraph",
        text: "Under the Special Over-Tourism Ordinance, Bukchon is divided into Red, Orange, and Yellow zones. The primary postcard alleyway (Bukchon-ro 11-gil) is designated a Red Zone, strictly barring all non-resident visitors from 17:00 in the late afternoon until 09:00 the following morning.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Best Time for Peaceful Photography",
      },
      {
        type: "paragraph",
        text: "To capture stunning photographs of traditional Korean sweeping tiled eaves framing the modern Namsan Seoul Tower skyline without crowds or curfew wardens, visit between 09:15 and 10:30 on weekday mornings.",
      },
      {
        type: "paragraph",
        text: "Keep your voice down to a soft whisper, tread lightly on the stone paving, and respect the privacy signs posted on every front wooden gate.",
      },
    ],
  },
];

export const SEED_TIPS: readonly Tip[] = FULL_16_TIPS;
