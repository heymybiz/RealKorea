const path = require('path');
const esbuild = require('D:/Project/RealKorea/site/node_modules/esbuild');

async function run() {
  const result = await esbuild.build({
    entryPoints: ['D:/Project/RealKorea/site/src/lib/audit/index.ts'],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    target: 'node18',
  });

  const code = result.outputFiles[0].text;
  const mod = {};
  const exports = {};
  const fn = new Function('module', 'exports', 'require', code);
  fn(mod, exports, require);

  const { SEED_TIPS, auditArticle } = mod.exports || exports;

  console.log('\n================================================================');
  console.log('🛡️  REAL KOREA 2-PART EDITORIAL & FACT AUDIT ENGINE');
  console.log('================================================================\n');

  let totalScore = 0;
  let passCount = 0;

  SEED_TIPS.forEach((tip, idx) => {
    const audit = auditArticle(tip);
    totalScore += audit.overallScore;
    if (audit.status === 'approved') passCount++;

    const statusIcon = audit.status === 'approved' ? '✅ PASS' : audit.status === 'needs_review' ? '⚠️ WARN' : '❌ FAIL';
    console.log(`[${String(idx + 1).padStart(2, '0')}/${SEED_TIPS.length}] ${statusIcon} [Grade ${audit.grade}] Score: ${audit.overallScore}/100 — ${tip.title.slice(0, 50)}...`);
    console.log(`    ├─ Part 1 (Fact Audit): ${audit.factAudit.score}/100 (${audit.factAudit.status.toUpperCase()}) | Issues: ${audit.factAudit.issues.length}`);
    console.log(`    └─ Part 2 (Editorial):  ${audit.editorialAudit.score}/100 (${audit.editorialAudit.status.toUpperCase()}) | Issues: ${audit.editorialAudit.issues.length}`);

    if (audit.factAudit.issues.length > 0 || audit.editorialAudit.issues.length > 0) {
      [...audit.factAudit.issues, ...audit.editorialAudit.issues].forEach((issue) => {
        console.log(`       🚨 [${issue.severity.toUpperCase()}] ${issue.ruleName}: ${issue.message}`);
        console.log(`          👉 Suggestion: ${issue.suggestion}`);
      });
    }
    console.log('');
  });

  const avgScore = Math.round(totalScore / SEED_TIPS.length);
  console.log('================================================================');
  console.log(`📊 SUMMARY REPORT:`);
  console.log(`   - Total Articles Audited: ${SEED_TIPS.length}`);
  console.log(`   - Approved for Publishing: ${passCount} / ${SEED_TIPS.length} (${Math.round((passCount / SEED_TIPS.length) * 100)}%)`);
  console.log(`   - Fleet Average Quality Score: ${avgScore} / 100 [Grade ${avgScore >= 90 ? 'A+' : avgScore >= 85 ? 'A' : 'B'}]`);
  console.log('================================================================\n');
}

run().catch(console.error);
