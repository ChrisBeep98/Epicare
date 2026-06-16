# Testimonials Carousel
> Última actualización: 20 de Marzo, 2026

> **TL;DR:** Carrusel horizontal auto-scroll de testimonios con hover-to-open y modal fullscreen con scroll infinito. Cada card es clickeable (no solo "Learn more"). Modal usa layout editorial transparente con radial glow, staggered parallax, y scroll-snap vertical con loop infinito. Responsive completo (mobile stacked + desktop side-by-side).

## Componentes
- `src/components/landing-v2/TestimonialsCarousel.tsx` — Carrusel ticker principal con trust label responsive
- `src/components/landing-v2/TestimonialModal.tsx` — Modal fullscreen con scroll-snap + debug panel temporal (4 tabs)

## Estado Actual
- ✅ Ticker horizontal funcional con hover-pause y auto-scroll infinito.
- ✅ Modal fullscreen con scroll-snap vertical y loop infinito (3x clone approach).
- ✅ Layout editorial transparente: contenido flota sobre backdrop oscuro (sin glass card).
- ✅ Radial glow halo detrás del avatar usando `ringColor` del testimonio.
- ✅ Staggered parallax animations (blur-to-sharp + scale) con diferentes velocidades por elemento.
- ✅ Quote marks (`"` y `"`) como elementos separados con gradiente, simétricos y bien alineados.
- ✅ Header se oculta automáticamente cuando el modal está abierto (`data-testimonial-modal` + `MutationObserver`).
- ✅ Click en espacio vacío cierra el modal.
- ✅ Scrollbar oculto (dots como navegación).
- ✅ Responsive completo: mobile (stacked, `text-h3`, avatar 55%, padding reducido) vs desktop (side-by-side editorial, `text-h1`).
- ✅ Trust label responsive: `text-caption` sin bold/icon en mobile, `text-h5` con ✦ en desktop.
- ✅ Cards del carrusel completamente clickeables con `hover:scale-[1.02]` y `group-hover` en "Learn more".
- 🧪 Debug panel activo (4 tabs: Layout, Avatar, Typography, Glass) con prefix `__dbg`.

## Historial de Cambios

### 20 Mar 2026 — Cinematic Testimonial Redesign
- **Modal V2:** Eliminado glass card blanco; contenido flota transparente sobre backdrop `bg-black/50 backdrop-blur-2xl`.
- **Radial Glow:** Halo `radial-gradient` detrás del avatar usando `ringColor` del testimonio.
- **Parallax Staggered:** Avatar (0.8s), quote mark (0.6s delay 0.08s), quote text (0.9s delay 0.16s), identity (0.6s delay 0.04s) — diferentes velocidades para efecto depth.
- **Infinite Scroll:** 3 copias del array `[clone|real|clone]`, `scrollend` listener para jump-back silencioso, `isResetting` ref para evitar observer flicker.
- **Click-to-Close:** `onClick` en scroll container y slide wrapper con `e.target === e.currentTarget`.
- **Scrollbar Hidden:** `scrollbar-none` + `scrollbarWidth: none` + `msOverflowStyle: none`.
- **Quote Marks Fix:** Ambos marks son elementos separados (`<span>`) con gradiente idéntico, `self-end` en el cierre.
- **Responsive Mobile:** `useIsMobile` hook con `matchMedia(767px)`. Avatar 55%, padding 20/24px, gap 20px, quote mark 50%, `text-h3`, layout `flex-col` centrado.
- **Carousel Cards Clickeable:** `onClick` en wrapper completo, `hover:scale-[1.02]`, "Learn more" como `<span>` con `group-hover/card`.
- **Trust Label Mobile:** `text-caption font-medium` sin ✦, una sola línea. Desktop: `text-h5 font-bold` con ✦ y `<br>`.
- **Debug Panel:** 4 tabs con +20 controles, Copy button, prefix `__dbg`. Valores actuales: 1067px width, 156px avatar, 15% radius, 112px quote marks.

## Decisiones de Diseño
- **Sin Glass Card:** Se removió el contenedor de liquid glass blanco a favor de contenido flotante transparente. Mejor integración con el backdrop oscuro y sensación más cinematográfica.
- **3x Clone Infinite Loop:** Renderizar 3 copias en vez de reordenar el DOM. Jump-back silencioso en `scrollend` para evitar glitches con scroll-snap.
- **Editorial Layout:** Asimétrico (avatar izquierda, quote derecha en desktop). En mobile se apila centrado.
- **Parallax via Timing:** En vez de usar scroll position, se varían los delays y duraciones de las transiciones CSS por elemento para crear efecto de profundidad.
- **`useIsMobile` en Slide:** Se usa `matchMedia` en vez de Tailwind breakpoints porque los valores del debug panel son inline styles.
- **Cards Clickeables:** Todo el card abre el modal, no solo "Learn more". Mejor UX mobile especialmente.

## Bugs Conocidos / Pendientes
- 🧪 Debug panel todavía activo — pendiente purge con protocolo DEBUG-PANEL-ARCHITECT.
- El infinite scroll usa `scrollend` event que puede no estar soportado en Safari < 16.4 (fallback pendiente).
