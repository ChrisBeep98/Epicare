# 🔄 Sección: How To Join Epicare

## 📜 Historial de Paradigmas Quemados (RECHAZADOS)

Los siguientes paradigmas ya fueron intentados y el usuario los rechazó rotundamente (calificados como "gas", "básicos" o "lo mismo de siempre"). **PROHIBIDO VOLVER A INTENTARLOS:**

1. **Grid / Bento Estático:** Rechazado.
2. **Tabbed Accordion / Acordeón Vertical con Imagen a la Derecha:** Estilo panel SaaS B2B. Rechazado, considerado "hacer lo mismo".
3. **Índice Tipográfico Suizo (Editorial Estático):** Filas 100% width sin interactividad profunda, sobre panel de cristal. Rechazado.
4. **Split-Scroll (Concepto A):** Columna izquierda pinned, columna derecha con scroll. Rechazado.
5. **El Manifiesto de Notas al Margen (Concepto B):** Ensayo masivo de texto con íconos en parallax izquierdo. Rechazado.
6. **Stacking Cards de Cristal (Concepto C):** Tarjetas apilables a pantalla completa controladas por scroll. Rechazado.
7. **Cinematic Horizontal (Concepto D):** Scroll horizontal con Velocity Skew. Rechazado.
8. **Clip-Path Reveal (Concepto E):** Scrollytelling de máscaras in-place. Rechazado.
9. **GSAP FLIP Bento (Concepto F):** Cuadrícula expandible sin scroll (Seamless Layout). Rechazado.

## 2. Historial de Cambios
- **26 Ago 2026:** Resolución crítica del "frenón de scroll" móvil. Se modificó el motor de GSAP inyectando `gsap.matchMedia` para impedir que las tarjetas (`.join-step-card`) escalen individualmente en dispositivos táctiles (`<768px`). En su lugar, todo el track se desplaza en bloque. Esto previene que los cálculos físicos de `snap-mandatory` colapsen el scroll del usuario en iOS/Android.
- **20 Jul 2026:** Creación de la sección completa. Diseño Swiss-style para el desktop grid (columnas altas con barra hover de acento) y adaptación móvil (track snap-x horizontal). Textos en i18n (`howToJoin`). Fondo estático de la plataforma montado con `z-0`. Entrada GSAP stagger.

## 🎯 Directrices Actuales
- El usuario exige un nivel "Profesional Editorial", pero detesta los layouts clásicos (tabs, listas, grids).
- El nivel de exigencia es extremadamente alto (Awwwards level).
- Se requiere GSAP avanzado para no verse estático, pero no las típicas animaciones de opacidad y desplazamiento.
- La imagen `epicare_aura_cyan.jpg` es canon.
