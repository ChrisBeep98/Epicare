# Contexto de Sección: Product Lines (ProductLinesEpicare)

## 1. Estado Actual
- **Componente:** `ProductLinesEpicare.tsx`
- **Ubicación:** `design-system-app/src/components/epicare/` — renderizado en `app/page.tsx` **debajo de BentoGrid** (antes va People Reveal).
- **Estado:** ✅ Completado.
- **Descripción:** Índice editorial de las 3 categorías de seguros que un agente puede vender (Life / Health / Supplementary), con sus líneas de producto. i18n en `landingV2.productLines` (en/es); nombres de producto en inglés (estándar de la industria de seguros US), arrays leídos con `t.raw()`.

## 2. Historial de Cambios
- **17 Jul 2026:**
  - Creación de la sección tras varias iteraciones de dirección (se descartaron: expanding frame, slats sueltos, tunnel tipográfico) hasta el concepto final "Índice Editorial".
  - **Desktop:** riel izquierdo **pinneado** (`sticky top-[16vh]`) con marcador de categoría a escala gigante (`text-display-3xl`, azul) que hace **swap** con crossfade según la categoría activa (tracking por `ScrollTrigger` con `onEnter/onEnterBack`). Lista derecha (cols 6-12) con **reveal "light-up"** ligado al scroll (`scrub`, opacity 0.18→1 + y) y **acordeón hover** que expande mini-descripción (`grid-rows-[0fr]→[1fr]`).
  - **Mobile:** rediseñado a **pills minimalistas** agrupadas por categoría (`flex-wrap`), con reveal escalonado por grupo. (Se probaron y descartaron: lista editorial grande, chips 2-col, tabs.)
  - Header editorial asimétrico (12-col en desktop). Título a `text-display-lg`.
  - Copy final: "Todo el portafolio. / Un solo contrato." + "Expertos..." NO (esa frase es de People Reveal).

## 3. Decisiones de Diseño
- **Índice sobre carrusel/cards:** se eligió un índice editorial pinneado (jerarquía por escala tipográfica "fearless") en vez de cards, por minimalismo y encaje con la dirección Apple-style.
- **Grid 12-col SOLO en desktop:** `lg:grid lg:grid-cols-12 lg:gap-fluid-md`; en mobile es `flex flex-col`. **Motivo crítico:** un `grid-cols-12` con `gap-fluid-md` fuerza ~352px solo en gaps (11×32px) y **desborda viewports ≤375px** → causaba scroll horizontal en toda la landing.
- **Nombres de producto en inglés** en ambos locales (Term Life, ACA/Marketplace, Medicare Advantage…) por ser términos estándar del mercado US-Latino.

## 4. Bugs Conocidos / Pendientes
- La clave i18n `productsLabel` quedó sin uso tras el rediseño (inofensiva).
- Deuda menor heredada del patrón del componente hermano: uso de `(card as any)` en DarkGradientSection (no aquí).

> **Última Actualización:** 17 Julio 2026
