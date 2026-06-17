# Prompt de Actualización de Contexto (v2.0 — Por Sección)

Copia y pega este prompt cada vez que terminemos un hito importante en una sección específica. Esto obliga al agente a actualizar **SOLO el contexto de esa sección**, manteniendo el inventario modular y legible.

***

**PROMPT PARA ACTUALIZAR EL CONTEXTO DE UNA SECCIÓN:**

> "Hola. Acabamos de completar trabajo en la sección **[NOMBRE DE LA SECCIÓN]**. Por favor, realiza las siguientes acciones:
> 
> 1. Lee el archivo de contexto de esta sección en `context-Docs/project-context/sections/[carpeta]/context.md`.
>    - Si NO existe, créalo usando el formato estándar definido en `context-Docs/project-context/sections/README.md`.
> 2. Analiza el último trabajo que hicimos (archivos creados, bugs solucionados, decisiones de diseño tomadas).
> 3. Añade una nueva entrada al **Historial de Cambios** de ese archivo con el detalle de lo que se hizo.
> 4. Actualiza la sección **Estado Actual** si el estado visual o funcional cambió.
> 5. Actualiza **Decisiones de Diseño** si tomamos alguna decisión arquitectónica importante (ej: eligimos X sobre Y).
> 6. Actualiza **Bugs Conocidos / Pendientes** si descubrimos alguno nuevo o resolvimos uno existente.
> 7. Actualiza la **Última Actualización** al día de hoy.
> 8. **TAMBIÉN** añade una entrada resumida (1-2 líneas) al archivo global `context-Docs/project-context/context.md` en la Sección 5 (Registro de Acciones Críticas).
> 9. Confírmame con un mensaje breve: qué entrada agregaste al contexto de sección y qué línea al contexto global."

***

**PROMPT PARA ENTRAR EN CONTEXTO DE UNA SECCIÓN ESPECÍFICA:**

> "Hola. Vamos a trabajar en la sección **[NOMBRE DE LA SECCIÓN]**. Antes de empezar:
>
> 1. Lee `context-Docs/project-context/sections/[carpeta]/context.md` para entender el estado actual, historial de cambios, y decisiones de diseño de esta sección.
> 2. Lee `context-Docs/project-context/context.md` (solo las secciones 1-4 de fundamentos) para tener el contexto global del proyecto.
> 3. Responde con: '✅ Contexto de [NOMBRE] cargado. Estado: [resumen de 1 línea]. ¿Qué hacemos?'"

***

## 📂 Carpetas de Sección Disponibles

| Sección | Carpeta |
|:---|:---|
| Header | `sections/header/` |
| Hero (Liquid) | `sections/hero/` |
| Hero Image | `sections/hero-image/` |
| Services Bento | `sections/services-bento/` |
| Wave Reveal | `sections/wave-reveal/` |
| Integrations | `sections/integrations/` |
| Comparison | `sections/comparison/` |
| Testimonials | `sections/testimonials/` |
| Dashboard Reveal | `sections/dashboard-reveal/` |
| Calculator | `sections/calculator/` |
| Footer | `sections/footer/` |
| GO AMS Portal Hero | `sections/flowsell-hero/` |

> **Nota:** Si creas una nueva sección o página, también crea su carpeta en `sections/` con un `context.md` inicial.
