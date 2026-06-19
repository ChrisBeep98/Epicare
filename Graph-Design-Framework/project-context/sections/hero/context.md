# Contexto de Sección: Hero

> **Última Actualización:** 18 de Junio, 2026

## 1. Visión General
Esta sección cubre el componente principal del Hero de la Landing de GO AMS (`HeroSection.tsx`). Su objetivo es presentar un impacto visual inmediato ("Una plataforma para todo tu negocio de seguros") combinando tipografía pesada a la izquierda y un panel oscuro con video isométrico a la derecha.

## 2. Estado Actual
- **Layout Arquitectónico:** Implementado con un sistema de Grid de 3 filas y 12 columnas unificado.
- **Bleed Effect:** El panel oscuro visual (derecha) utiliza una lógica matemática (`BleedRight`) para anclarse a la columna 6 y desbordar (bleed) perfectamente hasta el límite derecho absoluto de la ventana, sin generar overflow.
- **Herramientas Activas:** Todo el layout opera bajo capas de *Live Editing* (`SectionLiveEditor`, `GridLiveEditor`, etc.) con soporte para carga inicial desde JSON y un sistema de copiado granular por componente.
- **Status Visual:** Hero 100% diagramado y sincronizado con el JSON del lead. Pendiente ejecutar la "Purga" para estandarizar código.

## 3. Historial de Cambios
- **18 Jun 2026:** Creación de la arquitectura Grid de 3 filas. Implementación del helper `BleedRight`. Aislamiento del `rowSpan: 1` para el Titular Gigante para evitar superposición con bloques de la fila 3. Mapeo estricto del JSON de diseño al código y adición del botón de copia individual en los widgets de `LiveEditor`.

## 4. Decisiones de Diseño
- **Grid de 3 Filas (`auto`, `auto`, `1fr`):** Elegido para agrupar Ceja y Título en lo alto, dejando que la última fila absorba el espacio restante y albergue el Panel Oscuro.
- **Manejo del Bleed Asimétrico:** En lugar de romper la grilla de 12 columnas (que generaría scroll horizontal), el contenedor respeta su límite en la Columna 12 (`span 7`) y utiliza el hook `BleedRight` para manipular programáticamente la propiedad `right` con valor negativo, estirando solo la superficie visual hacia la derecha.

## 5. Bugs Conocidos / Pendientes
- **Pendiente:** Ejecutar la Fase de Purga (Eliminar todos los `<*LiveEditor>` e inyectar el Tailwind puro y duro) para producción.
