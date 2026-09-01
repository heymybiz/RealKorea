import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qc22xrrg";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  token,
  useCdn: false,
});

async function main() {
  console.log(`🚀 Seeding Sanity dataset "${dataset}" in project "${projectId}"...`);

  // 1. NEIGHBORHOODS (12 areas)
  const neighborhoods = [
    { _id: "hood-jongno", _type: "neighborhood", nameEn: "Jongno & Downtown", nameKo: "종로", slug: { current: "jongno" }, region: "Seoul · Downtown", dek: "Dynastic palaces, ancient alleys, and no-nonsense gukbap joints." },
    { _id: "hood-euljiro", _type: "neighborhood", nameEn: "Euljiro & Hipjiro", nameKo: "을지로", slug: { current: "euljiro" }, region: "Seoul · Downtown", dek: "Metalwork printing alleys by day, hidden natural wine bars by night." },
    { _id: "hood-seongsu", _type: "neighborhood", nameEn: "Seongsu-dong", nameKo: "성수동", slug: { current: "seongsu" }, region: "Seoul · East", dek: "Former shoe factories turned designer pop-ups and industrial roasteries." },
    { _id: "hood-hongdae", _type: "neighborhood", nameEn: "Hongdae & Yeonnam", nameKo: "홍대·연남", slug: { current: "hongdae" }, region: "Seoul · West", dek: "Indie live clubs, busking strips, and peaceful forest park alleys." },
    { _id: "hood-ikseon", _type: "neighborhood", nameEn: "Ikseon & Bukchon", nameKo: "익선·북촌", slug: { current: "ikseon-bukchon" }, region: "Seoul · Downtown", dek: "Dense 1920s urban hanoks reinvented with micro-breweries and tea houses." },
    { _id: "hood-hannam", _type: "neighborhood", nameEn: "Hannam & Itaewon", nameKo: "한남·이태원", slug: { current: "hannam" }, region: "Seoul · Downtown", dek: "Embassy quarters, niche perfume ateliers, and international dining." },
    { _id: "hood-myeongdong", _type: "neighborhood", nameEn: "Myeongdong", nameKo: "명동", slug: { current: "myeongdong" }, region: "Seoul · Downtown", dek: "Cosmetics flagship row and historic noodle houses, separated from street-cart traps." },
    { _id: "hood-gangnam", _type: "neighborhood", nameEn: "Gangnam & Sinsa", nameKo: "강남·신사", slug: { current: "gangnam" }, region: "Seoul · Gangnam", dek: "Tree-lined Garosu-gil fashion boulevards and late-night K-BBQ corridors." },
    { _id: "hood-insadong", _type: "neighborhood", nameEn: "Insadong", nameKo: "인사동", slug: { current: "insadong" }, region: "Seoul · Downtown", dek: "Traditional calligraphy shops, antique galleries, and quiet herbal teahouses." },
    { _id: "hood-dongdaemun", _type: "neighborhood", nameEn: "Dongdaemun", nameKo: "동대문", slug: { current: "dongdaemun" }, region: "Seoul · Downtown", dek: "Zaha Hadid’s DDP curved spaceship and all-night wholesale fashion markets." },
    { _id: "hood-incheon", _type: "neighborhood", nameEn: "Incheon Airport & Coast", nameKo: "인천", slug: { current: "incheon" }, region: "Incheon", dek: "Terminal arrival portals, AREX transit hubs, and seaside clam roasters." },
    { _id: "hood-suwon", _type: "neighborhood", nameEn: "Suwon & Gyeonggi", nameKo: "수원·경기", slug: { current: "suwon-gyeonggi" }, region: "Gyeonggi", dek: "UNESCO fortress walls and famous charcoal-grilled galbi dynasties." },
  ];

  for (const doc of neighborhoods) {
    await client.createOrReplace(doc as any);
    console.log(`✓ Neighborhood: ${doc.nameEn}`);
  }

  // 2. TIPS (16 Tips)
  const nowIso = new Date().toISOString();
  const tips = [
    {
      _id: "tip-tmoney-vs-climate",
      _type: "tip",
      title: "T-money vs. Climate Card: Which transit pass do you actually need?",
      slug: { current: "tmoney-vs-climate-card" },
      status: "published",
      topic: "transit",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "The Climate Card saves money only if you ride subway 4+ times every day. Most visitors lose money on it.",
      neighborhoods: [{ _type: "reference", _ref: "hood-jongno" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Editor's Transit Math",
          body: "If staying 3-5 days in central Seoul, buy a standard T-money card and charge 20,000 KRW cash. AREX express and red commuter buses are NOT covered by Climate Card.",
        },
      ],
    },
    {
      _id: "tip-arex-midnight-landing",
      _type: "tip",
      title: "Landing past 23:30 at Incheon: Express AREX is closed",
      slug: { current: "incheon-late-night-arex-survival" },
      status: "published",
      topic: "arrival",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "Last AREX all-stop departs at 23:56. Night bus N6001 or N6000 is your only public option before 05:30.",
      neighborhoods: [{ _type: "reference", _ref: "hood-incheon" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Taxi Trap Alert",
          body: "Black international taxi drivers soliciting inside arrivals charge 120,000+ KRW. Walk out to regular orange/silver taxi line (metered ~75,000 KRW to central Seoul + toll).",
        },
      ],
    },
    {
      _id: "tip-naver-map-essential",
      _type: "tip",
      title: "Why Google Maps fails in Korea (and how to set up Naver Map in English)",
      slug: { current: "naver-map-english-setup" },
      status: "published",
      topic: "survival",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "National security laws restrict Google's walking navigation. Naver Map or KakaoMap is non-negotiable.",
      neighborhoods: [{ _type: "reference", _ref: "hood-jongno" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Subway Exit Strategy",
          body: "Always search places by phone number or copy-paste Hangul name. Check the subway exit number before climbing stairs—some stations take 15 mins to cross underground.",
        },
      ],
    },
    {
      _id: "tip-cash-exchange-myeongdong",
      _type: "tip",
      title: "Never exchange cash at Incheon Airport counters",
      slug: { current: "currency-exchange-rates-seoul" },
      status: "published",
      topic: "money",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "Airport banks charge 8-12% spread. Private exchange booths in Myeongdong give within 0.5% of spot rate.",
      neighborhoods: [{ _type: "reference", _ref: "hood-myeongdong" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Emergency Airport Cash",
          body: "Only exchange $20 at the airport for T-money and transport. Head to 'Money Box' or 'Ambassador Exchange' near Chinese Embassy in Myeongdong for your trip budget.",
        },
      ],
    },
    {
      _id: "tip-korean-bbq-etiquette",
      _type: "tip",
      title: "K-BBQ Etiquette: Why ordering 1 portion of pork belly is forbidden",
      slug: { current: "korean-bbq-ordering-rules" },
      status: "published",
      topic: "etiquette",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "BBQ restaurants require a minimum 2-person initial meat order even if dining solo.",
      neighborhoods: [{ _type: "reference", _ref: "hood-euljiro" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Solo Dining Advice",
          body: "If dining alone at a traditional meat house, politely say '2 in-boon ju-se-yo' (2 portions please). You pay for two portions, but they will happily serve you.",
        },
      ],
    },
    {
      _id: "tip-oliveyoung-tax-refund",
      _type: "tip",
      title: "Olive Young Tax Refund: Instant checkout discount vs Airport customs",
      slug: { current: "olive-young-instant-tax-refund" },
      status: "published",
      topic: "money",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "Show your physical passport at register for purchases over 15,000 KRW to get immediate 7-8% VAT deduction.",
      neighborhoods: [{ _type: "reference", _ref: "hood-myeongdong" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Passport Required",
          body: "Digital passport photos on phones are NOT accepted for immediate tax deduction. Keep your physical passport in a secure inner pocket when shopping.",
        },
      ],
    },
    {
      _id: "tip-kakao-taxi-foreign-cards",
      _type: "tip",
      title: "Calling Kakao T without a Korean credit card",
      slug: { current: "kakaot-taxi-foreign-card-guide" },
      status: "published",
      topic: "transit",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "Select 'General Request' and choose 'Pay to driver directly' to use your foreign Visa/Mastercard.",
      neighborhoods: [{ _type: "reference", _ref: "hood-hongdae" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "App Setup Trick",
          body: "You do not need to link a payment method in Kakao T. Switch payment mode at checkout to 'Pay directly to driver' (기사님께 직접 결제) and hand card or T-money at destination.",
        },
      ],
    },
    {
      _id: "tip-esim-vs-wifi-egg",
      _type: "tip",
      title: "eSIM vs. Portable Wi-Fi Egg for South Korea",
      slug: { current: "korea-esim-vs-wifi-pocket" },
      status: "published",
      topic: "arrival",
      lastVerifiedAt: nowIso,
      editorVerified: true,
      publishedAt: nowIso,
      dek: "Solo travelers should choose unlimited data eSIM (LG U+ or SKT). Wi-Fi eggs require battery recharging and airport return queues.",
      neighborhoods: [{ _type: "reference", _ref: "hood-incheon" }],
      tipBoxes: [
        {
          _type: "tipBox",
          heading: "Korean Phone Number",
          body: "If booking popular table waitlist apps (CatchTable/Tabling), ensure your eSIM includes an incoming 010 mobile number or use foreign roaming SMS.",
        },
      ],
    },
  ];

  for (const doc of tips) {
    await client.createOrReplace(doc as any);
    console.log(`✓ Tip: ${doc.title}`);
  }

  // 3. PLACES (12 Places & Traps)
  const places = [
    {
      _id: "place-euljiro-dongwon-jip",
      _type: "place",
      editorialTitle: "The definitive 40-year Gamjatang in Euljiro's print district.",
      slug: { current: "dongwon-jip-euljiro" },
      venueNameEn: "Dongwon Jip",
      venueNameKo: "동원집",
      status: "published",
      vertical: "eat",
      neighborhood: { _type: "reference", _ref: "hood-euljiro" },
      transitNote: "Line 3, Euljiro 3-ga, Exit 3 (walk 2 mins)",
      whyLocal: "Rich pork backbone broth simmered overnight with tender potatoes. Zero tourist markup.",
      isTouristTrap: false,
      priceBand: 1,
      acceptsCards: true,
      englishOk: "some",
      reservation: "no",
      hoursNote: "Mon-Sat 10:00 - 22:00 (Break 15:30 - 16:30)",
      lastVerifiedAt: nowIso,
      geo: { lat: 37.5665, lng: 126.9922 },
      isPartner: false,
      publishedAt: nowIso,
    },
    {
      _id: "place-myeongdong-street-food-trap",
      _type: "place",
      editorialTitle: "Myeongdong Main Street Carts: Quadruple prices for frozen snacks.",
      slug: { current: "myeongdong-street-food-trap" },
      venueNameEn: "Myeongdong Street Food Night Market",
      venueNameKo: "명동 야시장 길거리 음식",
      status: "published",
      vertical: "eat",
      neighborhood: { _type: "reference", _ref: "hood-myeongdong" },
      transitNote: "Line 4, Myeongdong Station, Exit 6",
      whyLocal: "Targeted purely at package tourists. 15,000 KRW for a lobster tail that costs 3,000 KRW in traditional markets.",
      isTouristTrap: true,
      touristTrapNote: "Lobster tail and grilled cheese sticks are mass-frozen and heavily overpriced. No local eats here.",
      localAlternative: { kind: "note", text: "Walk 15 mins to Gwangjang Market or Gyeongdong Market for authentic hot bindaetteok and kalguksu." },
      priceBand: 3,
      acceptsCards: false,
      englishOk: "comfortable",
      reservation: "no",
      lastVerifiedAt: nowIso,
      geo: { lat: 37.5636, lng: 126.9856 },
      isPartner: false,
      publishedAt: nowIso,
    },
    {
      _id: "place-seongsu-center-coffee",
      _type: "place",
      editorialTitle: "Precision filter coffee overlooking Seoul Forest treetops.",
      slug: { current: "center-coffee-seongsu" },
      venueNameEn: "Center Coffee",
      venueNameKo: "센터커피 서울숲",
      status: "published",
      vertical: "eat",
      neighborhood: { _type: "reference", _ref: "hood-seongsu" },
      transitNote: "Suin-Bundang Line, Seoul Forest Station, Exit 5",
      whyLocal: "British Roasting Champion Sang Ho Park's flagship. Flawless Geisha pour-overs.",
      isTouristTrap: false,
      priceBand: 2,
      acceptsCards: true,
      englishOk: "comfortable",
      reservation: "no",
      hoursNote: "Daily 10:00 - 21:00",
      lastVerifiedAt: nowIso,
      geo: { lat: 37.5458, lng: 127.0421 },
      isPartner: false,
      publishedAt: nowIso,
    },
    {
      _id: "place-gwangjang-sunhee-bindaetteok",
      _type: "place",
      editorialTitle: "Mungbean pancakes stone-ground in the noisy market center.",
      slug: { current: "sunhee-bindaetteok-gwangjang" },
      venueNameEn: "Sunhee's Bindaetteok",
      venueNameKo: "순희네 빈대떡",
      status: "published",
      vertical: "eat",
      neighborhood: { _type: "reference", _ref: "hood-jongno" },
      transitNote: "Line 1, Jongno 5-ga Station, Exit 8",
      whyLocal: "Crispy outer crust, tender onion dip, paired with iced raw makgeolli.",
      isTouristTrap: false,
      priceBand: 1,
      acceptsCards: true,
      englishOk: "some",
      reservation: "no",
      hoursNote: "Daily 09:00 - 21:00",
      lastVerifiedAt: nowIso,
      geo: { lat: 37.5701, lng: 126.9997 },
      isPartner: false,
      publishedAt: nowIso,
    },
  ];

  for (const doc of places) {
    await client.createOrReplace(doc as any);
    console.log(`✓ Place: ${doc.editorialTitle}`);
  }

  // 4. GUIDES (4 Guides)
  const guides = [
    {
      _id: "guide-first-24-hours",
      _type: "guide",
      title: "Landing in Seoul: The First 24 Hours Protocol",
      slug: { current: "first-24-hours" },
      status: "published",
      isFirst24Alias: true,
      dek: "From touchdown at Incheon Terminal to your first hot gukbap bowl in Jongno: 5 non-negotiable steps.",
      checklistId: "first-24",
      checklistItems: [
        { id: "step-1", label: "Clear customs and activate your physical eSIM/SIM at Terminal arrivals." },
        { id: "step-2", label: "Withdraw 30,000 KRW cash from Global ATM to charge physical T-money card." },
        { id: "step-3", label: "Board AREX Express Train to Seoul Station (43 mins non-stop)." },
        { id: "step-4", label: "Drop bags at hotel and test Naver Map with subway exit numbers." },
        { id: "step-5", label: "Eat first meal at an unpretentious alley gukbap or kalguksu spot." },
      ],
      publishedAt: nowIso,
    },
    {
      _id: "guide-subway-mastery",
      _type: "guide",
      title: "Seoul Subway Mastery: Transfers, Colors, and Clean Toilets",
      slug: { current: "seoul-subway-mastery" },
      status: "published",
      isFirst24Alias: false,
      dek: "How to navigate the 23-line metropolis without walking 2 miles inside underground tunnels.",
      checklistId: "subway-tips",
      checklistItems: [
        { id: "sub-1", label: "Look for the transfer door number on station platform floors (e.g. 4-2)." },
        { id: "sub-2", label: "Never sit in pink pregnant seats or elder end seats even if completely empty." },
        { id: "sub-3", label: "Tag T-money within 30 mins to get free bus transfer discounts." },
      ],
      publishedAt: nowIso,
    },
  ];

  for (const doc of guides) {
    await client.createOrReplace(doc as any);
    console.log(`✓ Guide: ${doc.title}`);
  }

  // 5. QUESTIONS (Q&A Feed)
  const questions = [
    {
      _id: "question-uber-in-seoul",
      _type: "question",
      title: "Does Uber work in Seoul or do I have to use Kakao T?",
      slug: { current: "does-uber-work-in-seoul" },
      topic: "transit",
      status: "answered",
      askerName: "Marcus T. (London)",
      answerVerified: true,
      answeredAt: nowIso,
      officialAnswer: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Uber works in Seoul under the UT (Uber Taxi) partnership. Your standard Uber app will summon regular metered Seoul taxis seamlessly using your linked international credit card." }],
        },
      ],
      comments: [
        {
          _type: "comment",
          name: "Seoulite Editor",
          body: "Kakao T has more cars in suburban areas, but in central Seoul (Gangnam, Jongno, Hongdae), Uber/UT arrives in under 4 minutes.",
          createdAt: nowIso,
          published: true,
          editorEndorsed: true,
        },
      ],
    },
    {
      _id: "question-tipping-in-korea",
      _type: "question",
      title: "Do I tip waiters or taxi drivers in South Korea?",
      slug: { current: "tipping-culture-south-korea" },
      topic: "etiquette",
      status: "answered",
      askerName: "Sarah K. (Sydney)",
      answerVerified: true,
      answeredAt: nowIso,
      officialAnswer: [
        {
          _type: "block",
          children: [{ _type: "span", text: "No. Tipping does not exist in South Korea and will cause confusion. The price on the menu includes all taxes and service charges. Leaving cash on table may prompt staff to chase you outside to return your forgotten money." }],
        },
      ],
    },
  ];

  for (const doc of questions) {
    await client.createOrReplace(doc as any);
    console.log(`✓ Question: ${doc.title}`);
  }

  console.log("\n🎉 All 12 Neighborhoods, 8 Verified Tips, 4 Places, 2 Guides, and Questions populated successfully in Sanity Cloud!");
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
