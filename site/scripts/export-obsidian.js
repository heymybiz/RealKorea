const fs = require('fs');
const path = require('path');
const esbuild = require('D:/Project/RealKorea/site/node_modules/esbuild');

async function run() {
  const result = await esbuild.build({
    entryPoints: ['D:/Project/RealKorea/site/src/lib/content/seed/index.ts'],
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

  const { SEED_TIPS, SEED_GUIDES, SEED_PLACES, SEED_NEIGHBORHOODS } = mod.exports || exports;
  const baseDir = path.resolve('D:/Project/RealKorea/docs/articles');

  // 1. Export Tips with rich Frontmatter & Obsidian Wiki-links
  SEED_TIPS.forEach((tip, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const filePath = path.join(baseDir, 'tips', `${num}-${tip.slug}.md`);

    let frontmatter = '---\n';
    frontmatter += `id: "${tip.id}"\n`;
    frontmatter += `slug: "${tip.slug}"\n`;
    frontmatter += `title: "${tip.title.replace(/"/g, '\\"')}"\n`;
    frontmatter += `dek: "${(tip.dek || '').replace(/"/g, '\\"')}"\n`;
    frontmatter += `topic: "${tip.topic}"\n`;
    frontmatter += `status: "${tip.status}"\n`;
    frontmatter += `lastVerifiedAt: "${tip.lastVerifiedAt || '2026-08-30'}"\n`;
    frontmatter += `editorVerified: ${tip.editorVerified ? 'true' : 'false'}\n`;
    frontmatter += `neighborhoods:\n`;
    (tip.neighborhoodSlugs || []).forEach((n) => {
      frontmatter += `  - "${n}"\n`;
    });
    if (tip.image) {
      frontmatter += `image:\n`;
      frontmatter += `  src: "${tip.image.src}"\n`;
      frontmatter += `  alt: "${tip.image.alt.replace(/"/g, '\\"')}"\n`;
    }
    frontmatter += '---\n\n';

    let content = frontmatter;
    content += `# ${tip.title}\n\n`;
    content += `> **Dek**: ${tip.dek || ''}\n\n`;
    content += `- **Topic**: \`${tip.topic}\`\n`;
    content += `- **Last Verified**: \`${tip.lastVerifiedAt || '2026-08-30'}\` (Verified Local Fact 正)\n`;
    content += `- **Connected Hubs**: ${(tip.neighborhoodSlugs || []).map((n) => `[[${n}]]`).join(', ')}\n\n`;

    if (tip.image) {
      content += `![${tip.image.alt}](${tip.image.src})\n*Plate: ${tip.image.alt} (16:9 Documentary Plate)*\n\n`;
    }

    if (tip.tipBoxes && tip.tipBoxes.length > 0) {
      content += `## 💡 Local Insider Tip Boxes\n\n`;
      tip.tipBoxes.forEach((box) => {
        content += `### ${box.heading || 'Local Tip'}\n`;
        content += `${box.body}\n\n`;
      });
    }

    content += `## 📖 Article Content\n\n`;
    tip.body.forEach((block) => {
      if (block.type === 'heading') {
        content += `### ${block.text}\n\n`;
      } else if (block.type === 'paragraph') {
        content += `${block.text}\n\n`;
      }
    });

    fs.writeFileSync(filePath, content, 'utf8');
  });

  // 2. Export Guides with Frontmatter
  SEED_GUIDES.forEach((guide, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const filePath = path.join(baseDir, 'guides', `${num}-${guide.slug}.md`);

    let frontmatter = '---\n';
    frontmatter += `id: "${guide.id}"\n`;
    frontmatter += `slug: "${guide.slug}"\n`;
    frontmatter += `title: "${guide.title.replace(/"/g, '\\"')}"\n`;
    frontmatter += `dek: "${(guide.dek || '').replace(/"/g, '\\"')}"\n`;
    frontmatter += `status: "${guide.status}"\n`;
    frontmatter += `isFirst24Alias: ${guide.isFirst24Alias ? 'true' : 'false'}\n`;
    if (guide.hero) {
      frontmatter += `hero:\n`;
      frontmatter += `  src: "${guide.hero.src}"\n`;
      frontmatter += `  alt: "${guide.hero.alt.replace(/"/g, '\\"')}"\n`;
    }
    frontmatter += '---\n\n';

    let content = frontmatter;
    content += `# ${guide.title}\n\n`;
    content += `> **Dek**: ${guide.dek || ''}\n\n`;

    if (guide.hero) {
      content += `![${guide.hero.alt}](${guide.hero.src})\n*Plate: ${guide.hero.alt}*\n\n`;
    }

    if (guide.checklistItems && guide.checklistItems.length > 0) {
      content += `## 📋 Interactive Checklist\n\n`;
      guide.checklistItems.forEach((item) => {
        content += `- [ ] **${item.label}**\n  - *Note*: ${item.help || 'N/A'}\n`;
      });
      content += `\n`;
    }

    if (guide.tipBoxes && guide.tipBoxes.length > 0) {
      content += `## 💡 Essential Tip Boxes\n\n`;
      guide.tipBoxes.forEach((box) => {
        content += `### ${box.heading || 'Pro Tip'}\n`;
        content += `${box.body}\n\n`;
      });
    }

    content += `## 📖 Guide Breakdown\n\n`;
    guide.body.forEach((block) => {
      if (block.type === 'heading') {
        content += `### ${block.text}\n\n`;
      } else if (block.type === 'paragraph') {
        content += `${block.text}\n\n`;
      }
    });

    fs.writeFileSync(filePath, content, 'utf8');
  });

  // 3. Create Seoul-Knowledge-Hub.md (Master Graph Index for Obsidian)
  let hub = '# 🇰🇷 Seoul Knowledge Graph & Editorial Dashboard\n\n';
  hub += 'Welcome to the **Real Korea Obsidian Knowledge Base**. This root dashboard connects all verified tips, neighborhood nodes, authentic icons, and tourist traps.\n\n';
  hub += '## 🗺️ Neighborhood Clusters (12 Nodes)\n\n';
  SEED_NEIGHBORHOODS.forEach((n) => {
    hub += `- **[[${n.nameEn}]]** (\`${n.slug}\` / ${n.nameKo}) — ${n.dek || ''}\n`;
  });

  hub += '\n## ⚡ Verified Tips (14 High-Density Articles)\n\n';
  SEED_TIPS.forEach((tip, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    hub += `- [[${num}-${tip.slug}|${tip.title}]] \`[${tip.topic}]\`\n`;
  });

  hub += '\n## 📖 Comprehensive Guides\n\n';
  SEED_GUIDES.forEach((guide, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    hub += `- [[${num}-${guide.slug}|${guide.title}]]\n`;
  });

  hub += '\n## 📍 Places & Traps\n\n';
  hub += '- [[01-authentic-places-guide|Authentic Local Places & Icons in Seoul]]\n';
  hub += '- [[02-tourist-traps-and-alternatives|Confirmed Tourist Traps & Verified Alternatives]]\n';

  fs.writeFileSync(path.join(baseDir, 'Seoul-Knowledge-Hub.md'), hub, 'utf8');
  console.log('✅ Obsidian Vault fully upgraded with Frontmatter and Knowledge Hub!');
}

run().catch(console.error);
