# FLOWTIFY AI // DESIGN SYSTEM & TOKENS

Este archivo es la **Única Fuente de Verdad (Single Source of Truth)**. Define la jerarquía visual que debe estar sincronizada con `app-v1/app/globals.css`.

---

## 🛠️ IMPLEMENTACIÓN TÉCNICA
- **Ubicación de Variables:** `app-v1/app/globals.css`
- **Metodología:** Tailwind v4 (@theme inline + @utility)

---

## 🖼️ 1. MARCOS Y MÁRGENES (The Page Frame)

> **⚠️ NOTA (Marzo 2026):** El token `.px-frame` fue deprecado. Los contenedores principales ahora usan padding fluido nativo.

| Dispositivo | Valor Real | Implementación Actual |
| :--- | :--- | :--- |
| **Móvil** | **0.875rem** | `px-3.5` (o `px-gutter-sm`) |
| **Tablet+** | **clamp(1.5rem, 4vw, 3.5rem)** | `px-gutter-md` |
| **Max Width** | **87.5rem** | `max-w-[87.5rem] mx-auto` |

---

## 📏 1.2 SISTEMA DE ESPACIADO Y RITMO (Spacing Scale)
Basado en las "Luxury Spacing Guidelines", SalentoCoffee utiliza un modelo de espaciado dinámico (`clamp`) y generoso para crear una sensación editorial y premium.

### A. Ritmo Vertical entre Secciones (Section Paddings)
Son los **paddings superiores e inferiores** masivos que se aplican a las etiquetas `<section>`. Definen el aire entre los capítulos de la web.

| Token | Valor (`clamp`) | Propósito / Uso | Clase CSS |
| :--- | :--- | :--- | :--- |
| **Section XS** | `clamp(2rem, 4vw, 4rem)` | Separación sutil o agrupar bloques muy densos. | `.py-section-xs` |
| **Section SM** | `clamp(4rem, 6vw, 6rem)` | Separar bloques hermanos muy relacionados. | `.py-section-sm` |
| **Section MD** | `clamp(6rem, 8vw, 10rem)` | **El estándar.** Espacio entre secciones principales. | `.py-section-md` |
| **Section LG** | `clamp(8rem, 12vw, 15rem)` | Aislamiento premium. Cambio de tema total. | `.py-section-lg` |

### B. Separación Horizontal y Layout (Gaps)
Define el espacio **entre elementos** (columnas, fotos, botones). Se usan con `gap-` en Flexbox o Grid.

| Token | Valor | Propósito / Uso | Clase CSS |
| :--- | :--- | :--- | :--- |
| **Micro Gaps** | `0.25rem` - `1.5rem` | Espacio interno de componentes (Icono ↔ Texto). | `gap-1` a `gap-6` |
| **Standard Gaps** | `2rem` - `3rem` | Espacio entre tarjetas en un grid. | `gap-8` a `gap-12` |
| **Layout Fluid** | `clamp(0.5rem, 5vw, 8rem)` | **Gaps de Layout.** El espacio entre grandes columnas. | `.gap-fluid-[xs|sm|md|lg]` |

### C. El Marco de la Página (Horizontal Gutters)
Padding lateral que evita que el contenido toque los bordes físicos de la pantalla.

| Token | Valor (`clamp`) | Estilo de Contenido |
| :--- | :--- | :--- |
| `px-gutter-sm` | `clamp(1rem, 2vw, 2rem)` | Compacto / Aplicaciones |
| `px-gutter-md` | `clamp(1.5rem, 4vw, 3.5rem)` | **Estándar Salento** |
| `px-gutter-lg` | `clamp(2rem, 6vw, 6rem)` | Editorial / Storytelling |
| `px-gutter-xl` | `clamp(3rem, 10vw, 12rem)` | Cinematic / Alto Impacto |

---

## 📐 2. TYPOGRAPHY TOKENS (Semánticos & Cognitivos)

> **Regla de Oro (Cognitive Typographer):** Nunca usar anchos infinitos. Los títulos usan `text-balance`, los párrafos usan `text-pretty` y máximo `max-w-prose` (o equivalente).
> **Fuentes Premium:** Usar **Playfair Display** estrictamente para titulares/Display, y **Inter** (Fontshare) para texto de lectura y cuerpo.

| # | Token | Clase CSS | Fuente | Tamaño (Fluid) | Peso | Line-Height | Tracking | Wrap |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **DISPLAY-XL** | `.text-display-xl` | Playfair Display | `clamp(4.5rem, 8vw, 9.5rem)` | `800` | `1` | `-0.05em` | `balance` |
| 1.2 | **DISPLAY-LG** | `.text-display-lg` | Playfair Display | `clamp(3.5rem, 6vw, 7.5rem)` | `800` | `1.02` | `-0.04em` | `balance` |
| 1.5 | **DISPLAY** | `.text-display` | Playfair Display | `clamp(3rem, 5vw, 6rem)` | `800` | `1.05` | `-0.04em` | `balance` |
| 1.8 | **DISPLAY-SM** | `.text-display-sm` | Playfair Display | `clamp(2.5rem, 4vw, 4.5rem)` | `700` | `1.05` | `-0.03em` | `balance` |
| 2 | **H1** | `.text-h1` | Playfair Display | `clamp(2rem, 4.5vw, 3.5rem)` | `700` | `1.1` | `-0.025em` | `balance` |
| 3 | **H2** | `.text-h2` | Playfair Display | `clamp(1.75rem, 3.5vw, 3rem)` | `700` | `1.15` | `-0.02em` | `balance` |
| 4 | **H3** | `.text-h3` | Playfair Display | `clamp(1.5rem, 3vw, 2.25rem)` | `600` | `1.2` | `-0.015em` | `balance` |
| 5 | **H4** | `.text-h4` | Playfair Display | `clamp(1.25rem, 2.5vw, 1.75rem)` | `600` | `1.3` | `-0.01em` | `balance` |
| 6 | **H5** | `.text-h5` | Playfair Display | `clamp(1.125rem, 2vw, 1.375rem)` | `600` | `1.3` | `0` | `balance` |
| 7 | **H6** | `.text-h6` | Playfair Display | `clamp(1rem, 1.5vw, 1.125rem)` | `600` | `1.4` | `0.01em` | `balance` |
| 6 | **OVERLINE** | `.text-overline` | Inter | `clamp(0.6875rem, 1.1vw, 0.875rem)` | `600` | `1.4` | `0.1em` | UPPERCASE |
| 7 | **SUBTITLE** | `.text-subtitle` | Inter | `clamp(1.125rem, 1.8vw, 1.375rem)` | `500` | `1.4` | `-0.01em` | `pretty` |
| 7.2| **BODY-2XL** | `.text-body-2xl` | Inter | `1.5rem` (fijo) | `400` | `1.6` | `-0.01em` | `pretty` |
| 7.3| **BODY-XL** | `.text-body-xl` | Inter | `1.25rem` (fijo) | `400` | `1.6` | `0` | `pretty` |
| 7.4| **BODY-LG** | `.text-body-lg` | Inter | `1.125rem` (fijo) | `400` | `1.6` | `0` | `pretty` |
| 7.5| **BODY-MD** | `.text-body-md`| Inter | `1.0625rem` (fijo)| `400` | `1.55`| `0` | `pretty` |
| 8 | **BODY** | `.text-body` | Inter | `1rem` (fijo) | `400` | `1.6` | `0` | `pretty` |
| 8.5| **BODY-SM** | `.text-body-sm` | Inter | `0.875rem` (fijo) | `400` | `1.5` | `0.01em` | `pretty` |
| 9 | **BODY-XS** | `.text-body-xs` | Inter | `0.8125rem` (fijo) | `400` | `1.5` | `0.02em` | `pretty` |
| 10 | **UI-LABEL** | `.text-ui-label` | Inter | `0.8125rem` (fijo) | `500` | `1.4` | `0.05em` | UPPERCASE |
| 11 | **NUM-DATA** | `.text-data` | Geist Mono | *(hereda del contexto)* | `700` | `1.2` | `-0.02em` | — |
| 12 | **CAPTION** | `.text-caption` | Inter | `0.75rem` (fijo) | `400` | `1.4` | `0.02em` | — |

### 2.1 Reglas de Escalado
- **Headings (1–7):** Todos usan `clamp()` para escalado fluido. El token maneja el tamaño automáticamente — NO es necesario agregar clases Tailwind de tamaño (`text-3xl`, `text-5xl`, etc.) junto al token.
- **Body (8–9):** Tamaño fijo en `rem`. No escalan con el viewport (correcto para legibilidad).
- **Labels/UI (10, 12):** Tamaño fijo en `rem`. Nunca en `px`.
- **Data (11):** Monoespaciada, tracking compacto para alinear dígitos.

### 2.2 🚨 Regla Crítica: NUNCA usar `px` para font-size

> **PROHIBIDO:** `text-[13px]`, `text-[16px]`, `font-size: 20px`
> **OBLIGATORIO:** `text-[0.8125rem]`, `text-base`, `font-size: 1.25rem`

- Cualquier valor de `text-[Xpx]` en un componente es una **violación** del Design System.
- `px` no escala con las preferencias de accesibilidad del usuario (zoom del navegador).
- `rem` escala proporcionalmente al `font-size` del `<html>`, respetando accesibilidad.
- **Excepciones:** Tipografía decorativa >100px (mega words de fondo).

---

## 🎨 3. COLOR PALETTE & MODES

### 3.0 FILOSOFÍA ATMOSFÉRICA (The Mood Direction)
- **🌿 AMANECER CAFETERO (Light Mode):** Direccionalidad hacia la tierra y el origen. Evoca la frescura de la mañana y la claridad del proceso.
- **🌙 MIDNIGHT ROAST (Dark Mode):** La experiencia íntima de una cafetería premium por la noche. Tonos de obsidiana ("The Obsidian Bean"), contrastes altos y minimalismo puro donde el café resalta brillante.
- **MATERIALITY:** El material principal es el cristal translúcido (Glassmorphism) pero tintado de calidez. En Light Mode usamos fondos crema/avena con sombras sutiles. En Dark Mode, usamos cristales ámbar ultra-oscuro sobre fondos casi negros (`#111111`), creando un "cristal líquido orgánico" de máxima elegancia.

### 3.1 NÚCLEO ATMOSFÉRICO (Semantic Mapping)

| Variable CSS | Token Tailwind | Light Mode (Amanecer) ☀️ | Dark Mode (Midnight) 🌙 | Uso |
| :--- | :--- | :--- | :--- | :--- |
| `--background` | `bg-background` | `#F7F2E7` (Oatmeal) | `#111111` (Obsidian Black) | Lienzo principal |
| `--secondary-bg`| `bg-secondary` | `#EAD8C0` (Almond) | `#1A1A1A` (Charcoal) | Fondos alternativos / Tarjetas |
| `--border` | `border-border` | `#D6C8B4` (Latte Border) | `rgba(214, 200, 180, 0.10)` | Líneas divisorias |
| `--glass` | `bg-glass` | `rgba(247,242,231,0.85)` | `rgba(17, 17, 17, 0.85)` | Fondos translúcidos |

### 3.1.2 VARIANTES DE TEXTO (Text Color Tokens)
El sistema tipográfico usa 6 niveles de color semántico para crear contraste perfecto en cualquier modo.

| Variable CSS | Token Tailwind | Light Mode ☀️ | Dark Mode 🌙 | Propósito |
| :--- | :--- | :--- | :--- | :--- |
| `--text-primary` | `text-foreground` | `#2C1E16` (Deep Umber) | `#F7F2E7` (Crema) | Titulares, H1-H6, y datos críticos. Alta legibilidad. |
| `--text-secondary`| `text-foreground-secondary` | `#4A3B32` (Rich Brown) | `#DBCAC0` (Light Ash) | Párrafos principales (body), descripciones largas. Contraste medio-alto. |
| `--text-tertiary` | `text-foreground-tertiary`| `#786B60` (Mid Brown) | `#B5A59A` (Mid Ash) | Detalles secundarios, etiquetas o bajadas suaves. |
| `--text-muted` | `text-muted` | `#A4968C` (Light Taupe) | `#80736B` (Dark Ash) | Overlines, fechas, legal, placeholders. |
| `--text-accent` | `text-accent` | `#C35B48` (Terracotta) | `#D4AF37` (Gold) | Resaltar palabras clave ( `<span>` ) en un H1. |
| `--text-inverse` | `text-inverse` | `#F7F2E7` (Crema) | `#111111` (Obsidian) | Texto forzado a invertirse (ej. botón primario sólido). |

### 3.1.5 Colores de Sistema (Feedback)
- **Success:** `#4A5D23` (Moss Green)
- **Warning:** `#D4AF37` (Premium Gold)
- **Error:** `#C35B48` (Terracotta Red)

### 3.2 BRAND ACCENTS (The Earthy Gradient)
El gradiente principal representa el proceso del tueste y la naturaleza.
- **Mocha:** `#4E3B31` (Oscuro/Fuerte)
- **Terracotta:** `#C35B48` (Tierra/Calor)
- **Gold:** `#D4AF37` (Premium)
- **Moss:** `#4A5D23` (Origen)

> **Nota de Diseño Light Mode:** Mantener altos contrastes entre el fondo Oatmeal y la tipografía Deep Umber. Los acentos Terracota y Oro se usan solo en detalles premium o llamadas a la acción.

---

## 🔘 4. INTERACTIVE COMPONENTS (Sync con Manual de Marca)

### **BTN-GRADIENT** (`.btn-hero-cta`)
El llamado a la acción principal del Hero (Atención máxima).
- **Fondo:** Gradiente cálido Mocha a Terracota (`#4E3B31` → `#C35B48`).
- **Texto:** `#F7F2E7` (Oatmeal)
- **Forma:** `Rounded-xl` (12px) - Moderno y amigable.
- **Sombra:** `Shadow-lg` + Sombra suave del mismo gradiente.

### **BTN-PRIMARY** (`.btn-primary`)
Botones de acción estándar.
- **Fondo:** Verde Musgo Sólido (`#4A5D23`).
- **Texto:** `Oatmeal` (#F7F2E7).

### **BTN-SECONDARY** (`.btn-secondary`)
Botones de apoyo o navegación (Ej. CTA Final Bloque 8).
- **Fondo:** `Oatmeal` (#F7F2E7)
- **Texto:** Deep Umber (`#2C1E16`).
- **Borde:** `border-border` (`#D6C8B4`) si no tiene fondo con gradiente.
- **Hover:** `bg-secondary` (`#EAD8C0`).

---

## 🤖 5. AI PROMPT & SYNC RULE
> **"Si vas a crear un botón o elemento interactivo, verifica siempre la sección 4 de este documento."**

---

## 🌍 6. INTERNATIONALIZATION (i18n)

### 6.1 ESTRATEGIA DE CONTENIDO
El diseño debe ser flexible para soportar la expansión de texto del Español vs Inglés (+25-30% de longitud promedio).

- **Layouts Flexibles:** Evitar anchos fijos (`width: 300px`) en contenedores de texto. Usar `min-width` o `max-width` con `flex-wrap`.
- **Botones:** Los botones deben crecer con el contenido. Evitar romper etiquetas de botones en dos líneas.

### 6.2 FORMATOS REGIONALES

| Dato | Español (ES) | Inglés (EN) | Token/Clase |
| :--- | :--- | :--- | :--- |
| **Ingresos** | `$1.200 USD` | `$1,200 USD` | `.text-data` |
| **Usuarios** | `1.5k Activos` | `1.5k Active` | `.text-ui-label` |
| **Fecha** | `03 ENE 2026` | `JAN 03, 2026` | `.text-muted` |

---

## 📝 7. CHANGELOG

| Fecha | Cambio |
|:---|:---|
| **2026-02-16** | Adaptación a SalentoCoffee AI Identity. Light Mode Only. 4-Pillar Gradient. Botones y tipografía redefinidos. |
| **2026-02-22** | Sistema tipográfico de 12 tokens (Apple HIG + Major Third 1.25×). Integración de Inter vía Fontshare. Reemplazo de GT Walsheim Pro. |
| **2026-03-10** | Tokenización completa del Calculator. Todos los `text-[Xpx]` eliminados. Colores semánticos aplicados. |
| **2026-03-18** | Estandarización del grid a `max-w-[1400px]`. Token `.px-frame` deprecado → `clamp()` nativo. |
| **2026-03-19** | Tokens `DISPLAY-SM`, `BODY-LG`, `BODY-MD` añadidos a la escala tipográfica. Changelog creado. |

---

## 🎬 8. MOTION TOKENS (GSAP)
Estándares de animación para mantener la coherencia cinematográfica.

### 8.1 FLOW REVEAL (Títulos y Héroes)
El efecto estándar para revelar contenido con elegancia líquida.
- **Estilo:** "Liquid Fade Up".
- **Trigger:** `top 85%` del viewport.
- **Duration:** `1.4s`.
- **Ease:** `power4.out`.
- **Stagger:** `0.2s` (Entre líneas).
- **Start State:** `y: 40, opacity: 0`.
- **End State:** `y: 0, opacity: 1`.

### 8.2 COMPONENT FADE (Tarjetas y Elementos)
- **Duration:** `0.8s`.
- **Ease:** `power2.out`.
- **Distance:** `y: 30px`.