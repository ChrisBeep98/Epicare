# Prompt de Validación del Framework (Self-Validation Rules)

Copia y pega este prompt para que el agente ejecute una auditoría de consistencia del framework `context-Docs`.

***

**PROMPT PARA AUDITAR EL FRAMEWORK:**

> "Hola. Ejecuta una auditoría completa del framework `context-Docs` usando las siguientes reglas de validación. Para cada regla, reporta ✅ PASS o ❌ FAIL con detalle del problema.
>
> **Reglas:**
>
> 1. **FONT_CONSISTENCY:** Toda mención de una fuente en cualquier `.md` del framework debe ser Playfair Display o Inter. Buscar menciones de: Inter, Geist, Walsheim, Arial, Helvetica. Resultado esperado: 0 menciones de fuentes no autorizadas.
>
> 2. **TOKEN_REFERENCE:** Toda clase CSS de tipografía mencionada en los `.md` (ej: `text-display`, `text-body-sm`) debe existir definida en `globals.css` o `landing.css`. Buscar clases `text-*` en los docs y verificar su existencia en el código.
>
> 3. **I18N_ZONE:** Toda mención de `useTranslations` en docs `.md` debe especificar claramente si aplica a Admin/Client o Landing. No debe haber instrucciones genéricas de 'siempre usar useTranslations' sin zona.
>
> 4. **LINK_VALIDITY:** Todo enlace relativo en archivos `.md` (ej: `[texto](./archivo.md)`) debe apuntar a un archivo que existe. Verificar al menos los archivos en `ONBOARDING-AI.md`, `README.md` files, y `update-context-prompt.md`.
>
> 5. **SECTION_SYNC:** Todo componente importado en `src/app/page.tsx` debe tener una carpeta correspondiente en `context-Docs/project-context/sections/`. Verificar que no hay secciones faltantes.
>
> 6. **SKILL_FRONTMATTER:** Cada archivo `.md` en `Design-Agent-Skills/` (excepto README.md) debe tener YAML frontmatter con campos `name` y `description`. Verificar los 9 archivos de skills.
>
> 7. **PHASE_CONSISTENCY:** La fase actual del proyecto mencionada en `context.md`, `ONBOARDING-AI.md`, y `onboarding-context.md` debe ser la misma. Buscar 'Fase X' y verificar consistencia.
>
> 8. **CHANGELOG_CURRENT:** La última entrada del `CHANGELOG.md` debe tener una fecha igual o posterior a la última actualización de `context.md`.
>
> **Formato de reporte:**
> ```
> ── Framework Validation Report ──
> Date: [fecha]
> 
> 1. FONT_CONSISTENCY:    ✅ PASS / ❌ FAIL (detalle)
> 2. TOKEN_REFERENCE:     ✅ PASS / ❌ FAIL (detalle)
> 3. I18N_ZONE:           ✅ PASS / ❌ FAIL (detalle)
> 4. LINK_VALIDITY:       ✅ PASS / ❌ FAIL (detalle)
> 5. SECTION_SYNC:        ✅ PASS / ❌ FAIL (detalle)
> 6. SKILL_FRONTMATTER:   ✅ PASS / ❌ FAIL (detalle)
> 7. PHASE_CONSISTENCY:   ✅ PASS / ❌ FAIL (detalle)
> 8. CHANGELOG_CURRENT:   ✅ PASS / ❌ FAIL (detalle)
> 
> Score: X/8 PASSED
> ```"

***

> **Cuándo ejecutar:** Después de sesiones donde se modifique el framework (skills, Design System, contexto). Mínimo 1 vez al mes.
