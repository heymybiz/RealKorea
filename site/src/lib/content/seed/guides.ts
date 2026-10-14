import type { Guide } from "@/lib/content/types";

import { SAMPLE_BASE } from "./shared";

/**
 * The one Guide PRD 06 §0.6 requires in the code seed: First 24 hours,
 * flagged as the `/first-24-hours` alias (FR-051).
 *
 * The five checklist items are actions, not claims. There are no amounts, no
 * durations, and no "buy it here" instructions — `help` stays null until an
 * editor writes it. The ids are stable because `localStorage` keys off them
 * (PRD 03 §3.3); renumbering them would silently reset every reader's
 * progress.
 */
export const FIRST_24_CHECKLIST_ID = "first-24";

export const SEED_GUIDES: readonly Guide[] = [
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "guide-first-24-hours",
    slug: "first-24-hours-after-icn",
    title: "First 24 Hours in Seoul: The Non-Negotiable Survival Protocol",
    dek: "From touchdown at Incheon to your first hot gukbap bowl in Jongno: five chronological steps to avoid airport scams, data failures, and card lockouts.",
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Runway to Baggage Carousel Checkpoint",
      },
      {
        type: "paragraph",
        text: "The moment your airplane wheels touch down on the Incheon runway, toggle off mobile data on your home carrier SIM to avoid accidental international roaming charges ($10–$15 per day) and turn on your pre-installed Korea eSIM. If you ordered an eSIM QR code before your flight, cellular 5G data should initialize within 30 seconds of taxiing.",
      },
      {
        type: "paragraph",
        text: "If you are picking up a physical SIM card or Wi-Fi Egg, bypass the crowded pre-immigration roaming booths. Complete immigration fingerprinting, collect your bags from Carousel 8, and head to the official carrier service desks (SK Telecom, KT, LG U+) located on 1F Arrivals between Gates 6 and 10.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The 30,000 KRW Cash Rule at Baggage Claim",
      },
      {
        type: "paragraph",
        text: "South Korea is virtually a cashless society for restaurants, retail, and hotels. However, the municipal public transit system operates on an isolated cash-only reload architecture. Neither subway ticket vending machines nor convenience store cash registers can charge T-money transit cards using international credit cards.",
      },
      {
        type: "paragraph",
        text: "Before exiting the secure customs doors, walk to the blue Global ATM (operated by Woori Bank or Shinhan Bank) situated right beside Baggage Carousel 9. Insert your foreign debit card and withdraw exactly 30,000 to 50,000 KRW. Request three to five 10,000 KRW notes (subway kiosks reject 50,000 KRW bills for small reloads).",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Buying & Loading Your T-Money Card",
      },
      {
        type: "paragraph",
        text: "Exit customs into the 1F public arrivals hall and walk straight into the nearest GS25, CU, or 7-Eleven. Ask the cashier for a 'T-money card' (티머니 카드). Cards cost between 4,000 and 5,000 KRW for standard or Kakao Friends cartoon designs. Hand over the card plus 20,000 KRW in cash and say 'I-man-won chung-jeon hae-ju-se-yo' (이만원 충전해 주세요 — Please charge 20,000 KRW).",
      },
      {
        type: "heading",
        level: 2,
        text: "4. Choosing Your Incheon Transit Artery: Express vs. All-Stop AREX",
      },
      {
        type: "paragraph",
        text: "Take the central elevators down to the B1 Transportation Center. Here you must choose between two distinct train services running on the same subterranean tracks:",
      },
      {
        type: "paragraph",
        text: "• AREX Non-Stop Express Train (Orange Livery, 11,000 KRW): Reaches Seoul Station in 43 minutes non-stop. Features reserved numbered airline-style seating, overhead luggage racks, free high-speed Wi-Fi, and onboard flight attendants. Ideal if your accommodation is in Jongno, Myeongdong, Yongsan, or Dongdaemun.",
      },
      {
        type: "paragraph",
        text: "• AREX Commuter All-Stop Train (Blue Livery, 4,750 KRW): Reaches Seoul Station in 59 minutes, stopping at 14 intermediate stations including Gimpo Airport, Digital Media City, and Hongik University (Hongdae). Tap your loaded T-money card directly at the turnstiles. Ideal if staying in Mapo, Hongdae, Sinchon, or Yeouido.",
      },
      {
        type: "heading",
        level: 2,
        text: "5. Your First Meal: The 24-Hour Gukbap Protocol",
      },
      {
        type: "paragraph",
        text: "After checking into your hotel, you will likely feel jet-lagged, dehydrated, and exhausted. Skip complex sit-down multi-course restaurants or crowded tourist lines. Search Naver Map for the nearest 'Gukbap' (국밥) or 'Seolleongtang' (설렁탕) soup house.",
      },
      {
        type: "paragraph",
        text: "A boiling clay pot of rich pork bone or ox bone broth served with fresh kkakdugi radish kimchi and a bowl of steamed rice (10,000–12,000 KRW) resets your digestion and warms your core, giving you the stamina for your first full day of Seoul exploration.",
      },
    ],
    tipBoxes: [
      {
        heading: "⚡ Airport Currency Spread Warning",
        body: "Never exchange large sums of cash ($500+) at airport bank booths (which charge a 2–4% cash spread). Withdraw only 30,000 KRW at the Global ATM for immediate transit, and exchange your main spending budget at private licensed booths in Myeongdong.",
      },
      {
        heading: "🚖 Taxi Line 5C vs Sidewalk Touts",
        body: "Never accept rides from men approaching you inside the arrivals terminal offering 'flat-rate VIP vans' for $150. Walk straight out to Taxi Platform 5C for standard metered city taxis (~90,000–110,000 KRW to downtown including late-night surcharge and tolls).",
      },
    ],
    checklistId: FIRST_24_CHECKLIST_ID,
    checklistItems: [
      {
        id: "first-24-connectivity",
        label: "Activate eSIM & confirm cellular data connection before baggage carousel",
        help: "Check APN settings and keep incoming SMS enabled for verification codes.",
      },
      {
        id: "first-24-cash",
        label: "Withdraw 30,000 KRW cash from 1F Global ATM for transit cards",
        help: "Subway recharge kiosks require physical KRW banknotes.",
      },
      {
        id: "first-24-transit",
        label: "Purchase physical T-money card & charge 20,000 KRW at convenience store",
        help: "Buy CU, GS25, or 7-Eleven card designs (4,000 KRW card fee).",
      },
      {
        id: "first-24-maps",
        label: "Install Naver Map or KakaoMap and test English search by phone number",
        help: "Google Maps walking directions do not function reliably in Korea.",
      },
      {
        id: "first-24-hotel",
        label: "Save hotel Korean road-name address (도로명주소) in phone notes for taxi drivers",
        help: "Drivers enter the 5-digit postal or Korean road name into GPS navigation.",
      },
    ],
    isFirst24Alias: true,
    hero: {
      src: "/photos/tips/first-24-hours-after-icn.webp",
      alt: "Outside the terminal at Incheon International Airport",
      width: 1200,
      height: 800,
    },
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "guide-subway-mastery",
    slug: "seoul-subway-mastery",
    title: "Seoul Subway Mastery: Transfers, Colors, and Underground Shortcuts",
    dek: "How to navigate 23 lines and 700 stations across the capital without getting lost in 2-kilometer underground labyrinth tunnels.",
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Platform Transfer Door Numbers: The 8-Minute Hack",
      },
      {
        type: "paragraph",
        text: "Seoul subway station platforms have two-digit coordinates painted in bold on the platform screen doors (such as '3-2' or '7-4'). The first digit is the train car number; the second digit is the door number.",
      },
      {
        type: "paragraph",
        text: "When you look up any transit route in Naver Map or KakaoMetro, look for the 'Fast Transfer' badge (빠른 환승). Boarding at the designated door means that when the train stops at your transfer station, your door opens directly aligned with the transfer staircase or escalator. In massive multi-layer interchange stations like Express Bus Terminal or Dongdaemun History & Culture Park, this saves you up to 500 meters of brisk underground hiking.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The 30-Minute Free Transfer Window",
      },
      {
        type: "paragraph",
        text: "Seoul operates an integrated metropolitan transfer discount system. When you transfer between different subway lines, between subway and city buses, or between different bus routes, your subsequent journey is 100% free (or charges only a small incremental distance fee of 100–200 KRW for trips exceeding 10 km).",
      },
      {
        type: "paragraph",
        text: "To qualify, you MUST tap your T-money card against the reader when stepping off your first vehicle, and tap onto your connecting vehicle within 30 minutes (extended to 60 minutes between 21:00 and 07:00).",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Subway Etiquette: The Pink Seat & Silence Rules",
      },
      {
        type: "paragraph",
        text: "• The Pregnant Women Seats (임산부 배려석): Marked by bright pink floor decals and pink plush seat covers in the middle of each car. Even when the train is packed and the pink seat is empty, Koreans leave it vacant out of social respect. Never sit here.",
      },
      {
        type: "paragraph",
        text: "• Elderly/Disabled End Sections (노약자석): The three-seat benches at the far ends of every train car are strictly reserved for seniors (65+), pregnant women, and disabled riders. Sitting there as a young able-bodied tourist will frequently draw vocal reprimands from elderly passengers.",
      },
      {
        type: "paragraph",
        text: "• Phone Calls & Music: Speaking loudly on phone calls or listening to audio without headphones is considered severe anti-social behavior on Seoul metro cars. Keep your smartphone on vibrate mode (매너모드).",
      },
    ],
    tipBoxes: [
      {
        heading: "🚪 Wrong Turnstile Emergency Pass",
        body: "If you accidentally tap into the wrong direction turnstile at an older station without cross-platform overpasses, tap out and tap into the correct side within 5 minutes. The system will NOT charge a double fare.",
      },
      {
        heading: "🚇 Line 9 Express vs. All-Stop Traps",
        body: "Line 9 (connecting Gimpo Airport to Gangnam) runs both 'Express' (급행, red LED header) and 'All-Stop' (일반) trains on the same tracks. Express trains skip minor stations; check the station map before boarding.",
      },
    ],
    checklistId: "subway-mastery",
    checklistItems: [
      {
        id: "subway-check-exit",
        label: "Check destination subway exit number BEFORE climbing stairs",
        help: "Some stations like Jongno 3-ga stretch 500 meters underground between exits 1 and 15.",
      },
      {
        id: "subway-tag-off",
        label: "Always tap your T-money card when exiting buses to preserve transfer discount",
        help: "Failing to tap off triggers a maximum penalty fare on your next ride.",
      },
      {
        id: "subway-app-timer",
        label: "Use KakaoMetro for real-time live train arrival timers",
        help: "Displays exact train countdowns and express vs all-stop skip patterns.",
      },
    ],
    isFirst24Alias: false,
    hero: {
      src: "/photos/tips/seoul-subway-mastery.webp",
      alt: "Inside a Seoul Metro Line 2 train",
      width: 1200,
      height: 800,
    },
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "guide-money-and-payments",
    slug: "money-cards-and-payments-korea",
    title: "Money, Cards, and Payments in Korea: What Works and What Fails",
    dek: "Apple Pay limitations, foreign Visa/Mastercard acceptance, instant tax refund rules, and where you still need physical won.",
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. Foreign Credit Card Acceptance (98% Success Rate)",
      },
      {
        type: "paragraph",
        text: "South Korea is one of the most card-saturated economies on Earth. Contactless chip and swipe Visa and Mastercard are accepted at virtually 98% of all commercial establishments—including convenience stores, supermarkets, department stores, cafes, restaurants, and taxis.",
      },
      {
        type: "paragraph",
        text: "American Express is widely accepted at major luxury hotels, duty-free stores, and department stores, but experiences frequent terminal rejections at independent neighborhood cafes and small mom-and-pop restaurants. Discover and Diners Club have very low domestic terminal penetration outside major chains.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Apple Pay & Google Pay Reality",
      },
      {
        type: "paragraph",
        text: "• Apple Pay: Works in South Korea, but ONLY at merchants that have installed modern EMV NFC contactless payment terminals. This includes all major convenience store chains (GS25, CU, 7-Eleven, Emart24), Starbucks, McDonald's, Shinsegae Department Store, and Hyundai Department Store. Smaller independent boutiques and traditional restaurants still rely on older IC chip insertion slots.",
      },
      {
        type: "paragraph",
        text: "• Google Pay / Samsung Pay (Foreign Cards): Google Pay is completely unsupported in South Korea due to domestic payment routing regulations. Foreign-issued cards registered in Samsung Pay will generally fail at domestic terminals. Always carry a physical plastic credit card in your pocket.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Instant Duty-Free Tax Refunds at Register",
      },
      {
        type: "paragraph",
        text: "For any single purchase between 15,000 KRW and 1,000,000 KRW at registered Tax-Free merchants (such as Olive Young, ABC Mart, Uniqlo, Gentle Monster, and flagship fashion boutiques), present your physical passport at checkout. The 7–8% VAT is deducted immediately on your receipt, eliminating the need to wait in airport customs lines.",
      },
    ],
    tipBoxes: [
      {
        heading: "💵 Currency Exchange Location Hack",
        body: "Never exchange money at airport bank booths. Head to 'Money Box' or the exchange counters across from the Chinese Embassy in Myeongdong for rates within 0.3% of the international interbank rate.",
      },
      {
        heading: "💳 WOWPASS All-In-One Alternative",
        body: "If you want a single prepaid card that combines KRW cash storage, credit card swiping, and T-money transit without foreign card fees, get an orange WOWPASS at the airport kiosk.",
      },
    ],
    checklistId: "money-guide",
    checklistItems: [
      {
        id: "money-passport-shopping",
        label: "Carry physical passport when shopping for instant tax deduction",
        help: "Phone photos are legally rejected for tax deductions.",
      },
      {
        id: "money-notify-bank",
        label: "Notify home bank of travel to South Korea to prevent fraud blocks",
        help: "Korean payment gateway prompts frequently trigger security freezes.",
      },
      {
        id: "money-backup-cash",
        label: "Keep 50,000 KRW cash tucked in your wallet for markets and street stalls",
        help: "Traditional market stalls rarely accept foreign card swiping.",
      },
    ],
    isFirst24Alias: false,
    hero: {
      src: "/photos/tips/money-cards-and-payments-korea.webp",
      alt: "Bank machines in a Korean ATM corner",
      width: 1200,
      height: 800,
    },
  },
  {
    ...SAMPLE_BASE,
    sample: false,
    id: "guide-late-night-survival",
    slug: "late-night-survival-seoul",
    title: "Post-Midnight Survival: Late Night Buses, 24h Gukbap, and Jimjilbangs",
    dek: "When the subway shuts at 00:30: how to hail a midnight taxi, ride N-buses, and eat hot meals at 03:00 AM.",
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The 00:30 Metro Curfew",
      },
      {
        type: "paragraph",
        text: "Seoul subway lines begin closing their final trains between 23:45 and 00:30 (slightly later on weeknights, earlier on Sundays). Once the last train passes, the underground entrances are gated shut. Plan your departure before midnight or switch to the midnight transport grid.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The 'N-Bus' Midnight Bus Grid",
      },
      {
        type: "paragraph",
        text: "Seoul operates 14 dedicated midnight bus routes (designated with an 'N', e.g., N13, N15, N26, N37, N61) running between 23:30 and 06:00. The fare is 2,500 KRW. Routes connect major nightlife districts (Hongdae, Itaewon, Gangnam, Jongno, Dongdaemun). Use Naver Map to track real-time bus locations.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. 24-Hour Dining: Gukbap & Pojangmacha",
      },
      {
        type: "paragraph",
        text: "Look for signs that say '24시' (24 Hours). The gold standard late-night meal is hot Suyuk Gukbap (pork soup) or Haejangguk (hangover stew). In Jongno and Euljiro, traditional soup cauldrons run continuous fire 24 hours a day, 365 days a year.",
      },
    ],
    tipBoxes: [
      {
        heading: "♨️ Emergency Overnight Jimjilbang",
        body: "If stranded without a room past 02:00, seek a traditional 24-hour Jimjilbang (Korean bathhouse/spa like Spa Lei or The Spa in Garden 5). An overnight entry ticket (15,000–22,000 KRW) provides hot thermal baths, pajamas, and quiet heated floor sleeping halls.",
      },
      {
        heading: "🚖 Midnight Taxi Surcharge",
        body: "Taxi meters add a 20% to 40% midnight surcharge between 23:00 and 04:00. Use Kakao T with 'Pay to Driver Directly' to summon regular metered cabs.",
      },
    ],
    checklistId: "late-night-guide",
    checklistItems: [
      {
        id: "late-taxi-address",
        label: "Prepare Korean destination address in Naver Map for taxi hailing",
        help: "Midnight drivers will not navigate from English hotel names.",
      },
      {
        id: "late-kakaot-app",
        label: "Install Kakao T with 'Pay to Driver Directly' payment preset",
        help: "Enables summoning regular metered taxis with foreign cards.",
      },
      {
        id: "late-nbus-tmoney",
        label: "Keep at least 5,000 KRW loaded on T-money for N-Bus rides",
        help: "Night bus drivers do not carry change for 50,000 KRW notes.",
      },
    ],
    isFirst24Alias: false,
    hero: {
      src: "/photos/tips/late-night-survival-seoul.webp",
      alt: "A Seoul park path at night",
      width: 1200,
      height: 800,
    },
  },
];
