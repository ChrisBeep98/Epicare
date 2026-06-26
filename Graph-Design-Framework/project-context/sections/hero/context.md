# Contexto de Sección: Hero

> **Última Actualización:** 26 de Junio, 2026

## 1. Visión General
Esta sección cubre los componentes principales de los Heroes de la Landing. Incluye tanto el `HeroSection.tsx` (Hero estático para GO AMS) como el `HeroEpicare.tsx` (Hero cinemático con GSAP para Epicare). Su objetivo es presentar un impacto visual inmediato aplicando estéticas "Awwwards-style" y arquitecturas Grid asimétricas.

## 2. Estado Actual
- **Layout Arquitectónico (GO AMS):** Implementado con un sistema de Grid de 3 filas y 12 columnas unificado. Correcciones responsivas completadas para márgenes en mobile.
- **Bleed Effect (GO AMS):** El panel oscuro visual (derecha) utiliza lógica matemática (`BleedRight`) en desktop para desbordar. En mobile utiliza una clase `mobile-bleed` pura en CSS.
- **Cinematic Experience (Epicare):** Hero cinemático con 2 actos (`HeroEpicare.tsx`) orquestado con GSAP `ScrollTrigger`. El video se expande a fullscreen durante el scroll y el contenido del Hero se revela progresivamente en el Acto 2.
- **Header Desacoplado:** El navbar y sus interacciones se extrajeron de `HeroEpicare.tsx` al componente global `HeaderEpicare.tsx`, que se renderiza directamente y de manera estática. Se eliminó la animación del logo viajero.
- **Preferencia de Tema Claro:** Configurado por defecto al remover la clase `dark` del tag `html` en el layout global, manteniendo el selector de tema completamente funcional.
- **Scrollbar Estabilizado:** Se eliminó la barra blanca lateral (`scrollbar-gutter: stable`). En su lugar, se forzó `overflow-y: scroll` en `html` con colores de scrollbar transparentes durante la carga para evitar brincos de pantalla, restaurando su visibilidad de manera suave con la clase `.show-scrollbar` al terminar el Loader.

## 3. Historial de Cambios
- **26 Jun 2026 (Sesión):** Desacoplamiento del header del Hero (`HeroEpicare.tsx`) en el nuevo componente global `<HeaderEpicare />` con el nuevo isotipo `/short_logo.svg`. Remoción de la animación de "logo viajero" y su crossfade. Solución definitiva al salto de la barra de scroll (se forzó `overflow-y: scroll` en `html` con estilos transparentes durante la carga para evitar parpadeos laterales y layout shifts, agregando la clase `show-scrollbar` al concluir el Loader). Forzado de Light Mode por defecto en `layout.tsx`.
- **23 Jun 2026 (Sesión):** [2026-06-23_landing-tokenization-and-i18n.md](file:///D:/Proyectos-Importantes/GOAMS%20Landing_Production/Graph-Design-Framework/project-context/session-notes/2026-06-23_landing-tokenization-and-i18n.md) - Implementación de i18n con `next-intl`, construcción de `BrandsCarousel`, tokenización estricta bajo *Zero Px Policy*, y adición de `--color-surface-BG-black/white`. Se arregló issue de compilación de pnpm.
- **23 Jun 2026:** Pulido milimétrico del layout cinemático de `HeroEpicare.tsx`. Se agregó un indicador "Scroll Down" en loop SVG (GSAP). Se solucionó un bug de desbordamiento horizontal cambiando `width: "100vw"` por `100%` más un enmascaramiento externo para aislar el `pin-spacer`. Se reemplazó el padding-top forzado `pt-[160px]` por un posicionamiento vertical más natural con un `pb-[60px]` explícito, solucionando superposiciones de CTAs en la parte inferior del grid. Se adaptó a pantallas móviles cambiando a unidades dinámicas `100dvh` e ignorando resize.
- **18 Jun 2026:** Ejecución de la Fase 2 (Purga) del Live Editing Protocol: Conversión de los `SectionLiveEditor`, `GridLiveEditor`, etc., a clases estáticas de Tailwind v4 y tags HTML nativos. Archivo 100% listo para producción.
- **18 Jun 2026:** Resolución de bugs responsivos en `HeroSection.tsx`: Se implementó Dark Mode manual en Tailwind v4 para evitar dependencias, se corrigió el switch del header en móviles asegurando el `z-index`, y se arregló un glitch visual de WebKit aplicando el radio de borde (`24px`) directamente sobre la etiqueta `<video>` en lugar del contenedor padre para evitar "esquinas transparentes".
- **18 Jun 2026:** Creación de la arquitectura Grid de 3 filas. Implementación del helper `BleedRight`. Aislamiento del `rowSpan: 1` para el Titular Gigante para evitar superposición con bloques de la fila 3. Mapeo estricto del JSON de diseño al código y adición del botón de copia individual en los widgets de `LiveEditor`.

## 4. Decisiones de Diseño
- **Prevención de Reflows GSAP (Epicare Hero):** Reemplazo de dimensiones globales en viewport `100vw` por porcentajes `100%` relativos al DOM. Además, el envoltorio exterior usa `overflow-x-hidden` estrictamente antes de que GSAP cree el `pin-spacer` para prevenir desbordamientos laterales no deseados.
- **Estabilización de Ancho Sin Gutter Visible:** El uso de `scrollbar-gutter: stable` dejaba un espacio blanco/vacío molesto a la derecha. La decisión de diseño fue mantener `overflow-y: scroll` en `html` para reservar el ancho en todo momento, pero camuflando el scrollbar como invisible/transparente mediante CSS hasta que se remueva el Loader, logrando una transición 100% suave en la hidratación y carga del contenido.
- **Desacoplamiento de Header:** Para poder reusar la barra de navegación en todas las rutas y simplificar la carga, se eliminó la lógica de handoff de logo y z-index del ScrollTrigger, convirtiendo el header en un componente puramente estático y autocontenido.
- **Solución `100dvh` & Mobile Resize:** Acatando la política de UI móvil para ScrollTrigger, en lugar de usar `h-screen`, se configuró explícitamente `h-[100dvh]` y se inicializó `ScrollTrigger.config({ ignoreMobileResize: true });` asegurando que no se disparen eventos de recalculación invasivos al ocular/aparecer el Address Bar del móvil.
- **Dark Mode Zero-Dependency:** Se descartó el uso de `next-themes` a favor del motor nativo de Tailwind v4 y una manipulación manual del DOM (`document.documentElement.classList.toggle`).
- **WebKit Clip Fix:** Para solucionar el error histórico de iOS Safari/Chrome donde contenedores `overflow-hidden` fallan en enmascarar contenido pesado, se movió el `border-radius` directo a los elementos internos.
- **Manejo del Bleed Asimétrico:** En lugar de romper la grilla de 12 columnas (que generaría scroll horizontal), el contenedor respeta su límite en la Columna 12 (`span 7`) y utiliza el hook `BleedRight` para manipular programáticamente la propiedad `right` con valor negativo, estirando solo la superficie visual hacia la derecha.

## 5. Bugs Conocidos / Pendientes
- **Ninguno:** Ambos Heroes (GO AMS y Epicare) pasaron pruebas estáticas de UI responsiva, prevención de desbordamientos y correcta animación de Scrollytelling.
