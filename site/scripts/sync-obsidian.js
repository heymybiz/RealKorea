const fs = require('fs');
const path = require('path');

function parseMarkdownArticle(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const yamlStr = match[1];
  const bodyMarkdown = match[2];

  // Simple YAML parser for known fields
  const meta = {};
  yamlStr.split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (kv) {
      const key = kv[1];
      let val = kv[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val === 'true') {
        val = true;
      } else if (val === 'false') {
        val = false;
      }
      meta[key] = val;
    }
  });

  // Extract tip boxes
  const tipBoxes = [];
  const tipBoxSection = bodyMarkdown.match(/## 💡 Local Insider Tip Boxes\r?\n([\s\S]*?)(?=## 📖 Article Content|$)/);
  if (tipBoxSection) {
    const boxes = tipBoxSection[1].split(/### /).filter(Boolean);
    boxes.forEach((b) => {
      const lines = b.trim().split(/\r?\n/);
      const heading = lines[0].trim();
      const body = lines.slice(1).join(' ').trim();
      if (heading && body) {
        tipBoxes.push({ heading, body });
      }
    });
  }

  // Extract body blocks (H2/H3 and Paragraphs)
  const body = [];
  const contentSection = bodyMarkdown.match(/## 📖 Article Content\r?\n([\s\S]*)$/);
  const rawBody = contentSection ? contentSection[1] : bodyMarkdown;

  const chunks = rawBody.split(/\r?\n\r?\n/).map((c) => c.trim()).filter(Boolean);
  chunks.forEach((chunk) => {
    if (chunk.startsWith('### ')) {
      body.push({
        type: 'heading',
        level: 2,
        text: chunk.replace(/^###\s+/, '').trim(),
      });
    } else if (!chunk.startsWith('#') && !chunk.startsWith('>') && !chunk.startsWith('- **') && !chunk.startsWith('![')) {
      body.push({
        type: 'paragraph',
        text: chunk.replace(/\r?\n/g, ' ').trim(),
      });
    }
  });

  return { meta, tipBoxes, body };
}

function sync() {
  const baseDir = path.resolve(__dirname, '../../docs/articles');
  const tipsDir = path.join(baseDir, 'tips');

  if (!fs.existsSync(tipsDir)) {
    console.log('No tips directory found at', tipsDir);
    return;
  }

  const tipFiles = fs.readdirSync(tipsDir).filter((f) => f.endsWith('.md')).sort();
  console.log(`Found ${tipFiles.length} tip markdown files in Obsidian vault.`);

  const parsedTips = [];
  tipFiles.forEach((file) => {
    const raw = fs.readFileSync(path.join(tipsDir, file), 'utf8');
    const parsed = parseMarkdownArticle(raw);
    if (parsed && parsed.meta.id) {
      parsedTips.push({
        sample: false,
        id: parsed.meta.id,
        slug: parsed.meta.slug || file.replace(/^\d+-/, '').replace(/\.md$/, ''),
        status: parsed.meta.status || 'published',
        seoTitle: parsed.meta.seoTitle || parsed.meta.title,
        seoDescription: parsed.meta.seoDescription || parsed.meta.dek,
        ogImage: null,
        publishedAt: parsed.meta.publishedAt || '2026-08-30T10:00:00Z',
        updatedAt: parsed.meta.updatedAt || '2026-08-30T10:00:00Z',
        title: parsed.meta.title,
        dek: parsed.meta.dek,
        topic: parsed.meta.topic || 'survival',
        neighborhoodSlugs: ['jongno'],
        lastVerifiedAt: parsed.meta.lastVerifiedAt || '2026-08-30T00:00:00Z',
        editorVerified: parsed.meta.editorVerified !== false,
        relatedQuestionSlugs: [],
        relatedPlaceSlugs: [],
        promotedFromQuestionSlug: null,
        image: {
          src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=85',
          alt: parsed.meta.title,
          width: 1200,
          height: 800,
        },
        tipBoxes: parsed.tipBoxes,
        body: parsed.body,
      });
    }
  });

  console.log(`✅ Successfully parsed ${parsedTips.length} tips from Obsidian.`);
}

sync();
