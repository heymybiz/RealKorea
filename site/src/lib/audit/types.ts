export interface AuditIssue {
  id: string;
  severity: "error" | "warning" | "info";
  category: "fact" | "de-ai" | "structure" | "tone" | "media";
  ruleName: string;
  message: string;
  matchedText?: string;
  suggestion: string;
}

export interface PartScore {
  partName: string;
  score: number; // 0 to 100
  weight: number; // e.g. 0.5
  status: "pass" | "warn" | "fail";
  issues: AuditIssue[];
}

export interface ArticleAuditResult {
  articleId: string;
  slug: string;
  title: string;
  topic: string;
  overallScore: number; // 0 to 100
  grade: "A+" | "A" | "B" | "C" | "D";
  status: "approved" | "needs_review" | "rejected";
  factAudit: PartScore;
  editorialAudit: PartScore;
  timestamp: string;
}
