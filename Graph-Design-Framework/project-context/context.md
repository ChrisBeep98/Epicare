# Contexto del Proyecto: GO AMS Landing Page
> **Última Actualización:** 5 de Abril, 2026
> **Estado:** Fase 10 (E-Commerce & Platform Redesign)
> **Navegación:** Ver [`README.md`](./README.md) para el índice completo de archivos de contexto.

## 1. Visión General
El objetivo de este esfuerzo es realizar un **rediseño completo de la página de inicio (Landing Page)** del proyecto `go-ams-landing`. El proyecto original es una aplicación web robusta construida con Next.js (App Router), React 19, Supabase y Prisma, incluyendo paneles de administración protegidos.

El rediseño fue completado y **entregado** exitosamente. La rama `feature/redesign-landing` fue mergeada y el landing está en producción. El lead del equipo realizó ajustes post-entrega que fueron integrados vía `git pull origin main`.

## 2. Entorno y Stack Tecnológico
- **Framework Principal:** Next.js 16.1.4 (Turbopack)
- **Gestión de Estilos:** Tailwind CSS v4 (vía PostCSS) integrado orgánicamente. Globales centralizados en `landing.css`.
- **Librerías de UI:** `framer-motion` (v12.x), `gsap` (v3.14.x) y `lenis` (smooth scrolling).
- **Control de Versiones:** Git.
- **Gestor de Paquetes:** `pnpm` (Estrictamente configurado).
- **Deploy:** Vercel. Git user para commits: `ChrisBeep98` / `christiansandovaldesign@gmail.com`.

## 3. Estándares de Desarrollo (OBLIGATORIO)
Todo código entregado debe cumplir con los siguientes estándares de producción:

### Arquitectura
- **Modularidad:** Componentes grandes (>200 líneas) deben dividirse en sub-componentes, custom hooks, y archivos de tipos.
- **Separación de concerns:** Lógica de negocio en hooks (`use*.ts`), tipos en `types.ts`, UI en componentes `.tsx`.
- **Constantes:** Extraer a nivel de módulo con `UPPER_SNAKE_CASE`. No hardcodear valores mágicos inline.

### Código Limpio
- **JSDoc:** Todo componente exportado, hook, y función utilitaria debe tener JSDoc con `@description` y `@example` cuando sea relevante.
- **TypeScript estricto:** Interfaces explícitas para props. No usar `any`. Tipar retornos de hooks.
- **Comentarios de sección:** Bloques lógicos separados con comentarios descriptivos (`// ── SECTION ──`).

### Design System
- **Tipografía:** Usar EXCLUSIVAMENTE tokens del sistema tipográfico (`text-display-xl`, `text-display-lg`, `text-display`, `text-display-sm`, `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-h5`, `text-h6`, `text-overline`, `text-subtitle`, `text-body-2xl`, `text-body-xl`, `text-body-lg`, `text-body-md`, `text-body`, `text-body-sm`, `text-body-xs`, `text-ui-label`, `text-data`, `text-caption`). **PROHIBIDO** usar `text-[Xpx]` o `text-[Xrem]` arbitrarios.
- **Colores:** Usar variables semánticas de Tailwind registradas en globals (`text-foreground`, `text-foreground-secondary`, `text-foreground-tertiary`, `text-muted`, `text-accent`, `bg-background`, `bg-secondary`, `border-border`). Minimizar uso de colores genéricos de Tailwind (`slate-*`, `gray-*`).
- **Modo:** Bimodal completo. Debe soportar "Light Mode" (Light Mode) y "Dark Mode" (Dark Mode) fluidamente gracias al semantic mapping.

### Tooling
- **Gestor de paquetes:** `pnpm` — NUNCA usar `npm` ni `yarn`.
- **Build:** Verificar con `pnpm build` antes de entregar. Cero errores TypeScript.
- **i18n (Bilingüe Global):** Todas las zonas (Admin, Client y Landing) usan `useTranslations()` de `next-intl`. Mantener `messages/en.json` y `messages/es.json` sincronizados.
- **Rendimiento:** Usar `useMemo` para cálculos derivados costosos. Limpiar efectos (GSAP `.revert()`, `cancelAnimationFrame`, etc.).

## 4. Estructura de la Migración
Los componentes del nuevo diseño están consolidados en:
- **Componentes V2:** `src/components/landing-v2/` (Incluye `LiquidHero`, `ModulesCarousel`, `ComparisonSection`, `WaveRevealSection`, `IntegrationsEcosystem`, `DashboardReveal`, `Footer`).
- **Módulo Calculator:** `src/components/landing-v2/calculator/` — Arquitectura modular con 8 archivos: `HomeCalculator.tsx` (orquestador), `useCalculator.ts` (hook), `AnimNum.tsx`, `CalcSlider.tsx`, `CalcCard.tsx`, `BigStat.tsx`, `CalcWaves.tsx` (BG + debug panel), `types.ts`.
- **Testimonials Ticker:** `src/components/landing-v2/TestimonialsCarousel.tsx` — Ticker horizontal auto-scroll con avatares, quotes, trust messages con emojis. CSS marquee en `landing.css`.
- **Assets Públicos:** `/public/hero-sequence/*`, `/public/Dashboard-UI-Mockup/*`, `/public/Hero-Video_02-Mobile.mp4`, `/public/landing/calculator/TESTING-IMAGES-BG/` (13 imágenes de fondo para testeo), etc.
- **Ruta Principal:** `src/app/page.tsx` (Completamente refactorizada para consumir V2, incluye Footer cortina y Calculator).
- **Estilos Comunes:** Todas las variables `--color-pillar-*` y clases utilitarias (`.liquid-glass`, `.footer-animated-bg`, degradados, marquee) fueron modularizadas en `landing.css`.

## 5. Registro de Acciones Críticas Realizadas

> **📦 Entradas Archivadas (#1-#38):** Las fases 1-7 del proyecto (Feb–16 Mar 2026) fueron archivadas en [`context-archive-phase1-7.md`](./context-archive-phase1-7.md). Cubren: configuración inicial, migración Core V2, sistema tipográfico 12 tokens, Comparison Section, Calculator (implementación + refactor + mobile), Testimonials Ticker, Footer cortina, Bento cards polish, CI/CD & merge resolution, y la entrega del Landing.

### Fase 8 — Acciones Activas (18-19 Mar 2026)

39. **[NUEVO] GO AMS Portal Hero — Implementación V2 & Cinematic Sync (18 Mar 2026):**
    - Creación funcional del esqueleto `src/components/flowsell/Hero.tsx` implementando textos localizados (`next-intl`) y la animación maestro-secuencial vía `gsap.timeline`.
    - **Solución al Salto de Fotogramas de Video:** Se modificó la invocación `.play()` del background video al evento `onStart` de su propia transición de opacidad (con `currentTime = 0`), sincronizando el milisegundo exacto de aparición para evitar fotogramas congelados en el *fade-in*.
40. **[NUEVO] Unificación Matemática del Grid Arquitectónico (18 Mar 2026):**
    - Se descubrió un defecto crítico de consistencia visual en monitores ultrawide (1920px+): `LiquidHero` usaba un contenedor de 1800px, mientras que `Header` y `GO AMS PortalHero` orbitaban en lógicas sin definir o separadas.
    - **Estandarización al framework de 1400px:** Se inyectó estrictamente el límite `w-full max-w-[1400px]` en las tres entidades (Header, Flowsell, Landing) para garantizar paralelismo de columnas invisibles en toda la App.
    - **Padding Fluido Exterior (Resolución Quirúrgica):** Se reemplazó el token fantasma `.px-frame` por el cálculo nativo `md:px-[clamp(1.5rem,4vw,3.5rem)]`. Este token fue migrado forzosamente a la capa exterior de los 3 envoltorios globales (`<section>` y `<motion.header>`) eliminando rellenos duplicados y aplastamientos de layout.
    - El widget `LanguageToggle` de escritorio se migró de la sección Izquierda (al lado del logotipo IsotipoGO AMS) a la sección Derecha (junto al botón CTA de Log In).
    - Se optimizaron los contenedores flex desactivando clases obsoletas para establecer una simetría absoluta (`gap-[12px]`) entre los controles de acción y sus barras separadoras verticales.
42. **[NUEVO] GO AMS Portal Hero — Refactor de Nomenclatura & Disambiguación (19 Mar 2026):**
    - El archivo `Hero.tsx` fue renombrado seguramente vía Git a `GO AMS PortalHero.tsx` para evitar fricción semántica en producción.
    - Las clases CSS y hooks de GSAP fueron reclasificadas estrictamente (`flowsell-hero-eyebrow`, `flowsell-water-mask-text`, etc.) para garantizar aislamiento total contra el `LiquidHero` de la Landing.
    - **Tipografía Responsiva:** Se forzó una reducción de `~16px` en el H1 de móvil usando el utilitario `text-[24px]` sobreescribiendo temporalmente el token `text-display-sm` para evitar overflows.
43. **[NUEVO] Debug Panel Architect — Fase 3: Zero-Trace Purge (19 Mar 2026):**
    - Eliminación completa de +180 líneas de código temporal inyectadas correspondientes a los controles UI de testeo *en vivo*.
    - **Consolidación del Background:** Se dividieron los flujos visuales en dos nodos estáticos de `<video>`, aislando nativamente Desktop (`hidden md:block`) de Mobile (`md:hidden`).
    - Configuración en piedra de máscaras lineales CSS (e.g. 34% top fade en mobile, 9% en desktop). Soporte doble referencia `useRef` para orquestación GSAP simultánea.
    - **Optimizador Git:** Se purgaron del file system 12 archivos `.mp4` inutilizados de pruebas heurísticas para aligerar radicalmente el build de Vercel.
44. **[NUEVO] Integración Upstream Automática (19 Mar 2026):**
    - Se ejecutó el pipeline de CI/CD local (`git fetch` + `git merge origin/main`) tras asegurar toda la UI con su propio commit local de backup.
    - El merge resolvió mágicamente con estrategia `ort` con **0 conflictos**, blindando 100% de nuestras optimizaciones Landing contra los nuevos módulos robustos de Auntenticación del lead developer.

### Fase 9 — Acciones Activas (20 Mar 2026)

45. **[NUEVO] Testimonials — Cinematic Modal Redesign & Responsive (20 Mar 2026):**
    - Modal fullscreen redesigned: eliminado glass card blanco, contenido flota transparente sobre backdrop oscuro con radial glow halo y staggered parallax animations.
    - Scroll infinito implementado (3x clone + `scrollend` jump-back silencioso). Cards del carrusel completamente clickeables con `hover:scale`. Trust label responsive (single-line `text-caption` en mobile, `text-h5` con ✦ en desktop).
    - Responsive mobile completo: layout stacked, avatar 55%, padding reducido, `text-h3`. Header auto-hide via `MutationObserver`. Debug panel activo (pendiente purge).

### Fase 10 — E-Commerce & Platform Redesign (5 Abr 2026)

46. **[NUEVO] Project Setup & Architecture (5 Abr 2026):** Inicialización del proyecto Next.js (App Router) con pnpm, TailwindCSS y GSAP. Estructuración modular de carpetas (`app/(shop)`, `components/animations`, `services/`) preparada para e-commerce, animaciones complejas y SEO óptimo.
47. **[NUEVO] Debug Panel Architect v4.0 (5 Abr 2026):** Evolución del Debug Panel a un Sub-Framework de grado empresarial con 14 módulos avanzados (GSAP Scrubber, 3D Tilt, DOM Outliner, Tailwind Injector, State Sync).
48. **[NUEVO] Hero Sequence Frames (5 Abr 2026):** Extracción optimizada de 192 fotogramas (WebP, ~11MB) desde video crudo usando FFmpeg nativo, preparados en `public/images/hero-sequence` para la futura animación de scroll.
49. **[NUEVO] Design System UI Kit (5 Abr 2026):** Creación interactiva `/design-system` estableciendo estética bimodal (Amanecer/Midnight), tipografía Premium Serif y escala semántica de 6 niveles probados en Typography Sandbox.
50. **[NUEVO] Hero Sequence & Multi-Zone Grid Builder (5 Abr 2026):**
    - Implementación de `HeroSequence.tsx` con motor de Canvas (180 frames) y coreografía **Cinematic Motion** (Awwwards-style).
    - **Backdrop-Blur Fixed:** Resolución de bug de renderizado mediante animación de atributos puros (alpha/radius) y aislamiento de capas GPU.
    - **Builder v3.0:** Inyección de motor de arrastre responsivo sobre CSS Grid de 12 columnas para diseño en vivo de actos cinemáticos.
51. **[NUEVO] Spacing Studio v2.0 & Zero Px Policy (5 Abr 2026):**
    - Implementación del **Salento Spacing System**: Sistema de espaciado 100% fluido basado en `clamp()` y unidades `rem`. 
    - **Zero Px Policy:** Purga total de valores fijos en píxeles de toda la arquitectura (márgenes, paddings, gaps, sombras, blurs).
    - Creación del **Laboratorio Arquitectónico** en `/design-system` con diagramas interactivos sincronizados con el framework.
102. **[NUEVO] Evolución Documental de Micro-Espaciados (5 Abr 2026):**
    - Se agregaron las variables `py-section-xs`, `gap-fluid-xs` y `gap-1` directo al kernel (`globals.css`) e UI Kit interactivo para dar soporte de mayor densidad en layouts (e-commerce y sub-tarjetas).
    - Se actualizaron las **Skills del Agente IA** (`Tokenizer.md` y `Design-System.md`) para purgar definitivamente referencias muertas a las antiguas clases `px-frame` y `section-v-spacing`, evitando así desviaciones en próximas sesiones de build.
103. **[NUEVO] Consolidación de Typograhy Tokens (Cognitive Typography) (5 Abr 2026):**
    - Se detectó y resolvió una desalineación crítica del `Tokenizer.md` donde la tabla principal aún aconsejaba "Tailwind Sizes" genéricos (`text-sm`, `text-lg`) en vez de nuestra escala expandida `text-body-*`.
    - Se inyectó la familia completa de "Body Sizes" (desde `2xl` hasta `xs`) y el token `caption`, dentro del visualizador interactivo `/design-system`, garantizando visibilidad integral de los 12 niveles de tipografía corporativa.

## 6. Próximos Pasos (To-Do)
- Empezar la construcción de la **Página de Inicio (Home)** integrando el motor de `HeroSequence` con los nuevos tokens de espaciado.
- Diseñar el **Header Adaptativo** usando el token `px-gutter-md` para el marco global.
- Verificar visualmente el comportamiento de los `gap-fluid` en el catálogo de productos en mobile.
- Recibir y ejecutar nuevas tareas asignadas por el lead.
