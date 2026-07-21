# Contexto de Sección: Para quién es (ForWhoEpicare)

## 1. Estado Actual
- **Componente:** `ForWhoEpicare.tsx`
- **Ubicación:** `design-system-app/src/components/epicare/` — renderizado en `app/page.tsx` **al final de la landing** (debajo de ProductLines, última sección).
- **Estado:** 🟡 En iteración de dirección visual (funcional y compila; el usuario aún no aprueba el diseño).
- **Descripción:** Bifurcación de audiencias — habla distinto al **Agente individual** (marca azul `brand-blue`) y al **Agency Owner** (marca naranja `brand-orange`). i18n en `landingV2.forWho` (en/es), listas de capacidades leídas con `t.raw()`. Título centrado (Text-Birth). Bimodal, tokenizado, 60fps, reduced-motion.

## 2. Historial de Cambios
- **20 Jul 2026 — Creación + múltiples iteraciones de dirección (a ciegas, sin feedback visual).** Se probaron y descartaron:
  1. 2 columnas color-codeadas con glows, spine gradiente, imágenes flotantes con ring/sombra, pills, toggle → *"no hay minimalismo, muy recargado"*.
  2. Minimalista editorial (hairline, checklist tenue) → *"muy plano/básico"*.
  3. Fork asimétrico con numerales gigantes + curtain + parallax → *"no me gustó"*.
  4. Centrado + toggle single-stage crossfade → rechazado.
  5. Comparación 2-col centrada, sin tabs → *"muy básico"*.
  6. **Scrub de estudio**: fork-open ligado a scroll, cortina clip-path scrubbeada, parallax de numerales, velocity-skew, light-up por ítem → *"sigue básico"*.
  7. Tarjetas 3D tilt (perspective + translateZ por capas + glow) → *"mismo diseño básico"*.
  8. **[ACTUAL] "Elegí tu camino":** dos **paneles full-bleed cinematográficos** (imagen cover + scrim + tinte de marca), tipografía gigante encima; al **hover un panel se expande** (`grow-[1.9]`) y revela sus capacidades en glass; título centrado Text-Birth; paneles con **cortina clip-path** + parallax de imagen/numeral al scroll.
- Dirigido con `command-prompts/creative-motion-protocol.md`.

## 3. Decisiones de Diseño
- **Codificación de marca = audiencia:** Agente→azul, Agencia→naranja (los 2 colores de marca como los 2 caminos); gris oscuro para estructura.
- **Sin tabs:** el usuario pidió explícitamente la comparación visible, no oculta tras tabs.
- **Imágenes:** placeholders de assets existentes (CRM/wireframes/pipeline) — **pendiente** cambiar por imaginario real de cada audiencia.
- **Lenis global:** NO re-inicializar en la sección; ScrollTrigger ya está sincronizado vía `SmoothScrollProvider`.

## 4. Bugs Conocidos / Pendientes
- ⚠️ **Diseño no aprobado:** tras ~8 iteraciones a ciegas el usuario sigue insatisfecho ("básico"). **Bloqueante real: no hay loop visual** (extensión Chrome declinada). *Próximo paso recomendado: que el usuario pegue una referencia visual (Awwwards/Dribbble) para calcar dirección en 1 intento.* Dev server disponible en `localhost:3000` para que el usuario revise.
- Imágenes placeholder por reemplazar.
- Alts de la 2ª imagen (`agentImg2Alt`/`agencyImg2Alt`) quedaron sin uso en la variante de panel único (inofensivo).

> **Última Actualización:** 20 Julio 2026
