# Contexto de la Sección: Footer Epicare (FooterEpicare.tsx)

## 📌 Estado Actual
- **Diseño Base:** Estricto diseño Editorial / Awwwards (Swiss Design).
- **Esquema de Colores:** Fondo oscuro (`--color-surface-BG-black`), texto blanco, detalles finos y contrastantes.
- **Scroll Effects:** "Curtain Reveal" perfecto (parallax donde la página pasa por encima del footer que se mantiene estacionario, sin causar overflow ni z-index issues) dentro de una tarjeta flotante (`p-4 md:p-8 rounded-[3rem]`).
- **Tipografía (Hero):** Bloque de "Fluctuación Tipográfica" (etiquetas diminutas ancladas a la línea base de textos gigantes y muy comprimidos, usando `flex-wrap justify-center items-baseline`).
- **Navegación:** Espejada del `HeaderEpicare` usando traducciones `next-intl` (landingV2.nav), ordenada en una estricta cuadrícula suiza (bordes `white/15`).
- **Footer Cierre:** Palabra monumental interactiva al fondo ("EPICARE"). Letras que reaccionan con un salto suave y cambio de color azul (`power3.out`) vía GSAP.
- **Responsividad:** Todo encaja matemáticamente en una sola pantalla (`100dvh`) gracias a una disposición horizontal del Hero y tipografía escalada en `vw`.

## 📜 Historial de Cambios
- **[30/07/2026] - Rediseño Total Editorial y Parallax:**
  - Se eliminaron las versiones de Neo-Brutalismo (Duolingo) y Glassmorphism oscuro con bóveda 3D debido a falta de legibilidad y problemas de solapamiento Z-index.
  - Se implementó un "Curtain Reveal" dentro de un contenedor flotante (márgenes laterales) totalmente seguro a nivel arquitectura (flujo DOM normal, `overflow-hidden` interno).
  - Se inyectó diseño Awwwards de Fluctuación Tipográfica para el título del footer (minúsculas vs gigantes en flex-baseline).
  - Se recreó la cuadrícula de navegación con bordes finos.
  - Se restauró la animación GSAP "Antigravity Style" de letras individuales saltando al final, puliendo la curva a `power3.out`.

## 🎨 Decisiones de Diseño Críticas
- **Curtain Reveal Flotante:** A diferencia de un `fixed` que rompe el layout en móviles y tapa el FAQ, usamos Parallax interno: la capa se mueve de `yPercent: -100` a `0` dentro de un contenedor `overflow-hidden`. Y para darle el aire requerido, lo encajonamos en un "Floating Card" (`rounded-3xl` + `padding` externo).
- **Aesthetic "Swiss Editorial":** Sin cajas ruidosas, sin botones masivos de colores saturados. Solo tipografía, grid exacto, y jerarquía brutal. (Uso estricto de tokens: `text-display-2xl`, `px-gutter-md`, `gap-fluid-md`).
- **Tamaño Seguro (100dvh):** Obligatorio mantener que el contenido encaje en un solo `100dvh` para evitar que la máscara de telón corte información vital o cree scrolls dobles espantosos.

## 🐛 Bugs Conocidos / Pendientes
- Ninguno crítico por ahora.
- **Validación pendiente:** Verificar en dispositivos iOS Safari que el 100dvh y el clip de borderRadius funcionen sin *glitches* gráficos al hacer scroll pesado.

## 📅 Última Actualización
30 de Julio de 2026
