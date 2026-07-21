# 🗂️ Command Prompts — Índice

Protocolos y prompts **invocables** del framework GO AMS / Epicare. Son archivos `.md` planos: cualquier chat o IA con acceso al repo puede leerlos y ejecutarlos (referéncialos con `@ruta` o pega su bloque "PROMPT PARA EJECUTAR"). **No están atados a ninguna IA en particular.**

## 🎨 Diseño & Motion (crear / refactorizar UI)

| Protocolo | Cuándo usarlo |
|:--|:--|
| [`creative-motion-protocol.md`](./creative-motion-protocol.md) | **Secciones de alto impacto de marca** (hero, narrativas, reveals). Unifica en UNA llamada las 8 fuentes creativas/motion (Creative Direction, Creative/Awwwards Motion, Scroll-Effects, Cinematic, Cognitive Typographer, Hardware Symphony + Token-Live). Incluye los OVERRIDES del DS Epicare. |
| [`tokenized-design-protocol.md`](./tokenized-design-protocol.md) | **Token-Live Mode.** Diseño/refactor rápido sin hardcodear: todas las medidas salen de tokens, con margen creativo declarado. Punto medio entre lo creativo y el Tokenizer. |
| [`master-design-prompt.md`](./master-design-prompt.md) | "God command" original (⚠️ rutas/fuentes legacy — preferir los dos de arriba para Epicare). |
| [`refactor-design-prompt.md`](./refactor-design-prompt.md) | Re-imaginar un componente existente desde cero. |
| [`update-design-system-protocol.md`](./update-design-system-protocol.md) | Añadir/modificar tokens del DS (CSS + página interactiva + docs). |
| [`vertical-spacing-protocol.md`](./vertical-spacing-protocol.md) | Auditar/estandarizar el ritmo vertical entre secciones (single-owner). |
| [`live-editing-protocol.md`](./live-editing-protocol.md) | Edición visual en vivo / debug panel. |

## 🚀 Proceso & Mantenimiento

| Prompt | Para qué |
|:--|:--|
| [`ONBOARDING-AI-protocol.md`](./ONBOARDING-AI-protocol.md) | **Primer documento a leer** al entrar al proyecto. |
| [`onboarding-context.md`](./onboarding-context.md) | Contexto de arranque. |
| [`update-context-prompt.md`](./update-context-prompt.md) | Actualizar el log de contexto tras un feature. |
| [`session-close-prompt.md`](./session-close-prompt.md) | Cerrar sesión (notas de sesión). |
| [`backup-brain-prompt.md`](./backup-brain-prompt.md) | Respaldo de conocimiento del proyecto. |
| [`git-deploy-workflow.md`](./git-deploy-workflow.md) | Flujo de git + deploy (GitHub Pages). |
| [`optimize-images-prompt.md`](./optimize-images-prompt.md) · [`optimize-video-prompt.md`](./optimize-video-prompt.md) | Optimización de assets. |
| [`hardware-audit-prompt.md`](./hardware-audit-prompt.md) | Auditoría de rendimiento/hardware. |
| [`validation-rules.md`](./validation-rules.md) | Reglas de validación. |

> Los **skills** (Awwwards-Motion, Creative-Direction, Cinematic-Architect, Tokenizer, etc.) viven en [`../WorkFlow-Docs/Design-Agent-Skills/`](../WorkFlow-Docs/Design-Agent-Skills/) y se cargan desde estos protocolos.
