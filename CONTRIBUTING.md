# Contributing Guide

## Development Setup

This is a static site with no build tools or npm dependencies.

```bash
git clone https://github.com/<your-username>/bio-mindmap.git
cd bio-mindmap
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## File Structure

| Path | Purpose |
|------|---------|
| `index.html` | Homepage — topic grid and progress bar |
| `viewer.html` | Mind map viewer — loads Markmap via CDN |
| `quiz.html` | Quiz page — question rendering and scoring |
| `js/app.js` | All application logic (shared utils, homepage, viewer, quiz) |
| `css/style.css` | All styles with CSS custom properties for theming |
| `content/topics.json` | Master topic index — categories and topic metadata |
| `content/*.md` | Markmap source files — one per body system |
| `questions/*.json` | Quiz data — one per body system |

## Coding Conventions

### JavaScript (`js/app.js`)

- **Naming**: `camelCase` for functions and variables
- **Section headers**: `/* ===== SECTION NAME ===== */`
- **Function grouping**: Shared Utilities → Homepage → Viewer → Quiz
- **Async**: Use `async/await` with `try/catch` for all `fetch` calls
- **DOM creation**: `document.createElement()` for structured elements, `.innerHTML` for templates
- **No dependencies**: External libraries via CDN only (currently only Markmap)

### CSS (`css/style.css`)

- **Naming**: `kebab-case` with BEM-like patterns (`.card-icon`, `.btn-primary`)
- **Section headers**: `/* ===== SECTION NAME ===== */`
- **Theming**: Use CSS custom properties from `:root` — never hardcode colors

```css
/* ✅ Correct */
color: var(--text-muted);
background: var(--bg-card);

/* ❌ Wrong */
color: #94a3b8;
background: #1e293b;
```

### Available CSS Variables

| Variable | Purpose | Value |
|----------|---------|-------|
| `--bg` | Page background | `#0f172a` |
| `--bg-card` | Card background | `#1e293b` |
| `--bg-card-hover` | Card hover state | `#334155` |
| `--text` | Primary text | `#f1f5f9` |
| `--text-muted` | Secondary text | `#94a3b8` |
| `--accent` | Accent/brand color | `#6366f1` |
| `--success` | Success/completion | `#10b981` |
| `--radius` | Border radius | `12px` |
| `--shadow` | Box shadow | `0 4px 24px rgba(0,0,0,0.3)` |
| `--transition` | Transition timing | `0.25s ease` |

### UI Language

All user-facing text must be in **Traditional Chinese (繁體中文)**. Use English only for code identifiers (variable names, CSS classes, file names).

## Key Patterns

### Topic Routing

Pages communicate via URL query parameters:

```
viewer.html?topic=nervous-system
quiz.html?topic=circulatory
```

The topic ID must match an entry in `content/topics.json`.

### Progress Tracking

```javascript
// Check if a topic has been read
isRead('nervous-system')    // returns boolean

// Mark as read/unread
markAsRead('nervous-system')
markAsUnread('nervous-system')

// LocalStorage key format: 'bio-mindmap-read-{topicId}'
```

### Adding a New Topic

See [docs/content-guide.md](docs/content-guide.md) for detailed instructions.

Quick summary:
1. Create `content/{topic-id}.md` (Markmap source)
2. Create `questions/{topic-id}.json` (quiz data)
3. Add topic entry to `content/topics.json`

## Deployment

Push to `main` triggers automatic deployment to GitHub Pages via `.github/workflows/deploy.yml`. No build step required — files are served as-is.

## Constraints

- **No npm packages** — keep the project dependency-free
- **No frameworks** — vanilla JS only
- **No build tools** — no bundler, no TypeScript, no preprocessors
- **CDN only** — external libraries loaded via `jsDelivr` CDN
