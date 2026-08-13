# Contexto de Sección: Licensing

> **Última Actualización:** 11 de Agosto, 2026

## 1. Visión General
Esta sección cubre los componentes de la página de Licensing (`LicensingHeroEpicare.tsx`, `InteractiveGlobeEpicare.tsx` y `LicensingGridEpicare.tsx`). Su objetivo principal es mostrar la presencia global de licencias utilizando un motor 3D interactivo (WebGL/react-globe.gl) embebido nativamente como widget en un layout de Hero y Grid.

## 2. Estado Actual
- **Layout Arquitectónico:** Implementado con un sistema de Grid de 12 columnas. El componente `InteractiveGlobeEpicare.tsx` está incrustado usando el prop `isWidget=true` dentro de un lienzo absoluto masivo dentro de `LicensingHeroEpicare.tsx`.
- **Prevención de Clipping WebGL:** Para evitar que la esfera 3D sea cortada abruptamente (clipping lateral) por el `<canvas>` en dispositivos móviles, se expandió el canvas a 800x800px absoluto, dejando que sangre por los bordes.
- **Scroll Horizontal Prevenido:** Se añadió `overflow-x-hidden` en la raíz `<main>` de `page.tsx` para permitir lienzos absolutos enormes en móvil sin romper el layout.
- **Redimensionamiento Dinámico 3D:** La cámara del motor 3D (`altitude`) se ajusta dinámicamente según `window.innerWidth`. En móvil es `2.8` (para compensar el canvas gigante), mientras que en desktop es `1.1`.
- **Interacción (Tooltips & Hover):**
  - **Desktop:** Tooltips estilo "chat bubble" asimétrico con cristal esmerilado oscuro (`bg-black/40`, `backdrop-blur-xl`, `text-white`), integrados ajustando `border-radius`. Solo se anima la opacidad para evitar glitches de WebKit.
  - **Móvil:** Lógica de `click` nativa en JS. Al tocar un pin en móvil, la burbuja aparece y se desaparece automáticamente con un auto-dismiss a los 2.5s.
- **Efectos GSAP:** Se eliminó el efecto Parallax (`y: 80`) del globo en el Hero al scrollear porque causaba un brinco visual indeseado.

## 3. Historial de Cambios
- **11 Ago 2026:** Integración de la esfera interactiva como widget en el `LicensingHeroEpicare`. Se corrigieron múltiples bugs críticos de clipping lateral del `<canvas>` en móvil agrandando el marco absoluto (800x800). Rediseño del tooltip de hover convirtiéndolo en un chat bubble de una sola pieza (glassmorphism oscuro universal `bg-black/40`). Se resolvió bug de parpadeo del `backdrop-blur` limitando la transición a opacidad. Se implementó funcionalidad touch (Tap) para el móvil con auto-dismiss. Eliminación de parallax scroll para estabilizar el globo.

## 4. Decisiones de Diseño
- **Cristal Esmerilado Oscuro Universal (Glassmorphism):** Para solucionar problemas de renderizado de opacidad de Tailwind con variables CSS en hexadecimal, y para garantizar alta legibilidad de textos blancos contrastando con el colorido mapa 3D, se utilizó un Margen Creativo forzando un diseño oscuro en la bubble en ambos temas (`bg-black/40 backdrop-blur-xl`).
- **Forma Nativa de Chat Bubble:** Se configuró el contenedor de la píldora con `rounded-2xl rounded-bl-sm` para formar orgánicamente la "cola" de la burbuja y evitar sobreposición de bordes transparentes que arruinan la ilusión de cristal continuo.
- **Canvas Infinito y Sangrado (Bleeding):** Dado que el WebGL corta la malla 3D de plano en los bordes del canvas, la decisión técnica fue inflar masivamente el lienzo absoluto en celulares y confiar en `overflow-x-hidden`.
- **Inmovilidad al Scroll:** Se retiraron los hooks de parallax vinculados a GSAP ScrollTrigger para prevenir un aparente "brinco" o desconexión física del planeta con respecto a su contenedor cuando el usuario hace scroll hacia abajo.

## 5. Bugs Conocidos / Pendientes
- **Ninguno:** El widget 3D está estable, fluido, responsivo y su sistema de tooltips (mouse y touch) se ejecuta limpiamente y sin clippings.
