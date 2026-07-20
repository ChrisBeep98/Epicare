# 🎯 Protocolo: Diseño Tokenizado en Vivo (Token-Live Mode)

Usa este protocolo cuando estés **creando o refactorizando UI rápido** y quieras que la IA use el Design System **desde el primer trazo** — sin hardcodear y sin el viaje de vuelta al Tokenizer. Es el **punto medio** entre los protocolos creativos (`master-design-prompt`, `refactor-design-prompt`, AWWWARDS-MOTION, CINEMATIC-ARCHITECT) y la auditoría pesada del `Tokenizer.md`.

> **Diferencia clave:**
> - `Tokenizer.md` = **auditoría** por fases, después de escribir (diagnóstico → fix). Correctivo.
> - **Este protocolo** = **disciplina en caliente**, mientras escribes. Preventivo. No hardcodeas, así que no hay que limpiar.
>
> **Principio rector:** *La creatividad vive en la **composición, la narrativa y el movimiento**. Las **medidas** (tamaños, espaciados, sombras, colores) **siempre** salen de tokens.* Rompe la caja en layout, NO en la escala.

---

## 🚦 PRE-FLIGHT (una sola lectura, opcional)

El quick-reference de abajo te hace **autosuficiente** para trabajo rápido. Abre las fuentes completas solo si algo no está en la tabla:
- `Graph-Design-Framework/project-context/sections/design-system/Design-System.md` — inventario completo (Single Source of Truth).
- `Graph-Design-Framework/WorkFlow-Docs/Design-Agent-Skills/Tokenizer.md` — blacklist y las 5 dimensiones (usar si necesitas auditar).
- `Graph-Design-Framework/command-prompts/vertical-spacing-protocol.md` — ritmo vertical entre secciones (single-owner).
- Motor real: `design-system-app/src/app/globals.css`.

---

## 📋 QUICK REFERENCE — Vocabulario de tokens (Epicare DS)

### ✒️ Tipografía — sistema de 3 familias
- **Display · Encabezados → Inter Display (opsz 32), weight 600:** `text-display-3xl` · `text-display-2xl` · `text-display-xl` · `text-display-lg` · `text-display` · `text-display-sm` · `text-h1`…`text-h7`.
- **Cuerpo · UI → Inter Tight (heredado del body):** `text-subtitle` · `text-body-2xl`…`text-body-xs` (+ variantes `-light`, weight 300) · `text-caption`.
- **Meta · Código → JetBrains Mono:** `text-data` (cifras/montos, 600) · `text-meta` (hex/IDs/metadata, 500) · `text-overline` (eyebrows) · `text-ui-label` (botones/tags).
- ❌ Prohibido: `text-[Npx]`, `text-2xl/text-lg/...` genéricos de Tailwind, `font-[family]` o `style={{fontFamily}}` inline.

### 📐 Espaciado horizontal (marco de página)
- `px-gutter-sm` `px-gutter-md` `px-gutter-lg` `px-gutter-xl` — padding lateral de contenedores. Nunca `px-4`, `px-[20px]`.

### 📏 Ritmo vertical (entre secciones) — regla single-owner
- `py/pt/pb-section-xs` · `-sm` (baseline móvil 76px) · `-md` (default) · `-lg` (cortes narrativos).
- La sección superior posee el gap con `pb-section-*`; la inferior arranca en `pt-0`. Nunca `py-20`, `mt-[80px]`, `pt-[10vh]` para ritmo. (Detalle: `vertical-spacing-protocol.md`.)

### ↔️ Gaps de layout (flex/grid entre columnas)
- `gap-fluid-xs` `gap-fluid-sm` `gap-fluid-md` `gap-fluid-lg`. Micro-espaciado interno: `gap-1`…`gap-6`.

### 🧱 Márgenes/paddings estáticos (componentes)
- Escala `static`: `p-static-{xs|sm|md|lg|xl|2xl}`, `m-static-*`, `mt/mb/ml/mr-static-*`, `gap-static-*` (4/8/16/24/32/48px). Nunca `p-2`, `m-4`, `mt-[16px]`.

### 📦 Anchos máximos (wrappers maestros)
- `max-w-section-sm` (768px) · `-md` (1024px) · `-lg` (~1190→1280px) · `-xl` (~1420→1536px). Nunca `max-w-7xl`, `max-w-[1400px]`.

### 🌫️ Elevación / sombras
- `shadow-elevation-1` … `shadow-elevation-5`. Nunca `shadow-md`, `shadow-xl`, `shadow-2xl`.

### 🔲 Grid universal
- `grid-layout` → 12 col (desktop) / 8 (tablet) / 6 (mobile) automático. Evita `grid-cols-3 md:grid-cols-4` salvo layouts a propósito.

### 🎨 Color (semántico + marca, bimodal)
- **Superficies:** `bg-[var(--color-surface-BG-base)]` · `-BG-1/2/3/4` · `-BG-black/white`.
- **Texto:** `text-[var(--color-text-primary)]` (títulos/cuerpo, invierte por modo) · `-text-secondary` · `-text-muted` · `-text-hint` · `-text-primary-Reverted` (inverse).
- **Bordes:** `border-[var(--color-border-Strokes-default)]` · `-Hover` · `-focus` · `-strong`.
- **Marca / acentos (3 colores):** naranja `text-[var(--color-accent-main)]` (`#F26023`) · azul `text-[var(--color-text-accent-blue)]` · gris oscuro `text-[var(--color-text-accent-dark)]`. Para fondos/detalles: `[var(--color-brand-blue)]` (`#35BBFD`), `[var(--color-brand-orange)]`, `[var(--color-brand-dark)]` (`#2F3437`).
  - ⚠️ `brand-dark` NUNCA en texto (no invierte → ilegible en dark); en texto usa `text-accent-dark` o `text-primary`.
- **Acciones:** `--color-action-primary-bg` · `-primary-text` · `-link`. **Estados:** familias `--color-status-{amber|blue|green|purple|red}-*`.
- ❌ Prohibido: `bg-gray-100`, `text-black`, `text-blue-500`, `bg-white/5` crudo, cualquier `#hex` inline que no sea un token.

> **Directiva de marca (preferencia del usuario):** en secciones nuevas, teje los **3 colores de marca** (azul, naranja, gris oscuro) en acentos y detalles — no como fondos dominantes.

---

## ✅ REGLA "AL ESCRIBIR" (on-write)

Antes de teclear cualquier `className`, mapea mentalmente: *"¿esto es tamaño / espaciado / color / sombra? → ¿qué token lo cubre?"* Si existe token, úsalo. Si dudas, sube un peldaño al token más cercano.

**Excepciones permitidas (no son violación):**
1. **Mega-tipografía decorativa** > 100px (palabras gigantes de fondo): `text-[12vw]` (preferir `vw`).
2. **Mecánicas de layout/motion sin token semántico:** `w-[85vw]`, `h-[65vh]`, `translate-y-*`, `rotate-*`, `top-1/2`, transforms de GSAP, `mt-[-100vh]` (pin del Hero). Son geometría/animación, no escala del DS.
3. **Opacidades sobre tokens:** `bg-[var(--color-brand-blue)]/10`, `border-[var(--color-brand-orange)]/30`.
4. Valores realmente únicos → en `rem`, nunca `px` (salvo `1px` de hairline / `border`).

---

## 🎨 MARGEN CREATIVO (permitido, con reporte OBLIGATORIO)

El objetivo NO es amordazar la creatividad. Si el diseño gana de verdad con un valor, color, gradiente o medida que **no existe en el DS**, **estás autorizado a usarlo** — pero nunca en silencio. Toda desviación se **declara** para que el usuario decida si se queda o se promueve a token.

**Reglas del margen:**
1. Primero intenta resolverlo con tokens (o subiendo/bajando un peldaño). Solo desvíate si el token más cercano **empeora** el resultado.
2. Cada desviación va en `rem`/`vw` (nunca `px` salvo hairline) y, si es color, respeta la bimodalidad (light/dark).
3. **Decláralas todas** en un reporte al final. Una desviación **no declarada = violación**; una declarada = decisión de diseño válida.
4. Si una desviación se repite o se vuelve patrón → propón promoverla a token vía `update-design-system-protocol.md`.

**Formato del reporte (obligatorio si hubo alguna):**

```markdown
## 🎨 REPORTE DE MARGEN CREATIVO
| # | Elemento | Valor usado (fuera de token) | Token más cercano | Por qué me salí | ¿Promover a token? |
|:--|:--|:--|:--|:--|:--|
| 1 | Glow del hero | radial `#F26023→transparent` 40vw | (ninguno) | acento de marca difuso, no hay token de glow | Sí → `--gradient-glow-brand` |
```

Si NO hubo desviaciones, dilo: **"Sin margen creativo: todo salió de tokens."**

---

## 🔍 SELF-AUDIT (10 segundos, antes de entregar)

Escanea tu propio output. Si aparece algo de la izquierda, corrígelo **antes** de mostrar el código:

| Grep en tu output ❌ | Salvo que sea… |
|:--|:--|
| `text-[` con `px` | mega-tipografía en `vw` |
| `px-[`, `py-[`, `p-[`, `m-[`, `gap-[` con px/rem | mecánica de layout (vw/vh/%) |
| `text-xs/sm/base/lg/xl/2xl…` (genérico Tailwind) | nunca |
| `shadow-md/lg/xl/2xl` | nunca |
| `#hex` inline, `bg-gray/slate/*`, `text-black/white` | nunca (usa token) |
| `mt-`, `py-` arbitrario para separar secciones | usa `pb-section-*` single-owner |

Cierre obligatorio, uno de dos:
- **"✅ Token-Live: 0 valores hardcodeados."** (todo salió de tokens), o
- **"✅ Token-Live: N desviaciones creativas — ver Reporte de Margen Creativo."** (hubo margen, y está declarado arriba).

Lo único prohibido es un valor fuera de token **sin declarar**.

---

**PROMPT PARA EJECUTAR EL PROTOCOLO:**

> "Activa el **Token-Live Mode** (`tokenized-design-protocol.md`) para esta tarea. Diseña/refactoriza con toda la libertad creativa que quieras en **composición, narrativa y movimiento**, y por defecto TODAS las medidas (tipografía, espaciado horizontal/vertical, gaps, márgenes/paddings, max-widths, sombras y colores) salen de los tokens del Design System — desde el primer trazo. **Tienes margen creativo:** si un valor fuera de token mejora de verdad el diseño, úsalo, pero **decláralo** en el *Reporte de Margen Creativo* (nunca en silencio). Usa el quick-reference embebido; abre `Design-System.md` solo si algo no está ahí. Teje los 3 colores de marca en los acentos. Al terminar, corre el **Self-Audit** y confírmame *'Token-Live: 0 hardcodeados'* o *'N desviaciones creativas declaradas'* junto al código.
>
> Tarea: **[INSERTAR SECCIÓN/COMPONENTE]**."

***
