const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');

// All 13 topic mappings: [subject, sub, topicId]
const TOPICS = [
  // Biology (8)
  ['science', 'biology', 'nervous-system'],
  ['science', 'biology', 'endocrine'],
  ['science', 'biology', 'circulatory'],
  ['science', 'biology', 'immune'],
  ['science', 'biology', 'digestive'],
  ['science', 'biology', 'respiratory'],
  ['science', 'biology', 'urinary'],
  ['science', 'biology', 'reproductive'],
  // Chemistry (5)
  ['science', 'chemistry', 'composition-of-matter'],
  ['science', 'chemistry', 'structure-of-matter'],
  ['science', 'chemistry', 'states-and-phase-changes'],
  ['science', 'chemistry', 'common-reactions'],
  ['science', 'chemistry', 'life-chemistry'],
];

function extractH2Headings(mdContent) {
  const headings = [];
  const regex = /^## (.+)$/gm;
  let match;
  while ((match = regex.exec(mdContent)) !== null) {
    headings.push(match[1].trim());
  }
  return headings;
}

// Extract section content under each ## heading (including all sub-headings)
function extractSections(mdContent) {
  const sections = {};
  const lines = mdContent.split('\n');
  let currentH2 = null;
  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      currentH2 = h2Match[1].trim();
      sections[currentH2] = '';
    } else if (currentH2) {
      sections[currentH2] += line + '\n';
    }
  }
  return sections;
}

// Build keyword sets from each section
function buildKeywords(sections) {
  const keywordMap = {};
  for (const [heading, content] of Object.entries(sections)) {
    // Extract meaningful Chinese terms (2+ chars) and English terms
    const allText = heading + '\n' + content;
    // Get Chinese words/terms - extract from bullet points and headings
    const terms = new Set();

    // Add the heading itself and its parts
    terms.add(heading);
    // Split heading by common delimiters
    for (const part of heading.split(/[（）()、，,\s]/)) {
      if (part.length >= 2) terms.add(part);
    }

    // Extract terms from ### sub-headings
    const h3Matches = content.matchAll(/^### (.+)$/gm);
    for (const m of h3Matches) {
      terms.add(m[1].trim());
      for (const part of m[1].split(/[（）()、，,\s]/)) {
        if (part.length >= 2) terms.add(part);
      }
    }

    // Extract key terms from bullet points
    const bulletMatches = content.matchAll(/^[\s]*[-*]\s*(.+?)[:：]/gm);
    for (const m of bulletMatches) {
      const term = m[1].trim();
      if (term.length >= 2) {
        terms.add(term);
        for (const part of term.split(/[（）()、，,\s]/)) {
          if (part.length >= 2) terms.add(part);
        }
      }
    }

    // Also extract parenthetical terms like （xxx）
    const parenMatches = allText.matchAll(/[（(]([^）)]+)[）)]/g);
    for (const m of parenMatches) {
      const inner = m[1].trim();
      if (inner.length >= 2) terms.add(inner);
    }

    keywordMap[heading] = [...terms];
  }
  return keywordMap;
}

function scoreQuestion(question, keywordMap, sections) {
  const qText = [question.text, ...question.options, question.explanation].join(' ');
  const scores = {};

  for (const [heading, keywords] of Object.entries(keywordMap)) {
    let score = 0;

    // Direct heading mention is a strong signal
    if (qText.includes(heading)) {
      score += 10;
    }

    // Check heading sub-parts
    const headingParts = heading.split(/[（）()、，,\s]/).filter(p => p.length >= 2);
    for (const part of headingParts) {
      if (qText.includes(part)) score += 5;
    }

    // Check section keywords
    for (const kw of keywords) {
      if (kw.length < 2) continue;
      if (qText.includes(kw)) {
        score += kw.length >= 4 ? 3 : 2;
      }
    }

    // Check section content overlap: do terms from the section body appear in the question?
    const sectionContent = sections[heading] || '';
    const sectionLines = sectionContent.split('\n').filter(l => l.trim());
    for (const line of sectionLines) {
      // Extract the main term from each bullet
      const termMatch = line.match(/[-*]\s*(.+?)[:：]/);
      if (termMatch) {
        const term = termMatch[1].trim();
        if (term.length >= 2 && qText.includes(term)) {
          score += 2;
        }
      }
    }

    scores[heading] = score;
  }

  return scores;
}

function assignTags(question, keywordMap, sections, headings) {
  const scores = scoreQuestion(question, keywordMap, sections);

  // Sort headings by score descending
  const sorted = headings
    .map(h => ({ heading: h, score: scores[h] || 0 }))
    .sort((a, b) => b.score - a.score);

  const tags = [];
  if (sorted.length > 0 && sorted[0].score > 0) {
    tags.push(sorted[0].heading);
    // Add second tag only if it has a meaningful score (at least 40% of top)
    if (sorted.length > 1 && sorted[1].score >= sorted[0].score * 0.4 && sorted[1].score > 3) {
      tags.push(sorted[1].heading);
    }
  }

  // Fallback: if no tags assigned, use the first heading
  if (tags.length === 0 && headings.length > 0) {
    tags.push(headings[0]);
  }

  return tags;
}

let totalQuestions = 0;
let totalFiles = 0;

for (const [subject, sub, topicId] of TOPICS) {
  const mdPath = path.join(BASE, 'content', subject, sub, `${topicId}.md`);
  const jsonPath = path.join(BASE, 'questions', subject, sub, `${topicId}.json`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`WARN: .md not found: ${mdPath}`);
    continue;
  }
  if (!fs.existsSync(jsonPath)) {
    console.warn(`WARN: .json not found: ${jsonPath}`);
    continue;
  }

  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const headings = extractH2Headings(mdContent);
  const sections = extractSections(mdContent);
  const keywordMap = buildKeywords(sections);

  const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`\n=== ${subject}/${sub}/${topicId} ===`);
  console.log(`  ## headings: ${headings.join(', ')}`);

  for (const q of jsonContent.questions) {
    const tags = assignTags(q, keywordMap, sections, headings);
    q.tags = tags;
    console.log(`  ${q.id}: ${tags.join(', ')}  (${q.text.substring(0, 30)}...)`);
    totalQuestions++;
  }

  // Write back
  fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2) + '\n', 'utf-8');
  totalFiles++;

  // Validate JSON by re-reading
  try {
    JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`  ✓ Valid JSON written`);
  } catch (e) {
    console.error(`  ✗ INVALID JSON: ${e.message}`);
  }
}

console.log(`\n=== DONE: ${totalFiles} files, ${totalQuestions} questions tagged ===`);
