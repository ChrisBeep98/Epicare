# Hero (Liquid)
> Última actualización: 5 de Abril, 2026

> **TL;DR:** Hero inmersivo con secuencia de video controlada por el scroll (180 frames). Incluye un motor de diseño basado en zonas (Multi-Zone Grid Builder) y múltiples actos cinemáticos con efectos de Liquid Glass profesional.

## Componentes
- `src/components/sections/HeroSequence.tsx` — Componente maestro de la secuencia cinematográfica.
- `src/components/landing-v2/hero/HeroChatAnimation.tsx` — Animación de chat bubbles (V1).

## Estado Actual
- **Fase 1 (Live Testing):** Completada. El componente es funcional con carga de frames, canvas dinámico y animaciones de scroll cinemáticas.
- **Actos Implementados:** 
  - Acto 1: Revelado de título masivo (`text-display-xl`) en esquina inferior izquierda.
  - Acto 2: Panel **Liquid Glass** con desenfoque indestructible, headline elegante y carrusel infinito de marcas.
- **Interacción:** Soporte para Parallax de mouse y ScrollTrigger coordinado.
- **Herramientas:** Debug Panel Architect v4.0 inyectado con soporte para **Multi-Zone Grid Builder** (Webflow-like drag & drop).

## Historial de Cambios
- **5 de Abril, 2026 (Turno Actual):** 
  - Implementación de `HeroSequence.tsx` con motor de Canvas (180 frames WebP).
  - Creación de la coreografía **Cinematic Motion**: Acto 1 escala y se desenfoca al salir; Acto 2 entra con efecto de "Cortina Líquida" (`clip-path`).
  - Resolución del bug crítico de `backdrop-blur`: Se aisló el renderizado del cristal de las opacidades del contenedor padre para evitar que el navegador apague el filtro.
  - Evolución del builder: De posicionamiento absoluto a **Multi-Zone CSS Grid Builder** de 12 columnas.

## Decisiones de Diseño
- **Animación por Atributos vs Opacity:** Se decidió animar el `backgroundColor` alpha y el radio de `blur` directamente sobre el elemento del DOM (`act2GlassRef`) para mantener el `backdrop-filter` activo 100% del tiempo.
- **Cinematic Inertia:** Se estableció un `scrub: 1.5` para dar peso y elegancia al scroll de la secuencia.
- **Zonas Responsivas:** Se optó por una estructura de 4 zonas (Top, Mid-Left, Mid-Right, Bot) para permitir flexibilidad de diseño sin romper el paralelismo del grid.

## Bugs Conocidos / Pendientes
- **Pendiente:** Fase 2 (Consolidación de layout elegido) y Fase 3 (Purge total de @hello-pangea/dnd y estados `__dbg`).
