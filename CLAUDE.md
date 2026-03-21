# Bio-Mindmap — Project Guidelines

> This file is the single source of truth for project context.
> Also referenced by `.github/copilot-instructions.md` for GitHub Copilot.

## Overview

Bio-Mindmap is a **static** educational web app for Taiwan high school students. It displays multi-subject content as interactive mind maps (via Markmap) and provides exam practice questions. Subjects include 國文, 英文, 數學, 自然 (物理/化學/生物/地科), and 社會 (歷史/地理/公民). All UI text is in **Traditional Chinese (繁體中文)**.

## Tech Stack

- **Vanilla JS** — no framework, no TypeScript, no bundler
- **Markmap** via CDN (`jsDelivr`) for mind map rendering (`markmap-lib@0.15`, `markmap-view@0.15`, `d3@7`)
- **Plain CSS** with CSS custom properties for theming
- **LocalStorage** for read/completion progress tracking
- **GitHub Pages** deployment (auto via GitHub Actions on push to `main`)

No `package.json` exists. To serve locally: `python3 -m http.server 8000` or `npx http-server`.

## Architecture

Four-page structure with shared logic in `js/app.js`:

| Page | Purpose | Data Source |
|------|---------|-------------|
| `index.html` | Subject selector grid | `content/subjects.json` |
| `subject.html` | Sub-subject or topic listing | `content/{subject}/{sub}/topics.json` |
| `viewer.html` | Markmap mind map viewer + sidebar | `content/{subject}/{sub}/*.md` |
| `quiz.html` | Exam practice & scoring | `questions/{subject}/{sub}/*.json` |

Navigation flow: Homepage → select subject → (optional sub-subject) → viewer (merged mind map) or Quiz.

Routing uses URL query params (`?subject=science&sub=biology&topic=nervous-system`).

### Viewer Architecture

- Individual `.md` files fetched in parallel via `Promise.all`, merged at runtime
- Programmatic Markmap: `new Transformer().transform(md)` → `Markmap.create(svg, opts, root)`
- Both `markmap-lib` and `markmap-view` export to `window.markmap` global
- Sidebar with 2 tabs: 📘 概念與應用 / 🎯 考試準備
- Node completion tracked per-node in LocalStorage with ISO timestamps
- Detail JSON files (`content/{subject}/{sub}/details/{topic}.json`) provide `associations` and `examTips`
- Question JSON files (`questions/{subject}/{sub}/{topic}.json`) have `tags` arrays for node matching

## Code Style

- **camelCase** for JS functions/variables; **kebab-case** for CSS classes
- Section headers: `/* ===== SECTION NAME ===== */`
- Functions grouped by page feature: Homepage, Subject, Viewer, Quiz
- Use `async/await` for fetch calls with try/catch
- DOM creation via `document.createElement()` and `.innerHTML` string templates
- CSS follows BEM-like naming (`.card-icon`, `.btn-primary`)
- XSS prevention: use `escapeHtml()` for user-visible dynamic content

## Content Structure

- `content/subjects.json` — master subject index with hierarchy (subjects, sub-subjects)
- `content/{subject}/topics.json` — topics for subjects without sub-subjects (e.g., chinese, english, math)
- `content/{subject}/{sub}/topics.json` — topics for sub-subjects (e.g., science/biology, social/history)
- `content/{subject}/{sub}/*.md` — Markmap source; headers (`#`/`##`/`###`) define map nodes
- `content/{subject}/{sub}/details/*.json` — node detail data (associations, examTips)
- `questions/{subject}/{sub}/*.json` — multiple-choice questions with `answer`, `explanation`, and `tags`

Subjects with `hasSubjects: true` (自然, 社會) contain sub-subjects. Others are flat.

## Conventions

- All user-facing strings must be in Traditional Chinese
- English variable/function names in code
- CSS custom properties defined in `:root` for theming — use them instead of hardcoded colors
- Keep the project dependency-free (no npm packages); external libs loaded via CDN only
- Progress state stored in LocalStorage with `isRead(subjectId, subId, topicId)` / `markAsRead(...)` helpers
- Node-level progress stored as ISO timestamp via `toggleNodeCheck()` / `isNodeChecked()` / `getNodeCheckedTime()`

## Agents / Roles

| Role | Purpose |
|------|---------|
| `coding` | Write/edit code — JS, HTML, CSS, JSON, Markdown |
| `content` | Create educational content — mind map .md, quiz .json, topics.json |
| `planning` | Plan features, decompose tasks, architecture decisions |
| `reviewer` | Code review, security audit, best practices check |
| `testing` | Validate changes, smoke test, data integrity checks |
| `doc-writer` | Documentation, README, code comments |

## Do NOT

- Add npm packages or build tools
- Introduce TypeScript or any framework
- Modify files outside the requested scope
- Use `markmap-autoloader` (use programmatic API instead)
- Use `window.markmapView` (both libs export to `window.markmap`)
