# Contexto de Sección: People Reveal (PeopleRevealEpicare)

## 1. Estado Actual
- **Componente:** `PeopleRevealEpicare.tsx`
- **Ubicación:** `design-system-app/src/components/epicare/` — en `app/page.tsx` **entre BentoGrid y Product Lines**.
- **Estado:** ✅ Completado (con foto **placeholder** de Unsplash — pendiente reemplazar por la foto real de personas).
- **Descripción:** Banda full-bleed edge-to-edge con una foto de personas y una sola frase. i18n en `landingV2.peopleReveal` (statement, imageAlt). Copy actual: "Gente real…" NO — copy final: **"Expertos de tu lado" / "Experts on your side"** (corto, de servicio, sin sentimentalismo, no choca con "Todo el portafolio" de la sección siguiente).

## 2. Historial de Cambios
- **17 Jul 2026:**
  - Creación tras iterar el efecto (se descartaron: expanding frame Revolut, parallax simple, drawn-frame SVG, tunnel tipográfico). Concepto final aprobado: **"Kinetic Marquee + reveal de bloques"**.
  - **Reveal de imagen:** franjas verticales interlocking (alternan origen top/bottom, desde el centro) que **colapsan Y se desvanecen** (`scaleY:0 + opacity:0`) ligadas al scroll (`scrub: 3.5`, ventana `+=85%`, ease `CustomEase cubic-bezier(0.65,0.05,0.36,1)`) → suave, sin saltos en scroll rápido.
  - **Marquee cinético** de la frase (con separador ✦ azul) **encima** de la foto, en `mix-blend-difference`, anclado **abajo** (`bottom-6/10`), movimiento **ligado al scroll** (`scrub` sutil, `xPercent -12`) + `skewX` leve por velocidad de scroll.
  - Registrado `CustomEase` (plugin GSAP disponible en el paquete).

## 3. Decisiones de Diseño
- **Marquee scrub (no auto-loop):** el desplazamiento va ligado al scroll y es muy sutil, a pedido — se siente controlado, no una cinta genérica.
- **`mix-blend-difference` en el texto:** garantiza legibilidad del marquee sobre cualquier zona (clara/oscura) de la foto.
- **Ease lineal/bezier + scrub alto + ventana larga:** clave para que el reveal de bloques NO salte en scroll brusco.

## 4. Bugs Conocidos / Pendientes
- **Foto placeholder** (`PLACEHOLDER_IMG` de Unsplash) — reemplazar por la foto real de personas cuando esté lista (una sola constante).
- El nombre de archivo del video hermano `Card 2_Support_light.mp4` tiene un espacio (funciona, pero conviene renombrar sin espacio) — ajeno a esta sección.

> **Última Actualización:** 17 Julio 2026
