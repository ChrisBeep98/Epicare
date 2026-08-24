# S05 - BackOffice Tour Context

## Paradigmas QUEMADOS (Rechazados tajantemente por el usuario)
1. **Carrusel Horizontal Matemático:** Rueda horizontal anclada a la derecha simulando noria 2D. (Rechazo: "no está re mal, pero hay que rediseñar").
2. **Z-Stacking (Ascensor Óptico):** Navegación en profundidad Z atravesando tarjetas. (Rechazo: "cosas tan horribles").
3. **Split-Screen Manifiesto:** Lista tipográfica izquierda encendiéndose + Contenedor derecho fijo con crossfade de imágenes. (Rechazo: "cosas tan horribles").
4. **Tambor Vertical (Slot Machine):** Columna derecha rotando en el eje X como tragamonedas. (Rechazo: "cosas tan horribles").
5. **Command Center:** Grid de paneles que se encienden secuencialmente con opacidad. (Rechazo: "cosas genéricas y feas").
6. **Crisis Wall (Mecha):** Paneles de barras naranjas y datos. (Rechazo: "cosas genéricas y feas").
7. **Osciloscopio:** Líneas láser en canvas/div. (Rechazo: "cosas genéricas y feas").
8. **Acordeón Awwwards:** Flex-grow hover nativo. (Rechazo: "cosas genéricas y feas").

## Notas
El usuario rechazó 8 paradigmas distintos en dos rondas. Las opciones presentadas se sienten "genéricas y feas". 
Anteriormente el usuario había pedido: "imágenes más grandes, pegadas a los bordes... imágenes más altas, dales parallax y animación de revelado gsap".
Las últimas propuestas ignoraron ese requirement visual por intentar buscar "nuevos paradigmas". El problema no es el paradigma, es el CUBRIMIENTO VISUAL (escala de las imágenes) y el NIVEL DE CRAFT (parallax, revelado).

## Hardening de Animaciones (24 Ago 2026)
- Se corrigieron todos los subcomponentes conceptuales (`BackOfficeTourA`, `B`, `C`, `Command`, `Crisis`, `Oscilloscope`) para capturar el elemento DOM directo en `gsap.context()` y se eliminó el dependency array loop `[activeIndex]` en el concepto B, eliminando errores de invalid scope en navegación SPA.

