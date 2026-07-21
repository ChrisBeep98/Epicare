# 🎬 Protocolo Unificado: Creative Motion Director (Epicare)

**Una sola llamada que une toda la dirección creativa + animación de Epicare.** Úsalo cuando construyas o rediseñes secciones de **alto impacto de marca** (hero, secciones narrativas, reveals, scrollytelling). Es la dirección "de siempre": estética Awwwards + motion cinemático, **atado a los tokens del Design System**.

> Para trabajo utilitario (dashboards, tablas, forms densos) NO uses este protocolo — usa solo `tokenized-design-protocol.md`.

---

## 🧠 STACK QUE SE CARGA (leer para calibrar el cerebro)

Al invocar este protocolo, asimila estos documentos como **una sola mente**:

| # | Documento | Qué aporta |
|:--|:--|:--|
| 1 | [`Design-Agent-Skills/CREATIVE-DIRECTION.md`](../WorkFlow-Docs/Design-Agent-Skills/CREATIVE-DIRECTION.md) | Estética anti-"AI slop": concepto/metáfora bold, editorial, memorable. |
| 2 | [`Design-Agent-Skills/CREATIVE-MOTION.md`](../WorkFlow-Docs/Design-Agent-Skills/CREATIVE-MOTION.md) | Filosofía "Surprise & Delight": romper la grilla, pacing cinemático, escala fearless. |
| 3 | [`Design-Agent-Skills/AWWWARDS-MOTION.md`](../WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-MOTION.md) | Los 3 pilares físicos: **Layered Unveiling**, **Text-Birth (Water Mask)**, **Breathing Canvas** + Theater Curtain. |
| 4 | [`Design-Agent-Skills/SCROLL-EFFECTS-ARCHITECT.md`](../WorkFlow-Docs/Design-Agent-Skills/SCROLL-EFFECTS-ARCHITECT.md) | Recetario GSAP: split-scroll, stacking cards, horizontal, scrollytelling, velocity-skew, FLIP, clip-path reveal. |
| 5 | [`Design-Agent-Skills/CINEMATIC-ARCHITECT.md`](../WorkFlow-Docs/Design-Agent-Skills/CINEMATIC-ARCHITECT.md) | Profundidad DOM-3D: capas, diegetic UI, transiciones túnel. |
| 6 | [`Design-Agent-Skills/COGNITIVE-TYPOGRAPHER.md`](../WorkFlow-Docs/Design-Agent-Skills/COGNITIVE-TYPOGRAPHER.md) | Ritmo tipográfico: tracking, text-balance, medida de línea. |
| 7 | [`Design-Agent-Skills/HARDWARE-SYMPHONY.md`](../WorkFlow-Docs/Design-Agent-Skills/HARDWARE-SYMPHONY.md) | 60fps: qué animar (transform/opacity) y qué no. |
| 8 | [`tokenized-design-protocol.md`](./tokenized-design-protocol.md) | **Token-Live**: TODAS las medidas salen de tokens. Manda sobre cualquier medida de las skills. |

---

## ⚠️ OVERRIDES OBLIGATORIOS (el DS Epicare gana SIEMPRE)

Las skills 1–5 fueron escritas para un proyecto viejo ("SalentoCoffee") y tienen especificaciones **muertas**. Toma su **filosofía y técnicas**, pero **IGNORA** estos detalles y usa el DS Epicare actual:

| ❌ Lo que dicen las skills (muerto) | ✅ Verdad Epicare (usar esto) |
|:--|:--|
| Fuente Playfair Display / serif premium | **Inter Display** (títulos, opsz 32, w600) · **Inter Tight** (cuerpo/UI) · **JetBrains Mono** (data/meta) |
| Paleta "Earthy" violeta `#A40EBB`→cian, café, ámbar | **Marca:** azul `#35BBFD` · naranja `#F26023` · gris oscuro `#2F3437` + tokens semánticos. Tejer los 3 en acentos. |
| "NEVER Dark Mode / solo Light" | **Bimodal Light + Dark** siempre (`dark:` en todo, tokens que invierten). |
| Metáforas de café / cristal ámbar / Salento | Metáforas **fintech-seguros premium**: claridad, control, red/estructura, confianza. |
| Inicializar Lenis en el componente | **Lenis YA está global** (`SmoothScrollProvider`) y sincronizado con el ticker de GSAP. **NO** re-inicialices; ScrollTrigger ya está en sync. |

**Stack técnico real:** Next 16 · React 19 · GSAP 3.15 (+ScrollTrigger) · Lenis global. Siempre `gsap.context()` + `return () => ctx.revert()`, y guarda `prefers-reduced-motion`.

---

## 🎯 FLUJO DE EJECUCIÓN (la dirección "de siempre")

### PASO 1 — Concepto antes que código (Creative Direction)
Define UNA metáfora visual bold y editorial. Responde: *¿qué es lo ÚNICO que alguien va a recordar de esta sección?* Rompe la caja en **composición** (asimetría, overlap, escala fearless, grid-break), no en la escala tipográfica.

### PASO 2 — Coreografía el movimiento (Awwwards + Scroll-Effects)
Nunca "fade in" plano. Aplica mínimo estos pilares donde apliquen:
- **Layered Unveiling:** el contenido sube en olas con peso (`power4.out`, distancias exageradas), backgrounds más lentos que el texto (parallax).
- **Text-Birth (Water Mask):** títulos nacen desde un horizonte (`overflow-hidden` + `yPercent 110→0`), línea por línea con stagger.
- **Scrollytelling light-up:** el texto/listas se "encienden" (`opacity 0.2→1`, `scrub`) al entrar en zona de lectura.
- **Image Reveal (Curtain):** imágenes con `clip-path inset(100% 0 0 0)→inset(0)`, no fade.
- **Breathing Canvas:** micro-oscilación infinita en elementos flotantes; gradientes que derivan lento.
- **Theater Curtain / pin:** secciones que se solapan con pin + scale/fade de la anterior (usa Scroll-Effects para split-scroll, stacking, horizontal, FLIP).

### PASO 3 — Medidas 100% tokens (Token-Live)
Tipografía, espaciado (h/v), gaps, paddings, max-widths, sombras y color → **solo tokens** del DS. Teje los 3 colores de marca como **acentos/detalles**, no como fondos dominantes. Cualquier valor fuera de token va **declarado** en el Reporte de Margen Creativo.

### PASO 4 — 60fps (Hardware Symphony)
Anima solo `transform` y `opacity` (y `clip-path` con cuidado). `will-change` con moderación. Nada de animar `width/height/top/left`. Cleanup de todo.

### PASO 5 — Bimodal + accesibilidad
Verifica el render en Light **y** Dark. `prefers-reduced-motion` → estados finales visibles, sin scrub ni loops.

### PASO 6 — Cierre (Self-Audit + Reporte)
Corre el Self-Audit de `tokenized-design-protocol.md` y entrega el **Reporte de Margen Creativo**. Cierra con *"Token-Live: 0 hardcodeados"* o *"N desviaciones declaradas"*.

---

## 🚫 ANTI-PATRONES (auto-revisión antes de entregar)
1. *¿Hice un `fade in` plano?* → reescríbelo como Text-Birth o Curtain reveal.
2. *¿Los elementos quedan estáticos al parar el scroll?* → agrega Breathing.
3. *¿El scroll se siente como un PDF?* → agrega Layered Unveiling / pin / parallax.
4. *¿Usé Playfair, café, violeta, o solo-light?* → PROHIBIDO. Inter + marca Epicare + bimodal.
5. *¿Inventé tamaños/colores hardcodeados?* → tokens; si te saliste, declara.
6. *¿Se ve "genérico AI"?* → sube el concepto: asimetría, escala editorial, un detalle memorable.

---

**PROMPT PARA EJECUTAR EL PROTOCOLO:**

> "Activa el **Creative Motion Director** (`creative-motion-protocol.md`). Calibra con las 8 fuentes del stack y **respeta los OVERRIDES** (Inter + marca azul/naranja/gris + bimodal; Lenis ya es global, no lo re-inicialices). Ejecuta el flujo de 6 pasos: (1) dame primero el **Concepto/Metáfora** en 2–3 líneas, (2) coreografía el motion con los pilares Awwwards + técnicas de Scroll-Effects, (3) medidas 100% tokens con los 3 acentos de marca tejidos, (4) 60fps, (5) bimodal + reduced-motion, (6) Self-Audit + Reporte de Margen Creativo. Sé bold en composición, disciplinado en medidas.
>
> Tarea: **[INSERTAR SECCIÓN/COMPONENTE]**."

***
