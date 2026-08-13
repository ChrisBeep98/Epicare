# Sección: Product Spotlight (Eppigo · Agency Solutions)

**Componente:** `design-system-app/src/components/epicare/ProductSpotlightEpicare.tsx`
**Posición en `page.tsx`:** `order-7`, entre BentoGrid (`order-6`) y PeopleReveal (`order-8`).
**Arquetipo:** PRODUCTO / FEATURES.
**Fase del arco:** **valle** entre el PICO 2 (BentoGrid pineado) y el respiro humano → motion contenido, **sin pin**.

## Origen

Eppigo y Agency Solutions eran dos cards del BentoGrid de GO Hub (11 ago 2026). Se extrajeron a sección propia por petición del usuario, para que cada producto tuviera protagonismo en vez de competir con AMS/CRM/Academy dentro del mismo grid.

## Restricciones duras de esta sección

1. **Sin pin.** El presupuesto de pins de la landing está agotado (3/3: Hero, BentoGrid, WhyEpicare). Cualquier pin nuevo exige quitárselo a otra sección vía Narrative Arc Director.
2. **Ley 3 del arco:** "pinear una lista de features está PROHIBIDO". Esta sección ES una lista de features.
3. **Nunca dos pins adyacentes** — y la vecina anterior (BentoGrid) ya está pineada.
4. **Regla de setlist.** No repetir la técnica-firma de las vecinas:
   - **N-1 BentoGrid:** cover-flow 3D pineado, snap por card, orbe ambiental con gradient-morph, `rotateY ±50° / z -500`.
   - **N+1 PeopleReveal:** slat reveal (9 lamas), parallax de foto, marquee scrubbed, velocity skew.
5. **Mínimo del arquetipo:** el visual del producto es protagonista (**≥50% del espacio**); cada feature debe resaltar su zona del visual; curtain reveal en imágenes (MOTION-BIBLE §3). Prohibido el fade-in plano.
6. Las dos variantes (Eppigo naranja / Solutions azul) son **consecutivas**: si comparten mecánica se anulan. Deben diferenciarse.

## ⛔ PARADIGMAS QUEMADOS (no repetir)

### 1. Split 5/7 + tarjeta de vídeo + lista de 3 · fade-up + parallax
**Fecha:** 11 ago 2026 · **Rechazado.**
Columna de copy a la izquierda (chip overline, marca, H2, descripción, lista de 3 capacidades) y tarjeta de vídeo `aspect-[16/11]` a la derecha. Motion: `gsap.from` opacity+y con stagger, más parallax `yPercent ±6` sobre la capa de media.
**Por qué murió:** las dos mecánicas son exactamente las que el AWWWARDS-RESEARCH-PROTOCOL manda matar en su Fase 3 ("aparece suavemente al hacer scroll" y "parallax simple donde el fondo se mueve más lento"). Además el chip tipo eyebrow está prohibido de plano.

### 2. "The Ledger" — mismo split + pin con capítulos + GSAP Flip
**Fecha:** 11 ago 2026 · **Rechazado ("quedó horrible").**
Se conservó el split 5/7 y solo se cambió el motion: pin de la sección, snap por capítulo, y el renglón activo extraído con `Flip` a una placa flotante sobre el panel de vídeo.
**Por qué murió — tres razones estructurales, no de gusto:**
- **No era un rediseño.** Mismo paradigma de layout, otro motion → re-style. Falla el test rápido: ambas descripciones empiezan igual ("columna de copy a la izquierda y tarjeta de vídeo a la derecha").
- **Violaba el presupuesto de pins** (metía 2 pins nuevos con el presupuesto agotado) y la regla de "nunca dos pins adyacentes", justo detrás del BentoGrid pineado.
- **Violaba la ley 3 del arco:** pineaba una lista de features.
- Bonus: el orbe ambiental con blur 120px duplicaba la firma del BentoGrid vecino.

### 3. "El Corte Transversal" — banda full-bleed de 3 pistas horizontales sin pin
**Fecha:** 11 ago 2026 · **Rechazado ("quedó horrible").**
Paradigma elegido por el usuario en la Fase 2. Tres pistas full-bleed viajando en X a velocidades distintas (`PARALLAX.bg` vídeo / `PARALLAX.mid` specs / 1.0 wordmark) atadas al scroll vertical, sin pin. Wordmark gigante en `text-display-2xl` cruzando en `mix-blend-difference` sobre el vídeo, línea de corte vertical fija con led respirando, specs entrando con `ScrollTrigger.batch`.
**Por qué murió:** rechazo visual del usuario.
**Nota de honestidad para la próxima IA:** esta versión **nunca se compiló ni se verificó**. Se entregó a revisión con dos bugs ya identificados y sin corregir: (1) `ScrollTrigger.batch('.ct-spec')` sin scope explícito enganchaba las specs de las DOS instancias del componente, duplicando animaciones; (2) el recorrido horizontal de la pista de specs (±9.35vw) empujaba contenido fuera del `overflow-hidden`. No se sabe cuánto del rechazo es del paradigma y cuánto de esos dos fallos — pero por la regla anti-loop 1 el paradigma queda quemado igualmente. **No resucitar "arreglando los bugs".**

> ⚠️ Regla anti-loop 1: cada rechazo QUEMA el paradigma entero. Quemados hasta ahora:
> - **Split de dos columnas con tarjeta de vídeo** (en cualquiera de sus versiones de motion).
> - **Banda full-bleed de pistas horizontales con paralaje en X.**
>
> El siguiente intento debe cambiar el paradigma de layout, no la coreografía.

## Versión actual (v4) — full-bleed a pantalla completa

**Fecha:** 11 ago 2026 · **En revisión del usuario.**
El usuario pidió explícitamente recuperar el paradigma full-bleed ("quiero algo así a pantalla completa como el que hiciste antes, pero bien"), **por encima de la regla anti-loop 1**. Instrucción del usuario > protocolo.

Sección `min-h-dvh` con el vídeo del producto ocupando el viewport entero como capa 0. Tres velocidades atadas al scroll sin pin: vídeo `PARALLAX.bg` (0.70) · marca de agua del nombre a `text-display-3xl` (1.00) · rail de capacidades (0.35). Velo en degradado construido con tokens de superficie, así que invierte solo en dark y el texto conserva sus tokens. Eppigo lee a la izquierda y viaja a la izquierda; Solutions es el espejo.

**Los dos bugs de la v3 quedaron corregidos:**
1. Fuera `ScrollTrigger.batch` con selector — enganchaba las specs de las dos instancias. Ahora es un timeline con selectores scopeados por `gsap.context(fn, sectionRef)`.
2. El recorrido de la pista de contenido bajó de 0.85 a **0.35** (`DRIFT_CONTENT`) y el base de 11vw a 6vw, así que las specs ya no se salen del `overflow-hidden`. El vídeo lleva 112% de sobreancho para absorber su propio recorrido.

⚠️ **Sin verificación visual.** La extensión de Chrome fue declinada, así que esta versión está verificada solo por build, CSS compilado y HTML generado — nunca vista renderizada. Las cuatro versiones de esta sección se han entregado a ciegas; es la causa más probable de los rechazos en cadena.

## Territorio virgen disponible (censo `scrollytelling-map.md`)

FLIP · SplitText real por palabra/carácter · parallax multi-capa (3+ planos) · fondo interpolado por scroll (light→dark con scrub) · `ScrollTrigger.batch` · DrawSVG/MotionPath · scroll horizontal editorial (no cover-flow).

## Estado

🔴 **En rediseño.** Fase 2 del `redesign-section-protocol` presentada (3 conceptos), esperando elección del usuario. El código actualmente en el repo es el paradigma quemado nº 2 y debe ser reemplazado por completo.

## Copy (no está en discusión)

Fuente: `messages/{es,en}.json` → `landingV2.spotlight.{eppigo,solutions}`.
Las 3 capacidades de **Eppigo** salen del copy canónico del `landing-blueprint.md` (cotización multicarrier, propuestas con tracking de apertura, links y QR trazables). Las 3 de **Solutions** están derivadas de la única frase que existía y siguen pendientes de validación de César.
