# Contexto de Sección: Hero

> **Última Actualización:** 18 de Junio, 2026

## 1. Visión General
Esta sección cubre el componente principal del Hero de la Landing de GO AMS (`HeroSection.tsx`). Su objetivo es presentar un impacto visual inmediato ("Una plataforma para todo tu negocio de seguros") combinando tipografía pesada a la izquierda y un panel oscuro con video isométrico a la derecha.

## 2. Estado Actual
- **Layout Arquitectónico:** Implementado con un sistema de Grid de 3 filas y 12 columnas unificado. Correcciones responsivas completadas para márgenes en mobile.
- **Bleed Effect:** El panel oscuro visual (derecha) utiliza una lógica matemática (`BleedRight`) en desktop para anclarse a la columna 6 y desbordar. En mobile se utiliza una clase `mobile-bleed` pura en CSS.
- **Dark Mode Nativo:** El Hero y toda la plataforma fuerzan el Dark Mode por defecto inyectando la clase `dark` en el tag HTML, y el toggle switch del header cambia el estado manipulando el DOM directamente sin librerías de terceros.
- **Status Visual:** Hero 100% diagramado, responsivo (con fix de WebKit para bordes curvos de video) y sincronizado. Fase de Purga completada (LiveEditing removido).

## 3. Historial de Cambios
- **18 Jun 2026:** Ejecución de la Fase 2 (Purga) del Live Editing Protocol: Conversión de los `SectionLiveEditor`, `GridLiveEditor`, etc., a clases estáticas de Tailwind v4 y tags HTML nativos. Archivo 100% listo para producción.
- **18 Jun 2026:** Resolución de bugs responsivos en `HeroSection.tsx`: Se implementó Dark Mode manual en Tailwind v4 para evitar dependencias, se corrigió el switch del header en móviles asegurando el `z-index`, y se arregló un glitch visual de WebKit aplicando el radio de borde (`24px`) directamente sobre la etiqueta `<video>` en lugar del contenedor padre para evitar "esquinas transparentes".
- **18 Jun 2026:** Creación de la arquitectura Grid de 3 filas. Implementación del helper `BleedRight`. Aislamiento del `rowSpan: 1` para el Titular Gigante para evitar superposición con bloques de la fila 3. Mapeo estricto del JSON de diseño al código y adición del botón de copia individual en los widgets de `LiveEditor`.

## 4. Decisiones de Diseño
- **Dark Mode Zero-Dependency:** Se descartó el uso de `next-themes` a favor del motor nativo de Tailwind v4 y una manipulación manual del DOM (`document.documentElement.classList.toggle`) para asegurar un tiempo de carga instantáneo y fidelidad visual inalterable.
- **WebKit Clip Fix:** Para solucionar el error histórico de iOS Safari/Chrome donde contenedores `overflow-hidden` fallan en enmascarar contenido pesado, se movió el `border-radius: 24px` directo a los elementos internos (Video y Ruido) en móvil.
- **Grid de 3 Filas (`auto`, `auto`, `1fr`):** Elegido para agrupar Ceja y Título en lo alto, dejando que la última fila absorba el espacio restante y albergue el Panel Oscuro.
- **Manejo del Bleed Asimétrico:** En lugar de romper la grilla de 12 columnas (que generaría scroll horizontal), el contenedor respeta su límite en la Columna 12 (`span 7`) y utiliza el hook `BleedRight` para manipular programáticamente la propiedad `right` con valor negativo, estirando solo la superficie visual hacia la derecha.

## 5. Bugs Conocidos / Pendientes
- **Ninguno:** La sección se encuentra estable, purgada y lista para despliegue.
