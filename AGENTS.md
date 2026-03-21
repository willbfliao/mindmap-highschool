# Agents

> Agent definitions for this project.
> GitHub Copilot uses `.github/agents/*.agent.md` files (detailed per-agent prompts).
> Claude Code uses this file for agent role reference.
> Both share the same project context from `CLAUDE.md` / `.github/copilot-instructions.md`.

## coding

Write or edit code — JavaScript, HTML, CSS, JSON, or Markdown content files.
Use for implementing features, fixing bugs, adding topics, and modifying UI.

**Constraints**: Read target files before editing. Match existing code style. Minimal changes only. No npm, no framework.

## content

Create or expand educational content — mind map Markdown files, quiz question JSON files, and topics.json registration.
Use for adding new topics, new subjects, new sub-subjects, bulk content generation, and content quality review.

**Constraints**: Follow 心智圖四大設計原則 (keywords, radiant structure, color, association). Validate JSON schema. Register in topics.json.

## planning

Plan features, break down tasks, design solutions, create implementation plans.
Use for architecture decisions, feature scoping, and task decomposition.

**Constraints**: DO NOT write code. Produce numbered task lists with file references and acceptance criteria.

## reviewer

Review code changes, audit code quality, check for security issues, evaluate pull requests.
Use for code review, best practices validation, and accessibility checks.

**Constraints**: Read-only analysis. Flag XSS risks, broken references, CSS inconsistencies, data schema violations.

## testing

Test the application, validate changes, check for broken links, verify data integrity.
Use for smoke testing, content validation, and cross-file consistency checks.

**Constraints**: Run validation scripts. Check JSON validity, file references, content completeness.

## doc-writer

Write documentation, README files, code comments, JSDoc annotations, content guides.
Use for creating or updating project documentation.

**Constraints**: Match existing documentation style. Use Traditional Chinese for user-facing docs.
