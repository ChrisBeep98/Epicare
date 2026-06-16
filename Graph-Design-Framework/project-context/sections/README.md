# 📂 Contexto por Sección — Inventario

> **Propósito:** Cada sección tiene su propia carpeta de contexto. Cuando un agente va a trabajar en una sección específica, lee SOLO el archivo de esa sección.

## 🗺️ Mapa de Secciones (Orden de Render en `page.tsx`)

| # | Sección | Carpeta | TL;DR |
|:--|:---|:---|:---|
| 0 | **Design System** | [`design-system/`](./design-system/) | UI Kit / Typography & Color Sandbox. Soporte Bimodal. |
| 1 | **Header** | [`header/`](./header/) | Sticky con Isotipo, nav, Language Toggle. Glassmorphism blur on scroll. |
| 1 | **Hero (Liquid)** | [`hero/`](./hero/) | Efecto líquido, animación de chat secuencial, CTA a Calendly. GSAP stagger. |
| 2 | **Hero Image** | [`hero-image/`](./hero-image/) | Imagen panorámica del ecosistema. Parallax sutil con ScrollTrigger. |
| 3 | **Services Bento** | [`services-bento/`](./services-bento/) | Grid bento de servicios con HoverArrowBubble interactivas. CSS Grid responsive. |
| 4 | **Wave Reveal** | [`wave-reveal/`](./wave-reveal/) | Galería con wave mask SVG scroll-driven. Imágenes desktop/mobile via fs.readdir. |
| 5 | **Integrations** | [`integrations/`](./integrations/) | Showcase de integraciones (ManyChat, Shopify, Meta). Logos orbitales GSAP. |
| 6 | **Comparison** | [`comparison/`](./comparison/) | 2 actos (Caos→Control), clipPath circle reveal scrub, 6 chips con speech bubbles. |
| 7 | **Testimonials** | [`testimonials/`](./testimonials/) | Social proof river horizontal. Auto-scroll con pause on hover. |
| 8 | **Dashboard Reveal** | [`dashboard-reveal/`](./dashboard-reveal/) | Reveal del dashboard con scroll pin y scale-up. z-20 sobre footer. |
| 9 | **Calculator** | [`calculator/`](./calculator/) | ROI en 3 pasos, 7 archivos. Tabs pill, floating character, trust bar glassmorphism. |
| 10 | **Footer** | [`footer/`](./footer/) | Curtain footer con esquinas redondeadas debajo del DashboardReveal. |
| — | **FlowSell Hero** | [`flowsell-hero/`](./flowsell-hero/) | Hero FlowSell con GSAP timeline y video background cinematic sync. 🚧 En desarrollo. |

## 📄 Formato de Archivo por Sección

Cada carpeta contiene un `context.md` con:
- **TL;DR** (3 líneas) — Resumen ejecutivo para lectura rápida
- **Componentes** — Archivos .tsx/.ts involucrados
- **Estado Actual** — Estado visual y funcional
- **Historial de Cambios** — Entradas cronológicas
- **Decisiones de Diseño** — Por qué se eligió X sobre Y
- **Bugs Conocidos / Pendientes**

## 🔄 Protocolo de Uso

1. **Al hacer onboarding:** Lee ESTE archivo para ver el panorama general de todas las secciones.
2. **Al trabajar en una sección:** Lee `sections/[nombre]/context.md` para el contexto profundo.
3. **Al terminar un hito:** Actualiza el `context.md` de esa sección con la nueva entrada.
