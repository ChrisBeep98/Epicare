# Contexto de la Sección: Footer Epicare (FooterEpicare.tsx)

## 📌 Estado Actual
- **Diseño Base:** Estricto diseño Editorial / Awwwards (Swiss Design).
- **Esquema de Colores:** Fondo oscuro (`--color-surface-BG-black`), texto blanco, detalles finos y contrastantes.
- **Scroll Effects:** "Curtain Reveal" perfecto (parallax donde la página pasa por encima del footer que se mantiene estacionario, sin causar overflow ni z-index issues) dentro de una tarjeta flotante (`p-4 md:p-8 rounded-[3rem]`).
- **Tipografía (Hero):** Bloque de "Fluctuación Tipográfica" (etiquetas diminutas ancladas a la línea base de textos gigantes y muy comprimidos, usando `flex-wrap justify-center items-baseline`).
- **Navegación:** Espejada del `HeaderEpicare`, gobernada por un **Grid Asimétrico Bidimensional**. En escritorio es split-screen (2 columnas), en móvil se reordena inteligentemente en 3 filas proporcionales (fracciones `fr`) empujando el Marquee al centro, maximizando cada pulgada del 100dvh.
- **Footer Cierre:** Sistema Marquee Cinético Dual (GSAP). En escritorio se desplaza verticalmente anclando la columna derecha. En móvil, muta a un ticker de noticias horizontal infinito para asegurar legibilidad.
- **Responsividad y Rigor:** Aplicación estricta de **Zero Px Policy** con márgenes fluidos de 14px (`space-gutter-sm`) en móvil. Cero overrides tipográficos sucios, puramente tokens nativos (`text-display` y `text-meta`). Todo encaja matemáticamente en una sola pantalla (`100dvh`).

## 📜 Historial de Cambios
- **[30/07/2026] - Rediseño Total Editorial y Parallax:**
  - Se eliminaron las versiones de Neo-Brutalismo y Glassmorphism oscuro por problemas de legibilidad.
  - Se implementó "Curtain Reveal" dentro de un contenedor flotante seguro a nivel arquitectura (flujo DOM normal, `overflow-hidden`).
  - Se inyectó diseño Awwwards de Fluctuación Tipográfica para el título.
- **[31/07/2026] - Refactor Móvil (Arquitectura Grid, Marquee Dual y Zero Px):**
  - **CSS Grid Nativo:** Migración desde Flexbox para un control posicional absoluto en responsivo (evitando duplicación de DOM).
  - **Marquee Dual-Track GSAP:** Creación de pistas separadas (Horizontal para Móvil, Vertical para PC) resolviendo colisiones tipográficas en pantallas estrechas.
  - **Equidad Fraccional:** Las alturas en móvil ahora se dividen matemáticamente usando unidades `fr` (1.2/0.8/1.5) repartiendo el aire equitativamente.
  - **Limpieza de Tokens (Zero Px):** Reemplazados los márgenes forzados y tokens inexistentes (`text-display-md`) por la escala estricta del DS (`--space-gutter-sm`, `text-display`, `text-meta`).
  - **Micro-interacciones:** Unificación de los estados Hover/Active en enlaces con subrayados aéreos (`underline-offset-4`) y azul corporativo.

## 🎨 Decisiones de Diseño Críticas
- **Grid Dinámico Asimétrico vs Flexbox:** Flexbox fallaba en dispositivos móviles al querer alterar drásticamente el flujo visual (CTA > Marquee > Enlaces). CSS Grid permite cambiar las posiciones usando la directiva `order-*` respetando una semántica de un solo árbol de DOM limpio.
- **Curtain Reveal Flotante:** A diferencia de un `fixed` que rompe el layout en móviles y tapa el FAQ, usamos Parallax interno: la capa se mueve de `yPercent: -100` a `0` dentro de un contenedor `overflow-hidden`.
- **Aesthetic "Swiss Editorial" Cero Px:** Sin cajas ruidosas, sin valores arbitrarios. Todo el aire perimetral móvil está anclado al token `--space-gutter-sm` asegurando una consistencia robótica de 14px a lo largo del scroll sin corromper tokens universales como `fluid-md`.
- **Tamaño Seguro (100dvh):** Obligatorio mantener que el contenido encaje en un solo `100dvh` para evitar que la máscara de telón corte información vital o cree scrolls dobles espantosos, resolviendo los sobrantes vía partición matemática con `fr`.

## 🐛 Bugs Conocidos / Pendientes
- Ninguno crítico por ahora.
- **Validación pendiente:** Verificar en dispositivos iOS Safari que el 100dvh y el clip de borderRadius funcionen sin *glitches* gráficos al hacer scroll pesado.

## 📅 Última Actualización
31 de Julio de 2026
