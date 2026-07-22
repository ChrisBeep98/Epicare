# Changelog — Graph Design Framework (Epicare)

All notable changes to this framework are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

## [3.0.0] — 2026-07-22 · "La Gran Purga"

Reestructuración completa tras auditoría: la ruta de entrada calibraba a la IA con la marca muerta (GO AMS/café/Playfair) vía rutas rotas (`context-Docs/`), la sustancia ejecutable estaba enterrada bajo 4 docs de filosofía redundantes, y no existían tokens de motion ni criterios de calidad verificables.

### Added
- **`START-HERE.md`** — único punto de entrada con router por intención y las 5 leyes.
- **`MOTION-BIBLE.md`** — fusión de AWWWARDS-MOTION + CREATIVE-MOTION + CINEMATIC-ARCHITECT: cada pilar con receta GSAP ejecutable y valores de la firma real.
- **`src/lib/motion.ts`** (design-system-app) — tokens de motion (EASE/DUR/STAGGER/REVEAL/SCRUB/TRIGGER/PARALLAX) extraídos del censo de la landing.
- **`SECTION-ARCHETYPES.md`** — coreografía mínima obligatoria + paradigmas de layout por tipo de sección.
- **`AWWWARDS-RUBRIC.md`** — examen binario 15 puntos, umbral 12/15 para entregar.
- **`redesign-section-protocol.md`** — comando de rediseño: censo → autopsia → 3 conceptos de paradigmas distintos → STOP → implementar → rubric. Reglas anti-loop.
- **`project-context/scrollytelling-map.md`** — mapa canónico de la coreografía de scroll de toda la página (censo 2026-07-22), con firma, deudas y territorio virgen.

### Changed
- **`creative-motion-protocol.md`** — reescrito sin tabla de overrides (fuentes ya limpias); carga scrollytelling-map primero; exige Motion Score y RUBRIC.
- **`ONBOARDING-AI-protocol.md`** — identidad Epicare (Inter/bimodal/fintech), rutas reales, router de protocolos.
- **`validation-rules.md`** — ahora valida la marca correcta (flaggea Playfair/café/violeta) + reglas MOTION_TOKEN_SYNC y BIMODAL_RULE.
- **Rutas unificadas** a raíz `Graph-Design-Framework/` en todos los prompts activos (update-context, session-close, hardware-audit, backup-brain, framework-migration).
- Ambos README (command-prompts y Design-Agent-Skills) actualizados; skills marcadas como receta/dirección/guardián/examen.

### Removed (→ `_archive/legacy-goams/`)
- `master-design-prompt.md`, `refactor-design-prompt.md`, `onboarding-context.md` (calibraban a la marca muerta con rutas rotas).
- `CREATIVE-DIRECTION.md`, `CREATIVE-MOTION.md`, `AWWWARDS-MOTION.md`, `CINEMATIC-ARCHITECT.md` (fusionadas en MOTION-BIBLE).
- Scrapings (Alche, iru) movidos a `references/` como inspiración, no protocolo.

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
