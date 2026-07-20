# Contexto del Proyecto: GO AMS Landing Page
> **Última Actualización:** 20 de Julio, 2026
> **Estado:** Fase 11 (Epicare Redesign) — reestructuración tipográfica a sistema de 3 familias (Inter Display / Inter Tight / JetBrains Mono)
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
107. **[NUEVO] Consolidación de Typograhy Tokens (Cognitive Typography) (5 Abr 2026):**
    - Se detectó y resolvió una desalineación crítica del `Tokenizer.md` donde la tabla principal aún aconsejaba "Tailwind Sizes" genéricos (`text-sm`, `text-lg`) en vez de nuestra escala expandida `text-body-*`.
    - Se inyectó la familia completa de "Body Sizes" (desde `2xl` hasta `xs`) y el token `caption`, dentro del visualizador interactivo `/design-system`, garantizando visibilidad integral de los 12 niveles de tipografía corporativa.

### Fase 11 — GO AMS Redesign (16 Jun 2026)

108. **[NUEVO] Design System Modularization & Typographic Expansion:**
    - Refactorización de la página interactiva del Design System (`/design-system`) separando secciones en módulos independientes.
    - Resolución de bug crítico de "escala real" en MaxWidthSection, permitiendo simulación precisa a 1536px.
    - Creación e inyección de tokens tipográficos masivos (`text-display-3xl` de 192px y `text-display-2xl` de 128px) en `globals.css` para la estética corporativa.

109. **[NUEVO] GO AMS Portal Hero — Arquitectura Grid y Live Editing Avanzado (18 Jun 2026):**
    - Refactorización de `HeroSection.tsx` hacia una grilla unificada asimétrica (12 columnas x 3 filas).
    - Implementación de la solución `BleedRight` para sangrado perfecto del panel oscuro hacia el viewport derecho sin provocar scrolls horizontales (`span: 7`).
    - Mejora del ecosistema `LiveEditor` permitiendo inyección de estado `initialProps` vía JSON y botones de copiado de estado ultra-granulares.
110. **[NUEVO] GO AMS Portal Hero — Dark Mode Nativo & Mobile Polish (18 Jun 2026):**
    - Implementación de Dark Mode Forzado por defecto utilizando manipulación de DOM nativa de React/Tailwind v4 (descartando `next-themes` para zero-dependency).
    - Resolución de glitch WebKit en iOS Safari aplicando un enmascaramiento (`border-radius: 24px`) directo sobre las etiquetas `<video>` y ruido en móvil para lograr un Bleed Fullwidth sin huecos visuales.
111. **[NUEVO] Epicare Hero — Cinematic Scrollytelling & Refinamiento de Layout (23 Jun 2026):**
    - Se completó la orquestación GSAP de 2 Actos (`HeroEpicare.tsx`), corrigiendo desbordamientos horizontales (`100vw` -> `100%`) y saltos en móvil (`100dvh` + `ignoreMobileResize`).
    - Se introdujo un indicador SVG minimalista y un layout vertical estático ajustado (`pb-[60px]`) para proteger los CTAs del corte inferior sin perder proporciones heroicas.
112. **[NUEVO] Epicare Hero — Mobile UI Polish & Header Integration (23 Jun 2026):**
    - Se redujo la altura del video a `64dvh` en móvil y se centró verticalmente, eliminando anclajes al fondo para crear espacio de respiro inferior.
    - El indicador de *Scroll Down* fue reposicionado a `bottom-4` y actualizado con token blanco puro (`text-White-100`).
    - El *Header* (Theme Switch & Hamburger Menu) se hizo visible desde el Acto 1. Se rediseñó bajo un concepto puramente minimalista usando solo íconos vectoriales SVG sin fondos ni bordes, optimizado con animaciones de micro-interacción.
113. **[NUEVO] Epicare Services Bento — Iluminación Bimodal & Edge-to-Edge (23 Jun 2026):**
    - Refactorización de `DarkGradientSection` con luz radial adaptativa (Foco nocturno vs. Wash expandido diurno), tarjetas "Dark" de alto contraste forzadas en Light Mode, integración de PNGs vectoriales transparentes, y ajuste Edge-to-Edge móvil con 14px de padding.
114. **[NUEVO] Epicare Header & Layout Refinement (26 Jun 2026):**
    - Extracción de la barra de navegación del Hero para consolidar el componente global e independiente `<HeaderEpicare />` usando el nuevo isotipo `/short_logo.svg`.
    - Solución definitiva al *scrollbar layout shift* (salto de la barra de scroll) forzando `overflow-y: scroll` en `html` con estilos transparentes durante la carga del Loader, revelándose suavemente con la clase `.show-scrollbar` al finalizar.
    - Configuración por defecto de Light Mode al remover la clase `dark` del tag `html` en `layout.tsx`.
115. **[NUEVO] Internacionalización Dinámica & Header Polish (29 Jun 2026):**
    - Implementación de un selector de idioma dinámico (ESP/ENG) tipo dropdown "liquid glass" minimalista en el Header que actualiza los textos en caliente sin remontar el DOM, preservando intactos los ScrollTriggers y el pin del video del Hero.
    - Adición de un botón de Login en azul de la marca y localización completa de todos los componentes y copys quemados de la landing page en los diccionarios i18n.

116. **[NUEVO] Epicare — Nueva Sección "Product Lines" (Índice Editorial) (17 Jul 2026):**
    - Creación de `ProductLinesEpicare.tsx` (debajo de BentoGrid): las 3 categorías de seguros (Life/Health/Supplementary) como índice editorial. **Desktop:** riel izquierdo pinneado con marcador de categoría a escala gigante (`display-3xl`) que hace swap al scroll + lista de productos con reveal "light-up" ligado al scroll (scrub) y acordeón hover con mini-descripción. **Mobile:** pills minimalistas por categoría con reveal escalonado.
    - i18n `landingV2.productLines` (en/es) con `t.raw()` para arrays de productos. Nombres de producto en inglés (estándar industria US).
117. **[NUEVO] Epicare — Nueva Sección "People Reveal" (Kinetic Marquee) (17 Jul 2026):**
    - Creación de `PeopleRevealEpicare.tsx` (antes de Product Lines): banda full-bleed de foto de personas revelada con **franjas interlocking** que colapsan/desvanecen (bezier `CustomEase`), sobre la que corre un **marquee cinético de la frase** (ligado al scroll con scrub + skew por velocidad), en `mix-blend-difference`, anclado abajo. Placeholder Unsplash (pendiente foto real). Copy: "Expertos de tu lado / Experts on your side".
118. **[NUEVO] Design System & Landing — Responsividad 1080p + Hero/Header CTAs + Fixes Mobile (17 Jul 2026):**
    - **DS:** `--max-w-section-lg/-xl` convertidos a `clamp()` fluido (se achican en 1080p, mantienen el ancho en 2K). Métricas migradas de `max-w-[1400px]` al token. Gaps de cards (Bento/Métricas) a `gap-fluid-xs`.
    - **Hero/Header:** CTAs rediseñados (48px, sin mayúsculas, burbuja de icono con swap diagonal de flecha, hover con zoom/lift `cubic-bezier(0.22,1,0.36,1)`). Título del Hero ampliado a 9 col en desktop.
    - **Fixes Mobile:** eliminado scroll horizontal global (el `grid grid-cols-12 gap-fluid-md` de ProductLines forzaba >viewport en ≤375px → ahora `lg:grid`, flex en mobile). Título del Hero responsive (`text-display` en mobile). Quitado `overflow-x-hidden` del wrapper del Hero (ancestro que rompía el pin de ScrollTrigger en mobile).
    - **Services Bento:** swap de videos (Innovation/Support light+dark, nueva `Card 2_Support_light.mp4`), zoom-out por-modo vía `imgClassLight/imgClassDark` (`object-contain scale-*`), y purga de videos sin uso.
119. **[NUEVO] DevOps — Deploy a GitHub Pages vía GitHub Actions (17 Jul 2026):**
    - `next.config.ts` con `basePath` env-driven (`NEXT_PUBLIC_BASE_PATH`) + `trailingSlash` para el project site `/Epicare`; helper `src/lib/asset.ts` y prefijo de TODAS las rutas de assets crudas (`<img>/<video>` no las prefija Next automáticamente).
    - `.github/workflows/deploy.yml` afinado: Node 22 + pnpm 11 (alineado con el `pnpm-workspace.yaml` v10+ y evitar `node:sqlite` crash). Push a **`https://github.com/ChrisBeep98/Epicare.git`** (remote `origin`; `Epicare_insurance` preservado como `insurance`). Sitio destino: `chrisbeep98.github.io/Epicare/`.
120. **[NUEVO] Design System — Fix Crítico: Variantes Responsivas de Tokens Tipográficos (17 Jul 2026):**
    - **Bug detectado:** los tokens de texto estaban definidos como CSS plano dentro de `@layer utilities` en `globals.css`. En **Tailwind v4 los prefijos de variante (`md:`, `hover:`, `dark:`) SOLO se generan para utilities registrados con `@utility`**. Por eso `md:text-display-xl` (y análogos) **no generaba ninguna regla** y colapsaba silenciosamente al token base — p.ej. el H1 del Hero se quedaba en `text-display` (56px) en desktop en vez de subir a `text-display-xl` (96px). Verificado en el CSS compilado (solo existía `.text-display-xl`, no `.md\:text-display-xl`).
    - **Alcance:** afectaba a 4 componentes con overrides muertos: `HeroEpicare` (h1), `ProductLinesEpicare` (h2), `MetricsEpicare` (métrica), `DarkGradientSection` (h5→h4).
    - **Fix:** migrados TODOS los tokens tipográficos (`text-display-*`, `text-h1..h7`, `text-overline`, `text-subtitle`, `text-body-*`, `text-data`, `text-caption`, `text-ui-label`) de `.clase {}` plana → `@utility <nombre> {}` a nivel top-level (mismo mecanismo que `@utility grid-layout`). El uso directo (sin prefijo) queda idéntico, así que es 100% retrocompatible. Ahora `md:`/`hover:`/`dark:` funcionan para toda la escala tipográfica.
    - **Verificado con `pnpm build`:** el CSS de producción ahora emite `.md\:text-display-xl` dentro de `@media (min-width:48rem)` y en orden posterior a la base (override correcto en ≥768px).
    - ⚠️ **Pendiente latente:** los tokens de espaciado/gap/shadow/max-width siguen como CSS plano en `@layer utilities` — tienen el MISMO bug si se usan con prefijo responsivo (`md:px-gutter-md`, etc.). Migrar a `@utility` si se necesitan variantes.
121. **[NUEVO] Framework — Protocolo de Ritmo Vertical + Fix del Motor de Spacing (17 Jul 2026):**
    - **Nuevo protocolo:** `Graph-Design-Framework/command-prompts/vertical-spacing-protocol.md` (command-prompt sin frontmatter, estilo `update-design-system-protocol`). Estandariza y **mapea** el ritmo vertical entre secciones: escala de 4 niveles (`section-xs/sm/md/lg`), **Regla de Oro single-owner** (la sección superior posee el gap con `pb-section-*`, la inferior arranca en `pt-0`), baseline móvil 76px, full-bleed sin excepción de ritmo, y excepción documentada del `mt-[-100vh]` (pin GSAP Hero). Incluye el **mapa vivo** de las 7 secciones de `page.tsx`. Referencia cruzada añadida en `Tokenizer.md` §2.1.
    - **Fix del motor:** migrados `py-section-*`, `pt-section-*`, `pb-section-*` de `@layer utilities` plano → `@utility` en `globals.css` (mismo fix que #120 para tipografía). Ahora `md:py-section-lg` / `lg:pt-section-md` generan CSS. Uso bare idéntico → retrocompatible. Efecto inmediato: el `md:py-section-lg` de `DarkGradientSection` **empieza a aplicar** en desktop (pasa de ~96px a ~160px), que era el bug original que motivó el protocolo.
    - **FASE 3 aplicada (secciones de contenido):** single-owner MD en BrandsCarousel/DarkGradient/Metrics/ProductLines (`pt-0` + `pb-section-sm md:pb-section-md`), eliminando el doble margen. El peor caso era DarkGradient↔Metrics (~346px desktop → ~154px). Full-bleed (BentoGrid/PeopleReveal) se dejan pegadas a propósito (meterles gap añadiría espacio). GSAP del Hero intacto.
    - ⚠️ **Pendiente latente restante:** `px-gutter-*`, `gap-fluid-*`, `shadow-elevation-*`, `max-w-section-*` siguen planos (mismo bug si se usan con prefijo responsivo).

122. **[NUEVO] Design System — Reestructuración Tipográfica a Sistema de 3 Familias (20 Jul 2026):**
    - Migración de la fuente única `Inter` a un **sistema de 3 roles**: **Inter Display** (Inter variable con eje óptico `opsz=32`) para Display+Encabezados, **Inter Tight** para Cuerpo+UI, **JetBrains Mono** para Meta/Código.
    - **Fase 1 (motor):** `layout.tsx` carga las 3 fuentes vía `next/font/google` (`Inter({axes:['opsz']})`, `Inter_Tight`, `JetBrains_Mono`) exponiendo `--font-inter-display/-tight/-jetbrains-mono`. En `globals.css` se crearon 3 stacks semánticos (`--font-display-stack/-body-stack/-mono-stack`); el `body` ahora usa Inter Tight (aliases legacy `--font-primary/-secondary` repuntados). Se añadió `font-family` + `font-variation-settings:'opsz' 32` a los 13 tokens de display/heading; `text-data`/`text-overline`/`text-ui-label` movidos a mono; **nuevo token `text-meta`** (0.75rem mono para hex/IDs/metadata).
    - **Decisiones del usuario:** las 7 variantes `text-body-*-light` se **rebasaron de weight 200 → 300** (Inter Tight no carga 200); `text-overline` y `text-ui-label` van a **JetBrains Mono** (labels de UI en mono, por spec).
    - **Fase 2 (UI):** `TypographySection.tsx` reescrito con leyenda de las 3 familias (`FontRoleCard`) y etiquetado por rol; `TypeRow` ya no inyecta `fontFamily` inline (dejaba muerto `var(--font-inter)`), ahora la familia la aporta el `@utility`.
    - **Fase 3 (docs):** `Design-System.md` §1 reescrita como tabla de 3 roles + tokens por familia; `Tokenizer.md` §1.0 nueva (FONT-FAMILY ROLES) que prohíbe `fontFamily` inline y el peso 200.
    - **Verificado con `pnpm build` (exit 0):** el CSS emite `opsz" 32` en los 13 tokens display/heading y `--font-mono-stack` en overline/ui-label/data/meta. **Commit pendiente de autorización del usuario.**
123. **[NUEVO] Design System — Migración/Purga de Remanentes "SalentoCoffee" → Epicare (20 Jul 2026):**
    - **Colores muertos:** los tokens `salento-moss/mocha/terracotta/gold` NO existen en `globals.css` Epicare → 15 clases renderizaban transparente en `/design-system`. Migradas a marca: **moss → `brand-blue`**, **mocha → `brand-dark`**, **terracotta/gold → `brand-orange`+`brand-blue`** (glows), en `SpacingSection.tsx` (13) e `InteractiveSection.tsx` (2).
    - **Copy de café → seguros:** reescrito el sandbox de `SemanticTextColorsSection.tsx` (beans/harvest → Epicare/póliza) y el header de `page.tsx` (café artesanal → DS Epicare) y el "SalentoCoffee" de `SpacingSection`.
    - **Huérfano eliminado:** `git rm design-system/page.tsx` (página de referencia SalentoCoffee sin referencias; su contenido ya existía migrado en la versión modular Epicare de `design-system-app`). Conservados: `design-system/*.tokens.json` (export Figma Epicare), `Typography.svg`, `svg iLLUSTRATIONS/`, scripts `.py`.
    - **Directiva de marca (preferencia del usuario):** en futuras generaciones de sección, usar los 3 colores de marca (azul `#35BBFD`, naranja `#F26023` = `accent-main`, gris oscuro `#2F3437` = `brand-dark`) en acentos/detalles. `brand-dark` nunca en texto de títulos (no invierte en dark) → usar `text-primary`.
    - **Verificado con `pnpm build` (exit 0)** y grep: 0 remanentes `salento/coffee` en `src`. **Commit pendiente de autorización.**

124. **[NUEVO] Design System — Tokens de Texto-Acento de Marca (Blue + Dark) (20 Jul 2026):**
    - Creados 2 tokens de **texto de acento bimodales** vía `update-design-system-protocol` (3 fases): `--color-text-accent-blue` (`#0297E3` light / `#7DD3FC` dark) y `--color-text-accent-dark` (`#2F3437` light / `#E8ECEF` dark). Cierran la asimetría: antes solo el naranja (`accent-main`) tenía familia de texto; azul y gris oscuro no.
    - **Razón:** `brand-blue` crudo (#35BBFD) tiene bajo contraste en fondo claro, y `brand-dark` (#2F3437) es ilegible en dark (no invierte). Los nuevos tokens flipan por modo.
    - **Fase 1:** `@theme` + `:root` + `.dark` en `globals.css`. **Fase 2:** `SemanticTextColorsSection.tsx` (2 swatches nuevos "Accent Blue"/"Accent Dark" + 2 botones en el sandbox). **Fase 3:** `Design-System.md` (lista Textos) + `Tokenizer.md` §3.1 nueva (Brand Accent Text bimodal-safe).
    - **Verificado con `pnpm build` (exit 0):** el CSS emite ambos tokens en light y dark. **Commit pendiente de autorización.**

125. **[NUEVO] Framework — Protocolo Intermedio "Token-Live Mode" (20 Jul 2026):**
    - Creado `Graph-Design-Framework/command-prompts/tokenized-design-protocol.md`: punto medio entre los protocolos creativos (`master-design-prompt`, `refactor-design-prompt`, AWWWARDS/CINEMATIC) y la auditoría pesada del `Tokenizer.md`. **Preventivo** (no hardcodea al escribir) vs. correctivo (Tokenizer). Principio: creatividad en composición/narrativa/motion, medidas SIEMPRE de tokens.
    - Incluye **quick-reference embebido** (tipografía 3 familias, `px-gutter-*`, `py/pt/pb-section-*`, `gap-fluid-*`, `*-static-*`, `max-w-section-*`, `shadow-elevation-*`, `grid-layout`, color semántico + 3 marca + accent-text), regla on-write, excepciones (vw/vh/transforms/opacidades), self-audit y prompt de ejecución.
    - **Margen creativo con reporte obligatorio:** la IA puede salirse de un token si mejora el diseño, pero DEBE declararlo en un "Reporte de Margen Creativo" (elemento / valor / token cercano / por qué / ¿promover a token?). Desviación no declarada = violación; declarada = decisión válida. No amordaza la creatividad, pero el usuario siempre se entera.
    - **Cableado:** punteros añadidos en `master-design-prompt.md`, `refactor-design-prompt.md` (mantener Token-Live encendido durante creación) y en `Tokenizer.md` (prevención > corrección). Resuelve el dolor del doble-flujo creación→tokenización del usuario.

126. **[NUEVO] UX — Lenis Smooth Scroll integrado con GSAP (20 Jul 2026):**
    - `pnpm add lenis` (v1.3.25). Nuevo `src/components/SmoothScrollProvider.tsx` (client): inicializa Lenis y lo **sincroniza con `gsap.ticker`** (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `lagSmoothing(0)`), imprescindible para no romper los 6 ScrollTriggers existentes (pin del Hero, coverflow del Bento, scrubs). Respeta `prefers-reduced-motion` (no inicializa Lenis). Montado en `layout.tsx` envolviendo `I18nProviderClient`. CSS mínimo de Lenis añadido al tope de `globals.css`.
    - **Verificado `pnpm build` (exit 0).** ⚠️ **Pendiente verificación visual en navegador** (que el pin del Hero y el coverflow del Bento sigan bien con el scroll suavizado). Sin commit aún.

## 6. Próximos Pasos (To-Do)
- **Aplicar el mapa de ritmo vertical** (FASE 3 de `vertical-spacing-protocol.md`) a las 8 secciones de la landing.
- Empezar la construcción de la **Página de Inicio (Home)** integrando el motor de `HeroSequence` con los nuevos tokens de espaciado.
- Diseñar el **Header Adaptativo** usando el token `px-gutter-md` para el marco global.
- Verificar visualmente el comportamiento de los `gap-fluid` en el catálogo de productos en mobile.
- Recibir y ejecutar nuevas tareas asignadas por el lead.
