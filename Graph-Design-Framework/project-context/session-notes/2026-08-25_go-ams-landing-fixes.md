# Nota de Sesión: GO AMS Landing - Fixes y Deployment (25 Ago 2026)

## Resumen
- Refactorización de la sección `AgentAgencySection` reemplazando los colores naranjas quemados por el azul de marca oficial.
- Creación de un subcomponente arquitectónico `BleedLeft` para forzar que el contenedor rompa el límite izquierdo de la pantalla (0px border-radius a la izquierda) manteniendo el padding derecho asimétrico.
- Composición simétrica y jerárquica en la página principal, subiendo la sección `AgentAgencySection` sobre `ProductLinesEpicare` y reemplazando videos legacy.
- Diagnóstico y resolución de bugs críticos de Vercel/Next.js en el export estático: las imágenes de `PlatformRevealSection.tsx` daban 404 porque usaban el compilador JIT `bg-[url(...)]` de Tailwind. Se migró a React inline `style={{ backgroundImage }}`.
- Corrección del `CtaFinalSection.tsx` que arrojaba 404 en el deploy estático debido al uso del componente dinámico `next/image` sin servidor de optimización. Se migró a la etiqueta estándar `<img />`.

## Decisiones Tomadas
- **Single Source of Truth de color:** Erradicación del color naranja `#F26023` y variables CSS en todo GO-AMS. Se fuerza el uso de Brand Blue `#35BBFD`.
- **Patrón de assets en Static Export:** Queda estipulado que todo el proyecto de Next.js (ya que se exporta de forma estática) debe priorizar la etiqueta HTML `<img />` con clases de Tailwind (`object-cover`, `w-full`, `h-full`) para evitar crashes del servidor de optimización de Vercel/GitHub Pages, así como evitar cargar URLs en Tailwind JIT (`bg-[url(...)]`) que puedan sufrir fallos de parseo.
- **Componentización asimétrica (BleedLeft):** El uso de `getBoundingClientRect` junto con `useLayoutEffect` demostró ser más sólido para calcular bordes absolutos que un hackeo css puro con variables y márgenes negativos globales.

## Pendientes
- Revisar que el deploy estático procese las nuevas etiquetas `<img>` y la inyección en línea, verificando de paso el LCP (Largest Contentful Paint) de estas grandes secciones.
- Estandarizar si otras partes del Landing Page de GO-AMS van a necesitar refactors visuales hacia el modo Dark Glassmorphic.

## Bugs Descubiertos
- Tailwind `bg-[url('...')]` a menudo es quebrado o escapado por Turbopack/Next en el empaquetado estático con comillas. (Resuelto con estilos nativos React).
- `next/image` no funciona out-of-the-box en ambientes estáticos estrictos sin `unoptimized={true}`. (Resuelto eliminando `next/image`).
- Error silencioso de recorte y `border-radius` incorporado en PNG transparentes provenientes de Figma. (Resuelto agregando overflow hidden y negative transform en las tarjetas de la agencia).

## Archivos Clave Modificados
- `src/components/go-ams/agent-agency/*` (Varios componentes hijos extraídos)
- `src/app/page.tsx`
- `src/components/epicare/BentoGridDesktop.tsx` y `BentoGridMobile.tsx`
- `src/components/go-ams/PlatformRevealSection.tsx`
- `src/components/go-ams/CtaFinalSection.tsx`
