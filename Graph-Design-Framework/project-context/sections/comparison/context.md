# Comparison Section
> Última actualización: 19 de Marzo, 2026

> **TL;DR:** Sección de 2 actos (Caos → Control) con clipPath circle reveal scrub GSAP. 6 chips flotantes con speech bubble tails. Imágenes unificadas en inglés con mask-image viñetado.

## Componentes
- `src/components/landing-v2/ComparisonSection.tsx` — Componente principal (Antes/Después con scroll-driven reveal)

## Estado Actual
- Sección de 2 actos: Act 1 (Caos con chips rojos flotantes) → Act 2 (Control con chips verdes).
- Revelado por `clipPath: circle()` scrub via GSAP ScrollTrigger.
- Imágenes unificadas en inglés (`act2-main-eng.webp`, `left-hand-ENG.webp`).
- Viñetado mask-image en ambas imágenes. Speech bubble tails en chips.

## Historial de Cambios
1. **Implementación Act 1 & 2:** Chips flotantes asíncronos, clipPath reveal, compatible con WaveReveal pinning.
2. **Refactor Wave Reveal a Scrub clipPath:** Timeline limpio SVG → chip exit → clipPath → content fade.
3. **Viñetado mask-image en Imágenes:** Radial gradient mask estático.
4. **Speech Bubble Tails en Chips:** CSS border trick, centradas, rotación cero.
5. **Limpieza Ripple Rings + Scroll Arrow:** Removidos ripple rings, flecha doble chevron.
6. **UI Polish & Responsive Refactor (13 Mar 2026):** Imágenes unificadas, Debug Panel Architect para chips, tablet bugfix (`md:text-5xl`). Valores: Act 1 scale `1.13/1.27`, Act 2 scale `1.17/1.21`.

## Decisiones de Diseño
- **IntersectionObserver descartado para chips:** Causaba race conditions con el ScrollTrigger timeline. Los chips ahora forman parte del timeline GSAP directamente.
- **mask-image estático (no animado):** Se probó overlay div como alternativa GPU-friendly pero era visualmente inferior. mask-image estático no causa lag.
- **scrub: 1 (mobile) / 1.5 (desktop):** Mobile necesita respuesta más inmediata; desktop tolera más inercia.

## Bugs Conocidos / Pendientes
- Ninguno conocido actualmente.
