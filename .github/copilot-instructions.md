# Project Guidelines

## Overview

Bio-Mindmap is a **static** educational web app for Taiwan high school biology students. It displays human physiology content as interactive mind maps (via Markmap) and provides exam practice questions. All UI text is in **Traditional Chinese (繁體中文)**.

## Tech Stack

- **Vanilla JS** — no framework, no TypeScript, no bundler
- **Markmap** via CDN (`jsDelivr`) for mind map rendering
- **Plain CSS** with CSS custom properties for theming
- **LocalStorage** for read/completion progress tracking
- **GitHub Pages** deployment (auto via GitHub Actions on push to `main`)

No `package.json` exists. To serve locally: `python3 -m http.server 8000` or `npx http-server`.

## Architecture

Three-page structure with shared logic in `js/app.js`:

| Page | Purpose | Data Source |
|------|---------|-------------|
| `index.html` | Topic grid with progress | `content/topics.json` |
| `viewer.html` | Markmap mind map viewer | `content/*.md` |
| `quiz.html` | Exam practice & scoring | `questions/*.json` |

Navigation flow: Homepage → select topic → Viewer (mind map) or Quiz (questions).

Topic routing uses URL query params (`?topic=nervous-system`).

## Code Style

- **camelCase** for JS functions/variables; **kebab-case** for CSS classes
- Section headers: `/* ===== SECTION NAME ===== */`
- Functions grouped by page feature: Homepage, Viewer, Quiz
- Use `async/await` for fetch calls with try/catch
- DOM creation via `document.createElement()` and `.innerHTML` string templates
- CSS follows BEM-like naming (`.card-icon`, `.btn-primary`)

## Content Structure

- `content/topics.json` — master index with categories, topic metadata (id, title, icon, color, examRatio, questionCount)
- `content/*.md` — hierarchical Markdown consumed by Markmap; headers (`#`/`##`/`###`) define map nodes
- `questions/*.json` — arrays of multiple-choice questions with `answer` (letter) and `explanation`

Each of the 8 body systems has one `.md` and one `.json` file with a matching topic ID.

## Conventions

- All user-facing strings must be in Traditional Chinese
- English variable/function names in code
- CSS custom properties defined in `:root` for theming — use them instead of hardcoded colors
- Keep the project dependency-free (no npm packages); external libs loaded via CDN only
- Progress state stored in LocalStorage with `isRead(topicId)` / `markAsRead(topicId)` helpers
