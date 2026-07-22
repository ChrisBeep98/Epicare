# 🗂️ Command Prompts — Índice

Protocolos **invocables** del framework Epicare. Son `.md` planos: cualquier chat o IA con acceso al repo puede ejecutarlos (referéncialos con `@ruta` o pega su bloque "PROMPT PARA EJECUTAR"). **No están atados a ninguna IA en particular.** Entrada global del framework: [`../START-HERE.md`](../START-HERE.md).

## 🎨 Diseño & Motion (crear / rediseñar UI)

| Protocolo | Cuándo usarlo |
|:--|:--|
| [`creative-motion-protocol.md`](./creative-motion-protocol.md) | **CREAR secciones de alto impacto** (hero, narrativas, reveals). Carga scrollytelling-map + MOTION-BIBLE + arquetipos + recetario + Token-Live + RUBRIC en una llamada. |
| [`redesign-section-protocol.md`](./redesign-section-protocol.md) | **REDISEÑAR una sección existente.** Censo → autopsia → 3 conceptos de paradigmas distintos (Motion Scores) → STOP para elegir → implementar → RUBRIC. Con reglas anti-loop. |
| [`tokenized-design-protocol.md`](./tokenized-design-protocol.md) | **Token-Live Mode.** Diseño/refactor rápido sin hardcodear; margen creativo declarado. |
| [`update-design-system-protocol.md`](./update-design-system-protocol.md) | Añadir/modificar tokens del DS (CSS + página interactiva + docs). |
| [`vertical-spacing-protocol.md`](./vertical-spacing-protocol.md) | Auditar/estandarizar el ritmo vertical entre secciones (single-owner). |
| [`live-editing-protocol.md`](./live-editing-protocol.md) | Edición visual en vivo / debug panel. |

## 🚀 Proceso & Mantenimiento

| Prompt | Para qué |
|:--|:--|
| [`ONBOARDING-AI-protocol.md`](./ONBOARDING-AI-protocol.md) | **Primer documento a leer** al entrar al proyecto. |
| [`update-context-prompt.md`](./update-context-prompt.md) | Actualizar el log de contexto tras un feature. |
| [`session-close-prompt.md`](./session-close-prompt.md) | Cerrar sesión (notas de sesión). |
| [`backup-brain-prompt.md`](./backup-brain-prompt.md) | Respaldo del framework a `_archive/`. |
| [`git-deploy-workflow.md`](./git-deploy-workflow.md) | Flujo de git + deploy. |
| [`optimize-images-prompt.md`](./optimize-images-prompt.md) · [`optimize-video-prompt.md`](./optimize-video-prompt.md) | Optimización de assets. |
| [`hardware-audit-prompt.md`](./hardware-audit-prompt.md) | Auditoría de rendimiento (60fps, leaks). |
| [`validation-rules.md`](./validation-rules.md) | Auditoría de consistencia del framework. |

> Los **skills** (MOTION-BIBLE, SCROLL-EFFECTS-ARCHITECT, SECTION-ARCHETYPES, AWWWARDS-RUBRIC, Tokenizer, etc.) viven en [`../WorkFlow-Docs/Design-Agent-Skills/`](../WorkFlow-Docs/Design-Agent-Skills/) y se cargan desde estos protocolos.
>
> ⚠️ Los antiguos `master-design-prompt.md`, `refactor-design-prompt.md` y `onboarding-context.md` fueron retirados a `../_archive/legacy-goams/` (marca muerta, rutas rotas). No los uses.
