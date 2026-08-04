# Contexto de Sección: Bento Ecosystem (BentoGridEpicare)

## 1. Estado Actual
- **Componente:** `BentoGridEpicare.tsx` (`src/components/epicare/`)
- **Estado:** ✅ Completado y "redimido" (2026-07-22). Es el **PICO 2 (pin) del arco narrativo** — posición 6 de 15 (ver `project-context/scrollytelling-map.md` y `landing-blueprint.md` §06).
- **Descripción:** Cover-flow 3D horizontal pineado (desktop) que presenta el ecosistema GO: title card + 5 productos confirmados **GO AMS (core) → GO CRM → Epicare Academy → Eppigo → Solutions** (GO CALLS fuera de la landing; Marketing vive dentro de Solutions — confirmado por César 2026-07-21). En móvil: stack de scroll libre, sin pin.
- **Headline:** "Un portal es una herramienta. Esto es infraestructura." / EN "A portal is a tool. This is infrastructure."

## 2. Historial de Cambios
- **22 Jul 2026 — "La Redención del Pin"** (veredicto: el pin era legítimo pero sin arco interno — un carrusel con scroll secuestrado):
  - **Arco interno / gradient morph:** orbe ambiental (`blur(120px)`, opacidad 0.10 light / 0.16 dark) detrás del track que **muta al acento del producto activo** (azul→cyan→naranja→púrpura→azul; array `CARD_ACCENT_VARS`, colores leídos de los tokens DS en runtime con `getComputedStyle`). Animación `DUR.slow` + `EASE.inOut`, `overwrite: 'auto'`. El índice activo se detecta en `updateCards3DPhysics` (tarjeta más cercana al centro).
  - **Snap por tarjeta:** `snap: { snapTo: 1/(N-1), duration: {min:0.2,max:0.6}, ease: EASE.inOut, delay: 0.1 }` — el pin se lee por capítulos.
  - **Progress bar → scrubber clicable:** click busca la tarjeta más cercana y navega vía `window.lenis.scrollTo()` (instancia expuesta en `SmoothScrollProvider` con cleanup). Fallback `window.scrollTo` smooth.
  - **Móvil liberado del pin:** rolodex vertical eliminado; stack libre con reveal de la casa (`REVEAL.md` + `EASE.out`, trigger `TRIGGER.standard`). Sección `h-auto md:h-screen`, track `relative md:absolute`. Progress bar `hidden md:flex`.
  - **`prefers-reduced-motion`:** ambas ramas de `matchMedia` condicionadas a `no-preference` (era deuda del censo).
  - **Primera sección migrada a `src/lib/motion.ts`** (tokens EASE/DUR/REVEAL/TRIGGER).
  - Cards actualizadas a los 5 productos; nuevas keys i18n `cardEppigoTitle/Desc`, `cardSolutionsTitle/Desc` (ES+EN); headline swap en `sectionTitle/Desc`. Build verde.

- **[04/08/2026] · Hardening de producción.**
  - **Vídeo diferido:** los 10 `<video autoPlay>` del Bento desktop descargaban ~7.3 MB en la primera carga aunque estuvieran dentro de `hidden md:block` (invisible en móvil) o en la variante de tema oculta. Migrados a `<SmartVideo>` (`src/components/epicare/SmartVideo.tsx`), extraído del patrón que ya vivía dentro de `BentoGridMobile`. Clave: **un elemento en `display:none` nunca interseca**, así que la variante que no toca no descarga nada.
  - **`CallsLogo` eliminado** de los dos archivos: 28 líneas de SVG byte-idénticas y sin ninguna referencia (GO CALLS salió de la landing).
  - Imports `REVEAL` y `TRIGGER` sin usar, y `let mm` → `const mm`.
  - `loading="lazy"` + `decoding="async"` en las `<img>` de las cards.

## 3. Decisiones de Diseño
- **"Un pin debe ganarse su costo" (ley 3 del arco):** el cover-flow oculta contenido comparable, así que se le dio arco interno (morph de mood), navegación (snap + scrubber) y se le quitó el peaje en móvil, donde el pulgar manda. Ver teoría en `command-prompts/narrative-arc-protocol.md`.
- **Orden de cards:** GO AMS primero por ser el core del hub (blueprint S07-IA); Solutions cierra devolviendo el orbe al azul de marca (el viaje "vuelve a casa").
- **Snap con `duration max 0.6`:** premium sin sentirse asistido. Ajustable si el usuario lo quiere más seco.

## 4. Bugs Conocidos / Pendientes
- 🔴 **Eppigo y Solutions usan imágenes placeholder** (`Wireframe_CRM_composition_floating.jpeg`, `Diagonal_pipeline...jpeg`) — faltan assets/videos propios.
- 🟡 Falta validación visual del snap y de la intensidad del orbe en light/dark (usuario debe probar en local).
- 🟡 `CallsLogo` quedó sin uso en el componente (GO CALLS fuera) — limpiar en el próximo refactor.
- Deuda menor: casts `(card as any)` heredados del patrón original.

> **Última Actualización:** 4 Agosto 2026
