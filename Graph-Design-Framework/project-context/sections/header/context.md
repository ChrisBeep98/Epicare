# Contexto de Sección: Header

> **Última Actualización:** 29 de Junio, 2026

## 1. Visión General
Esta sección cubre el componente de cabecera (`HeaderEpicare.tsx`) de la Landing Page de Epicare. Su objetivo es unificar la navegación, controles de tema (light/dark) y menú responsivo a nivel global para todas las páginas del sitio.

## 2. Estado Actual
- **Layout Fijo:** El Header se posiciona fijo en la pantalla (`fixed`) y se centra usando clases del framework responsivas.
- **Píldora Flotante:** Si el prop `isHeaderPill` está activo (por ejemplo, al scrollear a través de ScrollTrigger), se transforma visualmente en una píldora flotante con fondo difuminado de vidrio (`backdrop-blur-md`) y bordes redondeados.
- **Isotipo Corto:** Renderiza el nuevo isotipo corto `/short_logo.svg` (cuadrado con fondo oscuro y olas blancas) en lugar del logo expandido.
- **Estructura Estática:** El Header se monta de manera estática y responsiva de inmediato para garantizar el 100% de confiabilidad visual sin parpadeos.
- **Selector de Idioma Dinámico:** Un switch de idioma en formato dropdown "liquid glass" minimalista (ESP/ENG) posicionado junto al logo, que adapta su color (blanco o negro) al tema del header y permite cambios de traducción instantáneos.
- **CTAs del Header:** Contiene un botón primario de **Login** en azul de marca (`bg-brand-blue`), un botón secundario translúcido con borde (**More from Epicare**) y el switch de tema.

## 3. Historial de Cambios
- **26 Jun 2026 (Sesión):** Extracción de la barra de navegación del Hero para consolidar el componente independiente `<HeaderEpicare />` en `src/components/epicare/HeaderEpicare.tsx`. Actualización del logo al isotipo `/short_logo.svg`. Remoción de las animaciones GSAP de carga inicial del header para forzar un cargado estático de máxima robustez.
- **29 Jun 2026 (Sesión):** Implementación de un selector de lenguaje (ESP/ENG) en el Header en formato dropdown liquid-glass minimalista. Añadido botón Login azul y renombrado botón secundario a 'More from Epicare'. Localización y corrección de traducciones en toda la landing (Header, Hero, BentoGrid, y DarkGradientSection).

## 4. Decisiones de Diseño
- **Estructura Reutilizable:** Diseñado como un componente independiente desacoplado del Hero para poder importarse en cualquier subpágina sin arrastrar lógicas de ScrollTrigger locales.
- **Micro-interacciones:** Los botones de cambio de tema y de hamburguesa tienen transiciones nativas CSS breves en escala y opacidad para responder al hover/active.
- **Traducción reactiva en caliente (in-place):** Se descartó remontar el árbol con `key={locale}` para evitar que los ScrollTriggers de GSAP se destruyan e inicialicen incorrectamente en posiciones de scroll intermedio, logrando una traducción en caliente fluida sin parpadeos y protegiendo el pin cinemático del Hero.
- **Botonera Jerárquica:** Se asignó el azul de la marca (`bg-brand-blue`) al botón de Login para jerarquizar el CTA primario de acceso, dejando 'More from Epicare' como secundario translúcido con borde.

## 5. Bugs Conocidos / Pendientes
- **Ninguno:** El componente funciona perfectamente en todas las vistas de resolución de pantalla y mantiene los estados de tema y traducción coherentes en la navegación.
