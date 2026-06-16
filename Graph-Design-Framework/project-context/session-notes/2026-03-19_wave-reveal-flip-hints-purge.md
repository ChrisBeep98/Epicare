# Sesión: Wave Reveal — Flip Hints & Debug Purge
> Fecha: 19 de Marzo, 2026

---

## Resumen
- **Flip hint añadido a las 5 tarjetas sociales** (WhatsApp, Instagram, Messenger, Webchat, TikTok) — pill border con ícono animado `flipBounce` (rotateY 180°).
- **i18n implementado** para flip hints: ES "Girar" / EN "Tilt" (front) y ES "Volver" / EN "Back" (back).
- **Responsive mobile/desktop**: en mobile solo se muestra la burbuja con ícono animado, en desktop text + ícono en pill.
- **Hover scale en desktop**: `scale: 1.02` aplicado a `.card-flip-inner` con transición `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Purga completa del Debug Panel**: eliminadas ~266 líneas de código temporal (state variables, presets, sliders, panel UI). Valores finales hardcodeados.

## Decisiones Tomadas
| Decisión | Razón |
|:---|:---|
| Label "Tilt"/"Girar" en vez de "Tap to learn more" | El usuario pidió algo más corto y bilingüe, más como un call-to-action sutil |
| Ícono tarjeta con línea punteada + animación `rotateY` | Sugiere visualmente el flip de la tarjeta, más intuitivo que un chevron |
| Pill border (`rounded-full border border-white/10`) | El usuario pidió explícitamente este estilo de token |
| Hover scale en `.card-flip-inner` (no en `.social-card`) | La propiedad `perspective` del contenedor impedía que `scale` funcionara directamente |
| Propiedad CSS `scale` individual vs `transform: scale()` | Evita sobreescribir los `translate-y` de Tailwind existentes en las tarjetas |
| Gradiente final: Ocean Depth 135° `#0055D4 → #007AFF → #48B8FF` | Elegido por el usuario desde el debug panel |
| Margins: mob `px-3.5`, tablet `md:px-16`, desktop `lg:px-36`, maxW `1600px` | Configuración final aprobada por el usuario |

## Pendientes
- Verificar build de producción (`pnpm build`) tras la purga.
- Las warnings de "Duplicate object key" en `en.json` y `es.json` son pre-existentes y no relacionadas con esta sesión.

## Bugs Descubiertos
- Ninguno nuevo. El hover scale requirió 2 iteraciones: primero `transform: scale()` sobreescribía los translates de Tailwind, luego se usó `scale` individual que tampoco funcionaba por el `perspective` del contenedor. Solución: aplicar en `.card-flip-inner` hijo.

## Archivos Clave Modificados
| Archivo | Cambios |
|:---|:---|
| `src/components/landing-v2/WaveRevealSection.tsx` | Flip hints en 5 tarjetas, botón "Volver" rediseñado, responsive mobile, purga debug panel (~266 líneas eliminadas), valores hardcodeados |
| `src/components/landing-v2/landing.css` | Keyframes `flipBounce` (rotateY), hover scale `.social-card .card-flip-inner` |
| `messages/es.json` | `flipHint: "Girar"` |
| `messages/en.json` | `flipHint: "Tilt"` |
