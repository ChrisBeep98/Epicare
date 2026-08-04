# Contexto de Sección: Services Bento (DarkGradientSection)

## 1. Estado Actual
- **Componente:** `DarkGradientSection.tsx`
- **Ubicación:** `src/components/epicare/`
- **Estado:** ✅ Completado y pulido.
- **Descripción:** Sección "Everything You Need to Succeed". Una grilla interactiva estilo "Liquid Glass" y "Edge-to-Edge" en mobile, con un sistema de iluminación radial bimodal (Light/Dark mode) avanzado.

## 2. Historial de Cambios
- **17 Jul 2026:**
  - Gap entre las 4 cards reducido a `md:gap-fluid-xs` (token DS, antes `md:gap-6`).
  - Swap de videos: card 1 (Innovation) light+dark, card 2 (Support) → nueva `Card 2_Support_light.mp4` (light) + zoom-out en dark. Card 3 (Earnings) zoom-out light+dark. Zoom-out implementado **por modo** con overrides `imgClassLight` / `imgClassDark` (`object-contain scale-[1.2..1.6]`, recortado por el `overflow-hidden` del contenedor → sin márgenes).
  - Purga de videos sin uso en `/public/Files/Epicare_Landing/Features/` (`innovation.mp4`, `innovation_Light.mp4`, `support_light.mp4`).
  - Todas las rutas de video pasan por el helper `asset()` para el deploy bajo `/Epicare`.
- **23 Jun 2026:**
  - Implementación del sistema de iluminación radial bimodal: En Dark Mode utiliza `Brand Blue`, en Light Mode expande un wash completo y fluido del color `Blue Vivid` por todo el contenedor.
  - Las tarjetas se transformaron a bloques de alto contraste: en Light Mode son bloques negros masivos con texto blanco; en Dark Mode son paneles de cristal líquido totalmente transparentes.
  - Sustitución de imágenes JPG por PNGs vectorizados con transparencia, flotando en el centro mediante `object-contain` sin restricciones de fondo.
  - Refinamiento estricto móvil: `14px` de padding forzado en toda la sección, separaciones y paddings interiores. Transformación a un layout "Full-Width" puro que toca los bordes del dispositivo.

- **[04/08/2026] · Hardening de producción.** Los 8 `<video autoPlay>` (4 cards × light/dark) descargaban **11 MB** en la primera carga: ambas variantes de tema se montan a la vez con `block dark:hidden` / `hidden dark:block` y `autoPlay` fuerza la descarga incluso en `display:none`. Migrados a `<SmartVideo>`, que usa `preload="none"` + IntersectionObserver, así que la variante oculta no pide un solo byte. Las `<img>` de fallback llevan ya `loading="lazy"`.

## 3. Decisiones de Diseño
- **Iluminación Bimodal Asimétrica:** En lugar de invertir los colores linealmente, la iluminación cambia su comportamiento físico: en Dark Mode actúa como un foco (radial) y en Light Mode como un "wash" (filtro ambiente de borde a borde) para evitar el "efecto donut" feo sobre el fondo blanco.
- **Alto Contraste Invertido:** En Light Mode, las tarjetas retienen deliberadamente un `bg-[#0A0A0A]` para funcionar como monitores de grado industrial sobre la luz brillante.
- **Edge-to-Edge Mobile:** La sección principal pierde sus márgenes laterales y curvas externas en celular (`px-0`, `rounded-none`, `border-x-0`) para dar la sensación de banda infinita.

## 4. Bugs Conocidos / Pendientes
- GSAP ScrollTrigger (`fade-up`) y transiciones de color fluyen a 60fps sin problema.
- **Deuda técnica:** el tipo de las cards usa casts `(card as any)` para `imgClassLight`/`imgClassDark`/`isVideoLight`. Limpieza recomendada: tipar la interfaz de card.
- El video `Card 2_Support_light.mp4` tiene un **espacio** en el nombre (funciona vía encoding, pero conviene renombrarlo sin espacio).

> **Última Actualización:** 4 Agosto 2026
