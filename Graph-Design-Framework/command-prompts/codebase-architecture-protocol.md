# 🏗️ Codebase Architecture Protocol

> **Qué es:** el mapa del código de la landing + las reglas duras para que cualquier
> cambio salga limpio y no rompa el diseño ya aprobado.
> **Cuándo usarlo:** SIEMPRE que vayas a tocar código en `design-system-app/`.
> Es el complemento técnico de [`ONBOARDING-AI-protocol.md`](./ONBOARDING-AI-protocol.md):
> ese explica el proyecto, este explica **dónde va cada cosa y qué no debes romper**.
>
> No está atado a ninguna IA. Es un `.md` plano: referéncialo con `@ruta` o pega su
> bloque final "PROMPT PARA EJECUTAR".

---

## 0 · Regla que domina a todas las demás

**El diseño desktop y mobile ya está aprobado. Ningún cambio técnico tiene derecho
a mover un píxel sin permiso explícito.**

Si un arreglo "correcto" cambia lo que se ve, no lo apliques: repórtalo, explica qué
se movería y espera decisión. Un bug de arquitectura conocido y documentado es
preferible a un rediseño accidental.

Existe una herramienta para probar que no rompiste nada. Es obligatoria (§6).

---

## 1 · Stack y restricciones no negociables

| | |
|:--|:--|
| Framework | Next.js 16 (App Router, Turbopack), React 19.2 |
| Estilos | Tailwind **v4** (sin `tailwind.config.js`; todo vive en `globals.css`) |
| Motion | GSAP 3.15 + ScrollTrigger, Lenis para smooth scroll |
| i18n | next-intl 4, **resuelto 100% en cliente** |
| Build | `output: "export"` → HTML estático a GitHub Pages bajo `basePath` `/Epicare` |

Lo que `output: "export"` te prohíbe, y que la gente olvida:

- **No hay servidor.** Ni Server Actions, ni Route Handlers, ni ISR, ni middleware,
  ni `redirects`/`headers` de `next.config`. Nada que se ejecute en request-time.
- **`next/image` no optimiza** (`images.unoptimized: true`). Los `<img>` crudos son
  una decisión deliberada, no un descuido. No los "arregles" a `next/image`.
- **El HTML se prerenderiza en build.** Todo `window`/`document`/`localStorage`/
  `navigator` va dentro de `useEffect`/`useLayoutEffect`, nunca en el cuerpo del
  componente ni en module scope.
- **`basePath` NO se aplica a `src` crudos.** Next solo prefija `next/image`,
  `next/link` y el router. Para cualquier `<img>`, `<video>`, `<source>` o fetch de
  asset **usa `asset()` de `@/lib/asset`**. Si escribes `src="/Files/..."` a pelo,
  funciona en local y se rompe en producción.

---

## 2 · Mapa: dónde va cada cosa

```
design-system-app/
├── src/app/
│   ├── layout.tsx           Fuentes (next/font), <html lang>, metadata global,
│   │                        y el anidado SmoothScrollProvider > I18nProviderClient.
│   ├── page.tsx             LA LANDING. Solo composición: importa secciones y las
│   │                        ordena. Cero lógica, cero estilos propios.
│   ├── globals.css          TODO el design system (~800 líneas). Ver §3.
│   ├── go-ams/page.tsx      Ruta pública de producto.
│   └── design-system/       Showcase INTERNO del DS. No es producción; se
│                            desactivará en el lanzamiento. No lo optimices.
├── src/components/
│   ├── epicare/             Secciones de la landing. Una sección = un archivo.
│   ├── go-ams/              Componentes exclusivos de /go-ams.
│   ├── utils/LiveEditor.tsx Herramienta de edición en vivo. Nadie la importa hoy.
│   ├── AnimatedTitle.tsx    Título con reveal por líneas (compartido).
│   └── SmoothScrollProvider Lenis + enganche al ticker de GSAP. Monta una vez.
├── src/lib/
│   ├── asset.ts             asset() → prefija basePath. OBLIGATORIO para assets.
│   └── motion.ts            Tokens canónicos de movimiento (EASE, DUR, STAGGER,
│                            REVEAL, SCRUB, TRIGGER, PARALLAX).
├── src/i18n/request.ts      Config de servidor de next-intl. Ver la trampa en §4.6.
├── messages/{en,es}.json    Diccionarios. Paridad exacta obligatoria.
├── scripts/
│   ├── design-fingerprint.mjs   Verificador anti-regresión visual (§6).
│   └── baseline/landing.baseline.html   Referencia contra la que se compara.
└── public/Files/            Assets por zona (Hero, Features, how-to-join, for-who…).
```

**Reglas de ubicación:**

1. **Una sección nueva** → `src/components/epicare/<Nombre>Epicare.tsx` + su fila en
   `src/app/page.tsx` + su contexto en `Graph-Design-Framework/project-context/sections/`.
2. **Algo usado por 2+ componentes** → sale a su propio archivo. No se duplica.
   (Precedente: `SmartVideo.tsx` se extrajo cuando lo necesitó el segundo consumidor.)
3. **Un valor de color, espaciado o tipografía** → `globals.css` como token. Nunca
   un hex ni un `px` suelto en el JSX.
4. **Un valor de easing, duración o trigger** → `src/lib/motion.ts`. Nunca inline.
5. **Texto visible al usuario** → `messages/*.json` vía `useTranslations`. Nunca
   literal en el JSX, ni siquiera en `aria-label` o `alt`.

---

## 3 · `globals.css` — la trampa nº1 de este repo

Tailwind v4 registra utilidades de dos formas y **solo una soporta variantes**:

| Forma | `md:`, `hover:`, `dark:`, `group-hover:` |
|:--|:--|
| `@utility nombre { … }` (nivel superior) | ✅ **funciona** |
| dentro de `@layer utilities { .nombre { … } }` | ❌ **NO genera CSS** |

Una clase declarada en `@layer utilities` usada como `md:mi-clase` **no existe**.
No hay error, no hay warning: el estilo simplemente no se aplica y nadie lo nota.

**Estado a 2026-08-04:** ya migrados y correctos → `py/pt/pb-section-*`, toda la
tipografía (`text-display-*`, `text-h1..h7`, `text-body-*`), `grid-layout`.
Aún en `@layer utilities` y por tanto rotos con variante → `px-gutter-*`,
`gap-fluid-*`, `shadow-elevation-*`, `max-w-section-*`.

**Antes de declarar cualquier utilidad nueva: usa `@utility`.**
**Antes de usar una existente con prefijo: comprueba cómo está declarada.**

Comando para auditar qué variantes están muertas (compara el uso real contra el CSS
compilado; requiere un `pnpm build` previo):

```bash
cd design-system-app
grep -rhoE '(sm|md|lg|xl|hover|group-hover|dark|focus):(px-gutter|gap-fluid|shadow-elevation|max-w-section|py-section|pt-section|pb-section|text-display|text-h[0-9]|text-body)[a-z0-9-]*' \
  --include='*.tsx' src/ | sort -u | while read cls; do
  lit=$(printf '%s' "$cls" | sed 's/:/\\\\:/')
  grep -rqF ".$lit" out/_next/static/chunks/*.css \
    && echo "OK      $cls" || echo "MUERTA  $cls"
done
```

> El escapado importa: en el CSS la clase se escribe `.md\:algo` con backslash
> literal. Buscar `md:algo` sin él da falsos negativos en TODO.

### Convención de nombres de tokens

Patrón real: `--color-{categoría}-{subcategoría}-{modificador}`. La categoría va
**siempre en minúscula** (`brand`, `surface`, `text`, `border`, `action`, `accent`,
`status`, `overlay`); los niveles 2 y 3 **capitalizan cuando vienen importados de
Figma** (`--color-surface-BG-white`, `--color-border-Strokes-default`,
`--color-text-Black-100`). Al añadir un token, **imita el grupo al que entra**; no
"normalices" los existentes: los consumen decenas de componentes.

El bloque `@theme` declara alias auto-referenciales (`--color-x: var(--color-x)`)
que resuelven contra `:root` y `.dark`. **Es deliberado** — es lo que hace los
tokens theme-aware. No lo "limpies".

---

## 4 · Trampas conocidas, con evidencia

### 4.1 · `ScrollTrigger.refresh()` casi no existe

Aparece **una sola vez en todo `src/`**. Cuatro cosas cambian la altura del
documento y ninguna lo llama: el cambio de idioma, el `body{overflow:hidden}` del
loader, el acordeón del FAQ y la carga de los vídeos. Es la causa raíz de los
desfases de pins.

**Si tu cambio altera la altura del documento, llama a `ScrollTrigger.refresh()`.**

### 4.2 · Disciplina de `gsap.context`

El patrón correcto, y es casi universal en el repo:

```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => { /* animaciones */ }, containerRef);
  return () => ctx.revert();
}, []);
```

Toda animación creada **fuera** del callback del contexto sobrevive al desmontaje.
Precedente real: el contador de `MetricsEpicare` creaba su ScrollTrigger fuera y
dejaba 8 huérfanos por montaje.

`BentoGridDesktop` es la **implementación de referencia** del proyecto: pin con
`invalidateOnRefresh: true`, `onRefresh` que re-mide, `end` como función,
`mm.add()` devolviendo su cleanup, `mm.revert()` en el return, y scroll programático
delegado a `window.lenis.scrollTo`. **Cópiala; no la reinventes.**

### 4.3 · Scroll programático: siempre por Lenis

`window.lenis.scrollTo(...)` con fallback. `scrollIntoView({behavior:'smooth'})` y
`window.scrollTo` **pelean con Lenis** y producen saltos.

### 4.4 · Doble montaje desktop/mobile

`BentoGridEpicare` monta `BentoGridDesktop` **y** `BentoGridMobile` con
`hidden md:block` / `block md:hidden`. Consecuencias que debes tener presentes:

- Ambos árboles se envían e hidratan siempre.
- Hay **`id` duplicados** en el DOM (`id="plataforma"` ×2). Un `href="#plataforma"`
  siempre resuelve al desktop, invisible en móvil.
- Los ScrollTrigger que usan **selector string** (`trigger: '.mi-clase'`) resuelven
  al primer match del DOM, que puede estar en `display:none`. Usa refs, o clases
  distintas por breakpoint.

### 4.5 · Vídeo e imagen: cómo se cargan

- **Vídeo decorativo → `SmartVideo`** (`src/components/epicare/SmartVideo.tsx`).
  Nunca `<video autoPlay>` crudo: descarga el archivo completo aunque esté fuera de
  pantalla o en la variante de tema oculta. `SmartVideo` usa `preload="none"` + dos
  IntersectionObserver (uno con `rootMargin` para precargar antes de asomar, otro
  para play/pause). **Un elemento en `display:none` nunca interseca**, así que la
  variante light/dark que no toca no descarga nada.
- **Excepción legítima:** el vídeo del hero mantiene `autoPlay` porque es el LCP.
- **`<img>` por debajo del fold → `loading="lazy"` + `decoding="async"`.** Sin
  `loading`, React 19 emite un `<link rel="preload" as="image">` en el `<head>` y
  mete la imagen en la ruta crítica. Precedente: 11 imágenes = 6.5 MB preloadeados.
- **Imagen de fondo decorativa bajo texto → `alt="" aria-hidden="true"`**, no un alt
  descriptivo: el título ya se anuncia como texto.

### 4.6 · i18n: todo es cliente

`I18nProviderClient` importa **ambos** JSON y elige en `useState`/`useEffect`.
Implicaciones:

- `src/i18n/request.ts` y el plugin de next-intl **no intervienen** en el render:
  nada importa `next-intl/server`, no hay middleware. La cookie `NEXT_LOCALE` que
  escribe el switcher **no la lee nadie**; la persistencia real es `localStorage`.
- El HTML estático sale en **un solo idioma** (el del `useState` inicial). El idioma
  canónico decidido es **inglés**; `layout.tsx` debe declarar `lang="en"` y su
  metadata en inglés.
- Al cambiar idioma el texto cambia de longitud y las alturas se mueven → hace falta
  `ScrollTrigger.refresh()` (§4.1).
- **Paridad obligatoria** entre `en.json` y `es.json`: mismas claves, mismos tipos,
  arrays de la misma longitud. Verifícalo con un diff de árboles, no a ojo.
- Español: **tú neutro, jamás voseo** (`trabajás`, `operás`, `vos`). Ver
  [`copy-storytelling-protocol.md`](./copy-storytelling-protocol.md).

---

## 5 · Checklist de "limpio y pulido"

Antes de decir que terminaste, todo esto debe cumplirse:

- [ ] **Tokens, no valores.** Cero hex, cero `px` sueltos, cero `cubic-bezier`
      literal en el JSX. Color y espaciado desde `globals.css`; easing y duración
      desde `lib/motion.ts`.
- [ ] **Utilidad nueva declarada con `@utility`**, no en `@layer utilities` (§3).
- [ ] **Ninguna clase fantasma.** Si usas `text-algo`, comprueba que existe.
      Precedente: `text-display-md` y `text-display-xs` se usan y nunca se declararon.
- [ ] **Ninguna variable CSS inexistente.** `color: var(--no-existe)` es inválido:
      la declaración se descarta en silencio y el elemento hereda del padre.
      Precedente: `--color-brand-cyan` y `--color-brand-purple`, 20 usos, 0 definiciones.
- [ ] **Cada animación en un `gsap.context` con `revert()`** en el cleanup (§4.2).
- [ ] **Cada `setTimeout`/`setInterval`/`addEventListener`/observer con su cleanup.**
- [ ] **`ScrollTrigger.refresh()`** si el cambio altera la altura del documento.
- [ ] **`asset()`** en todo `src` de asset (§1).
- [ ] **Texto visible en `messages/*.json`**, incluidos `alt` y `aria-label`.
      Paridad en/es verificada.
- [ ] **Sin duplicar.** Si copiaste un bloque de otro archivo, extráelo en su lugar.
- [ ] **Accesibilidad mínima:** lo interactivo es `<button>`/`<a>` real (no
      `<div onClick>`); los acordeones llevan `aria-expanded` + `aria-controls`; los
      SVG decorativos `aria-hidden="true"`; nada se revela **solo** en `:hover`
      (teclado y táctil no llegan).
- [ ] **`prefers-reduced-motion` respetado.** Patrón de referencia:
      `PeopleRevealEpicare`, `ProductLinesEpicare`, `ForWhoEpicare`.
- [ ] **`pnpm build` verde + `npx tsc --noEmit` limpio + `pnpm lint` sin errores nuevos.**
- [ ] **Huella de diseño verificada** (§6).

---

## 6 · Verificación anti-regresión: OBLIGATORIA

`scripts/design-fingerprint.mjs` extrae del HTML generado una huella estable del
diseño y la compara contra `scripts/baseline/landing.baseline.html`:

- **CLASES** — la secuencia de todos los `class` (ahí vive el layout y el estilo)
- **INLINE** — estilos inline
- **TEXTO** — copy visible e indexable
- **MEDIA** — `img`/`video` y sus atributos de carga
- **META/HEAD** — `lang`, `title`, `meta`, `link`

Normaliza lo que cambia entre builds sin que el diseño cambie (hashes de chunks,
class names de `next/font`), así que **un rebuild sin cambios de código da `0`**.

```bash
cd design-system-app
pnpm build
node scripts/design-fingerprint.mjs scripts/baseline/landing.baseline.html out/index.html
```

**Cómo leerlo:**

| Resultado | Significado |
|:--|:--|
| `TOTAL: 0` | El cambio no tocó el render. Es lo que debe salir en refactors, limpieza de código muerto y arreglos de fugas. |
| Cambios solo en **MEDIA** | Esperado si tocaste atributos de carga (`loading`, `preload`, `poster`). |
| Cambios solo en **META/HEAD** | Esperado si tocaste metadata o SEO. |
| **Cualquier cambio en CLASES, INLINE o TEXTO** | Movió el diseño o el copy. Justifícalo línea por línea o revierte. |

**Cuando el cambio de diseño SÍ es intencional y ya está aprobado**, actualiza el
baseline en el mismo commit para que el siguiente cambio se mida contra el estado
nuevo:

```bash
cp out/index.html scripts/baseline/landing.baseline.html
```

> Limitación honesta: la huella compara el HTML servido, no píxeles. No detecta
> diferencias que solo aparecen en runtime (una animación que se comporta distinto).
> Para eso hace falta abrir el navegador. **Un `TOTAL: 0` prueba que no cambiaste el
> markup, no que la animación siga sintiéndose igual.**

---

## 7 · Deuda abierta a 2026-08-04

Contexto para no re-descubrirlo. No lo arregles sin pedirlo.

**Arreglado ya** (rama `prod-hardening`): 21 MB de assets huérfanos borrados ·
6.5 MB fuera de la ruta crítica con `loading="lazy"` · 23 MB de vídeo diferidos con
`SmartVideo` · fuga de 8 ScrollTrigger en `MetricsEpicare` · timeout sin cleanup en
`HeaderEpicare` · tween a `.editorial-text` (clase inexistente) ·
`window.epicareLoaderDone` y su evento (cero consumidores) · `CallsLogo` duplicado ·
13 scripts Python de refactors one-shot. Primera pantalla: ~31 MB → ~6.8 MB.

**Pendiente, por impacto:**

| Tema | Detalle |
|:--|:--|
| Assets | `Hero_02.mp4` = 6.17 MB, es el LCP y carga eager a propósito. Los 28 vídeos no tienen `poster`. Las 11 imágenes pesadas siguen en JPEG sobre-codificado (~6.5 MB → ~690 kb en WebP q82, medido). |
| 23 estilos muertos | `gap-fluid-*`, `px-gutter-*`, `shadow-elevation-*` con variante (§3). **Activarlos cambia el diseño**: gutters de desktop en 4 secciones, el grid de `ProductLines` pasa de gap 0 a `clamp(2rem,4vw,5rem)`, y aparecen sombras en el hover de los CTA. Requiere revisión visual. |
| Tipos | 47 errores de `no-explicit-any`, casi todos `(card as any)` en los dos Bento. Un tipo `EcosystemCard` compartido los mata a todos **y** elimina el 82% de duplicación entre Desktop y Mobile **y** los 21 `#0D0D0E` a mano. |
| i18n | 9 de 22 componentes sin `useTranslations`. Hardcodeados en español dentro de la página inglesa: los 7 Q/A del FAQ, el header de Coverage52, el CTA y los links legales del footer, el marquee, y `/go-ams` completo. 29 claves huérfanas (20% del diccionario). |
| SEO | Solo `title` + `description`. Faltan `metadataBase`, openGraph, twitter, canonical, `robots`, `sitemap.ts`, JSON-LD (`FAQPage` es el más rentable). `lang="es"` con cuerpo en inglés. |
| A11y | `globals.css` tiene **0** reglas de foco y **0** bloques `prefers-reduced-motion`. FAQ, acordeones de ForWho, FlipCards y la nav del header no son operables por teclado. Los CTA del hero y 22 enlaces más no tienen destino. |
| Contraste (modo claro) | `--color-text-muted` #9AA5B1 sobre blanco = **2.50:1**; `--color-brand-blue` como texto = **2.17:1** (es el color de todos los overlines); blanco sobre el azul del CTA primario = **2.34:1**. El modo oscuro está bien. |
| CSS | 146 kb en un **único bundle compartido** entre rutas: 14.7% son reglas exclusivas de `/design-system`, y la landing usa 18 de los 98 tokens `--color-*`. |
| Reduced motion en Bento desktop | El pin vive en `mm.add("(min-width:768px) and (prefers-reduced-motion: no-preference)")` sobre una sección `md:h-screen md:overflow-hidden`: con la preferencia activada **5 de 6 cards quedan inalcanzables**. Es pérdida de contenido, no estética. |

---

## PROMPT PARA EJECUTAR

```
Vas a tocar código en design-system-app/ de este repo.

ANTES DE ESCRIBIR NADA, lee completo:
@Graph-Design-Framework/command-prompts/codebase-architecture-protocol.md

Reglas que no puedes romper:

1. El diseño desktop y mobile ya está aprobado. Si tu cambio mueve un píxel y eso
   no me lo pedí, NO lo apliques: repórtalo, dime qué se movería, y espera.
2. Tailwind v4: declara utilidades nuevas con `@utility` a nivel superior. Las que
   están dentro de `@layer utilities` no funcionan con md:/hover:/dark:.
3. Cero hex y cero px sueltos en el JSX: color y espaciado desde globals.css,
   easing y duración desde src/lib/motion.ts.
4. Todo asset con `asset()` de @/lib/asset — basePath no prefija src crudos.
5. Todo texto visible (incluidos alt y aria-label) en messages/*.json, con paridad
   en/es. Español en tú neutro, nunca voseo.
6. Cada animación dentro de un gsap.context con revert() en el cleanup. Cada
   timer/listener/observer con su cleanup. Si cambias la altura del documento,
   llama a ScrollTrigger.refresh().
7. Vídeo decorativo con <SmartVideo>, nunca <video autoPlay>. Imágenes bajo el fold
   con loading="lazy".

AL TERMINAR, ejecuta y pégame la salida:

  cd design-system-app
  npx tsc --noEmit
  pnpm lint
  pnpm build
  node scripts/design-fingerprint.mjs scripts/baseline/landing.baseline.html out/index.html

En un refactor o una limpieza, la huella tiene que dar TOTAL: 0. Si da cualquier
otra cosa, justifica cada diferencia una por una antes de que yo lo acepte.

No me digas que quedó excelente. Dime qué cambió, qué verificaste y qué no.
```
