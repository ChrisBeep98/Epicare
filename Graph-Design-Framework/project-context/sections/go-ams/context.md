# Contexto de la Sección: GO AMS Landing

> **Última Actualización:** 25 de Agosto, 2026

## 1. Estado Actual
La página de aterrizaje (landing page) de GO AMS está en una etapa avanzada de estabilización y pulido. Se han implementado múltiples subsecciones (`AgentAgencySection`, `PlatformRevealSection`, `CtaFinalSection`, etc.) y se han eliminado vestigios de la marca naranja para forzar el uso del color oficial de la marca: Brand Blue (`#35BBFD`).
La página ahora es completamente funcional en despliegues estáticos (Static Exports) gracias a la refactorización en el manejo de imágenes y assets.

## 2. Historial de Cambios

- **25 Ago 2026:** Resolución de bugs de despliegue estático (404 de imágenes). Se eliminó el uso de clases `bg-[url('...')]` de Tailwind por ser inestables en compilaciones de producción y se migraron a estilos inline `style={{ backgroundImage: ... }}` en `PlatformRevealSection.tsx`. Asimismo, se removió la etiqueta `<Image>` de `next/image` en `CtaFinalSection.tsx` reemplazándola por `<img />` nativo.
- **24 Ago 2026:** Integración y rediseño completo de la sección `AgentAgencySection`. Implementación del componente `BleedLeft` para layouts asimétricos con sangrado izquierdo absoluto sin desbordamientos de `100vw`. Eliminación total del color naranja `#F26023` (sustituido por `#35BBFD`).

## 3. Decisiones de Diseño (Arquitectura)
- **Zero-Next/Image en Landing:** Las páginas y componentes estáticos (especialmente los destinados a GitHub Pages o Vercel Static Exports) NO usarán el tag `<Image>` de Next.js, ya que depende del servidor de Node.js para optimización al vuelo.
- **Evitar Tailwind Arbitrary URLs:** Se estipula evitar inyectar rutas de imágenes en clases de Tailwind (`bg-[url('/path/to/img.jpg')]`) para prevenir errores en la minificación y compilación del CSS. Utilizar `style={{ backgroundImage }}`.
- **Single Source of Truth (Color):** GO AMS utilizará exclusivamente Brand Blue. El color naranja y el Dark Glassmorphic Theme deben ser adaptados consecuentemente en futuras expansiones de la página.

## 4. Bugs Conocidos / Pendientes
- **Pendiente:** Evaluar el rendimiento LCP (Largest Contentful Paint) de la sección debido al reemplazo de `next/image` por `<img>`.
- **Pendiente:** Implementar una galería responsiva y pulir los breakpoints móviles en los componentes `AgentAgencyFeatureCards`.
