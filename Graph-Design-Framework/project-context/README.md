# 📂 Navegación del Contexto del Proyecto

> **Sistema de Capas:** El contexto del proyecto está organizado en 3 capas para mantener los archivos lean y enfocados.

## 🗂️ Capa 1: Contexto Global

| Archivo | Propósito | Cuándo Leer |
|:---|:---|:---|
| [`context.md`](./context.md) | **Contexto activo.** Stack, estándares, estructura, y las últimas acciones críticas. | **SIEMPRE** — Es obligatorio en el Pre-Flight del Onboarding. |
| [`context-archive-phase1-7.md`](./context-archive-phase1-7.md) | **Archivo histórico.** Entradas #1-#38 (Feb–16 Mar 2026). Fases 1-7 completadas. | Solo si necesitas entender una decisión de diseño antigua. |
| [`variables-entorno.md`](./variables-entorno.md) | Variables de entorno para desarrollo local. | Solo al configurar el entorno por primera vez. |

## 🧩 Capa 2: Contexto por Sección

| Carpeta | Índice |
|:---|:---|
| [`sections/`](./sections/) | **12 carpetas** — una por cada sección del proyecto, cada una con su propio `context.md` |

> Ver [`sections/README.md`](./sections/README.md) para el inventario completo y el formato estándar.

**Uso:** Cuando vas a trabajar en una sección específica (ej: Calculator), lee `sections/calculator/context.md` para cargar SOLO el historial de esa sección.

## 🔄 Protocolo de Archiving

Cuando `context.md` supere las **~15 entradas activas** en la Sección 5:

1. Crear un nuevo archivo `context-archive-phaseX-Y.md`
2. Mover las entradas antiguas al nuevo archivo
3. Actualizar esta tabla con el nuevo archivo
4. Mantener un resumen de 1 línea en `context.md` apuntando al archivo

> **Regla:** El archivo `context.md` nunca debe superar ~150 líneas.
