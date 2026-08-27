# Contexto de la Sección: GO AMS Landing

> **Última Actualización:** 25 de Agosto, 2026

## 1. Estado Actual
La página de aterrizaje (landing page) de GO AMS está en una etapa avanzada de estabilización y pulido. Se han implementado múltiples subsecciones (`AgentAgencySection`, `PlatformRevealSection`, `CtaFinalSection`, etc.) y se han eliminado vestigios de la marca naranja para forzar el uso del color oficial de la marca: Brand Blue (`#35BBFD`).
La página ahora es completamente funcional en despliegues estáticos (Static Exports) y **posee un rendimiento táctil perfecto en móviles** tras la resolución de fricciones entre físicas CSS (`scroll-snap`) y librerías de animación JS (`GSAP`), estandarizado en el protocolo de la sección.

## 2. Historial de Cambios

- **26 Ago 2026:** Refactorización masiva de responsividad móvil (Zero-Friction Mobile). 1) Resolución del "frenón" de scroll táctil en `HowToJoinSection` y `QuoteEnroll` usando `gsap.matchMedia` para deshabilitar animaciones `scale` en hijos de contenedores `snap-mandatory`. 2) Arreglo de los "saltos de capa" en márgenes izquierdos (`BleedLeft`) migrando de JS offset a CSS puro (`calc(-1 * var(--space-gutter-sm))`) en móviles, mitigando problemas de SSR y animaciones previas. 3) Erradicación de `text-balance` en todos los títulos principales (Display) en móvil para evitar cortes de línea prematuros. 4) Ajustes de espaciado (reducción a `gap-y-10` al colapsar grids y reducción de `pb` en el CTA Final) y ergonomía de botones (full-width y left-aligned).
- **25 Ago 2026:** Resolución de bugs de despliegue estático (404 de imágenes). Se eliminó el uso de clases `bg-[url('...')]` de Tailwind por ser inestables en compilaciones de producción y se migraron a estilos inline `style={{ backgroundImage: ... }}` en `PlatformRevealSection.tsx`. Asimismo, se removió la etiqueta `<Image>` de `next/image` en `CtaFinalSection.tsx` reemplazándola por `<img />` nativo.
- **24 Ago 2026:** Integración y rediseño completo de la sección `AgentAgencySection`. Implementación del componente `BleedLeft` para layouts asimétricos con sangrado izquierdo absoluto sin desbordamientos de `100vw`. Eliminación total del color naranja `#F26023` (sustituido por `#35BBFD`).

## 3. Decisiones de Diseño (Arquitectura)
- **Zero-Friction Mobile:** Prohibido animar con transformaciones pesadas o de escala a los hijos directos de un carrusel `snap-mandatory` en móvil. Todo GSAP en carruseles táctiles debe envolverse en `gsap.matchMedia` para aislar el desktop del móvil, animando en este último solo el contenedor principal (Fade y TranslateY).
- **CSS-First para layouts móviles:** El posicionamiento crítico responsivo (como el Bleed-left) depende un 100% de CSS nativo usando los tokens del sistema (`var(--space-gutter-sm)`) en lugar de depender de lecturas en vivo del DOM (JS) propensas a fallos de hidratación.
- **Tipografía desatada:** Se veta el uso de `text-balance` en titulares grandes (`text-display-lg`) en dispositivos móviles para permitir que los flujos de texto utilicen todo el ancho horizontal disponible de la pantalla.
- **Zero-Next/Image en Landing:** Las páginas y componentes estáticos (especialmente los destinados a GitHub Pages o Vercel Static Exports) NO usarán el tag `<Image>` de Next.js, ya que depende del servidor de Node.js para optimización al vuelo.
- **Evitar Tailwind Arbitrary URLs:** Se estipula evitar inyectar rutas de imágenes en clases de Tailwind (`bg-[url('/path/to/img.jpg')]`) para prevenir errores en la minificación y compilación del CSS. Utilizar `style={{ backgroundImage }}`.
- **Single Source of Truth (Color):** GO AMS utilizará exclusivamente Brand Blue. El color naranja y el Dark Glassmorphic Theme deben ser adaptados consecuentemente en futuras expansiones de la página.

## 4. Bugs Conocidos / Pendientes
- **Pendiente:** Evaluar el rendimiento LCP (Largest Contentful Paint) de la sección debido al reemplazo de `next/image` por `<img>`.
- **Resuelto:** El "salto" y overflow provocado por `BleedLeft` ha sido completamente eliminado al migrarlo a variables CSS en el breakpoint móvil.
- **Resuelto:** Desapareció el congelamiento de pantalla provocado por el conflicto entre GSAP scale y el `snap-x` de CSS.
