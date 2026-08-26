---
name: Agent Skills Index
description: Índice y orden de carga de las Design Agent Skills de Epicare, marcando cuáles son ejecutables (recetas) y cuáles filosofía.
---

# 🧠 Epicare Design Agent Skills — Índice

> **Propósito:** protocolos modulares para agentes de IA. Entrada global: [`../../START-HERE.md`](../../START-HERE.md). Las skills se cargan desde los protocolos de `command-prompts/` (creative-motion, redesign-section, tokenized).

## 📖 Orden de carga para trabajo de DISEÑO/MOTION

| # | Skill | Archivo | Tipo | Descripción |
|:--|:---|:---|:---|:---|
| 1 | **Motion Bible** | [`MOTION-BIBLE.md`](./MOTION-BIBLE.md) | ⚙️ receta | LA fuente canónica: física de Epicare + tokens de motion (`src/lib/motion.ts`) + receta ejecutable de cada pilar. |
| 2 | **Scroll Effects Architect** | [`SCROLL-EFFECTS-ARCHITECT.md`](./SCROLL-EFFECTS-ARCHITECT.md) | ⚙️ receta | 7 técnicas GSAP pesadas con código completo (split-scroll, stacking, horizontal, scrollytelling, velocity, FLIP). |
| 3 | **Section Archetypes** | [`SECTION-ARCHETYPES.md`](./SECTION-ARCHETYPES.md) | 🎯 dirección | Coreografía mínima obligatoria + paradigmas de layout por tipo de sección. |
| 4 | **Awwwards Rubric** | [`AWWWARDS-RUBRIC.md`](./AWWWARDS-RUBRIC.md) | ✅ examen | Checklist binario 15 puntos. Umbral 12/15 para entregar. |
| 5 | **Tokenizer** | [`Tokenizer.md`](./Tokenizer.md) | 🛡️ guardián | Enforcement Zero-Px del Design System. |
| 6 | **Motion Tokenizer** | [`Motion-Tokenizer.md`](./Motion-Tokenizer.md) | 🛡️ guardián | Enforcement de tokens cinemáticos (`motion.ts`), 4 arquetipos y Line-by-Line Clip. |
| 7 | **Cognitive Typographer** | [`COGNITIVE-TYPOGRAPHER.md`](./COGNITIVE-TYPOGRAPHER.md) | ⚙️ receta | Tracking, text-wrap, medida de línea. |
| 8 | **Hardware Symphony** | [`HARDWARE-SYMPHONY.md`](./HARDWARE-SYMPHONY.md) | 🛡️ guardián | 60fps: qué animar y qué no, smart shutdown, degradación. |

## 🧰 Skills de workflow (bajo demanda)

| Skill | Archivo | Descripción |
|:--|:---|:---|
| **Debug Panel Architect** | [`DEBUG-PANEL-ARCHITECT/`](./DEBUG-PANEL-ARCHITECT/README.md) | **Carpeta** de 17 módulos: panel de debug inyectable para tuning visual en vivo + Purge Protocol. |
| **Commerce Architect** | [`COMMERCE-CONVERSION-ARCHITECT.md`](./COMMERCE-CONVERSION-ARCHITECT.md) | UX/motion e-commerce (cart drawer, galerías, FLIP → ver SEA §6). |
| **Visual Prompter** | [`visual-prompt-engineer/SKILL.md`](./visual-prompt-engineer/SKILL.md) | Prompts para AI video/imagen (Veo, Midjourney) para heros. |

## 🗄️ Retiradas (no cargar)

`CREATIVE-DIRECTION`, `CREATIVE-MOTION`, `AWWWARDS-MOTION` y `CINEMATIC-ARCHITECT` fueron **fusionadas en MOTION-BIBLE.md** y archivadas en [`../../_archive/legacy-goams/`](../../_archive/legacy-goams/) — contenían la marca muerta (Playfair/café/violeta/light-only). Los scrapings de referencia (Alche, iru) viven en [`../../references/`](../../references/) como inspiración, no protocolo.
