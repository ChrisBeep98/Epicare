# 🎬 Protocolo: Creative Motion Director (Epicare)

**El comando para CREAR secciones de alto impacto de marca** (hero, narrativas, reveals, scrollytelling). Une dirección creativa + motion + tokens en una llamada.

> Para REDISEÑAR algo existente → `redesign-section-protocol.md`. Para trabajo utilitario (dashboards, tablas, forms) → solo `tokenized-design-protocol.md`.

---

## 🧠 STACK QUE SE CARGA (en este orden, sin excepciones)

| # | Documento | Qué aporta |
|:--|:--|:--|
| 1 | [`project-context/scrollytelling-map.md`](../project-context/scrollytelling-map.md) | **El mapa de la página**: qué hace cada sección vecina, técnicas gastadas, territorio virgen, la firma. |
| 2 | [`Design-Agent-Skills/MOTION-BIBLE.md`](../WorkFlow-Docs/Design-Agent-Skills/MOTION-BIBLE.md) | Física de Epicare + tokens de motion + receta de cada pilar. |
| 3 | [`Design-Agent-Skills/SECTION-ARCHETYPES.md`](../WorkFlow-Docs/Design-Agent-Skills/SECTION-ARCHETYPES.md) | Coreografía mínima por tipo de sección + paradigmas de layout. |
| 4 | [`Design-Agent-Skills/SCROLL-EFFECTS-ARCHITECT.md`](../WorkFlow-Docs/Design-Agent-Skills/SCROLL-EFFECTS-ARCHITECT.md) | Recetario técnico pesado: split-scroll, stacking, horizontal, scrollytelling, velocity, FLIP. |
| 5 | [`tokenized-design-protocol.md`](./tokenized-design-protocol.md) | **Token-Live**: TODAS las medidas salen de tokens del DS. |
| 6 | [`Design-Agent-Skills/AWWWARDS-RUBRIC.md`](../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-RUBRIC.md) | El examen final (≥12/15 para entregar). |

**Identidad (sin excepciones):** Inter Display (títulos) · Inter Tight (cuerpo) · JetBrains Mono (data) · marca azul `#35BBFD` / naranja `#F26023` / dark `#2F3437` tejidos como acentos · **bimodal Light+Dark siempre**. Metáforas fintech-seguros: claridad, control, red, confianza. Si un documento menciona Playfair, café, ámbar o violeta, estás leyendo `_archive/` — sal de ahí.

**Stack técnico:** Next 16 · React 19 · GSAP 3.15 + ScrollTrigger · Lenis global (NO re-inicializar) · tokens de motion desde `design-system-app/src/lib/motion.ts`.

---

## 🎯 FLUJO DE EJECUCIÓN

### PASO 1 — Sitúa la sección en la narrativa
Con el scrollytelling-map: ¿qué hacen las vecinas N-1 y N+1? ¿Qué técnica-firma queda libre? ¿Cómo se coreografía la transición de entrada y salida? Ninguna sección repite el efecto de su vecina.

### PASO 2 — Concepto antes que código
UNA metáfora bold y editorial. Responde: *¿qué es lo ÚNICO que alguien recordará de esta sección?* Identifica el arquetipo (SECTION-ARCHETYPES) y elige paradigma de layout. Rompe la caja en **composición** (asimetría, overlap, escala fearless), no inventando medidas.

### PASO 3 — Motion Score (guión, NO código)
Escribe la coreografía por escenas: entrada / scroll / hover / transición de salida, con tokens (`EASE.dramatic`, `STAGGER.wave`, `SCRUB.smooth`...). **Preséntalo en 6–10 líneas antes de codificar.** Si la tarea es grande o ambigua, espera OK del usuario; si es clara, continúa.

### PASO 4 — Implementación
Coreografía con los pilares de la MOTION-BIBLE (§1 Text-Birth, §2 Layered Unveiling, §3 Curtain, §4 Breathing, §5 Theater, §6 Light-up, §7 count-up/morph/magnetic). Técnicas pesadas del recetario SEA. Medidas 100% tokens DS; motion 100% tokens `motion.ts`. Solo `transform/opacity`. `gsap.context()` + revert. Reduced-motion.

### PASO 5 — Examen y cierre
1. `pnpm build` pasa.
2. **AWWWARDS-RUBRIC ≥ 12/15** — reporta la tabla; si suspende, reescribe tú antes de entregar.
3. Light + Dark verificados.
4. Actualiza `project-context/sections/<sección>/context.md` **y la entrada de la sección en `scrollytelling-map.md`**.
5. Reporte factual: técnica-firma elegida, detalle memorable, margen creativo. Sin autoelogios.

---

**PROMPT PARA EJECUTAR:**

> "Activa el **Creative Motion Director** (`creative-motion-protocol.md`). Carga el stack completo en orden (scrollytelling-map primero). Dame: (1) posición narrativa y técnica libre elegida, (2) Concepto/Metáfora en 2–3 líneas, (3) Motion Score por escenas con tokens. Luego implementa, pasa el RUBRIC y actualiza el mapa.
>
> Tarea: **[SECCIÓN/COMPONENTE NUEVO]**."
