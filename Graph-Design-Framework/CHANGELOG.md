# Changelog — SalentoCoffee context-Docs Framework

All notable changes to this framework are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

## [2.3.0] — 2026-03-19

### Added
- **Section-based context architecture:** 12 folders in `project-context/sections/` with individual `context.md` files per section.
- **`AGENTS.md`** at repo root — open standard for AI agent interoperability.
- **`CHANGELOG.md`** (this file) with retroactive history.
- **Debug Panel Architect v2.0:** Collapsible pill UI, 8 control types, `__dbg` prefix convention, 9-step purge checklist.
- **Agent Skills `README.md`** index with recommended reading order and categories.
- **YAML frontmatter** on all 9 agent skills.
- **Session Notes** infrastructure (`session-notes/` folder + close prompt).
- **Self-Validation Rules** for document consistency auditing.
- **TL;DR headers** on section context files.
- **`update-context-prompt.md` v2.0:** Section-specific update and onboarding prompts.

### Changed
- **`ONBOARDING-AI.md`:** i18n rule updated from blanket `useTranslations()` to 2-zone system (Admin vs Landing).
- **`Design-System.md`:** `px-frame` deprecated → `clamp()` native. Changelog section added.
- **`master-design-prompt.md`:** Font reference corrected (Walsheim → Inter).
- **`onboarding-context.md`:** Phase reference updated (Fase 2 → Fase 8).
- **`Creative-Skill.md`:** Font reference corrected (Inter/Geist → Playfair Display/Inter). Renamed to `CREATIVE-DIRECTION.md`.
- **`agent-skill-advanced-scroll-effects.md`:** Renamed to `SCROLL-EFFECTS-ARCHITECT.md`.
- **`context.md`:** Slimmed from 271 → 85 lines. Entries #1-38 archived.
- **`backup-brain-prompt.md`:** Updated with version history table.

### Fixed
- Folder typo: `Bussines-Logic` → `Business-Logic`.

---

## [2.2.0] — 2026-02-22

### Added
- 12-token typography system (Apple HIG + Major Third 1.25×).
- Inter font integration via Fontshare CDN.
- `Tokenizer.md` — 5-dimensional analysis framework.

### Changed
- Replaced GT Walsheim Pro with Inter in `--font-sans`.

---

## [2.1.0] — 2026-02-21

### Added
- Agent Skills library (9 files).
- `ONBOARDING-AI.md` Pre-Flight Checklist protocol.
- `Informe.md` business logic documentation.
- Command prompts collection (onboarding, update, refactor, deploy, backup, audit, master design).

---

## [2.0.0] — 2026-02-16

### Added
- Initial framework structure (`context-Docs/`).
- Design System v1: Vibrant Energy (Light Mode), 4-Pillar Gradient, button definitions.
- `context.md` with project vision, stack, and standards.

### Changed
- Full migration from generic README approach to structured agent-oriented documentation.
