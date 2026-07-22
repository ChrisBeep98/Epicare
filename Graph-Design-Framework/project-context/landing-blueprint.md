# 🏛️ LANDING BLUEPRINT — Arquitectura + Copy canónico (Epicare)

**Qué es:** la fuente de verdad de QUÉ dice y QUÉ cuenta cada sección de la landing — arquitectura aprobada, arco de tensión, y el copy definitivo por sección (ES neutral + headline EN). El copy de aquí manda sobre cualquier otro documento (incluida la IA original `epicare_landing_ia_copy.html`, que queda como referencia histórica).
**Cómo se usa:** los protocolos de sección leen su entrada aquí antes de construir. Cambios de copy → editar AQUÍ primero, luego `messages/es.json`/`en.json`.
**Voz:** ver `command-prompts/copy-storytelling-protocol.md`. Regla dura: español neutro en "tú" — **el doc original tiene voseo (aplicás/podés/firmás) y está corregido aquí; nunca reintroducirlo**.

---

## ⚠️ DECISIONES DE DATOS PENDIENTES (bloquean secciones 03 y 15)

1. **Conflicto de números:** la web construida muestra `252+ carriers · 25+ años · 216+ agentes`; la IA/copy original dice `130+ carrier appointments · 5+ años · 100+ agentes · 6,000+ asegurados · Est. 2021`. Son irreconciliables — **César debe confirmar el set verdadero.** El blueprint usa provisionalmente los de la IA (más específicos y defendibles: FAQ los respalda con EIN y USPTO).
2. **Urgencia vencida:** el CTA final original ancla en "GO AMS lanza el 14 de julio de 2026" — **esa fecha ya pasó**. El copy de S15 pivota a urgencia post-lanzamiento (ver sección 15).

## 🧵 SISTEMA DE STORYTELLING (los hilos que cosen la película)

- **Motivo central — "Operación real, no promesa":** aparece en S03 ("No son proyecciones"), S06 ("Esto es infraestructura"), S07 (marquee), S11 (clímax "Somos la operación") y S15 (cierre). Es EL hilo; cada aparición sube la apuesta.
- **El viaje emocional:** reconocimiento (tu caos, S04) → liberación (un sistema, S05–S06) → confianza (humanos + hechos, S07–S10) → convicción (S11) → acción sin fricción (S13–S15).
- **Regla del naranja:** `#F26023` como color de BOTÓN es exclusivo de S15 (y el CTA móvil del hero). Reservarlo le da al cierre un peso que ningún efecto compra. (Como tinte de audiencia en ForWho está bien — botón no.)
- **Anti-cliché:** prohibido "Trusted by", "soluciones integrales", "llevar al siguiente nivel", "revolucionario". El framing es operativo y específico.

---

## 🎢 EL ARCO (15 posiciones · pins 3/3: #1, #6, #11)

```
tensión ▲  1██        3▓   4▒▒→5▓    6██      9▓        11███
        │  1██░░ 2░░░ 3▓░░ 4▒▒ 5▓░░ 6██ 7░░ 8░ 9▓ 10░░ 11███ 13░ 14░ 15▓█
        └──hook──cred─prueba─dolor─solución─PICO─humano─hechos─CLÍMAX─acción▶
```

| # | Sección | Fase | Estado | Nota clave |
|:--|:--|:--|:--|:--|
| 1 | Loader + Hero | HOOK · pin 1 | ✅ (copy swap) | |
| 2 | BrandsCarousel | valle credibilidad | ✅ (label + badges API) | absorbe S11 de la IA |
| 3 | Metrics | valle prueba + mini-pico | ✅ (⚠️ números) | **se mueve antes de DarkGradient** |
| 4 | El Problema | valle emocional DARK | 🔴 construir | mood oscuro forzado |
| 5 | La Plataforma (DarkGradient reenfocada) | solución / liberación | ✅ (copy swap) | transición dark→light = la más importante |
| 6 | Ecosistema GO (BentoGrid) | **PICO 2 · pin** | ✅ | ya con arco interno |
| 7 | PeopleReveal | respiro humano | ✅ (marquee motif) | |
| 8 | ProductLines | valle portafolio | ✅ (copy swap) | |
| 9 | Cobertura 52 | mini-pico visual | 🔴 construir (banda ligera) | grid badges mono |
| 10 | ForWho | valle decisión | 🟡 sin aprobar | |
| 11 | WhyEpicare | **CLÍMAX · pin 3** | 🔴 rediseño | manifiesto por capítulos + snap |
| 12 | Testimonials | slot reservado | ⬜ post-launch | si no hay reales, NO va (regla IA: jamás inventados) |
| 13 | Cómo unirse | valle fricción-cero | 🔴 construir | |
| 14 | FAQ | valle objeciones | 🔴 construir | acordeón — JAMÁS pin |
| 15 | CTA Final + Footer | RESOLUCIÓN | 🔴 construir | naranja debuta como botón |

**Cambios vs la IA original y por qué:**
- **ProductLines (S05-IA) baja a la posición 8:** el crescendo problema→plataforma→ecosistema no se interrumpe con el catálogo; portafolio + cobertura + audiencias forman la "zona de hechos" tras el respiro. (Bonus: es el orden ya construido — menos moves.)
- **Carriers por categoría (S11-IA) se fusiona en S02:** dos secciones de logos diluyen; S02 gana badges por línea y el destacado "Cotización directa" de los 5 con API (Ameritas, Allstate, Manhattan Life, Mutual of Omaha, Triple-S).
- **Metrics sube a la posición 3** (antes de DarkGradient): la prueba dura pega mejor pegada a la credibilidad de logos, y deja el hueco dark para El Problema.

---

## 📝 COPY CANÓNICO POR SECCIÓN

### 01 · HERO — ✅ construido · copy swap pendiente
**Eyebrow:** `Licenciados en 52 jurisdicciones · Miami, FL`
**H1:** `La agencia que trabaja para ti. No al revés.` · EN: `The agency that works for you. Not the other way around.`
**Sub:** `Epicare es una operación real: 130+ carrier appointments, presencia en todo EE. UU. y la infraestructura para que te contrates, vendas más y crezcas sin fricción.`
**CTAs:** `Únete a Epicare →` (primario) · `Ver cómo funciona` (scroll suave a S05)
**Microcopy CTA:** `Sin costo de plataforma · Incluido en tu contrato de productor`

### 02 · BRANDS CAROUSEL — ✅ · label + badges
**Label:** `Contratos activos con 130+ carriers` · EN: `Active contracts with 130+ carriers`
Badge sutil `Cotización directa` en los 5 carriers con API Eppigo. Nunca "Trusted by".

### 03 · METRICS — ✅ · copy swap + ⚠️ números
**H2:** `Cinco años construyendo lo que ahora es tuyo.` · EN: `Five years building what's now yours.`
**Sub:** `No son proyecciones. Son los números de una operación activa.` ← primera aparición del motivo.
**Métricas (provisionales, confirmar):** `5+ años · 130+ carriers · 52 jurisdicciones · 6,000+ asegurados · 100+ agentes · Est. 2021 Miami, FL`
Números en JetBrains Mono, count-up (`DUR.count`), 1 métrica héroe ≥2× las demás.

### 04 · EL PROBLEMA — 🔴 construir
**Fase:** valle emocional, **fondo dark forzado** (el único junto a S15) · Audiencia: agentes.
**Eyebrow:** `Tu día a día, hoy`
**H2:** `Demasiados sistemas. Un solo tú.` · EN: `Too many systems. Only one of you.`
**Body:** `Como agente operas entre portales de carriers que no se hablan entre sí, un CRM que no controlas, spreadsheets que nadie actualiza y correos que tardan días en responderse. No es un sistema — es una acumulación de parches.`
`Y si además tienes agentes a tu cargo, el caos se multiplica: producción que no ves, onboarding que no escala, infraestructura que no existe.`
**Grid de dolores (3×2):** `Portales desconectados — cada carrier, su propio portal; todo manual.` · `Downline invisible — sin visibilidad de tu equipo ni su producción.` · `Spreadsheets como sistema — clientes, comisiones y renovaciones en archivos.` · `Soporte sin SLAs — sin tickets, sin historial, sin tiempos.` · `Licencias sin alerta — te enteras cuando ya vencieron.` · `Producción opaca — tus datos en sistemas que no controlas.`
**Motion:** light-up de lectura (MOTION-BIBLE §6) sobre dark; dolores entran con stagger seco. SIN pin.
**Transición de salida → S05:** curtain dark→light. **La transición más importante de la página** (la liberación visual ES el mensaje).

### 05 · LA PLATAFORMA (DarkGradient reenfocada) — ✅ · copy swap
**Eyebrow:** `La solución`
**H2:** `Un sistema. Dos superpoderes.` · EN: `One system. Two superpowers.`
**Sub:** `Administra tu operación y produce nuevas ventas — todo desde un solo lugar.`
**Bloque A — Back Office · GO AMS:** `Controla tu operación.` Bullets: appointments con 130+ carriers visibles sin entrar a cada portal · Book of Business completo con coverage gaps · licencias de 52 jurisdicciones con alertas automáticas · dashboard de KPIs en tiempo real.
**Bloque B — Quote & Enroll · Powered by Eppigo:** `Produce más, más rápido.` Bullets: cotización multicarrier (solo tus appointments activos) · propuestas web interactivas con tracking de apertura · links trazables + códigos QR.

### 06 · ECOSISTEMA GO (BentoGrid) — ✅ · PICO 2 · copy swap
**H2 (title card):** `Un portal es una herramienta. Esto es infraestructura.` · EN: `A portal is a tool. This is infrastructure.`
**Sub:** `El ecosistema GO: las herramientas para que tu negocio de seguros opere como empresa, no como freelance.`
**Cards (orden):** GO AMS (core) → GO CRM → Epicare Academy → Eppigo → Solutions. CTA de GO AMS → `ams.epicareinsurance.com`.

### 07 · PEOPLE REVEAL — ✅ · marquee motif
**Marquee:** `OPERACIÓN REAL · GENTE REAL ·` (loop) · EN: `REAL OPERATION · REAL PEOPLE ·`
⚠️ Foto placeholder de Unsplash pendiente de reemplazo por foto real del equipo.

### 08 · PRODUCT LINES — ✅ · copy swap
**H2:** `Todo el portafolio. Un solo contrato.` · EN: `The whole portfolio. One contract.`
**Sub:** `Al unirte a Epicare accedes a las tres categorías — con los carriers correctos para cada una.`
**Líneas:** Life (Term, Whole, Final Expense) · Health (STM, Major Medical, ACA/Marketplace, Medicare Advantage) · Supplementary (Dental, Vision, Accident, Cancer, Hospital Indemnity, Critical Illness, Senior Supplement). *Dental/Vision jamás como categoría aparte.*

### 09 · COBERTURA 52 — 🔴 construir (banda ligera, mini-pico visual)
**H2:** `Donde estés, Epicare opera.` · EN: `Wherever you are, Epicare operates.`
**Sub:** `Licencias activas en los 50 estados, DC y Puerto Rico. Si tu libro crece hacia otro estado, nosotros ya estamos ahí.`
**Visual:** grid de 52 badges (AL…WY + DC + PR) en JetBrains Mono, encendido en ola con stagger (`STAGGER.tight`) + count-up a 52. Opción B de la IA — simple y rotunda.

### 10 · FOR WHO — 🟡 sin aprobar · copy swap
**H2:** `Diseñado para cómo trabajas.` · EN: `Built for how you work.`
**Sub:** `Agente independiente o agencia con estructura multinivel: el mismo sistema, tu modelo de operación.`
Paneles: **Agentes** (dashboard de prioridades del día · 130+ carriers en un lugar · cotiza y enrolla desde un portal · propuestas en minutos · licencias con alertas · soporte con SLAs · staff con permisos propios) / **Agencias** (vista agregada del downline · onboarding desde el portal · contratos centralizados · producción por agente · multinivel nativo · toggle Agency/Agent · tus agentes usan tu mismo sistema).

### 11 · WHY EPICARE — 🔴 rediseño · CLÍMAX pin 3
**H2:** `No somos el intermediario. Somos la operación.` · EN: `We're not the middleman. We are the operation.`
**Sub:** `La diferencia no está en los carriers que ofrecemos — está en la infraestructura que construimos para que tú produzcas más.`
**4 pilares (capítulos del pin):** `Operación probada, no promesa` (5 años, 6,000+ asegurados, 100+ agentes — te unes a algo que ya funciona) · `Tecnología que tú controlas` (visibilidad en tiempo real; nunca más reportes que llegan tarde) · `130+ carriers, un solo acuerdo` (portafolio completo sin negociar contrato por contrato) · `Un equipo que resuelve` (SLAs reales: contracting, commissions, compliance).
**Kicker de cierre del pin:** `Te unes a algo que ya funciona.`
**Motion:** pin narrativo multi-acto con snap por pilar (técnica virgen reservada) — el rediseño corre por `redesign-section-protocol.md`.

### 12 · TESTIMONIALS — ⬜ slot post-launch
**H2 (draft):** `Lo que dicen los que ya están.` Regla dura de la IA (se mantiene): sin testimonials reales, la sección NO existe en v1.

### 13 · CÓMO UNIRSE — 🔴 construir
**H2:** `De cero a producir en cinco pasos.` · EN: `From zero to producing in five steps.`
**Steps:** 1 `Aplica` — formulario básico; contracting te contacta en 24–48h hábiles. 2 `Hablamos` — una llamada para revisar tu perfil y tus carriers. 3 `Firma el acuerdo` — Exclusive Producer Agreement digital desde GO AMS, sin papel. 4 `Configura tu cuenta` — acceso activado; conecta tus carriers, revisa tu dashboard. 5 `Produce` — cotiza, enrolla y haz crecer tu libro desde un solo sistema.
**Motion:** línea de progreso que se dibuja conectando pasos (light-up secuencial). SIN pin.

### 14 · FAQ — 🔴 construir
**H2:** `Las preguntas directas merecen respuestas directas.` · EN: `Direct questions deserve direct answers.`
Acordeón, 7 preguntas (de-voseadas): costo ($0, GO AMS incluido) · ¿necesito estar en Florida? (no — 52 jurisdicciones) · ¿pierdo mis appointments? (no; además ganas acceso a 130+) · ¿funciona para agencias con downline? (sí, nativo, toggle Agency/Agent) · disponibilidad de GO AMS (**actualizar post-lanzamiento: "GO AMS está en producción desde julio 2026"**) · ¿staff con acceso? (sí — Delegate Users con permisos y audit trail) · ¿startup o compañía? (corporación 5+ años, EIN 87-1093490, EPICARE® USPTO Reg. 8148738).

### 15 · CTA FINAL + FOOTER — 🔴 construir · RESOLUCIÓN
**Fondo dark (eco del S04 — el problema quedó atrás). El naranja `#F26023` debuta como botón aquí.**
**H2:** `GO AMS ya está en marcha. ¿Estás adentro?` · EN: `GO AMS is live. Are you in?`
*(pivote post-lanzamiento — la versión original "lanza el 14 de julio" quedó vencida)*
**Sub:** `El proceso de contracting toma días, no horas. Aplica hoy y produce con el sistema completo desde tu primera semana.`
**CTAs:** `Aplicar ahora →` (naranja) · `Hablar con contracting` (texto)
**Trust strip:** `Licenciado en 52 jurisdicciones · EPICARE® USPTO Reg. 8148738 · Epicare Insurance Corp · Miami, FL · Est. 2021`
**Footer:** wordmark gigante (`text-display-3xl`, arquetipo FOOTER) · 3 columnas (marca / Ecosistema GO sin GO CALLS: AMS, CRM, Academy, Eppigo / Compañía) · legal: `© 2026 Epicare Insurance Corp · EIN 87-1093490 · NPN 19985316` + disclaimer "not a carrier" + Privacy/Terms/State Licenses.
**Motion:** gradient morph de mood al entrar (§7), Text-Birth del H2, botón magnético (§7), wordmark con curtain al aterrizar.

---

## NAV (transversal — ya existe como HeaderEpicare)
Pill flotante, siempre visible: `Productos` (→06) · `Para agencias` (→10) · `Carriers` (→02) · `FAQ` (→14) · CTA `Únete →` idéntico al hero.
