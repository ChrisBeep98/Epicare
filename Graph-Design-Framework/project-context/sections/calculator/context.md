# Calculator
> Última actualización: 19 de Marzo, 2026

> **TL;DR:** Calculadora de ROI en 3 pasos, 7 archivos modulares. Mobile responsive con tabs pill, floating character, y trust bar glassmorphism. Próximo: resolver gap blanco de fondo + reemplazar avatares dummy.

## Componentes
- `src/components/landing-v2/calculator/HomeCalculator.tsx` — Orquestador principal (~330 líneas)
- `src/components/landing-v2/calculator/CalcCard.tsx` — Card individual de métrica
- `src/components/landing-v2/calculator/CalcSlider.tsx` — Slider con tokens del Design System
- `src/components/landing-v2/calculator/AnimNum.tsx` — Números animados con rAF
- `src/components/landing-v2/calculator/BigStat.tsx` — Stat display grande
- `src/components/landing-v2/calculator/useCalculator.ts` — Hook con lógica matemática
- `src/components/landing-v2/calculator/types.ts` — Interfaces TypeScript compartidas

## Estado Actual
- Calculadora de ROI en 3 pasos completamente funcional e internacionalizada.
- Paso 1: Selector de negocio (4 presets + custom) + 4 sliders.
- Paso 2: Visualización del "dolor" con métricas animadas.
- Paso 3: Recuperación con Flow + ROI + CTA a Calendly.
- Mobile responsive con tabs pill y floating character.

## Historial de Cambios
1. **Implementación inicial (10 Mar 2026):** Monolito de 562 líneas integrado en `page.tsx`.
2. **Refactor de Arquitectura (10 Mar 2026):** División en 7 archivos modulares. Tokenización completa. Colores semánticos.
3. **Mobile Responsive Overhaul (13 Mar 2026):** Tabs mobile, biz type cards responsivas, full-bleed form, scroll offsets.
4. **Mobile CTA + Floating Character (13 Mar 2026):** Botones full-width, personaje "Feliz" con IntersectionObserver, animación wiggle custom.
5. **Steps 2/3 Spacing Unification (13 Mar 2026):** marginTop y paddingTop responsive para igualar step 1.
6. **Trust Bar Redesign (13 Mar 2026):** De pill a glassmorphism premium. Desktop fila horizontal + mobile grid 2×2.
7. **Section Bottom Spacing + BG Tester (13 Mar 2026):** Fix gap blanco, BG expandido a 13 imágenes.
8. **BG Object Position Controls (13 Mar 2026):** Sliders Pos X/Y para panear imagen de fondo.

## Decisiones de Diseño
- **rAF sobre GSAP para AnimNum:** Los números animados usan `requestAnimationFrame` directo con cubic ease-out en vez de GSAP porque son actualizaciones frecuentes de texto, no transforms/opacity.
- **Tabs separadas de Stepper:** Mobile usa pill-tabs, desktop usa stepper vertical. Se descartó un stepper unificado porque era ilegible en mobile.
- **Floating character con IntersectionObserver:** Se eligió IO sobre scroll events para la aparición/desaparición del personaje flotante porque es más eficiente y no interfiere con el smooth scroll de Lenis.

## Bugs Conocidos / Pendientes
- El gap blanco de ~80px en el fondo fue parcialmente resuelto pero puede reaparecer con ciertos fondos.
- Los avatares de ManyChat creators usan `ui-avatars.com` — reemplazar con fotos reales cuando estén disponibles.
