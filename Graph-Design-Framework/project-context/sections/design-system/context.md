# Contexto de Sección: Design System

> **Última Actualización:** 17 de Julio, 2026

## 1. Visión General
Esta sección documenta el sistema de diseño central de GO AMS Landing Page. Sirve como la única fuente de verdad interactiva (`/design-system`) para colores, tipografía, espaciado, componentes modulares y simulaciones de layout (MaxWidth).

## 2. Estado Actual
**Completado y Estable.** El sistema de diseño se encuentra modularizado con componentes extraídos y un contenedor de ancho máximo (1536px) funcional. Se incorporaron tokens tipográficos gigantes para la nueva estética "GO AMS".

## 3. Historial de Cambios
- **17 Jul 2026 (Sesión):** **Max-widths de sección fluidos para 1080p.** `--max-w-section-lg` y `--max-w-section-xl` pasaron de valores fijos (1280/1536px) a `clamp()` fluido: se achican en pantallas 1080p (lg ≈ 1190px @1920) manteniendo el ancho amplio en 2K (cap 1280/1536). Motivo: en 2K se veían bien pero en 1080p quedaban demasiado anchos. Se sincronizó el inventario `Design-System.md` con las nuevas definiciones. (Métricas migradas de `max-w-[1400px]` al token; ver sección Metrics.)
- **23 Jun 2026 (Sesión):** [2026-06-23_landing-tokenization-and-i18n.md](file:///D:/Proyectos-Importantes/GOAMS%20Landing_Production/Graph-Design-Framework/project-context/session-notes/2026-06-23_landing-tokenization-and-i18n.md) - Incorporación oficial de `next-intl` (internacionalización), nuevos Surface Tokens (`--color-surface-BG-black` y `BG-white`), tokenización estricta de componentes para cumplimiento de *Zero Px Policy*, y exclusión de scripts en pnpm.
- **16 Jun 2026 - Refactorización Modular y Corrección Visual:** 
  - Se extrajo el contenido de `page.tsx` en componentes independientes (`MaxWidthSection`, `TypographySection`, etc.) bajo `components/`.
  - Se corrigió el bug del clipping/scroll horizontal removiendo el contenedor `overflow-x-auto` en `MaxWidthSection`.
  - Se corrigió la restricción del layout global extrayendo a `MaxWidthSection` fuera del wrapper de 1400px en `page.tsx`, permitiéndole alcanzar su escala real (1536px).
  - Se agregaron los tokens `text-display-3xl` (clamp 6rem-12rem) y `text-display-2xl` (clamp 4.5rem-8rem) en `globals.css` y `TypographySection.tsx`.

## 4. Decisiones de Diseño
- **Escala Real en Layout:** En lugar de usar contenedores simulados con clipping, el bloque visual de demostración de "MaxWidth" aplica su escala directamente a su `max-width`, interactuando naturalmente con la ventana del navegador.
- **Tipografía "Immense":** Se añadieron dos nuevos tokens titánicos para títulos principales (hero y portadas), favoreciendo la estética editorial premium y corporativa con interlineados apretados (0.95 y 1.0) y letter-spacing negativo.

## 5. Bugs Conocidos / Pendientes
- Ninguno en este momento. El design system opera correctamente y su build fue exitoso.
