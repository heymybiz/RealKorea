import type { Tip } from "../content/types";
import type { ArticleAuditResult, AuditIssue, PartScore } from "./types";

// 1. De-AI Banned Buzzwords
const DE_AI_BANNED_WORDS = [
  { word: "delve", reason: "Overused AI transition word. Replace with direct action or context." },
  { word: "vibrant", reason: "AI cliché adjective. Use concrete sensory or visual description." },
  { word: "culinary journey", reason: "Hollow travel blog cliché. Describe specific broth, charcoal, or taste." },
  { word: "nestled", reason: "Fictional travel prose word. State exact subway exit or alley name." },
  { word: "tapestry", reason: "Abstract AI metaphor. State exact cultural or historical facts." },
  { word: "bustling", reason: "Generic filler word. Mention exact peak rush hours or crowd density." },
  { word: "testament to", reason: "Stilted AI compliment. Show evidence rather than asserting." },
  { word: "kaleidoscope", reason: "Exaggerated AI visual metaphor." },
  { word: "rich history", reason: "Vague praise. Mention exact years (e.g. 600-year Joseon dynasty)." },
];

// 2. Known Fact Pattern Violations (from the 24 Errors benchmark)
const KNOWN_FACT_VIOLATIONS = [
  {
    regex: /1[,.]?400\s*KRW|1,400원/i,
    rule: "Outdated Subway Fare",
    message: "Seoul subway base fare was increased to 1,550 KRW in 2025. 1,400 KRW is outdated.",
    suggestion: "Update base fare to 1,550 KRW and adjust 3-day Climate Card break-even calculations.",
  },
  {
    regex: /(09:00|9:00\s*AM|9\s*AM).*Bukchon.*(open|curfew|allowed)/i,
    rule: "Bukchon Curfew Timing Error",
    message: "Bukchon Red Zone (Bukchon-ro 11-gil) opens at 10:00 AM, not 09:00 AM. Entering at 09:00 risks a 100,000 KRW fine.",
    suggestion: "State visiting hours as strictly 10:00 to 17:00.",
  },
  {
    regex: /offline\s+caching|offline\s+maps\s+in\s+naver/i,
    rule: "Non-Existent Naver Map Feature",
    message: "Naver Map does not support offline vector tile caching. This is an invented AI hallucination.",
    suggestion: "Delete offline caching claims. Recommend downloading routes or relying on local cellular data.",
  },
  {
    regex: /bank\s+(ATM|Global\s+ATM)\s+(is\s+free|has\s+zero\s+fee|charges\s+0\s*KRW)/i,
    rule: "False Bank ATM Free Claim",
    message: "Domestic bank Global ATMs charge 3,000–5,000 KRW access fees on foreign debit cards.",
    suggestion: "Explain the 3-tier fee structure: local operator fee + home bank fee + DCC spread.",
  },
  {
    regex: /must\s+be\s+sealed\s+in\s+a\s+tamper|cashier\s+will\s+seal\s+your\s+bag\s+with\s+tape/i,
    rule: "False Immediate Tax-Refund Bag Protocol",
    message: "Immediate on-site tax refunds at Olive Young do not require sealed security tamper bags.",
    suggestion: "Remove sealed bag references. Remind travelers of the 100ml liquid aviation carry-on limit instead.",
  },
  {
    regex: /72[,.]?000\s*KRW.*(Jongno|Hongdae).*late\s*night/i,
    rule: "Underestimated Midnight Taxi Fare",
    message: "With 40% midnight surcharges (23:00–02:00) and highway tolls (~6,600 KRW), taxis to downtown cost 90,000–110,000 KRW.",
    suggestion: "Update fare estimate to 90,000–110,000 KRW to prevent passenger underfunding.",
  },
];

export function auditArticle(tip: Tip): ArticleAuditResult {
  const allText = [
    tip.title,
    tip.dek || "",
    ...(tip.tipBoxes || []).map((b) => `${b.heading} ${b.body}`),
    ...(tip.body || []).map((b) => (b.type === "paragraph" ? b.text : b.type === "heading" ? b.text : "")),
  ].join(" ");

  const factIssues: AuditIssue[] = [];
  const editorialIssues: AuditIssue[] = [];

  // ==========================================
  // PART 1: Fact & Compliance Audit (Weight: 50%)
  // ==========================================
  let factScore = 100;

  KNOWN_FACT_VIOLATIONS.forEach((violation, idx) => {
    if (violation.regex.test(allText)) {
      factIssues.push({
        id: `fact-err-${idx}`,
        severity: "error",
        category: "fact",
        ruleName: violation.rule,
        message: violation.message,
        suggestion: violation.suggestion,
      });
      factScore -= 25;
    }
  });

  // Check 1:1 image assignment
  if (!tip.image || !tip.image.src || tip.image.src.includes("placeholder")) {
    factIssues.push({
      id: "fact-img-missing",
      severity: "warning",
      category: "media",
      ruleName: "Missing Verified Image",
      message: "Article lacks a high-resolution verified 16:9 documentary plate photograph.",
      suggestion: "Assign a unique Unsplash stock URL or documentary plate image.",
    });
    factScore -= 10;
  }

  factScore = Math.max(0, factScore);

  // ==========================================
  // PART 2: Editorial Quality & Voice Audit (Weight: 50%)
  // ==========================================
  let editorialScore = 100;

  // 1. Scan De-AI Banned Words
  DE_AI_BANNED_WORDS.forEach((banned, idx) => {
    const regex = new RegExp(`\\b${banned.word}\\b`, "i");
    if (regex.test(allText)) {
      editorialIssues.push({
        id: `de-ai-${idx}`,
        severity: "error",
        category: "de-ai",
        ruleName: `De-AI Buzzword: "${banned.word}"`,
        message: `Detected banned AI buzzword "${banned.word}". ${banned.reason}`,
        matchedText: banned.word,
        suggestion: "Remove or replace with precise factual description.",
      });
      editorialScore -= 15;
    }
  });

  // 2. TipBoxes Structure Check
  if (!tip.tipBoxes || tip.tipBoxes.length < 3) {
    editorialIssues.push({
      id: "struct-tipboxes",
      severity: "warning",
      category: "structure",
      ruleName: "Insufficient TipBoxes",
      message: `Found ${tip.tipBoxes?.length || 0} TipBoxes. Real Korea PRD 05 requires at least 3 distinct actionable TipBoxes.`,
      suggestion: "Add Critical Time/Cost Rule, Common Pitfall Bypass, and Korean Phrase TipBoxes.",
    });
    editorialScore -= 15;
  }

  // 3. Body Section Count Check
  const headingCount = (tip.body || []).filter((b) => b.type === "heading").length;
  if (headingCount < 2) {
    editorialIssues.push({
      id: "struct-headings",
      severity: "warning",
      category: "structure",
      ruleName: "Shallow Editorial Structure",
      message: `Found only ${headingCount} H2 section(s). Editorial deep-dives require at least 3 multi-paragraph sections.`,
      suggestion: "Expand article with Economic Logic, Action Protocol, and Edge Case Breakdown.",
    });
    editorialScore -= 10;
  }

  // 4. Fear-mongering Tone Scan
  const fearKeywords = ["scam", "panic", "danger"];
  const fearMatches = fearKeywords.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(tip.title));
  if (fearMatches.length >= 2) {
    editorialIssues.push({
      id: "tone-fear",
      severity: "info",
      category: "tone",
      ruleName: "Aggressive Fear-Framing Headline",
      message: `Headline contains multiple high-anxiety words: [${fearMatches.join(", ")}].`,
      suggestion: "Balance tone toward smart local solutions rather than pure threat-framing.",
    });
    editorialScore -= 5;
  }

  editorialScore = Math.max(0, editorialScore);

  // ==========================================
  // Composite Calculation
  // ==========================================
  const overallScore = Math.round(factScore * 0.5 + editorialScore * 0.5);

  let grade: ArticleAuditResult["grade"] = "D";
  if (overallScore >= 95) grade = "A+";
  else if (overallScore >= 88) grade = "A";
  else if (overallScore >= 78) grade = "B";
  else if (overallScore >= 65) grade = "C";

  let status: ArticleAuditResult["status"] = "rejected";
  if (overallScore >= 85 && factScore >= 85) {
    status = "approved";
  } else if (overallScore >= 70) {
    status = "needs_review";
  }

  const factAudit: PartScore = {
    partName: "Part 1: Fact & Compliance Audit",
    score: factScore,
    weight: 0.5,
    status: factScore >= 85 ? "pass" : factScore >= 70 ? "warn" : "fail",
    issues: factIssues,
  };

  const editorialAudit: PartScore = {
    partName: "Part 2: Editorial Voice & Quality Audit",
    score: editorialScore,
    weight: 0.5,
    status: editorialScore >= 85 ? "pass" : editorialScore >= 70 ? "warn" : "fail",
    issues: editorialIssues,
  };

  return {
    articleId: tip.id,
    slug: tip.slug,
    title: tip.title,
    topic: tip.topic,
    overallScore,
    grade,
    status,
    factAudit,
    editorialAudit,
    timestamp: new Date().toISOString(),
  };
}
