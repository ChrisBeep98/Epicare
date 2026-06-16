# Archivo Histórico de Acciones Críticas — Fases 1-7
> **Período:** Febrero 2026 – 16 Marzo 2026
> **Estado:** Archivado (Completado)
> **Contexto Activo:** Ver [`context.md`](./context.md)

---

## Entradas Archivadas (#1 - #38)

1. **Configuración Inicial:** Conexión Git (`flowtifyai/salento-coffee-experience`), limpieza profunda de dependencias y paso estricto a `pnpm`. Integración de GSAP y Lenis.
2. **Setup de Entorno Next.js:** Inyección de credenciales Supabase dummy y bypass de middleware público para evitar crasheos de sesión 500 en desarrollo. Corrección de meta-datos viewport en `layout.tsx`.
3. **Migración Core V2:** Traslado de Hero, Navbar, y carruseles a `page.tsx`. Modularización exitosa de CSS del Landing para evitar contaminar `globals.css`.
4. **Implementación de Section "Wave Reveal":** Desarrollo de la animación de transición de onda de color anclada por GSAP (`WaveRevealSection.tsx`). Corrección extensa de problemas de colapso de layout y Z-index (-mt-[100vh] bugfix).
5. **Implementación "Comparison Section" (Act 1 & 2):** 
   - Creación de `ComparisonSection.tsx` visualizando el "Antes" (Caos) y el "Después" (Control Total) de SalentoCoffee.
   - **Act 1 (Caos):** Implementación de "Chips Flotantes" asíncronos (`liquid-glass`), con iconos semánticos rojos (`text-red-500`) y animaciones independientes `onEnter` (GSAP).
   - **Act 2 (Control):** Revelado progresivo impulsado por ScrollTrigger (Scrub) usando un `clip-path` expansivo (`circle()`), totalmente compatible con el diseño sin romper el pinning de `WaveRevealSection`.
6. **Sistema Tipográfico Profesional (12 Tokens):**
   - Implementación de escala tipográfica de 12 tokens basada en Apple HIG, Material Design 3 y escala modular Major Third (1.25×).
   - 5 niveles de heading (Display, H-Section, H-Card, H-Subtitle, H-Small) con Playfair Display + 7 tokens auxiliares (Overline, Subtitle, Body, Body-SM, UI-Label, Num-Data, Caption) con Inter.
   - Clases CSS en `globals.css` con font-family, weight, line-height, tracking y wrap rules predefinidos.
   - Documentación actualizada en `Design-System.md` y `Tokenizer.md`.
7. **Integración de Inter Font:**
   - Añadida fuente Inter vía Fontshare CDN en `layout.tsx` (preconnect + stylesheet).
   - Reemplazada referencia fantasma a GT Walsheim Pro en `--font-sans`.
8. **Tokenización del Hero y Header:**
   - `LiquidHero.tsx` migrado a tokens tipográficos (.text-display, .text-subtitle, .text-caption).
   - `Header.tsx` migrado a tokens (.text-h3, .text-caption).
9. **Header Adaptive Pill System:**
   - IntersectionObserver detecta secciones con `data-header-pill` y cambia logo/texto/botones entre modo dark y light.
   - `IsotipoSalentoCoffee.tsx` acepta prop `color` para flat color con transición SVG fill.
   - Documentación en `context-Docs/WorkFlow-Docs/Section-Requests/header-adaptive-pill.md`.
10. **Language Switch — Migración i18n del Landing V2:**
    - Toggle de idioma EN/ES añadido al Header V2 reutilizando la infraestructura `next-intl` existente.
    - Namespace `landingV2` creado en ambos `messages/en.json` y `messages/es.json` (38 keys: header, hero, chat).
    - `Header.tsx`, `LiquidHero.tsx` y `HeroChatAnimation.tsx` migrados de texto hardcoded a `useTranslations()`.
    - Migración quirúrgica: no se modificaron namespaces existentes, configuración i18n, ni otros componentes.
    - Documentación en `context-Docs/WorkFlow-Docs/Section-Requests/language-switch-landing-v2.md`.
11. **Fix Header Login + Mobile Video Hero:**
    - Botón Login del Header cambiado de `#contact` a `/auth`.
    - Hero ahora usa dos `<video>` separados: `/Hero-Video_02.mp4` (desktop, `hidden md:block`) y `/Hero-Video_02-Mobile.mp4` (mobile, `md:hidden`).
12. **Integration Marquee Carousel (Brand Strip):**
    - Carrusel horizontal infinito de integraciones debajo de la sección IntegrationsEcosystem.
    - Iconos SVG inline para cada integración (Instagram DM, WhatsApp, Stripe, etc.).
    - Animación scroll-driven via GSAP ScrollTrigger (`scrub: 1`), no CSS-only.
    - Edge fades con gradient para efecto limpio. Items duplicados 4x para loop seamless.
    - CSS marquee keyframes añadidos a `landing.css`.
13. **Language Toggle Visible en Mobile:**
    - Switch EN/ES (`LanguageToggle`) ahora visible en mobile al lado del hamburger menu.
    - Gap de acciones del header reducido de `gap-4` a `gap-2`.
14. **Dashboard Reveal Section:**
    - Nueva sección `DashboardReveal.tsx` con fondo claro (`bg-ghost-gray`), overline, heading, subtitle (i18n) y mockup del dashboard (`/Dashboard-UI-Mockup/Dashboard-Mac-01.png`).
    - Animaciones GSAP: texto fade-in, imagen scale-up + parallax scrub.
    - `rounded-b-[40px] md:rounded-b-[60px]` + `z-20` + `shadow` para efecto "cortina" que revela el footer.
15. **Curtain Footer con Gradiente Animado:**
    - `Footer.tsx` implementa efecto de revelación por cortina usando `clip-path: polygon()` + `position: fixed` + `ResizeObserver` para altura dinámica.
    - Fondo con clase `.footer-animated-bg`: gradiente `-45deg` con todos los colores de marca (#A40EBB, #6607DE, #007AFF, #5AC8FA) sobre off-black.
    - Animación `premium-gradient-scroll` de 24s `ease-in-out infinite alternate`.
    - CTA prominente, columnas de navegación, iconos sociales (Lucide), tipografía gigante "FLOWTIFY" con hover opacity.
    - Footer superpuesto con `-mt-16` para que el gradiente asome por las esquinas redondeadas del Dashboard.
    - i18n completo (footer namespace en `en.json` y `es.json`).
16. **Mobile Bento Card Stacking Effect (GSAP ScrollTrigger):**
    - Cards en `ServicesBento.tsx` usan `position: sticky` + GSAP `gsap.timeline` con `scrub: 0.2`.
    - Efecto: al scrollear, cada card se queda pegada y la siguiente sube por encima. La card cubierta escala a `0.95` + `y: -10`.
    - `gsap.matchMedia()` asegura que el efecto solo corre en mobile (`max-width: 767px`).
    - Entrada animada para todas las cards (slide-up 80px + fade-in al entrar viewport).
    - `overflow-hidden` cambiado a `overflow-x-clip` en la section para no romper sticky.
    - Layout mobile: `flex-col gap-6 px-1`, z-index incremental (12→13→14).
17. **Smart Sticky Header (Mobile Only):**
    - `Header.tsx` implementa comportamiento show/hide basado en dirección de scroll.
    - Scroll down (delta > 8px): header se oculta con `translateY(-120%)`.
    - Scroll up (delta < -4px): header aparece inmediatamente.
    - Primeros 100px: siempre visible. Desktop (≥768px): siempre visible.
    - Transición: `0.35s cubic-bezier(0.4, 0, 0.2, 1)`.
18. **Refactor de Copy — Bento Cards (FlowDesk, FlowSell, Discovery):**
    - FlowDesk subtitle: de técnico "qualifies/autopilot" a emocional "Tu asistente que nunca descansa...".
    - FlowDesk niches expandidos: +Salones de Belleza, Multiservicios, Consultorías (ES) / +Beauty Salons, Tax & Multi-Services, Consulting (EN).
    - FlowSell subtitle: de genérico a "Tu vendedor que nunca duerme...".
    - Discovery subtitle: de técnico "cloud systems/AI flows" a simple "herramientas a tu medida...".
    - Spacing reducido en FlowSell y Discovery: `mb-8` → `mb-2`, eliminado `min-h-[200px]`.
19. **Hero — Gradient Title Expandido:**
    - La línea completa "Contrata a Flow." / "Meet Flow." ahora tiene el gradiente animado (antes solo "Flow.").
    - Gradiente: `from-[#8AD4FC] via-[#4DA3FF] to-[#9D5CED]` con `animate-gradient-flow`.
20. **Hero — Background Image (Desktop):**
    - Video de desktop reemplazado por imagen estática JPEG (`Editorial_advertising_photograph...jpeg`).
    - `<video>` cambiado a `<img>` con mismas clases de posicionamiento (`object-cover`, centering).
21. **ComparisonSection — Refactor Wave Reveal a Scrub clipPath:**
    - Reescritura completa del timeline de animación. Se probó standalone (no-scrub) pero no funcionó visualmente; se revirtió a scrub-based.
    - Timeline limpio: SVG displacement (desktop) → chip exit → clipPath circle reveal → Act 2 content fade → Act 2 chips.
    - `clipPath: circle()` desde `50% 100%` (bottom) en ambas plataformas.
    - `scrub: 1` (mobile) / `scrub: 1.5` (desktop). `will-change: clip-path` en overlay.
    - Act 1 chips: entrada via `IntersectionObserver` (no en timeline), floating via GSAP `yoyo` (desktop only).
22. **ComparisonSection — Viñetado mask-image en Imágenes:**
    - Ambas imágenes (Act 1: `left-hand.webp`, Act 2: `act2-main.webp`) usan `mask-image: radial-gradient(circle at center, black 40%, transparent 75%)` inline con `WebkitMaskImage`.
    - Eliminadas transiciones hover y `transition-transform` de los contenedores de imagen.
    - Se probó overlay div como alternativa GPU-friendly pero resultó visualmente inferior; se mantuvo mask-image estático (no causa lag ya que no se anima).
23. **ComparisonSection — Speech Bubble Tails en Chips:**
    - Las 6 chips flotantes (3 Act 1 rojas + 3 Act 2 verdes) tienen pestañas triangulares tipo speech bubble.
    - Implementado con CSS border trick (`borderLeft/Right transparent + borderTop solid`).
    - Centradas horizontalmente (`left-1/2 -translate-x-1/2`), rectas (sin rotación).
    - Chips superiores: cola apunta ▼ abajo. Chips inferiores: cola apunta ▲ arriba.
24. **ComparisonSection — Limpieza de Ripple Rings + Scroll Arrow:**
    - Eliminados los 3 divs de ripple rings concéntricos y su animación GSAP (refs `ripple1/2/3Ref`).
    - Solo se mantiene el SVG displacement filter en desktop.
    - Botón CTA de Act 1 reemplazado por flecha animada doble chevron (`animate-bounce`, `white/40` + `white/20`).
    - Chips en mobile empujadas a los bordes: chip3 (Venta Perdida) a `-right-[5%]`, chip1/2 separadas arriba/abajo (`top-[3%]`/`bottom-[3%]`).
25. **Entrega del Landing & Merge de Cambios del Lead (9 Mar 2026):**
    - Landing entregado y mergeado a `main` del repo del equipo.
    - Pull de `origin/main` integrado a `feature/redesign-landing` con los siguientes ajustes del lead:
    - **CTAs redirigidos:** Botones de `/auth` cambiados a enlaces externos (`target="_blank"`):
      - Hero CTA primario → `https://forms.flowtifyai.com/`
      - Hero CTA secundario + Footer CTA + ComparisonSection Act 2 CTA → `https://calendly.com/flowtifyai/meeting-1-1`
    - **Hero:** Modal de chat desactivado (`onClick` comentado), CTAs ahora usan componente `Link` de Next.js.
    - **ServicesBento:** Los 3 botones `HoverArrowBubble` ("Learn more", "Ver más", "Start Discovery") comentados/ocultos.
    - **Header:** Items de navegación ("Product" con mega-menu de cards) comentados/ocultos.
    - **ComparisonSection:** Removido `pointer-events-none` del contenedor Act 2.
    - **i18n:** Título de sección "Clients" simplificado de "Client Management"/"Gestión de Clientes" a "Clients"/"Clientes" en ambos idiomas.
26. **ROI Calculator — Implementación e Integración (10 Mar 2026):**
    - Calculadora interactiva de ROI en 3 pasos integrada en `page.tsx` entre `ComparisonSection` y `DashboardReveal`.
    - **Paso 1:** Selector de tipo de negocio (4 presets + custom) + 4 sliders interactivos (mensajes/día, tiempo de respuesta, valor cliente, horas manuales).
    - **Paso 2:** Visualización del "dolor" — 4 cards con métricas de pérdida animadas + bloque resumen rojo con total mensual/anual.
    - **Paso 3:** Recuperación con Flow — 4 cards con ganancias proyectadas + resumen de ROI + CTA a Calendly.
    - Modelo matemático documentado en `context-Docs/calculator-logic.md`.
    - i18n completo: namespace `landingV2.calculator` en `en.json` y `es.json` (~173 keys).
    - GSAP ScrollTrigger para animación de entrada.
27. **Calculator — Refactor de Arquitectura Profesional (10 Mar 2026):**
    - Monolito de 562 líneas dividido en 7 archivos modulares dentro de `calculator/`:
      - `types.ts`: Interfaces TypeScript compartidas (`SliderProps`, `CardProps`, `BigStatProps`, `AnimNumProps`, `BizTypeConfig`, `CalculatorInputs`, `PainMetrics`, `FlowMetrics`, `OutputMetrics`).
      - `useCalculator.ts`: Custom hook con `useMemo` — toda la lógica matemática y estado. JSDoc en cada fórmula.
      - `AnimNum.tsx`: Números animados con `requestAnimationFrame` + cubic ease-out + `cancelAnimationFrame` cleanup.
      - `CalcSlider.tsx`: Slider con tokens del Design System (`text-ui-label`, `text-caption`, `text-h5`) + `aria-label`.
      - `CalcCard.tsx`: Card con `text-overline` token.
      - `BigStat.tsx`: Stat display con `text-h3` + `text-overline` tokens.
      - `HomeCalculator.tsx`: Orquestador limpio (~330 líneas, solo JSX).
    - **Tokenización completa:** Eliminadas todas las instancias de `text-[Xpx]` → tokens del Design System (`text-overline`, `text-caption`, `text-body-sm`, `text-body`, `text-h5`, `text-h3`, `text-h1` etc.).
    - **Colores semánticos:** `slate-*`, `red-*`, `green-*`, `blue-*` → variables mapeadas semánticamente (`text-foreground`, `text-muted`, `salento-terracotta`, `salento-moss`, `bg-background`, `border-border`, `bg-secondary`).
    - Build verificado: ✓ Compilado en 10.5s, ✓ 45/45 páginas generadas.
28. **Testimonials Ticker Strip — Reimplementación completa (13 Mar 2026):**
    - Rediseño completo de la sección Testimonials: de mosaico/grid a ticker horizontal auto-scroll tipo ManyChat.
    - `TestimonialsCarousel.tsx` reescrito: strip compacto de una fila con avatares circulares (ring gradient de color), nombre, followers, source (FLOWTIFY/MANYCHAT), quote completo, y "Learn more →".
    - **Avatares reales:** JB Business (`/testimonials/Alaska.webp`), LatinVibes (`/testimonials/LatinVibes.webp`). ManyChat creators usan `ui-avatars.com` API (sin peso local).
    - **Trust Messages con emojis:** 4 frases motivacionales (🌎, 🚀, 💜, ⚡) intercaladas cada 2 testimonials. Versiones cortas en mobile (`TRUST_MESSAGES_SHORT`).
    - Animación CSS-only: keyframes `ticker-scroll` en `landing.css`, 120s linear infinite, pause on hover.
    - Source label con `group-hover:text-off-black/60` para efecto hover.
    - Quotes con `max-w-[220px] md:max-w-[380px]` para salto de línea en vez de una línea infinita.
    - i18n: namespace `landingV2.testimonials` con overline, title, learnMore.
29. **Unificación de Fondo DashboardReveal + Testimonials (13 Mar 2026):**
    - Ambas secciones ahora usan `bg-[#F5F3FA]` (off-white lavender sutil) en vez de `bg-ghost-gray` (#FFFFFF).
    - Eliminado el radial gradient overlay violeta de `DashboardReveal.tsx` para que ambas secciones se vean como una superficie continua.
30. **Calculator — Mobile Responsive Overhaul (13 Mar 2026):**
    - **Tabs mobile:** Nuevo componente pill-tabs (no sticky) separado del stepper desktop. 3 botones en fila con colores diferenciados por estado.
    - **Biz type cards:** Altura ajustada `h-[260px] md:h-[380px]`, skeleton animations y descripción condicional por breakpoint.
    - **Step 1 form:** Full-bleed en mobile (`w-[calc(100%+28px)] -ml-[14px]`), padding reducido (`p-[14px] md:p-8`).
    - **Forecast block:** Layout flex-row wrap con gaps reducidos (`gap-4 md:gap-10`), separadores hidden en mobile.
    - **Scroll offsets:** Step buttons ahora scrollean 40px más arriba (`-272` en vez de `-232`).
    - **Tabs labels:** `mobileLabel` field para texto más corto en mobile.
31. **Calculator — Mobile CTA Buttons + Floating Character (13 Mar 2026):**
    - **Botones full-width en mobile:** Los 3 CTAs de los pasos 1/2/3 ahora usan `w-full md:w-auto justify-center` para ocupar todo el ancho en mobile.
    - **Floating character mobile:** Personaje "Feliz" + burbuja de mensaje se ocultan inline en mobile (`hidden md:flex`) y se renderizan como elemento `fixed bottom-4 right-3` que aparece/desaparece según visibilidad de la sección via `IntersectionObserver` (`sectionInView` state).
    - Burbuja roja (step 2) / verde (step 3) con texto del intro, `translateY(-30px)` para subir la burbuja respecto al icono.
    - **Animación wiggle:** `animate-bounce` reemplazado por keyframe CSS custom `calc-wiggle` — shake horizontal sutil (±2px, ±1° rotación) cada 4s. Definido en `globals.css`.
32. **Calculator — Steps 2/3 Mobile Spacing Unification (13 Mar 2026):**
    - `marginTop` de steps 2 y 3 cambiado de inline `38px` a responsive `mt-0 md:mt-[38px]` para igualar step 1 en mobile.
    - `paddingTop` de glass cards en steps 2 y 3 cambiado de inline `42px` a responsive `pt-[14px] md:pt-[42px]` para igualar step 1 en mobile.
33. **Calculator — Trust Bar Redesign (13 Mar 2026):**
    - Trust bar rediseñado de pill horizontal a diseño premium responsive:
      - **Desktop:** Fila horizontal glassmorphism (`bg-white/60 backdrop-blur-xl rounded-2xl border-white/40`) con separadores verticales sutiles (`w-px h-8 bg-black/8`).
      - **Mobile:** Grid 2×2 con tarjetas glassmorphism individuales (`bg-white/50 backdrop-blur-lg rounded-xl`), texto compacto `11px`.
    - Items renderizados via `.map()` en vez de markup duplicado.
34. **Calculator — Section Bottom Spacing + BG Tester Expansion (13 Mar 2026):**
    - Eliminado `minHeight` del ResizeObserver en la section para evitar gap blanco de ~80px al fondo.
    - Padding bottom reducido a `pb-0 md:pb-4`, trust bar `mb-0`.
    - BG container en `CalcWaves.tsx` cambiado de `inset-x-0 top-0 h-full` a `inset-0` para cobertura completa.
    - `rounded-b-[40px]` restaurado en la section.
    - **BG Tester expandido:** `BG_OPTIONS` actualizado de 5 a 13 imágenes (4 Shards, 3 Neon Wave, Glass Tube, Prism, Aurora, Mist Halos, Wave Pattern, Extra).
35. **ComparisonSection — UI Polish & Responsive Refactor (13 Mar 2026):**
    - **Imágenes Unificadas:** Eliminado el uso de imágenes separadas por idioma (`left-hand.webp`, `act2-main.webp` borradas). Ahora usa las versiones en inglés (`act2-main-eng.webp`, `left-hand-ENG.webp`) globalmente para simplificar assets.
    - **Debug Panel Architect:** Creación de un panel temporal `ComparisonDebug.tsx` (*zero-trace*) para probar escalas dinámicas y posicionamiento de los 6 chips flotantes (X/Y) tanto para desktop como mobile simultáneamente.
    - **Ajustes Exactos Aplicados (Phase 2):**
      - Act 1 (Caos) scale: `1.13` (mobile) / `1.27` (desktop).
      - Act 2 (Control) scale: `1.17` (mobile) / `1.21` (desktop).
      - Chips de ambos actos ahora usan valores absolutos precisos `%` en `top`/`bottom`/`left`/`right`, diferenciados por breakpoint.
    - **Fix Animación Chips:** `IntersectionObserver` descartado por conflictos (race condition). Los chips de Act 1 ahora forman parte formal del GSAP ScrollTrigger timeline (fade-in inicial, fade-out coordinado con el scrub).
    - **Tablet Bugfix:** Heading `lg:text-7xl` ahora escala a `md:text-5xl` con `whitespace-normal` para evitar overflows. Padding reducido dramáticamente en tablet (`md:pt-32`).
    - Debug panel destruido exitosamente (*Phase 3 zero-trace purge*) tras aplicar valores a Tailwind. (Commit: `c744beb`).
36. **Calculator BG Tester — Object Position Controls (13 Mar 2026):**
    - Ampliados los controles del panel de debug `CalcWaves.tsx` añadiendo sliders para **Pos X** (0-100%) y **Pos Y** (0-100%).
    - Estos sliders controlan dinámicamente el CSS `object-position` de la imagen de fondo (`object-fit: cover`), permitiendo "panear" (mover encuadre) la imagen cuando tiene zoom aplicado.
    - El formato del copy-clipboard incluye `objectPositionX` y `objectPositionY` para consolidar futuros valores.
37. **UI Polish — Header Login & Bento Cards (16 Mar 2026):**
    - **Header Login Button:** Revertido el experimento de efecto hover cruzado (texto/icono a gradiente) que rompía la legibilidad en el modo Light. Restaurado el texto dinámico nativo (`text-white/50` / `text-[#1D1D1F]/50`) manteniendo únicamente el borde brillante en hover. Se actualizó el key de traducción a `login`.
    - **Bento Cards (ServicesBento.tsx):** 
      - **Restauración:** Se descomentaron y restauraron los botones flotantes `HoverArrowBubble` al fondo a la derecha de cada tarjeta (FlowDesk, FlowSell, Discovery).
      - **Routing & Labels:** Se implementó `next/link` en cada botón dirigiendo a `/flowdesk`, `/flowsell` y `/discovery` con su respectivo copy ("Learn more →", "Build yours →").
      - **Mobile Layout Polish (Debug Panel Architect):** Se creó e inyectó temporalmente un panel de control avanzado para ajustar dinámicamente parámetros del `HoverArrowBubble` (Altura desk/mob, Font-weight, Icon size, Text shadow) y las Layouts de las tarjetas en Mobile (Altura total del contenedor, Escala de imagen).
      - **Tokenización (Phase 2 & 3):** Los valores perfectos elegidos por el lead (e.g. `c1Height: 648`, `c1Scale: 100`, `bWeight: font-normal`) fueron hardcodeados como clases utilitarias CSS/Tailwind en línea, y todo el código del Debug Panel fue purgado (Zero-Trace Cleanup).
38. **CI/CD & Git Merge Resolution (16 Mar 2026):**
    - **Merge Conflict en Header.tsx:** Resuelto exitosamente un conflicto de merge durante el intento de integración de los cambios de `main` (que contenían ramas agresivas de `admin` y `automations`) hacia `feature/redesign-landing`. Se utilizó la estrategia `ort` vía CLI local.
    - **Sincronización de Remotes (origin vs myfork):** Se detectó y corrigió una disparidad crítica donde los commits se estaban empujando a `origin/feature/redesign-landing` (repo corporativo) en lugar del fork personal del desarrollador (`myfork/feature/redesign-landing`), bloqueando los despliegues automáticos en Vercel. 
    - **Despliegue Vercel:** Branch pusheada correctamente al fork y PR mergeado en GitHub (`Pull Request #2`), logrando compilar exitosamente en el entorno de Producción de Vercel.
