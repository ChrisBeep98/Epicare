# Contexto de Sección: Header

> **Última Actualización:** 26 de Junio, 2026

## 1. Visión General
Esta sección cubre el componente de cabecera (`HeaderEpicare.tsx`) de la Landing Page de Epicare. Su objetivo es unificar la navegación, controles de tema (light/dark) y menú responsivo a nivel global para todas las páginas del sitio.

## 2. Estado Actual
- **Layout Fijo:** El Header se posiciona fijo en la pantalla (`fixed`) y se centra usando clases del framework responsivas.
- **Píldora Flotante:** Si el prop `isHeaderPill` está activo (por ejemplo, al scrollear a través de ScrollTrigger), se transforma visualmente en una píldora flotante con fondo difuminado de vidrio (`backdrop-blur-md`) y bordes redondeados.
- **Isotipo Corto:** Renderiza el nuevo isotipo corto `/short_logo.svg` (cuadrado con fondo oscuro y olas blancas) en lugar del logo expandido.
- **Estructura Estática:** Tras eliminar las animaciones iniciales y GSAP timelines complejos, el Header se monta de manera estática y responsiva de inmediato para garantizar el 100% de confiabilidad visual sin parpadeos ni race conditions.

## 3. Historial de Cambios
- **26 Jun 2026 (Sesión):** Extracción de la barra de navegación del Hero para consolidar el componente independiente `<HeaderEpicare />` en `src/components/epicare/HeaderEpicare.tsx`. Actualización del logo al isotipo `/short_logo.svg`. Remoción de las animaciones GSAP de carga inicial del header para forzar un cargado estático de máxima robustez.

## 4. Decisiones de Diseño
- **Estructura Reutilizable:** Diseñado como un componente independiente desacoplado del Hero para poder importarse en cualquier subpágina sin arrastrar lógicas de ScrollTrigger locales.
- **Micro-interacciones:** Los botones de cambio de tema y de hamburguesa tienen transiciones nativas CSS breves en escala y opacidad para responder al hover/active.

## 5. Bugs Conocidos / Pendientes
- **Ninguno:** El componente funciona perfectamente en todas las vistas de resolución de pantalla y mantiene los estados de tema coherentes en la navegación.
