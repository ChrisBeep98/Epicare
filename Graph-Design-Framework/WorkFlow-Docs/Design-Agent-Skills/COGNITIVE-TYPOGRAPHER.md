---
name: Cognitive Typographer
description: Defines rhythm, tracking, text wrapping, fluid scaling, and accessibility rules for typography. Handles micro-aesthetics and reading behavior.
---

# 🧠 Agent Skill: THE COGNITIVE TYPOGRAPHER (Rhythm & Adaptive Reading)

**Level:** Editorial / Master-Class
**Objective:** Elevate typography from "looking good" to "breathing with the user." In GO AMS AI, reading must be an effortless, immersive experience.

---

> *"Good typography is invisible. Outstanding typography is a silent rhythm that guides the mind."*

This skill defines the strict rules for text orchestration. The `Tokenizer.md` handles the *sizes*, but this skill handles the *behavior* and *micro-aesthetics* of the text.

Whenever you build a UI component involving reading (Headings, Paragraphs, Articles, Features), you MUST follow these Cognitive Typography laws:

## 1. THE LAWS OF TRACKING (Letter-Spacing)
Text density alters perception. You must mathematically adjust letter-spacing based on font size and weight.

*   **Massive Display Headlines (H1s > 4rem):** MUST use negative tracking (e.g., `tracking-tighter` or `letter-spacing: -0.04em`). The letters must feel like a unified, solid object.
*   **Subheadings & Overlines (Small caps):** MUST use positive tracking (e.g., `tracking-widest` or `letter-spacing: 0.1em`). Uppercase tiny text needs air to be legible.
*   **Body Text (Paragraphs):** Natural or slightly relaxed (e.g., `tracking-normal` to `letter-spacing: 0.01em`). Never compress body text.

## 2. ORCHESTRATED LINE BREAKS (Text Wrapping)
Never let the browser randomly chop your elegant sentences.

*   **Headlines (H1, H2, H3):** MUST use `text-wrap: balance` (Tailwind: `text-balance`). This prevents awkward long lines with one single word hanging on the next line.
*   **Paragraphs (Body):** MUST use `text-wrap: pretty` (Tailwind: `text-pretty`). This eliminates "Typographic Orphans" (a single word left alone on the last line of a paragraph).

## 3. ADAPTIVE RHYTHM (Fluid Typography)
Do not rely solely on standard media query breakpoints for typography sizing. Text must scale liquidly.

*   **Implementation:** ALL heading tokens use CSS `clamp()` with 3 control points:
    *   **Minimum:** The smallest the text can be (in `rem`)
    *   **Preferred:** Scales with viewport width (in `vw`)
    *   **Maximum:** The largest the text can be (in `rem`)
*   **Current token values (defined in `globals.css`):**
    *   `.text-display`: `clamp(3rem, 5vw, 6rem)`
    *   `.text-h1`: `clamp(2rem, 4.5vw, 3.5rem)`
    *   `.text-h3`: `clamp(1.5rem, 3vw, 2.25rem)`
    *   `.text-h4`: `clamp(1.25rem, 2.5vw, 1.75rem)`
    *   `.text-h5`: `clamp(1.125rem, 2vw, 1.375rem)`
*   **Body/Label tokens** use fixed `rem` values (do NOT scale with viewport — correct for readability).

## 4. THE LAW OF MEASURE (Optimal Line Length)
The human eye gets fatigued if lines are too long or too short.
*   **Paragraphs:** Constrain the maximum width of reading blocks to roughly 65-75 characters.
*   **Implementation:** Wrap body text in `max-w-prose` or explicitly limit the width of the container (`max-w-2xl`). Do not let a paragraph span 100% of a 1920px screen.

## 5. 🚨 THE LAW OF UNITS (px is FORBIDDEN for font-size)

> **This is the #1 source of bugs in the codebase. Enforce ruthlessly.**

*   **NEVER** use `px` for `font-size` in components or tokens.
*   **ALWAYS** use `rem`, `em`, `clamp()`, or Tailwind named classes (`text-base`, `text-sm`, `text-xs`).
*   `px` does NOT respect browser font-size preferences → breaks accessibility.
*   `rem` scales with the root font-size → respects user preferences.

### Quick px → rem Conversion Table

| px | rem | Tailwind Class |
|:---|:---|:---|
| 7px | `0.4375rem` | — |
| 8px | `0.5rem` | — |
| 10px | `0.625rem` | — |
| 11px | `0.6875rem` | — |
| 12px | `0.75rem` | `text-xs` |
| 13px | `0.8125rem` | — |
| 14px | `0.875rem` | `text-sm` |
| 16px | `1rem` | `text-base` |
| 18px | `1.125rem` | `text-lg` |
| 20px | `1.25rem` | `text-xl` |

## 🤖 AI PROMPT DIRECTIVES
When generating text structures for GO AMS:
1. *"Did I use any `text-[Xpx]` class? If yes, STOP and convert to `rem` immediately."*
2. *"Did I leave the H1 with default tracking? If yes, tighten it to make it lock together."*
3. *"Is the paragraph allowed to stretch infinitely? If yes, apply `max-w-prose`."*
4. *"Did I just write a multi-line headline? If yes, apply `text-balance`."*
5. *"Am I using a Design System token for this text? If not, why not?"*

