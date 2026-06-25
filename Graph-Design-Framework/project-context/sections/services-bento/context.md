# Contexto de Sección: Services Bento (DarkGradientSection)

## 1. Estado Actual
- **Componente:** `DarkGradientSection.tsx`
- **Ubicación:** `src/components/epicare/`
- **Estado:** ✅ Completado y pulido.
- **Descripción:** Sección "Everything You Need to Succeed". Una grilla interactiva estilo "Liquid Glass" y "Edge-to-Edge" en mobile, con un sistema de iluminación radial bimodal (Light/Dark mode) avanzado.

## 2. Historial de Cambios
- **23 Jun 2026:**
  - Implementación del sistema de iluminación radial bimodal: En Dark Mode utiliza `Brand Blue`, en Light Mode expande un wash completo y fluido del color `Blue Vivid` por todo el contenedor.
  - Las tarjetas se transformaron a bloques de alto contraste: en Light Mode son bloques negros masivos con texto blanco; en Dark Mode son paneles de cristal líquido totalmente transparentes.
  - Sustitución de imágenes JPG por PNGs vectorizados con transparencia, flotando en el centro mediante `object-contain` sin restricciones de fondo.
  - Refinamiento estricto móvil: `14px` de padding forzado en toda la sección, separaciones y paddings interiores. Transformación a un layout "Full-Width" puro que toca los bordes del dispositivo.

## 3. Decisiones de Diseño
- **Iluminación Bimodal Asimétrica:** En lugar de invertir los colores linealmente, la iluminación cambia su comportamiento físico: en Dark Mode actúa como un foco (radial) y en Light Mode como un "wash" (filtro ambiente de borde a borde) para evitar el "efecto donut" feo sobre el fondo blanco.
- **Alto Contraste Invertido:** En Light Mode, las tarjetas retienen deliberadamente un `bg-[#0A0A0A]` para funcionar como monitores de grado industrial sobre la luz brillante.
- **Edge-to-Edge Mobile:** La sección principal pierde sus márgenes laterales y curvas externas en celular (`px-0`, `rounded-none`, `border-x-0`) para dar la sensación de banda infinita.

## 4. Bugs Conocidos / Pendientes
- Ninguno por el momento. GSAP ScrollTrigger (`fade-up`) y transiciones de color fluyen a 60fps sin problema de re-renderizado.

> **Última Actualización:** 23 Junio 2026
