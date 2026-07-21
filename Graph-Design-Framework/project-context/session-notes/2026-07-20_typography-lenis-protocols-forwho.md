# Sesión: Reestructuración Tipográfica, Lenis, Protocolos Creativos y Sección "Para quién es"

**Fecha:** 2026-07-20

## Resumen
* **Sistema tipográfico de 3 familias:** migración de Inter único → **Inter Display** (opsz 32, títulos w600) · **Inter Tight** (cuerpo/UI) · **JetBrains Mono** (data/meta). Nuevo token `text-meta`; `text-data`/`text-meta` a peso bold (600/500); títulos display+headings subidos 500→600. Variantes `-light` rebaseadas 200→300.
* **Tokens de texto-acento de marca:** creados `--color-text-accent-blue` y `--color-text-accent-dark` (bimodales), cerrando la asimetría vs. el naranja (`accent-main`).
* **Purga "SalentoCoffee" → Epicare:** colores muertos `salento-*` en `/design-system` migrados a marca; copy de café → seguros; eliminado el huérfano `design-system/page.tsx`.
* **Lenis smooth scroll** integrado globalmente (`SmoothScrollProvider`) sincronizado con el ticker de GSAP (no rompe los ScrollTriggers existentes).
* **2 protocolos nuevos del framework:** `tokenized-design-protocol.md` (Token-Live, con margen creativo reportado) y `creative-motion-protocol.md` (Creative Motion Director, unifica 8 fuentes creativas/motion con OVERRIDES del DS Epicare). Índice `command-prompts/README.md` + referencias en ONBOARDING.
* **Nueva sección "Para quién es" (ForWhoEpicare):** bifurcación de audiencias (Agente azul / Agency naranja), montada al final de la landing. **~8 iteraciones a ciegas, aún sin aprobar.**

## Decisiones Tomadas
* **Tailwind v4 `@utility`:** todos los tokens tipográficos ya estaban migrados; se mantuvo el patrón para los nuevos.
* **`brand-dark` NUNCA en texto** (no invierte en dark → ilegible): para títulos usar `text-primary`; para acento gris en texto usar el nuevo `text-accent-dark`.
* **Overline/ui-label → JetBrains Mono** (decisión del usuario: los "labels" van en mono).
* **Protocolos como `.md` en el graph** (no memoria Claude-only) para que cualquier chat/IA los invoque con `@`.
* **Los skills creativos legacy** (Playfair/café/violeta/solo-light) se usan por su **filosofía**, pero el `creative-motion-protocol` fuerza el DS Epicare real (Inter/marca/bimodal/Lenis global).
* **ForWho:** codificación marca=audiencia (azul/naranja), comparación visible **sin tabs**, título centrado.

## Pendientes
* **Diseño de ForWho sin aprobar** — el usuario lo ve "básico" tras 8 intentos. **Bloqueante: no hay loop visual** (extensión Chrome declinada). Próximo paso: que el usuario **pegue una referencia visual** para calcar en 1 intento. Dev server disponible en `localhost:3000`.
* Reemplazar **imágenes placeholder** de ForWho por imaginario real de cada audiencia.
* **`push` pendiente:** ~13+ commits locales sin subir a `origin` (dispara deploy a GitHub Pages).
* Actualizar los prompts legacy `master-design-prompt.md` / `refactor-design-prompt.md` (rutas viejas `context-Docs/`, fuentes muertas Playfair).

## Bugs Descubiertos
* **`.next` lock:** dos `next dev`/builds concurrentes chocan ("Another next dev server already running"). Correr uno solo.
* **Trampa de tokens fluid direccionales:** `pl-fluid-*`/`gap-x-fluid-*` **no existen** (los fluid solo son `gap-fluid-*` completos) → usar `*-static-*` para paddings/gaps direccionales. (Se corrigió varias veces en ForWho.)
* **BentoGrid editado en paralelo** por el usuario durante la sesión (apareció modificado varias veces + assets de video nuevos); se commiteó con mensajes honestos verificando que ningún `.mp4` quedara huérfano.

## Archivos Clave Modificados
* `design-system-app/src/app/globals.css` (3 fuentes, text-meta, pesos, accent-text tokens, CSS Lenis)
* `design-system-app/src/app/layout.tsx` (3 fuentes next/font + SmoothScrollProvider)
* `design-system-app/src/components/SmoothScrollProvider.tsx` (nuevo)
* `design-system-app/src/components/epicare/ForWhoEpicare.tsx` (nuevo, ~8 rediseños)
* `design-system-app/src/app/page.tsx` (monta ForWho)
* `design-system-app/src/app/design-system/components/*` (TypographySection, SemanticTextColors, Spacing, Interactive, TypeRow — purga + tokens)
* `design-system-app/src/components/epicare/BentoGridEpicare.tsx` (videos light/dark, edición del usuario)
* `design-system-app/messages/en.json` & `es.json` (forWho, hoverHint)
* `Graph-Design-Framework/command-prompts/tokenized-design-protocol.md` & `creative-motion-protocol.md` & `README.md` (nuevos)
* `Graph-Design-Framework/WorkFlow-Docs/Design-Agent-Skills/Tokenizer.md`, `.../Design-System.md`, `command-prompts/ONBOARDING-AI-protocol.md`, `project-context/context.md`, `project-context/sections/for-who/context.md`
