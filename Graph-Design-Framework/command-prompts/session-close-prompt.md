# Prompt de Cierre de Sesión (Session Close)

Copia y pega este prompt al FINAL de cada sesión de trabajo para que el agente deje "notas de sesión" que el próximo agente pueda leer.

***

**PROMPT PARA CERRAR LA SESIÓN:**

> "Hola. Estamos cerrando esta sesión de trabajo. Por favor, crea una nota de sesión siguiendo estos pasos:
> 
> 1. Crea un archivo en `Graph-Design-Framework/project-context/session-notes/` con el nombre `YYYY-MM-DD_[tema-principal].md`.
> 2. Incluye estas secciones:
>    - **Resumen:** Qué se logró en esta sesión (3-5 bullets).
>    - **Decisiones Tomadas:** Decisiones de diseño o arquitectura importantes y por qué.
>    - **Pendientes:** Qué quedó sin terminar o necesita seguimiento.
>    - **Bugs Descubiertos:** Cualquier bug encontrado pero no resuelto.
>    - **Archivos Clave Modificados:** Lista de los archivos .tsx/.ts/.css/.md principales que se tocaron.
> 3. Actualiza el `context.md` de la sección correspondiente (en `sections/[nombre]/context.md`) con las entradas nuevas.
> 4. Confirma: nombre del archivo de sesión creado y entradas añadidas al contexto de sección."

***

## 📂 Notas de Sesión Existentes

| Archivo | Fecha | Tema |
|:---|:---|:---|
| `2026-03-19_framework-evolution.md` | 19 Mar 2026 | Análisis doctoral, correcciones framework, Debug Panel v2, contexto por sección, AGENTS.md |
| `2026-03-19_wave-reveal-flip-hints-purge.md` | 19 Mar 2026 | Flip hints en tarjetas sociales, hover scale, purga debug panel Wave Reveal |

> **Regla:** Cada sesión importante debe dejar su nota. No es necesario para sesiones de <30 minutos o fixes triviales.
