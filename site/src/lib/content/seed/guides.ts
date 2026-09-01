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
    dek: "From touchdown at Incheon to your first hot gukbap bowl in Jongno: five chronological steps to avoid airport scams and card failures.",
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Terminal Data Checkpoint",
      },
      {
        type: "paragraph",
        text: "Before passing through immigration fingerprint scanners, ensure your data eSIM is installed and active. Turn off 'Data Roaming' on your primary home carrier SIM to avoid accidental roaming charges. If you require a physical SIM or mobile Wi-Fi egg, pick it up at the KT or SKT counters in the Arrivals Hall (1F Gate 6–10) before heading to the train.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The 30,000 KRW Cash Rule",
      },
      {
        type: "paragraph",
        text: "South Korea is 98% card-friendly, but transit card vending machines and subway top-up kiosks do NOT accept foreign credit cards. Stop at a Global ATM inside the terminal (Shinhan, Woori, or Hana Bank) and withdraw exactly 30,000 to 50,000 KRW in cash. Use this cash to buy and load your physical T-money card.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Boarding the Correct AREX Train",
      },
      {
        type: "paragraph",
        text: "Head to the B1 Transportation Center. Buy an Express Train ticket (orange, 43 mins non-stop with assigned seating) if heading directly to Seoul Station. If staying in Hongdae or Mapo, take the blue All-Stop Train (54 mins) and tap your loaded T-money card at the regular turnstiles.",
      },
    ],
    tipBoxes: [
      {
        heading: "⚡ Airport Arrival Gate Rule",
        body: "Never exchange large sums of cash at airport bank booths (8–12% spread markup). Withdraw only 30,000 KRW for transit and exchange your primary travel budget at private booths in Myeongdong.",
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
      src: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=85",
      alt: "Incheon International Airport terminal arrivals escalator view",
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
    dek: "How to navigate 23 lines and 700 stations across the capital without getting lost in 2-kilometer underground tunnels.",
    body: [
      {
        type: "heading",
        level: 2,
        text: "1. The Platform Transfer Door Numbers",
      },
      {
        type: "paragraph",
        text: "Seoul subway station floors are painted with two-digit car and door coordinates (e.g., 3-2 or 7-4). Naver Map tells you the exact door number for your transfer. Standing at the correct door saves you up to 8 minutes of walking when switching between deep lines like Line 9 and Line 2.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The 30-Minute Free Transfer Window",
      },
      {
        type: "paragraph",
        text: "When transferring between subway and city buses (or between different bus routes), always tap your T-money card upon exiting. You receive up to 4 consecutive transfers for free (or distance-only surcharge) within 30 minutes of tapping off (60 minutes from 21:00 to 07:00).",
      },
    ],
    tipBoxes: [
      {
        heading: "🚫 Pink Seat & Elder Car Etiquette",
        body: "Never sit in the bright pink pregnant women seats or the 3-seat end sections reserved for elders and disabled persons, even on completely empty trains. Locals consider sitting there deeply disrespectful.",
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
      src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
      alt: "Seoul modern subway train pulling into brightly lit platform",
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
        text: "1. Foreign Credit Card Acceptance (95% Success)",
      },
      {
        type: "paragraph",
        text: "Standard chip and contactless Visa and Mastercard work across 95% of restaurants, department stores, cafes, and hotels in Seoul. Discover and Amex have frequent terminal rejection rates outside large hotel chains. Always carry at least one backup Visa/Mastercard.",
      },
      {
        type: "heading",
        level: 2,
        text: "2. The Apple Pay / Google Pay Reality",
      },
      {
        type: "paragraph",
        text: "Google Pay does not work in South Korea due to domestic network restrictions. Apple Pay works only at merchants with modern NFC terminals (Hyundai Card affiliated spots, GS25/CU convenience stores, Starbucks, McDonald's, Shinsegae). Traditional market stalls and older dining spots require a physical plastic card.",
      },
      {
        type: "heading",
        level: 2,
        text: "3. Instant Duty-Free Tax Refunds at Register",
      },
      {
        type: "paragraph",
        text: "For single purchases between 15,000 KRW and 1,000,000 KRW at registered stores (Olive Young, ABC Mart, Uniqlo, department stores), present your physical passport at checkout. The 7–8% VAT is deducted immediately on your receipt, eliminating airport refund lines.",
      },
    ],
    tipBoxes: [
      {
        heading: "💵 Currency Exchange Location Hack",
        body: "Never exchange money at airport bank booths. Head to 'Money Box' or the exchange counters across from the Chinese Embassy in Myeongdong for rates within 0.3% of the international interbank rate.",
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
      src: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85",
      alt: "Seoul bustling commercial street neon retail signs",
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
      src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
      alt: "Late night neon lit alleyways in Euljiro Seoul",
      width: 1200,
      height: 800,
    },
  },
];
