# GO AMS // DESIGN SYSTEM INVENTORY

Este archivo es la **Única Fuente de Verdad (Single Source of Truth) Documental**. Define la jerarquía visual que debe estar sincronizada en todo momento con `design-system-app/src/app/globals.css`.

> **⚠️ ATENCIÓN AGENTE (TOKENIZER):**
> Nunca uses valores fijos ni arbitrarios (Tailwind default). Si un color o tamaño no está en esta tabla, NO lo puedes usar.

---

## 1. TIPOGRAFÍA (Tokens de Escala)
Familia Principal: `DM Sans` (La única tipografía permitida).

| Token | CSS Variable / Clamp | Uso |
|:---|:---|:---|
| `.text-display-3xl` | clamp(6rem, 12vw, 12rem) | Títulos masivos, hero principal |
| `.text-display-2xl` | clamp(4.5rem, 8vw, 8rem) | Títulos gigantes |
| `.text-display-xl` | clamp(3.5rem, 6vw, 6rem) | Portadas de dashboard |
| `.text-display-lg` | clamp(3rem, 5vw, 4.5rem) | Headers principales |
| `.text-display` | clamp(2.5rem, 4vw, 3.5rem) | Headers secundarios |
| `.text-display-sm` | clamp(2rem, 3vw, 2.5rem) | Headers tarjetas gigantes |
| `.text-h1` | clamp(1.75rem, 2.5vw, 2.25rem) | Títulos de sección |
| `.text-h2` | clamp(1.5rem, 2vw, 1.875rem) | Subtítulos de sección |
| `.text-h3` | clamp(1.25rem, 1.5vw, 1.5rem) | Títulos de tarjetas |
| `.text-h4` | clamp(1.125rem, 1.25vw, 1.25rem) | Títulos de grupos pequeños |
| `.text-h5` | 1.125rem | Etiquetas grandes |
| `.text-body-2xl` - `xs` | Escala desde 1.5rem hasta 0.75rem | Cuerpos de texto y párrafos |
| `.text-ui-label` | 0.8125rem (Uppercase, tracking-wider) | Botones y tags |

---

## 2. ESPACIADO Y LAYOUT (Zero Px Policy)

**Horizontal Padding (Contenedores):**
- `.px-gutter-sm`: clamp(1rem, 2vw, 1.5rem)
- `.px-gutter-md`: clamp(1.5rem, 4vw, 3.5rem)
- `.px-gutter-lg`: clamp(2rem, 6vw, 5rem)
- `.px-gutter-xl`: clamp(3rem, 8vw, 8rem)

**Vertical Padding (Secciones):**
- `.py-section-xs`: clamp(2rem, 4vw, 4rem)
- `.py-section-sm`: clamp(4rem, 6vw, 6rem)
- `.py-section-md`: clamp(6rem, 8vw, 10rem)
- `.py-section-lg`: clamp(8rem, 12vw, 15rem)

**Gaps (Flex/Grid):**
- `.gap-fluid-xs`: clamp(0.5rem, 1vw, 1.5rem)
- `.gap-fluid-sm`: clamp(1rem, 2vw, 2.5rem)
- `.gap-fluid-md`: clamp(2rem, 4vw, 5rem)
- `.gap-fluid-lg`: clamp(3rem, 6vw, 8rem)

**Max Widths:**
- `--max-w-section-sm`: 768px
- `--max-w-section-md`: 1024px
- `--max-w-section-lg`: 1280px
- `--max-w-section-xl`: 1536px

---

## 3. COLORES BÁSICOS (Tokens Completos)
_El sistema es Bimodal (Light/Dark). El uso de colores genéricos de Tailwind (`bg-gray-100`, `text-blue-500`) está estrictamente prohibido. Usa `bg-[var(--color-nombre)]`, `text-[var(--color-nombre)]` o `border-[var(--color-nombre)]`._

**Brand & Identidad:**
- `--color-brand-blue`
- `--color-brand-dark`
- `--color-brand-orange`
- `--color-brand-Logo-Main-color`
- `--color-brand-Logo-Secondary-color`

**Superficies (Backgrounds):**
- `--color-surface-BG-1`
- `--color-surface-BG-2`
- `--color-surface-BG-3`
- `--color-surface-BG-4`
- `--color-surface-BG-base`
- `--color-surface-BG-base-Opacity`

**Textos:**
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-muted`
- `--color-text-disabled`
- `--color-text-hint`
- `--color-text-primary-Reverted`
- `--color-text-Blue-Vivid`
- `--color-text-White-100`
- `--color-text-Black-100`

**Bordes:**
- `--color-border-Strokes-default`
- `--color-border-Strokes-Hover`
- `--color-border-Strokes-focus`
- `--color-border-Strokes-input`
- `--color-border-Strokes-input---Hover`
- `--color-border-Strokes-strong`

**Acciones (Primarias, Secundarias y Destructivas):**
- `--color-action-primary-bg`
- `--color-action-primary-hover`
- `--color-action-primary-subtle-hover`
- `--color-action-Primary-Medium-hover`
- `--color-action-Primary-Strong-hover`
- `--color-action-primary-subtle-active`
- `--color-action-primary-text`
- `--color-action-secondary-bg`
- `--color-action-secondary-Strong`
- `--color-action-secondary-hover`
- `--color-action-secondary-text`
- `--color-action-destructive`
- `--color-action-destructive-hover`
- `--color-action-destructive-text`
- `--color-action-focus-ring`
- `--color-action-link`
- `--color-action-link-hover`

**Acentos (Accent):**
- `--color-accent-border`
- `--color-accent-main`
- `--color-accent-surface-muted`
- `--color-accent-surface-strong`
- `--color-accent-surface-subtle`
- `--color-accent-text-muted`
- `--color-accent-text-strong`

**Estados (Amber / Blue / Green / Purple / Red):**
- Status Amber (Warning): `--color-status-amber-border`, `-main`, `-surface-muted`, `-surface-strong`, `-surface-subtle`, `-text-Medium`, `-text-strong`
- Status Blue (Info): `--color-status-blue-border`, `-main`, `-surface-muted`, `-surface-strong`, `-surface-subtle`, `-text-Medium`, `-text-strong`
- Status Green (Success): `--color-status-green-border`, `-main`, `-surface-muted`, `-surface-strong`, `-surface-subtle`, `-text-Medium`, `-text-strong`
- Status Purple: `--color-status-purple-border`, `-main`, `-surface-muted`, `-surface-strong`, `-surface-subtle`, `-text-Medium`, `-text-strong`
- Status Red (Error): `--color-status-red-border`, `-main`, `-surface-muted`, `-surface-strong`, `-surface-subtle`, `-text-Medium`, `-text-strong`

**Overlays:**
- `--color-overlay-backdrop`
- `--color-overlay-tooltip-bg`

---

## CONEXIÓN CON TOKENIZER
El Agente Tokenizer (`Tokenizer.md`) lee este documento en su Fase 1 y obliga a que cualquier código UI generado aplique esta tabla. Si una medida no encaja, se fuerza el token más cercano.
