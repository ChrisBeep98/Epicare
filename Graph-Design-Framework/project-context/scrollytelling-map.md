# 🗺️ SCROLLYTELLING MAP — Epicare Landing (mapa canónico)

**Qué es:** el mapa de la coreografía de scroll de TODA la página, sección por sección. **Toda IA que cree o rediseñe una sección DEBE leer esto primero** para continuar la narrativa (no repetir efectos vecinos, respetar transiciones, usar técnicas aún libres).

**Mantenimiento:** al cambiar la coreografía de cualquier sección, actualiza su entrada aquí. Censo base: 2026-07-22.

**Motor global:** Lenis vía `SmoothScrollProvider` (`duration: 1.1`, easeOutExpo, sincronizado con ticker GSAP, respeta reduced-motion). **NUNCA re-inicializar Lenis en componentes.**

**Orden de render** (`src/app/page.tsx`):
`Loader → Hero → BrandsCarousel → DarkGradient → Metrics → BentoGrid → PeopleReveal → ProductLines → ForWho → WhyEpicare`

---

## Secuencia narrativa y técnica

| # | Sección | Rol | Técnica-firma | Pin | Transición entrada |
|:--|:--|:--|:--|:--|:--|
| 0 | **Loader** | Cortina de marca | Cascada logo con blur reveal (`power4.out`, stagger 0.045) | — | Desmontaje al terminar; dispara `epicareLoaderComplete` |
| 1 | **Hero** | Apertura cinemática | **Pin theater 3 actos** (`end:+=250%`, scrub 1): video expande a fullscreen → titular revela → acto vacío para el solape. Mouse-tilt 3D ±3°. Controla el header (umbrales 0.35/0.95) | ✅ | — |
| 2 | **BrandsCarousel** | Prueba social | Marquee infinito (45s desktop / 2 filas opuestas móvil) + parallax x (`-8vw`, scrub 2). Hover: `timeScale 0.2` | — | **SOLAPE `mt-[-100vh]`** — se desliza SOBRE el Hero pineado |
| 3 | **DarkGradient** | Primer bloque de valor (4 features + video) | "Premium 3D Blur Reveal": `y:60, rotationX:15, blur(8px)`, stagger 0.08, `power3.out`. Carrusel horizontal nativo con dots | — | `pt-0` corte suave |
| 4 | **Metrics** | Números (count-up 2.5s `power4.out`) | Bento blur reveal (`blur(20px)`, stagger 0.15) + offset escalonado CSS | — | `pt-0` |
| 5 | **BentoGrid** | Ecosistema productos | **Cover-flow 3D pineado** (scrub 1.2): horizontal desktop / rolodex vertical móvil. Física por card: `rotateY ±50°, z -500, scale/opacity` por distancia al centro. Barra de progreso | ✅ | Corte por pin |
| 6 | **PeopleReveal** | Momento humano full-bleed | **Slat reveal** 9 lamas (CustomEase `proReveal`, stagger 0.07 from center, scrub 3) + parallax foto (scrub 2) + marquee scrubbed (`xPercent -12`, scrub 3) + **velocity skew** (±3.5°) | — | Flujo normal |
| 7 | **ProductLines** | Índice editorial 3 líneas | Sticky CSS del marcador gigante + **light-up de lectura** (`opacity 0.18→1`, scrub true) + tracking de categoría activa | sticky | Flujo normal |
| 8 | **ForWho** | Bifurcación audiencia (Agent azul / Agency naranja) | **Text-birth** (`yPercent 118, power4.out, stagger 0.12`) + **cortina clip-path** por panel + numerales parallax (`yPercent ±20`) + hover `grow-[1.9]` | — | `pt-0` · 🟡 sección NO aprobada aún |
| 9 | **WhyEpicare** | Cierre manifiesto | Aparato tipográfico: text-birth con `rotateZ:2`, líneas 1px `scaleX 0→1` (`power4.inOut`), filas con hover editorial | — | ⚠️ light-only + serif + púrpura `#A40EBB` — **rompe el sistema** (en rediseño) |

---

## La firma actual (patrones repetidos — YA tokenizados en `src/lib/motion.ts`)

- **Entrada estándar:** `fromTo opacity+y(24–60)+blur(6–20)` con `power3.out`; dramático = `power4.out`.
- **UI/hover:** `cubic-bezier(0.22,1,0.36,1)` con 450–700ms — universal en CTAs.
- **Staggers:** 0.15 bloques / 0.08 líneas / 0.04 pills.
- **Scrubs:** 1 pins · 2 parallax · 3 pesado. `ease:"none"` en todo lo scrubbed.
- **Text-birth:** máscara `overflow-hidden` + `yPercent ~120 → 0`.
- **Higiene:** `gsap.context()` + `ctx.revert()`; `matchMedia`/`ignoreMobileResize` en pins.

## Deudas conocidas (al tocar una sección, arreglar de paso)

1. Reduced-motion NO implementado en Hero, DarkGradient, Metrics, BentoGrid (sí en las demás).
2. `start` de reveals dispersos (98%/85%/78%/75%) → migrar a `TRIGGER.standard/late` de `motion.ts`.
3. Blur/`y`/duraciones inconsistentes → migrar a tokens `REVEAL.*`/`DUR.*`.
4. WhyEpicare light-only + `#A40EBB` + serif = fuera del sistema (rediseño pendiente).
5. PeopleReveal usa foto placeholder de Unsplash.
6. Count-up no anima valores tipo "24/7" (regex solo captura el primer número).
7. El lenguaje de solape (`mt-[-100vh]`) solo existe en Hero→Brands; el resto son cortes — oportunidad de homogeneizar transiciones.

## Territorio virgen (técnicas del repertorio AÚN NO usadas — úsalas para diferenciarte SIN repetir a los vecinos)

- **Pin narrativo multi-acto** fuera del Hero (scrollytelling por capítulos, SEA §4)
- **FLIP** (transiciones de layout reales, SEA §6)
- **Stacking cards** (SEA §2)
- **SplitText real** por palabra/carácter (hoy solo líneas enteras)
- **Snap** a fases en pins (`snap` de ScrollTrigger)
- **Parallax multi-capa** (3+ planos; hoy máx. 1 capa por sección)
- **Fondo interpolado por scroll** (light→dark con scrub, no por clase)
- **ScrollTrigger.batch** · **DrawSVG/MotionPath** · scroll horizontal editorial (no cover-flow)

**Regla de setlist:** ninguna sección repite la técnica-firma de su vecina inmediata. Antes de elegir efecto, mira la columna "Técnica-firma" de las secciones N-1 y N+1.
