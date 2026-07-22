# 🔄 Protocolo: Redesign Director (Epicare)

**El comando para REDISEÑAR una sección existente.** Existe porque el loop clásico de rediseño falla siempre igual: la IA re-stylea las mismas cajas, dice "¡rediseño total!", el usuario responde "la dejaste igual", y cada iteración empeora. Este protocolo lo hace estructuralmente imposible.

> Para CREAR una sección nueva usa `creative-motion-protocol.md`. Este es para cuando algo existe y ya no gusta.

---

## ⚖️ LA DEFINICIÓN DURA DE "REDISEÑAR"

**Rediseñar = cambiar el PARADIGMA DE LAYOUT.** El DOM resultante debe tener una estructura irreconocible respecto al anterior. Si el diff se parece a "mismas cajas con otro fondo/blur/sombra/offset", NO es un rediseño — es un re-style, y entregarlo como rediseño está PROHIBIDO.

Test rápido: descríbele la sección vieja y la nueva a alguien que no las ve. Si ambas descripciones empiezan igual ("4 tarjetas en fila..."), suspendiste.

---

## FASE 0 — CARGA DE CONTEXTO (silenciosa, obligatoria, EN ESTE ORDEN)

1. `project-context/scrollytelling-map.md` — el mapa del scrollytelling ya construido en la página: qué hace cada sección vecina, qué efectos ya están "gastados", cómo fluye la narrativa.
2. `project-context/sections/<sección>/context.md` — historia y decisiones de ESTA sección (incluye qué versiones ya se descartaron — no las repitas).
3. `WorkFlow-Docs/Design-Agent-Skills/MOTION-BIBLE.md` — física + tokens de motion.
4. `WorkFlow-Docs/Design-Agent-Skills/SECTION-ARCHETYPES.md` — identifica el arquetipo de la sección y sus paradigmas.
5. `WorkFlow-Docs/Design-Agent-Skills/AWWWARDS-RUBRIC.md` — el examen final.
6. `command-prompts/tokenized-design-protocol.md` — vocabulario de tokens (medidas/colores).
7. El componente actual (`design-system-app/src/components/epicare/<X>.tsx`) + su posición y vecinos en `src/app/page.tsx`.

## FASE 1 — AUTOPSIA (visible, 5 líneas máximo)

Reporta: (a) qué paradigma usa la versión actual, (b) qué efectos GSAP tiene, (c) qué dijo el usuario que no le gusta — **si no lo dijo, PREGUNTA antes de continuar**: "¿qué es lo que ya no te gusta: el layout, el motion, el mood, todo?". Rediseñar a ciegas lo que sí gustaba es cómo se pierden títulos buenos.

## FASE 2 — 3 CONCEPTOS + STOP (el corazón del protocolo)

Propón **3 conceptos de paradigmas DISTINTOS** (usa los paradigmas del arquetipo como menú). Por cada uno entrega un **Motion Score** — guión de coreografía, NO código:

```
CONCEPTO B — "El Manifiesto Raw"
Paradigma: lista tipográfica full-width (adiós cards)
Escena 1 (entrada): líneas 1px se dibujan de izq→der (0.8s, stagger 0.15);
  el titular nace con Text-Birth scrubbed mientras la sección entra.
Escena 2 (scroll): cada fila se enciende (light-up 0.2→1) al cruzar el 70% del viewport;
  el número de fila viaja en parallax 0.85.
Escena 3 (hover): la fila se expande revelando la prosa, el título desliza 24px, acento azul.
Transición: hereda el fondo dark de DarkGradientSection y lo devuelve a light con curtain.
Diferencia estructural vs actual: de grid de 4 columnas → filas horizontales apiladas.
```

**⛔ STOP OBLIGATORIO: presenta los 3 y espera la elección del usuario. PROHIBIDO codificar antes.** Este paso de 2 minutos es el que mata el loop de 10 iteraciones.

## FASE 3 — IMPLEMENTACIÓN

Con el concepto elegido: implementa usando SOLO recetas de MOTION-BIBLE / SCROLL-EFFECTS-ARCHITECT y tokens (`src/lib/motion.ts` + DS). Composición bold, medidas disciplinadas. Verifica la transición real con las secciones vecinas de `page.tsx`.

## FASE 4 — VERIFICACIÓN (antes de avisar al usuario)

1. `pnpm build` pasa.
2. AWWWARDS-RUBRIC ≥ 12/15 (reporta la tabla; si <12, reescribe tú y re-examina).
3. Light + Dark + `prefers-reduced-motion` verificados.
4. Actualiza `project-context/sections/<sección>/context.md`: paradigma nuevo, conceptos descartados y POR QUÉ (para que la próxima IA no los repita).
5. Si hay herramienta de screenshot disponible (Chrome/Playwright), captura la sección en light y dark y MÍRALA antes de entregar.

## 🚨 REGLAS ANTI-LOOP (si el usuario rechaza el resultado)

1. "Sigue igual" / "no me gusta" → **PROHIBIDO iterar el mismo concepto con otros estilos.** Salta a otro paradigma de la FASE 2 o propón 3 nuevos. Cada rechazo QUEMA el paradigma entero, no solo esa versión.
2. **Nunca toques lo que el usuario aprobó explícitamente** (ej. "el título era perfecto") — está congelado; el rediseño ocurre alrededor.
3. Registra cada paradigma quemado en el context.md de la sección INMEDIATAMENTE (los rechazos sobreviven al compactado del chat).
4. Reporte factual: qué cambió estructuralmente, rubric, margen creativo. **Prohibido autoelogiarse** ("hipnótico", "brutal", "perfección") y prohibido preguntar "¿es este el nivel que buscabas?" — el trabajo habla.

---

**PROMPT PARA EJECUTAR:**

> "Activa el **Redesign Director** (`redesign-section-protocol.md`). Ejecuta FASE 0–1 y preséntame los 3 conceptos de la FASE 2 (Motion Scores, sin código). No codifiques hasta que elija.
>
> Sección: **[COMPONENTE]**. Lo que ya no me gusta: **[LAYOUT / MOTION / MOOD / TODO + detalles]**. Congelado (no tocar): **[ej. el titular]**."
