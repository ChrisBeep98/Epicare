# Wave Reveal
> Última actualización: 19 de Marzo, 2026

> **TL;DR:** Sección omnichannel con scroll-driven reveal, 5 tarjetas sociales con flip 3D, chat bubble animations (GSAP), y CTA gradient. Debug panel purgado — valores finales hardcodeados.

## Componentes
- `src/components/landing-v2/WaveRevealSection.tsx` — Sección principal (~677 líneas, production-ready)

## Estado Actual
- ✅ Funcional con ScrollTrigger pinning y wave mask transition entre imágenes.
- ✅ 5 tarjetas sociales con flip 3D (WhatsApp, Instagram, Messenger, Webchat, TikTok).
- ✅ Flip hints: pill button con ícono animado `flipBounce` (rotateY). Mobile: solo ícono. Desktop: texto + ícono.
- ✅ Botón "Volver"/"Back" en card-back con mismo estilo pill.
- ✅ Hover scale `1.02` en desktop (`.card-flip-inner`).
- ✅ Chat bubble animations con GSAP stagger loops (WA, MSG, WC).
- ✅ Debug panel completamente purgado. Valores finales hardcodeados.

## Valores Finales Hardcodeados
- **Gradient CTA:** `linear-gradient(135deg, #0055D4 0%, #007AFF 45%, #48B8FF 100%)`
- **Margins:** `px-3.5 md:px-16 lg:px-36 max-w-[1600px]`
- **WA bubbles:** h: 51px, gap: 16px
- **MSG/WC bubbles:** h: 48px, gap: 16px
- **Todas las escalas:** 100% (transforms eliminados)

## Historial de Cambios
- **19 Mar 2026:** Flip hints añadidos a 5 tarjetas, botón Volver rediseñado, hover scale, purga debug panel (~266 líneas eliminadas), valores hardcodeados.

## Decisiones de Diseño
- Hover scale usa `scale` CSS individual (no `transform: scale()`) para no sobreescribir Tailwind translates.
- Hover se aplica a `.card-flip-inner` (no al container con `perspective`).
- Animación flipBounce: `rotateY(180deg)` en 2s para sugerir el flip.
- i18n: front "Tilt"/"Girar", back "Back"/"Volver".

## Bugs Conocidos / Pendientes
- Warnings de "Duplicate object key" en `en.json`/`es.json` son pre-existentes.
- Verificar `pnpm build` tras la purga.
