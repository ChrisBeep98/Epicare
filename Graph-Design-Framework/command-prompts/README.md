# 🗂️ Command Prompts — Índice

Protocolos **invocables** del framework Epicare. Son `.md` planos: cualquier chat o IA con acceso al repo puede ejecutarlos (referéncialos con `@ruta` o pega su bloque "PROMPT PARA EJECUTAR"). **No están atados a ninguna IA en particular.** Entrada global del framework: [`../START-HERE.md`](../START-HERE.md).

## 🎨 Diseño & Motion (crear / rediseñar UI)

| Protocolo | Cuándo usarlo |
|:--|:--|
| [`narrative-arc-protocol.md`](./narrative-arc-protocol.md) | **PLANIFICAR/MODIFICAR el arco de tensión de la página completa**: valles/picos, presupuesto de pins, añadir/quitar/reordenar secciones. Opera a nivel película; los demás protocolos obedecen su arco. |
| [`copy-storytelling-protocol.md`](./copy-storytelling-protocol.md) | **ESCRIBIR/REVISAR copy** con la voz Epicare: headlines de tensión, motivo "operación real", tú neutro (jamás voseo), ES+EN, números solo del blueprint. |
| [`creative-motion-protocol.md`](./creative-motion-protocol.md) | **CREAR secciones de alto impacto** (hero, narrativas, reveals). Carga scrollytelling-map + MOTION-BIBLE + arquetipos + recetario + Token-Live + RUBRIC en una llamada. |
| [`redesign-section-protocol.md`](./redesign-section-protocol.md) | **REDISEÑAR una sección existente.** Censo → autopsia → 3 conceptos de paradigmas distintos (Motion Scores) → STOP para elegir → implementar → RUBRIC. Con reglas anti-loop. |
| [`tokenized-design-protocol.md`](./tokenized-design-protocol.md) | **Token-Live Mode.** Diseño/refactor rápido sin hardcodear; margen creativo declarado. |
| [`mobile-responsiveness-protocol.md`](./mobile-responsiveness-protocol.md) | **Zero-Friction Mobile.** Protocolo maestro y heurísticas para layouts, spacing, UX táctil y resolución de bugs híbridos en móviles (JS/GSAP vs Scroll Snap). |
| [`motion-audit-protocol.md`](./motion-audit-protocol.md) | **Motion Tokenizer & Auditoría.** Auditar, corregir y tokenizar animaciones con la firma Epicare (`motion.ts`), Hardware Symphony y Line-by-Line Clip. |
| [`update-design-system-protocol.md`](./update-design-system-protocol.md) | Añadir/modificar tokens del DS (CSS + página interactiva + docs). |
| [`vertical-spacing-protocol.md`](./vertical-spacing-protocol.md) | Auditar/estandarizar el ritmo vertical entre secciones (single-owner). |
| [`live-editing-protocol.md`](./live-editing-protocol.md) | Edición visual en vivo / debug panel. |

## 🚀 Proceso & Mantenimiento

| Prompt | Para qué |
|:--|:--|
| [`ONBOARDING-AI-protocol.md`](./ONBOARDING-AI-protocol.md) | **Primer documento a leer** al entrar al proyecto. |
| [`codebase-architecture-protocol.md`](./codebase-architecture-protocol.md) | **OBLIGATORIO antes de tocar código en `design-system-app/`.** Mapa de dónde va cada cosa, restricciones del static export, la trampa `@utility` vs `@layer utilities`, disciplina de GSAP/cleanup, checklist de "limpio y pulido", verificación anti-regresión con `design-fingerprint` y la deuda técnica abierta. |
| [`build-clean-protocol.md`](./build-clean-protocol.md) | **Build & Clean (Hardening & Purga).** Higiene *rápida* de fin de sesión sobre lo que acabas de tocar: tipos, i18n (cero `MISSING_MESSAGE`), huérfanos, pureza React 19 y build estático limpio. |
| [`production-sweep-protocol.md`](./production-sweep-protocol.md) | **Production Sweep (Barrido de Producción).** El barrido *profundo* ruta-por-ruta y sección-por-sección sobre 5 ejes: assets (optimización real con `sharp` + `ffmpeg-static`), código muerto, hardcodeo, i18n y SEO/a11y. Censo → reporte → **STOP** → ejecución, con cuarentena en vez de borrado y `design-fingerprint` como prueba de que no se movió un píxel. |
| [`update-context-prompt.md`](./update-context-prompt.md) | Actualizar el log de contexto tras un feature. |
| [`session-close-prompt.md`](./session-close-prompt.md) | Cerrar sesión (notas de sesión). |
| [`backup-brain-prompt.md`](./backup-brain-prompt.md) | Respaldo del framework a `_archive/`. |
| [`git-deploy-workflow.md`](./git-deploy-workflow.md) | Flujo de git + deploy. |
| ~~[`optimize-images-prompt.md`](./optimize-images-prompt.md)~~ · ~~[`optimize-video-prompt.md`](./optimize-video-prompt.md)~~ | ⚠️ **OBSOLETOS.** Asumen un `ffmpeg` global en `C:\Users\Grizzly\...` que no existe en esta máquina. Solo sirven como referencia de parámetros. Usa `production-sweep-protocol.md`. |
| [`hardware-audit-prompt.md`](./hardware-audit-prompt.md) | Auditoría de rendimiento (60fps, leaks). |
| [`validation-rules.md`](./validation-rules.md) | Auditoría de consistencia del framework. |

> Los **skills** (MOTION-BIBLE, SCROLL-EFFECTS-ARCHITECT, SECTION-ARCHETYPES, AWWWARDS-RUBRIC, Tokenizer, etc.) viven en [`../WorkFlow-Docs/Design-Agent-Skills/`](../WorkFlow-Docs/Design-Agent-Skills/) y se cargan desde estos protocolos.
>
> ⚠️ Los antiguos `master-design-prompt.md`, `refactor-design-prompt.md` y `onboarding-context.md` fueron retirados a `../_archive/legacy-goams/` (marca muerta, rutas rotas). No los uses.
