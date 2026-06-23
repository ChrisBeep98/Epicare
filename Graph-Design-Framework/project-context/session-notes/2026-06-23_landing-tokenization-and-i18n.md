# Sesión: Tokenización, i18n y Carrusel (Actos 1 y 2)

**Fecha:** 2026-06-23

## Resumen
* Implementación de arquitectura `next-intl` para internacionalización estricta (diccionarios y wrappers).
* Construcción del componente `BrandsCarousel` con un efecto marquee infinito y fluido (Acto 2).
* Auditoría de *Zero Px Policy* y purga profunda de tokens hardcodeados en `HeroEpicare` y `BrandsCarousel`.
* Extensión oficial del Design System (CSS, Docs y Blacklist) con tokens de superficie pura (`--color-surface-BG-black` a `#050505` y `--color-surface-BG-white` a `#FFFFFF`).
* Solución del issue de compilación de *pnpm v11* mediante la exclusión permanente de chequeos de scripts interactivos.

## Decisiones Tomadas
* **Forzado de Light Mode vía Variables CSS:** Para evitar herencias de Dark Mode indeseadas en el carrusel de marcas, no se eliminó la clase global, sino que se inyectaron localmente los nuevos tokens de color estáticos (`BG-white` y `Black-100`). Esto mantiene la semántica del Design System.
* **Ajuste de Gaps Fluidos:** Se mitigó el uso de variables inexistentes (`gap-fluid-xl`) retrocediendo un peldaño en la escala fluida aprobada (`gap-fluid-lg` en Desktop y `gap-fluid-sm` en Mobile) para evitar solapamientos.
* **Override de Políticas de Build de pnpm:** Debido a actualizaciones de seguridad de pnpm, se configuró `.npmrc` y `ignore-scripts = true` para evitar que Turbopack / Next se bloquearan en builds en segundo plano con `@parcel/watcher` y `@swc/core`.

## Pendientes
* Continuar con el desarrollo estructural del **Acto 3** de la Landing Page.
* Añadir interacciones más avanzadas con GSAP ScrollTrigger a medida que el scroll profundo en la página empiece a existir (actualmente solo el Hero tiene hooks).

## Bugs Descubiertos
* **Gap Token Fantasma:** `gap-fluid-xl` fue inferido sin existir en `globals.css`, lo que causó colapso en el renderizado Flexbox. Fue corregido.
* **Posicionamiento Inexistente:** Se utilizó la sintaxis Tailwind JIT para un valor que solo existía en `@theme` (`top-[var(--space-static-lg)]`), lo que la rompió. Se sustituyó correctamente por el proxy `top-static-lg` de Tailwind v4.

## Archivos Clave Modificados
* `design-system-app/src/components/epicare/HeroEpicare.tsx`
* `design-system-app/src/components/epicare/BrandsCarousel.tsx`
* `design-system-app/src/app/globals.css`
* `Graph-Design-Framework/project-context/sections/design-system/Design-System.md`
* `Graph-Design-Framework/WorkFlow-Docs/Design-Agent-Skills/Tokenizer.md`
* `design-system-app/messages/en.json` & `es.json`
