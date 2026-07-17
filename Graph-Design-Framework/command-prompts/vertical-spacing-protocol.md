# Protocolo: Ritmo Vertical entre Secciones (Vertical Rhythm)

Usa este protocolo cuando necesitemos **auditar, mapear o estandarizar el espaciado vertical** entre las secciones de la landing (el margen/padding top y bottom de cada sección respecto a su contenido), garantizando un ritmo simétrico y consistente en **desktop y mobile**. Los tokens de espaciado ya existen en el Design System; este protocolo asegura que se apliquen bien y sin acumulaciones.

> **Fuente ampliada de la regla de simetría de** `Tokenizer.md` §2.1. Este documento la expande con la escala completa, la convención de propiedad (single-owner) y el **mapa vivo** de la página.

***

## 📏 EL ESTÁNDAR — "GO AMS Vertical Rhythm"

### 1. Escala de ritmo (4 niveles — tokens existentes en `globals.css`)
| Nivel | Token / clase | Rango (móvil → desktop) | Cuándo usar |
|:--|:--|:--|:--|
| **XS** | `py/pt/pb-section-xs` · `--space-section-xs` | `clamp(2rem,4vw,4rem)` → 32–64px | Sub-bloques muy acoplados dentro de una misma sección |
| **SM** | `py/pt/pb-section-sm` · `--space-section-sm` | `clamp(4.75rem,6vw,6rem)` → 76–96px | **Baseline móvil** / secciones compactas |
| **MD** | `py/pt/pb-section-md` · `--space-section-md` | `clamp(6rem,8vw,10rem)` → 96–160px | **Ritmo estándar por defecto** entre secciones |
| **LG** | `py/pt/pb-section-lg` · `--space-section-lg` | `clamp(8rem,12vw,15rem)` → 128–240px | Cortes narrativos mayores (post-Hero, pre-footer) |

> Cada token es un `clamp()` fluido: ya escala solo de móvil a desktop. Para un salto más marcado (móvil pequeño → desktop grande) usa el prefijo responsivo, p.ej. `pb-section-sm md:pb-section-lg`.
> **Requisito de motor:** los prefijos responsivos (`md:`, `lg:`) SOLO funcionan porque estos tokens están registrados como `@utility` en `globals.css`. Si un token de spacing vuelve a `@layer utilities` plano, `md:py-section-*` deja de generar CSS (bug de Tailwind v4).

### 2. Regla de Oro — un solo dueño por frontera (single-owner)
Ninguna frontera entre dos secciones debe **sumar** padding de ambos lados (evita el "doble margen"). Convención canónica: **la sección superior posee el gap** con su `pb-section-{nivel}`; la sección inferior arranca en `pt-0` en esa costura.
- Cada sección declara **exactamente un** `pb-section-*` (su gap hacia la siguiente) y `pt-0` por defecto.
- **Excepción — primera sección de contenido:** puede declarar su propio `pt-section-*` (no tiene vecino arriba que le dé aire).
- El "aire superior" visible de una sección lo aporta el `pb` de la anterior. La sensación de *top + bottom respecto al contenido* se cumple visualmente sin duplicar medidas.

### 3. Baseline móvil (76px)
En móvil el gap estándar entre secciones principales resuelve a **76px** (`--space-section-sm`). Auditar activamente clases responsivas desalineadas (`mt-10 md:mt-24` rompiendo simetría con `mb-12`). Los dos extremos de un bloque deben ser balanceados.

### 4. Secciones full-bleed de viewport (SIN excepción de ritmo)
Las secciones a altura de viewport (`h-screen` / `h-[Xvh]`, p.ej. BentoGrid, PeopleReveal) **también respetan el ritmo estándar**: se les da el gap prescrito vía **wrapper/margen** externo para que la frontera use el token en vez de chocar directas. No son excepción al ritmo.

### 5. Zero-Px (con una excepción documentada)
Prohibido para ritmo: `py-[Xpx]`, `pt-[Xvh]`, `mt-[Xpx]`, `mb-[Xrem]` arbitrarios → reemplazar por el token del nivel más cercano.
- **Excepción explícita (NO es violación):** el `mt-[-100vh]` del solape Hero↔BrandsCarousel es una **mecánica de pin de GSAP** (la siguiente sección se desliza sobre el Hero pinneado), no ritmo. Se marca como excepción, nunca se "corrige".

---

## 🗺️ EL MAPA — Página actual (`design-system-app/src/app/page.tsx`)

Orden de render: **Hero → BrandsCarousel → DarkGradientSection(bento) → Metrics → BentoGrid → PeopleReveal → ProductLines** (sin footer). El `<main>` no aporta espaciado; todo vive en cada sección.

| Frontera | Estado actual | Prescripción (single-owner) | Desktop / Móvil |
|:--|:--|:--|:--|
| **Hero → BrandsCarousel** | `mt-[-100vh]` (solape pin) | **EXCEPCIÓN GSAP** — no aplica ritmo | — |
| **BrandsCarousel → DarkGradient** | `md:pb-[10vh]` (vh crudo) + DarkGradient `pt-section-sm` (doble) | Dueño: BrandsCarousel `pb-section-md`; DarkGradient `pt-0` | 160 / 96px |
| **DarkGradient → Metrics** | DarkGradient `md:py-section-lg` **(muerto→sm)** + Metrics `py-section-lg` (doble, asimétrico) | Dueño: DarkGradient `pb-section-md`; Metrics `pt-0` | 160 / 96px |
| **Metrics → BentoGrid** | Metrics `py-section-lg` bottom; BentoGrid sin padding | Dueño: Metrics `pb-section-md`; BentoGrid `pt-0` | 160 / 96px |
| **BentoGrid → PeopleReveal** | ambas full-bleed, **chocan sin gap** | Dueño: BentoGrid `pb-section-md` **vía wrapper**; PeopleReveal `pt-0` | 160 / 96px |
| **PeopleReveal → ProductLines** | PeopleReveal full-bleed; ProductLines `py-section-lg` top | Dueño: PeopleReveal `pb-section-md` **vía wrapper**; ProductLines `pt-0` | 160 / 96px |
| **ProductLines → fin** | ProductLines `py-section-lg` bottom | ProductLines `pb-section-lg` (pre-footer) | 240 / 128px |

> Secciones que hoy YA cumplen (usan token bare correcto): **Metrics** y **ProductLines** (solo requieren pasar de `py-` simétrico a `pb-` single-owner). El resto mezcla px/vh crudos, tokens muertos o no tienen espaciado.

***

**PROMPT PARA EJECUTAR EL PROTOCOLO:**

> "Hola. Ejecuta estrictamente el **Protocolo de Ritmo Vertical entre Secciones** sobre [PÁGINA/SECCIÓN]. Aplica la escala de 4 niveles, la Regla de Oro (single-owner) y el baseline móvil de 76px, en las siguientes 3 Fases:
>
> ### FASE 1: Auditoría & Mapa
> 1. Lista las secciones en orden de render del archivo que las ensambla (`page.tsx`).
> 2. Para CADA sección, extrae su espaciado vertical actual (`file:línea`): padding/margen top y bottom, distinguiendo tokens (`py/pt/pb-section-*`) de valores crudos (`py-20`, `mt-[Xpx]`, `md:pt-[Xvh]`).
> 3. Marca violaciones: px/vh crudos para ritmo, tokens responsivos muertos, y **acumulaciones** (dos secciones adyacentes sumando padding).
> 4. **Produce la tabla-MAPA** con una fila por frontera: `Frontera | Actual | Prescripción (dueño + token) | Desktop/Móvil`.
> 5. NO escribas código aún. Repórtame el mapa y espera confirmación.
>
> ### FASE 2: Motor (pre-requisito)
> 1. Verifica en `globals.css` que `py-section-*`, `pt-section-*`, `pb-section-*` estén como `@utility` top-level (no `@layer utilities` plano). Si no, migra (uso bare queda idéntico, retrocompatible).
> 2. Esto habilita los prefijos `md:`/`lg:`. Confírmalo con `pnpm build` + grep del CSS de producción por `.md\:py-section-*`.
>
> ### FASE 3: Aplicación (Regla de Oro)
> 1. Aplica el mapa: cada sección con UN `pb-section-{nivel}` (dueño del gap) y `pt-0` en la costura; primera sección conserva su `pt-section-*`.
> 2. Baseline móvil = SM (76px); escala desktop vía `md:`/`lg:`.
> 3. Secciones full-bleed (viewport): dales el gap prescrito vía wrapper/margen, sin excepción.
> 4. Respeta la excepción GSAP (`mt-[-100vh]` del Hero) — no la toques.
>
> ### FORMATO DE REPORTE
> ```
> ## 🔴 VIOLACIONES DE RITMO
> | # | Sección | Línea | Actual (❌) | Fix (✅) | Motivo |
>
> ## 🗺️ MAPA FINAL
> | Frontera | Dueño | Token | Desktop | Móvil |
> ```
>
> Confírmame al completar las 3 Fases y **ESPERA mi autorización para hacer commit**."
