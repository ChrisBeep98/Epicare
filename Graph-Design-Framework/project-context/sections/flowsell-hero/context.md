# FlowSell Hero
> Última actualización: 19 de Marzo, 2026

> **TL;DR:** Hero de FlowSell con GSAP timeline, video background cinematic sync, y clases `flowsell-*` aisladas. Pendiente: crear token `text-display-xs` para mobile H1.

## Componentes
- `src/components/flowsell/FlowSellHero.tsx` — Hero section de la página FlowSell

## Estado Actual
- Hero funcional con textos localizados (`next-intl`), animación maestro-secuencial GSAP, y background video con cinematic sync.
- Nomenclatura disambiguada: clases CSS con prefijo `flowsell-` para aislamiento total contra `LiquidHero`.
- Videos separados por breakpoint: desktop (`hidden md:block`) y mobile (`md:hidden`).
- Máscaras lineales CSS consolidadas (34% top fade mobile, 9% desktop).

## Historial de Cambios
1. **Implementación V2 & Cinematic Sync (18 Mar 2026):** Esqueleto funcional, fix de salto de fotogramas en `.play()` via `onStart`.
2. **Refactor de Nomenclatura & Disambiguación (19 Mar 2026):** Rename `Hero.tsx` → `FlowSellHero.tsx`, clases `flowsell-*`, tipografía responsiva `text-[24px]` override temporal.
3. **Debug Panel Purge (19 Mar 2026):** Eliminación +180 líneas de debug. Configuración final de videos y máscaras. Purga de 12 archivos .mp4 de pruebas.

## Decisiones de Diseño
- **`onStart` para video sync:** Se usa el callback `onStart` de la tween GSAP de opacidad del video para invocar `.play()` con `currentTime = 0`, eliminando fotogramas congelados en el fade-in.
- **Tipografía override temporal:** El H1 mobile usa `text-[24px]` sobreescribiendo `text-display-sm` — pendiente de crear un token `text-display-xs` para resolver esto limpiamente.

## Bugs Conocidos / Pendientes
- Override tipográfico temporal `text-[24px]` debería ser reemplazado por un token formal.
