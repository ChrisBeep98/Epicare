# Prompt de Validación del Framework (Self-Validation Rules)

Copia y pega este prompt para auditar la consistencia del framework `Graph-Design-Framework/`. **Excluye siempre `_archive/`** (es historia de la marca muerta; que contenga Playfair/café/violeta es correcto ahí).

***

**PROMPT PARA AUDITAR EL FRAMEWORK:**

> "Ejecuta una auditoría completa del framework `Graph-Design-Framework/` (excluyendo `_archive/` y `references/`) con estas reglas. Por cada una reporta ✅ PASS o ❌ FAIL con detalle.
>
> **Reglas:**
>
> 1. **BRAND_CONSISTENCY:** Las únicas fuentes autorizadas son **Inter Display, Inter Tight y JetBrains Mono**. Buscar y flaggear: `Playfair`, `Geist`, `serif premium`, `font-serif`. Buscar y flaggear colores/estética de la marca muerta: `#A40EBB`, `café|coffee|Salento`, `ámbar|amber`, `terracotta`, `green-moss`, `Earthy`, `NEVER Dark Mode|solo Light`. Resultado esperado: 0 menciones fuera de `_archive/`.
>
> 2. **PATH_VALIDITY:** Ningún doc activo referencia la raíz muerta `context-Docs/`. Todo enlace relativo `[texto](./archivo.md)` apunta a un archivo existente. Verificar especialmente `ONBOARDING-AI-protocol.md`, `START-HERE.md`, ambos README y `creative-motion-protocol.md`.
>
> 3. **TOKEN_REFERENCE:** Toda clase de tipografía/espaciado citada en los `.md` (`text-display-*`, `py-section-*`...) existe en `design-system-app/src/app/globals.css`.
>
> 4. **MOTION_TOKEN_SYNC:** Los valores de la tabla §0 de `MOTION-BIBLE.md` coinciden con `design-system-app/src/lib/motion.ts`. Además, grep en `src/components/epicare/`: easings/duraciones GSAP inline que deberían importar de `motion.ts` → listar como deuda.
>
> 5. **SECTION_SYNC:** Todo componente importado en `src/app/page.tsx` tiene carpeta en `project-context/sections/` Y entrada en `project-context/scrollytelling-map.md`. El orden del mapa coincide con el orden real de `page.tsx`.
>
> 6. **BIMODAL_RULE:** Ningún doc activo prescribe "solo light" o "solo dark". Grep de `light-only` en componentes → listar excepciones como deuda.
>
> 7. **SKILL_FRONTMATTER:** Cada `.md` en `Design-Agent-Skills/` (excepto README) tiene frontmatter `name` + `description`.
>
> 8. **CHANGELOG_CURRENT:** La última entrada del `CHANGELOG.md` es igual o posterior a la última actualización de `context.md`.
>
> **Formato de reporte:**
> ```
> ── Framework Validation Report ──
> Date: [fecha]
> 1. BRAND_CONSISTENCY:  ✅/❌ (detalle)
> 2. PATH_VALIDITY:      ✅/❌
> 3. TOKEN_REFERENCE:    ✅/❌
> 4. MOTION_TOKEN_SYNC:  ✅/❌
> 5. SECTION_SYNC:       ✅/❌
> 6. BIMODAL_RULE:       ✅/❌
> 7. SKILL_FRONTMATTER:  ✅/❌
> 8. CHANGELOG_CURRENT:  ✅/❌
> Score: X/8 PASSED
> ```"

***

> **Cuándo ejecutar:** tras sesiones que modifiquen el framework (skills, DS, contexto). Mínimo 1 vez al mes.
