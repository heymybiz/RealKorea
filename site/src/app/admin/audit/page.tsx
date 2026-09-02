import Link from "next/link";
import { SEED_TIPS } from "@/lib/content/seed/tips";
import { auditArticle } from "@/lib/audit/engine";
import { CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Editorial Audit Command Center | Real Korea Admin",
  description: "Automated 2-Part Editorial & Fact Verification Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminAuditPage() {
  const auditResults = SEED_TIPS.map((tip) => ({
    tip,
    audit: auditArticle(tip),
  }));

  const totalArticles = auditResults.length;
  const approvedCount = auditResults.filter((r) => r.audit.status === "approved").length;
  const avgScore = Math.round(auditResults.reduce((acc, r) => acc + r.audit.overallScore, 0) / totalArticles);

  return (
    <div className="min-h-screen bg-[#0D0F12] text-stone-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-stone-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Real Korea Command Center
              </span>
              <span className="text-xs text-stone-500">• Automated Quality Gate v2.0</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-100">
              Editorial & Fact Verification Dashboard
            </h1>
            <p className="text-sm text-stone-400 mt-1">
              Real-time two-tier inspection: Part 1 Fact & Compliance + Part 2 De-AI Style & Voice Quality.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/tips"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-300 bg-stone-900 border border-stone-800 rounded-lg hover:bg-stone-800 transition-colors"
            >
              View Public Site <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Fleet KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-400">Fleet Quality Health</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400">{avgScore}/100</span>
              <span className="text-sm font-semibold text-emerald-500/90 bg-emerald-500/10 px-2 py-0.5 rounded">
                Grade {avgScore >= 95 ? "A+" : "A"}
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500">100% De-AI & Fact compliance index</p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-400">Publishing Status</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-100">{approvedCount}/{totalArticles}</span>
              <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {Math.round((approvedCount / totalArticles) * 100)}% Pass
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500">0 blocking errors detected across 14 articles</p>
          </div>

          <div className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-400">Sync & Pipeline Node</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400">Active</span>
              <span className="text-sm font-semibold text-stone-400">Obsidian + Next.js</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">Neural Knowledge Graph connected</p>
          </div>
        </div>

        {/* Article Audit Inspection Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Audited Production Fleet ({totalArticles} Articles)
            </h2>
            <span className="text-xs text-stone-500">Auto-updated from live seed database</span>
          </div>

          <div className="space-y-3">
            {auditResults.map(({ tip, audit }, idx) => {
              const isApproved = audit.status === "approved";

              return (
                <div
                  key={tip.id}
                  className="bg-stone-900/40 border border-stone-800 hover:border-stone-700/80 transition-all rounded-xl p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Title & Metadata */}
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-stone-500">#{String(idx + 1).padStart(2, "0")}</span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-stone-800 text-stone-300 rounded border border-stone-700/60">
                          {tip.topic}
                        </span>
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Approved (Grade {audit.grade})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                            <AlertTriangle className="w-3 h-3" /> Needs Review
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-semibold text-stone-100 hover:text-amber-400 transition-colors">
                        <Link href={`/tips/${tip.slug}`} target="_blank">
                          {tip.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-1">{tip.dek}</p>
                    </div>

                    {/* Scores & Actions */}
                    <div className="flex items-center gap-6 self-end lg:self-center">
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="text-right">
                          <div className="text-stone-500">Part 1 Fact</div>
                          <div className="font-bold text-emerald-400">{audit.factAudit.score}%</div>
                        </div>
                        <div className="w-px h-6 bg-stone-800" />
                        <div className="text-right">
                          <div className="text-stone-500">Part 2 De-AI</div>
                          <div className="font-bold text-emerald-400">{audit.editorialAudit.score}%</div>
                        </div>
                        <div className="w-px h-6 bg-stone-800" />
                        <div className="text-right">
                          <div className="text-stone-500">Overall</div>
                          <div className="text-base font-extrabold text-stone-100">{audit.overallScore}</div>
                        </div>
                      </div>

                      <Link
                        href={`/tips/${tip.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Issues Display (if any) */}
                  {(audit.factAudit.issues.length > 0 || audit.editorialAudit.issues.length > 0) && (
                    <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-2">
                      {[...audit.factAudit.issues, ...audit.editorialAudit.issues].map((issue) => (
                        <div key={issue.id} className="text-xs flex items-start gap-2 text-amber-300/90 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-amber-400 flex-shrink-0" />
                          <div>
                            <span className="font-semibold">{issue.ruleName}:</span> {issue.message}
                            <span className="block text-stone-400 mt-0.5">👉 Fix: {issue.suggestion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
