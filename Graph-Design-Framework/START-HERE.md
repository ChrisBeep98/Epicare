# 🧭 START-HERE — Graph Design Framework (Epicare)

**Único punto de entrada.** Cualquier IA/chat nuevo empieza aquí. Raíz de todo: `Graph-Design-Framework/`.

> ⚠️ `_archive/` = marca muerta (GO AMS/café/Playfair/violeta). JAMÁS usar como fuente de diseño. `references/` = investigación de sitios ajenos, es inspiración, no protocolo.

## Identidad en 3 líneas
**Epicare** — fintech-seguros premium. Inter Display / Inter Tight / JetBrains Mono. Marca: azul `#35BBFD` · naranja `#F26023` · dark `#2F3437` como acentos. **Bimodal siempre.** Motion de estudio: GSAP 3.15 + ScrollTrigger + Lenis global. Zero Px Policy: todo (incluido motion) sale de tokens.

## Router — ¿qué vienes a hacer?

| Intención | Carga esto |
|:--|:--|
| **Entrar al proyecto por primera vez** | `command-prompts/ONBOARDING-AI-protocol.md` |
| **Crear una sección nueva de alto impacto** | `command-prompts/creative-motion-protocol.md` |
| **Rediseñar una sección que ya no gusta** | `command-prompts/redesign-section-protocol.md` ← exige censo + 3 conceptos + STOP |
| **Refactor/diseño rápido sin hardcodear** | `command-prompts/tokenized-design-protocol.md` |
| **Entender el scroll de la página** | `project-context/scrollytelling-map.md` |
| **Tocar tokens del DS** | `command-prompts/update-design-system-protocol.md` |
| **Espaciado vertical entre secciones** | `command-prompts/vertical-spacing-protocol.md` |
| **Probar variaciones visuales en vivo** | `command-prompts/live-editing-protocol.md` + `WorkFlow-Docs/Design-Agent-Skills/DEBUG-PANEL-ARCHITECT/` |
| **Auditar calidad de una sección** | `WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-RUBRIC.md` |
| **Auditar el framework mismo** | `command-prompts/validation-rules.md` |
| **Cerrar sesión / actualizar contexto** | `command-prompts/session-close-prompt.md` · `update-context-prompt.md` |

## Los 4 pilares del conocimiento

1. **Contexto** → `project-context/` (estado vivo: `context.md`, mapa de scroll, secciones, notas de sesión)
2. **Vocabulario** → `project-context/sections/design-system/Design-System.md` + `design-system-app/src/lib/motion.ts` (tokens visuales + motion)
3. **Física y recetas** → `WorkFlow-Docs/Design-Agent-Skills/` (MOTION-BIBLE → SCROLL-EFFECTS → ARCHETYPES → RUBRIC → Tokenizer → Hardware-Symphony)
4. **Procesos** → `command-prompts/` (los protocolos invocables del router)

## Las 5 leyes (violarlas = trabajo rechazado)

1. **Nada aparece con fade-in plano.** Text-Birth, Curtain o Layered Unveiling (MOTION-BIBLE).
2. **Cero valores inventados.** Medidas del DS; motion de `motion.ts`. Desviaciones = declaradas.
3. **La página es un setlist:** consulta `scrollytelling-map.md`; ninguna sección repite la técnica-firma de su vecina.
4. **Rediseñar = cambiar el paradigma de layout**, nunca re-stylear las mismas cajas.
5. **Nada se entrega sin examen:** RUBRIC ≥ 12/15, build verde, Light+Dark, reduced-motion.
