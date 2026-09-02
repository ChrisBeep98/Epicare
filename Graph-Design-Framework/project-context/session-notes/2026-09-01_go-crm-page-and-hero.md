# Nota de Sesión: GO CRM — Arquitectura y Hero Section (1 Sep 2026)

## Resumen
- Creación y estructuración de la nueva página de producto `/go-crm`.
- Configuración de `layout.tsx` (Metadata SEO, OpenGraph, Canonical) y `page.tsx` (Orquestador con Loader, Header y Footer).
- Construcción y pulido del componente `HeroGoCrm.tsx` con arquitectura de 12 columnas y `BleedRight`.
- Sincronización de internacionalización (`next-intl`) en `messages/en.json` y `messages/es.json`.
- Integración de la imagen oficial `CRM_Hero.png` en `public/Files/Go_CRM/`.
- Actualización de `sitemap.ts` y documentación del framework.

## Decisiones Tomadas
- **Layout Asimétrico 12 Columnas:**
  - **Izquierda (Cols 1-8):** Badge `GO CRM`, H1 de gran escala con flujo continuo en una sola frase con acento azul de marca, y microcopy con pulso de estatus.
  - **Derecha (Cols 9-12):** Subtítulo en `text-body-lg` (`max-w-[400px]`) con palabras clave en bold, y botón CTA primario oficial de Epicare.
- **BleedRight Showcase:**
  - Ubicado en `lg:col-start-2 lg:col-span-11`, sangrado hacia el borde derecho de la pantalla sin scroll horizontal.
  - Radio de bordes aplicado estrictamente a las esquinas izquierdas (`rounded-l-2xl lg:rounded-l-[24px] rounded-r-none border-r-0`).
  - Imagen pura sin filtros, gradientes o destellos superpuestos, con altura automática y sin recorte.

## Archivos Modificados / Creados
- `src/app/go-crm/layout.tsx`
- `src/app/go-crm/page.tsx`
- `src/components/go-crm/HeroGoCrm.tsx`
- `src/app/sitemap.ts`
- `messages/en.json`
- `messages/es.json`
- `public/Files/Go_CRM/CRM_Hero.png`
- `Graph-Design-Framework/project-context/sections/go-crm/context.md`
- `Graph-Design-Framework/project-context/context.md`
