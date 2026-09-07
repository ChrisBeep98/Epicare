# 🧽 PRODUCTION SWEEP PROTOCOL — Barrido de Producción

> **Qué es:** el barrido profundo **ruta por ruta y sección por sección** que convierte una página hecha a
> velocidad de vibecoding en una página de producción. Cinco ejes: **assets, código muerto, hardcodeo,
> i18n y SEO/a11y**. Su promesa: bajar peso y deuda **sin mover un píxel** del diseño aprobado.
>
> **Cuándo usarlo:** solo cuando el usuario lo invoque sobre una ruta concreta
> (*"aplica el barrido a `/go-crm`"*). **No se ejecuta solo, ni "de paso" dentro de otra tarea.**
>
> **Qué NO es:**
> - No es [`build-clean-protocol.md`](./build-clean-protocol.md) — ese es higiene rápida de fin de sesión
>   (tsc + build + huérfanos + fingerprint) sobre lo que acabas de tocar. Este es lento, exhaustivo y
>   **obligatoriamente por secciones**.
> - No es un rediseño. Si algo se ve feo o pobre → [`redesign-section-protocol.md`](./redesign-section-protocol.md).
> - **Sustituye** a `optimize-images-prompt.md` y `optimize-video-prompt.md`, que apuntaban a un `ffmpeg`
>   instalado en `C:\Users\Grizzly\...` — una máquina que no es esta — y a un `winget` que este SKU de Windows
>   no tiene. Este protocolo trae la cadena de herramientas real, instalada y verificada (§3).
>
> **Prerrequisito de lectura:** [`codebase-architecture-protocol.md`](./codebase-architecture-protocol.md).
> Sin él no sabes qué NO puedes romper.

---

## 0 · Las 7 leyes del barrido

1. **La unidad de trabajo es UNA sección, nunca "la página".** Una ruta se barre en el orden de render de su
   `page.tsx`. Se cierra una sección —los 5 ejes, verificada y commiteada— antes de abrir la siguiente.
   *Por qué:* un barrido global produce un diff de 60 archivos que nadie puede revisar ni revertir.

2. **Auditar ≠ ejecutar.** El ciclo es **censo → reporte → STOP → autorización → ejecución**. Jamás optimices
   ni borres en el mismo turno en que descubriste el problema. El STOP es del usuario, no tuyo.

3. **Nada se borra: se pone en cuarentena.** `grep` miente — este repo construye rutas de asset
   dinámicamente (§9.1). Mover a `_quarantine/` → build verde → fingerprint limpio → borrar en un commit aparte.

4. **El píxel es sagrado.** Un barrido es un refactor: `design-fingerprint.mjs` debe dar **`TOTAL: 0`**
   salvo en el eje **MEDIA** (esperado al tocar `loading`/`poster`/extensión de archivo). Cualquier cambio en
   **CLASES, INLINE o TEXTO** se justifica línea por línea o se revierte. No hay tercera opción.

5. **Un eje, un commit.** `perf(assets):`, `chore(purge):`, `refactor(tokens):`, `feat(i18n):`, `feat(seo):`.
   Un commit mixto es irreversible en la práctica.

6. **Sin medición antes y después, no hubo optimización.** Toda acción de peso reporta
   `KB antes → KB después → % reducción`. "Lo optimicé" sin cifras no cuenta como hecho.

7. **La calidad visual manda sobre el peso.** Si la diferencia se nota a ojo en pantalla real, la compresión
   fue demasiado agresiva: sube calidad y reporta el peso mayor. **El LCP nunca se sacrifica.**

---

## 1 · Los 5 ejes

| # | Eje | Qué caza | Criterio de "limpio" |
|:--|:--|:--|:--|
| **A** | **ASSETS** | Formato obsoleto, sobre-resolución, sobre-codificación, estrategia de carga, `poster` ausente | Raster en WebP · nada por encima de su cap de resolución · todo `<img>` bajo el fold con `loading="lazy" decoding="async"` · todo vídeo decorativo en `<SmartVideo>` con `poster` |
| **B** | **CÓDIGO MUERTO** | Assets sin referencia, componentes sin import, rutas de preview, variantes de prueba, bloques comentados, claves i18n huérfanas, exports sin consumidor | `0` huérfanos en el censo de la sección |
| **C** | **HARDCODEO** | `text-[15px]`, `#0D0D0E`, `cubic-bezier(...)` inline, `as any`, magic numbers | Todo desde `globals.css` y `lib/motion.ts`; desviación viva = declarada en Reporte de Margen Creativo ([`tokenized-design-protocol.md`](./tokenized-design-protocol.md)) |
| **D** | **i18n** | Texto visible literal en JSX (incluidos `alt` y `aria-label`), paridad en/es rota, voseo | `useTranslations` en todo componente con texto · paridad exacta de claves y longitudes de array · tú neutro |
| **E** | **SEO / A11Y** | Metadata ausente, sitemap incompleto, sin OG image, `<div onClick>`, sin foco visible, sin `prefers-reduced-motion`, `alt` decorativos mal puestos | Cada ruta pública con metadata propia + entrada en sitemap · interactivo = `<button>`/`<a>` real · reduced-motion cubierto |

**Orden obligatorio dentro de una sección: A → B → C → D → E.**
Los assets primero porque cargan el mayor peso con el menor riesgo de diseño; el hardcodeo después porque es
donde más fácil se rompe un píxel.

---

## 2 · Línea base medida — 2026-09-07

El punto de partida real de `design-system-app/`. **Re-mide antes de empezar**; estas cifras envejecen.

**Assets — `public/` = 73 MB**

| Formato | Archivos | Peso | Diagnóstico |
|:--|--:|--:|:--|
| `.jpg` + `.jpeg` | 62 | **33.1 MB** | Sobre-codificados. El eje de mayor retorno del proyecto. |
| `.mp4` | 22 | **33.2 MB** | Ninguno tiene `poster`. |
| `.png` | 29 | 5.5 MB | Varios son fotos que deberían ser WebP, no PNG. |
| `.webp` / `.avif` | 4 / 1 | 0.09 MB | Prácticamente sin adoptar. |
| `.svg` | 14 | 0.06 MB | OK — los SVG no se tocan. |

**Huérfanos: 44 archivos = 19.48 MB (27 % de `public/`).** Incluye `Isometric_wireframe…mp4` (3.52 MB),
5 fotos de `Epicare_Landing/Hero/` (3.96 MB), 4 `banners/cta-*.jpg` (2.02 MB), 4 `landing/go-ams/flow_*.jpg`
(2.22 MB) y los 6 SVG de plantilla de Next (`next.svg`, `vercel.svg`, `window.svg`, `file.svg`, `globe.svg`).

**Los 6 más pesados vivos:** `Hero_02.mp4` 6.17 MB (**es el LCP**) · `go_ams_hero.mp4` 4.10 MB ·
`CRM_Hero.png` 3.00 MB (PNG de 3 MB: debe ser WebP) · `support_dark.mp4` 2.48 MB ·
`Earnings_V3_Dark.mp4` 2.45 MB · `go-ams-quote.jpeg` 2.23 MB.

**Código**

| Métrica | Estado | Objetivo |
|:--|--:|:--|
| Píxeles arbitrarios en JSX (`[NNpx]`) | **317** | Tokens o desviación declarada |
| Hex hardcodeados en JSX | **335** | Tokens semánticos |
| `<img>` sin `loading=` | **30 de 34** | Todos salvo LCP |
| `<video>` crudos vs `<SmartVideo>` | 5 vs 12 | Solo el hero puede ser crudo |
| `src="/..."` sin `asset()` | 2 | 0 — rompe en GitHub Pages |
| `as any` | **43** | 0 (un tipo `EcosystemCard` compartido mata la mayoría) |
| Componentes sin `useTranslations` | **24 de 58** | Solo los que genuinamente no tienen texto |

**SEO / rutas**

- Metadata propia: solo `/`, `/go-ams`, `/go-crm`. **`/licensing` no tiene**, y está enlazada desde
  `HeaderEpicare.tsx:84`.
- `sitemap.ts` lista 3 URLs — **falta `/licensing`**.
- **No existe imagen OG** (1200×630). Todo preview compartido sale sin miniatura.
- **4 rutas de preview llegan a producción:** `/preview-spotlight`, `/preview-spotlight/dark`,
  `/preview-spotlight/sol`, `/preview-spotlight/sol-dark`. El propio archivo dice
  *"BORRAR al terminar la revisión visual: no debe llegar a producción"*.

---

## 3 · Herramientas — estado y qué hay que construir

**Cadena de herramientas: CLIs globales en el perfil del usuario. Cero dependencias en el repo.**

Esta máquina es **Windows 11 IoT Enterprise LTSC** y **no tiene `winget`, ni Chocolatey, ni Scoop** — por eso
fallaron los prompts anteriores. La instalación es de binarios estáticos en `%USERPROFILE%\Tools`, añadidos al
**PATH de usuario** (sin permisos de administrador):

| Herramienta | Versión | Ubicación | Para qué |
|:--|:--|:--|:--|
| `ffmpeg` · `ffprobe` | 9.0.1 (gyan.dev essentials) | `%USERPROFILE%\Tools\ffmpeg\bin` | Recodificar vídeo · extraer posters · leer dimensiones/duración/bitrate de **cualquier** asset (también imágenes) |
| `cwebp` · `dwebp` · `webpinfo` | libwebp 1.6.0 (Google) | `%USERPROFILE%\Tools\libwebp\bin` | Encoder WebP de referencia. Mejor que el `libwebp` embebido de ffmpeg gracias a `-m 6 -af` |

**Instalado y verificado el 2026-09-07.** ✅ Los 4 binarios responden desde cualquier directorio.

> **Si una shell no los reconoce** (una sesión abierta antes de la instalación no hereda el PATH nuevo):
> ```powershell
> $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
> ```
>
> **En Git Bash** las rutas son `/c/Users/<usuario>/Tools/ffmpeg/bin` y `/c/Users/<usuario>/Tools/libwebp/bin`.
>
> ⚠️ **Nota de CI:** GitHub Actions **no** tiene estas herramientas. Los assets se optimizan **en local y se
> commitean ya optimizados** — el pipeline de deploy no ejecuta nada de esto. Si algún día se quiere en CI,
> añadir un `uses: FedericoCarboni/setup-ffmpeg@v3` al workflow.

### Los 3 scripts a construir (en `design-system-app/scripts/`)

Se construyen **una sola vez**, en el primer barrido, y se commitean como herramienta permanente.
**Invocan a los CLIs globales por `child_process`; no importan ninguna librería npm** — así el repo no gana
dependencias y los scripts siguen funcionando aunque se borre `node_modules`.

| Script | Qué hace | Salida |
|:--|:--|:--|
| **`asset-audit.mjs`** | Recorre `public/`; por cada asset: peso, formato, dimensiones/duración/bitrate (`ffprobe`), **qué componentes lo referencian** (por basename sobre `src/` + `messages/`), flag de huérfano, y estrategia de carga detectada (`loading`, `<SmartVideo>` vs `<video>`, `poster`). Agrupa por sección cuando se le pasa `--route`. | Tabla en consola + `scripts/reports/assets-<fecha>.json` |
| **`optimize-assets.mjs`** | Ejecuta las recetas de §4. **Escribe siempre junto al original, nunca encima.** Flags: `--dry-run` (default), `--images`, `--videos`, `--posters`, `--path <glob>`, `--quality <n>`. Imprime la tabla antes/después. | Archivos nuevos + tabla de reducción |
| **`dead-code-audit.mjs`** | Componentes en `src/components/` sin import alcanzable desde `src/app/`; rutas en `src/app/` sin enlace entrante ni entrada en sitemap; claves de `messages/*.json` sin `t("…")` que las consuma; diferencias de estructura en/es. | Listado accionable |

> **`design-fingerprint.mjs` ya existe** y es la prueba de la ley 4. Úsalo, no lo reescribas.

### Prerrequisito: baseline por ruta

Hoy solo existe `scripts/baseline/landing.baseline.html`. **Antes de barrer cualquier otra ruta**, congela su
baseline en el estado aprobado actual:

```bash
cd design-system-app
pnpm build
cp out/go-crm/index.html scripts/baseline/go-crm.baseline.html
```

Sin baseline no hay ley 4, y sin ley 4 este protocolo no puede garantizar nada.

---

## 4 · Recetas de optimización

> **Rendimiento medido de esta cadena** (2026-09-07, sobre assets reales del repo). No son estimaciones:
>
> | Asset | Antes | Después | Reducción |
> |:--|--:|--:|--:|
> | `CRM_Hero.png` 2952×1588 → WebP q88, **resolución nativa** | 3.00 MB | **215 KB** | **−93 %** |
> | `CRM_Hero.png` → WebP q88, **cap 1440** | 3.00 MB | **88 KB** | **−97 %** |
> | `support_dark.mp4` 1280×720 24fps 10s → H.264 CRF 27 `-an` | 2.48 MB | **200 KB** | **−92 %** |
> | idem CRF 30 | 2.48 MB | **130 KB** | **−95 %** |
> | poster extraído del mismo vídeo | — | 18 KB | — |
>
> Dos lecciones: **(1)** el grueso de la ganancia viene del *formato y de la recodificación*, no del recorte de
> resolución — así que se puede ser conservador con los caps. **(2)** los MP4 originales llevan **pista de audio
> AAC** (verificado en `support_dark.mp4`) en vídeos que se reproducen `muted`: peso 100 % muerto.

### 4.1 · Imágenes (`cwebp`)

| Rol del asset | Formato destino | Calidad | Cap de ancho |
|:--|:--|--:|--:|
| Foto full-bleed / hero visual | WebP | 82 | 1920 px |
| Imagen de card, showcase, mockup de UI | WebP | **88** (el texto de UI y los degradados hacen banding a 82) | 1440 px |
| Fondo decorativo bajo texto, aura, blob | WebP | 70 | 1280 px |
| Thumbnail, avatar, icono raster | WebP | 80 | 2× el tamaño de display |
| Logo, icono, ilustración vectorial | **SVG — no se toca** | — | — |
| PNG con transparencia real necesaria | WebP (soporta alfa) | 88 | igual que su rol |

**Comando base:**

```bash
cwebp -q <calidad> -m 6 -af -metadata none -resize <cap> 0 entrada.jpg -o salida.webp
```

- `-m 6` → esfuerzo de compresión máximo (más lento, archivo menor, misma calidad visual).
- `-af` → auto-filter; reduce artefactos de bloque en degradados y auras.
- `-metadata none` → tira EXIF/ICC. Varias fotos del repo arrastran metadata de cámara inútil.
- `-resize <ancho> 0` → el `0` conserva el aspect ratio. **Omite el flag si el original ya está bajo el cap.**
- Para PNG con transparencia añade `-alpha_q 100`.

**Reglas duras:**
- **Nunca hagas upscale.** Si el original es menor que el cap, omite `-resize`.
- **Un PNG que es una fotografía es un bug**, no una decisión (`CRM_Hero.png`, 3 MB → 215 KB sin tocar resolución).
- **Comprueba el resultado con `dwebp`** antes de dar por buena una conversión agresiva: decodifica a PNG y
  compara a ojo. La ley 7 manda sobre la tabla.
- **AVIF solo para los 3-4 hero más pesados**, y siempre vía `<picture>` con fallback WebP. No lo apliques en
  masa: comprime más pero encoda ~10× más lento y complica el markup — y cada `<picture>` mueve el fingerprint.
- Actualiza la referencia en el `.tsx` **en el mismo commit** que introduce el archivo nuevo.

### 4.2 · Vídeo (`ffmpeg`)

| Rol | CRF | Extra |
|:--|--:|:--|
| Hero / LCP visible a pantalla completa | **24** | Mantiene `autoPlay`. Cap 1920. Es la excepción legítima de `SmartVideo`. |
| Vídeo de card visible, contenido real | 27 | Cap 1280 — se ve dentro de una tarjeta, no a pantalla completa. |
| Fondo decorativo con blur/overlay | 30 | Cap 1280. |

**Comando base:**

```bash
ffmpeg -y -i entrada.mp4 -c:v libx264 -preset slow -crf <crf> -an \
       -movflags +faststart -pix_fmt yuv420p salida.mp4
```

Con cap de resolución, añade antes de la salida:
`-vf "scale='min(1280,iw)':-2:flags=lanczos"` — el `-2` mantiene el ratio en múltiplo de 2 (requisito de H.264)
y el `min()` evita el upscale de los que ya son menores.

- **`-an` siempre.** 22 vídeos, todos `muted`, y verificado que **sí traen pista AAC**: peso 100 % muerto.
- **`-pix_fmt yuv420p` no es opcional** — sin él Safari se niega a reproducir.
- **`poster` obligatorio en los 22.** Ninguno lo tiene hoy; sin él el hueco queda en blanco hasta el primer
  frame decodificado, y con `SmartVideo` (`preload="none"`) eso puede ser mucho tiempo:
  `ffmpeg -ss 0.1 -i in.mp4 -frames:v 1 -q:v 2 poster.webp`
- **WebM/VP9 como segunda fuente: no por defecto.** Añade una segunda copia de cada vídeo a `public/` y
  duplica el peso del repo para ganar poco frente a un H.264 bien codificado. Solo si una medición lo justifica.

### 4.3 · Estrategia de carga (esto es código, no compresión — y rinde más que comprimir)

- Todo `<img>` bajo el fold: `loading="lazy" decoding="async"`. **Sin `loading`, React 19 emite un
  `<link rel="preload" as="image">` y lo mete en la ruta crítica** — precedente documentado: 11 imágenes,
  6.5 MB preloadeados.
- Todo vídeo decorativo: `<SmartVideo>`. Nunca `<video autoPlay>` crudo (descarga completa aunque esté fuera
  de pantalla o en la variante de tema oculta).
- Imagen de fondo decorativa bajo texto: `alt="" aria-hidden="true"`, no un alt descriptivo.

---

## 5 · Cuarentena: cómo se borra sin romper nada

```bash
cd design-system-app
mkdir -p _quarantine
git mv "public/Files/ruta/al/huerfano.jpg" "_quarantine/huerfano.jpg"
# …todos los candidatos de la sección…
pnpm build && node scripts/design-fingerprint.mjs scripts/baseline/<ruta>.baseline.html out/<ruta>/index.html
```

- Build verde + fingerprint sin cambios inesperados → el archivo estaba muerto de verdad.
- Build roto o 404 en runtime → **restaurar y documentar por qué el grep falló** (casi siempre: ruta
  construida dinámicamente, §9.1).
- El borrado real (`git rm -r _quarantine`) va en un **commit separado**, después de la verificación.
- `_quarantine/` está fuera de `public/`, así que no se despliega aunque se quede unos commits.

---

## 6 · El ciclo de barrido de una sección

**Paso 0 · Encuadre.** Identifica la sección y su componente. Localiza `sections/<nombre>/context.md`. Confirma
que existe baseline de la ruta (§3). Si la sección está comentada en `page.tsx` (hoy: `PeopleRevealEpicare`,
`Coverage52Epicare`), **pregunta antes** si se resucita o se purga — no lo decidas tú.

**Paso 1 · Censo.** Corre `asset-audit.mjs --route <ruta>` y `dead-code-audit.mjs`. Recorre el `.tsx` completo.
Rellena los 5 ejes con **cifras y rutas exactas**, sin proponer nada todavía.

**Paso 2 · Reporte + STOP.** Entrega el reporte de §7. **Detente.** No escribas código hasta la autorización.
Es la misma regla del `redesign-section-protocol`, por la misma razón.

**Paso 3 · Eje A (assets).** `--dry-run` primero, tabla, luego ejecución. Actualiza referencias `.tsx`. Los
originales van a `_quarantine/`, no a la papelera.

**Paso 4 · Eje B (código muerto).** Cuarentena de assets, componentes, rutas y claves i18n huérfanas.

**Paso 5 · Eje C (hardcodeo).** ⚠️ **El paso de mayor riesgo.** Sustituir `p-[22px]` por un token **cambia el
píxel** si el token no vale exactamente 22px. Regla: solo sustituye cuando el valor coincide con el token;
cuando no coincide, **no lo toques** — anótalo en el Reporte de Margen Creativo y deja que el usuario decida
entre mover el diseño o promover un token nuevo.

**Paso 6 · Eje D (i18n).** Extrae texto a `messages/*.json` con paridad exacta. Español en tú neutro.
Recuerda: cambiar la longitud del texto **cambia la altura del documento** → `ScrollTrigger.refresh()`.

**Paso 7 · Eje E (SEO/a11y).** Metadata de ruta, sitemap, OG, `alt`, foco, teclado, reduced-motion.

**Paso 8 · Verificación y commit.** Los cuatro, en orden, con la salida pegada:

```bash
cd design-system-app
npx tsc --noEmit
pnpm lint
pnpm build
node scripts/design-fingerprint.mjs scripts/baseline/<ruta>.baseline.html out/<ruta>/index.html
```

Un commit por eje. Y actualiza `sections/<nombre>/context.md` + el log de
`project-context/context.md` — el barrido es un cambio arquitectónico y se documenta como tal.

---

## 7 · Plantilla del Reporte de Barrido (obligatoria en el Paso 2)

```markdown
## BARRIDO — <Ruta> › <Sección>   [CENSO — sin ejecutar]

### A · ASSETS
| Archivo | Peso | Formato | Dimensiones | Rol | Carga hoy | Propuesta | Peso estimado |
Subtotal sección: X MB → Y MB (−Z %)

### B · CÓDIGO MUERTO
Assets huérfanos: N (X MB) · Componentes: … · Claves i18n: … · Bloques comentados: …
→ candidatos a cuarentena (lista exacta)

### C · HARDCODEO
px arbitrarios: N · hex: N · easings inline: N · `as any`: N
Sustituibles sin mover píxel: N — Requieren decisión (valor ≠ token): N (listados uno a uno)

### D · i18n
Literales en JSX: N (incluidos `alt`/`aria-label`: N) · Paridad en/es: OK / rota en <claves>

### E · SEO / A11Y
Metadata · sitemap · OG · interactivos no operables por teclado · reduced-motion · contraste

### ⚠️ RIESGOS
Qué podría mover un píxel y por qué. Qué NO voy a tocar sin autorización explícita.

### 🎯 PROPUESTA
Ganancia total estimada · nº de commits · orden de ejecución.
**Esperando autorización.**
```

---

## 8 · Orden de barrido recomendado

| Orden | Ruta | Por qué | Deuda medida |
|:--|:--|:--|:--|
| **0** | *(transversal, sin ruta)* | Los 44 huérfanos y las 4 rutas `preview-spotlight` no pertenecen a ninguna sección: bórralos primero y el resto del barrido se hace sobre un terreno limpio. | **19.5 MB + 4 rutas** |
| **1** | `/go-crm` | Piloto ideal: la más nueva, la más vibecodeada, la más chica. Calibra la cadena de herramientas donde el riesgo es menor. | `CRM_Hero.png` 3 MB · 6 componentes sin i18n · sin baseline |
| **2** | `/` (landing) | La de mayor tráfico y la única con baseline. Es larga: 12+ secciones, una por vez. | `Hero_02.mp4` 6.17 MB (LCP) · el grueso de los 317 px y 335 hex |
| **3** | `/go-ams` | Deuda propia documentada: cuerpo en español bajo `lang="en"` y un usuario ficticio en producción (`"Manuel Depool"`, `HeroSection.tsx:86-87`). | `go_ams_hero.mp4` 4.10 MB · `go-ams-quote.jpeg` 2.23 MB |
| **4** | `/licensing` | Enlazada desde el header pero **sin metadata y fuera del sitemap**. | 3 assets + SEO ausente |
| **—** | `/design-system` | **No se barre.** Es showcase interno, se desactiva en el lanzamiento. Solo verifica que no arrastre peso al bundle compartido. | — |

---

## 9 · Trampas de este repo durante un barrido

**9.1 · El grep de huérfanos da falsos positivos.** Hay rutas construidas en runtime:
`BrandsCarousel.tsx:88` → ``asset(`/Files/Epicare_Landing/Brand_icons/${b}`)`` y
`DarkGradientSection.tsx:53-75` → ``` `/Files/Epicare_Landing/Features/${card.img}` ```.
En ambos el basename sí aparece en un array de constantes, así que el censo por basename los detecta —
**pero el patrón existe y volverá a aparecer.** Por eso la ley 3: cuarentena, no borrado.

**9.2 · El doble montaje desktop/mobile duplica los assets del censo.** `BentoGridEpicare` monta Desktop **y**
Mobile con `hidden md:block` / `block md:hidden`. Un asset referenciado dos veces no está duplicado en disco;
no lo cuentes dos veces ni creas que uno de los dos está muerto.

**9.3 · Cambiar la extensión de un asset mueve el fingerprint en el eje MEDIA.** Es esperado y correcto.
Lo que **no** puede moverse es CLASES/INLINE/TEXTO.

**9.4 · `basePath` no prefija `src` crudos.** Todo asset nuevo entra con `asset()` de `@/lib/asset`.
Funciona en local y revienta en producción si lo olvidas.

**9.5 · Tocar i18n cambia la altura del documento** → `ScrollTrigger.refresh()` (§4.1 de
`codebase-architecture-protocol.md`).

**9.6 · Los 23 estilos muertos NO son parte de este barrido.** `gap-fluid-*`, `px-gutter-*`,
`shadow-elevation-*` con variante están en `@layer utilities` y no generan CSS. **Activarlos cambia el diseño
aprobado** (gutters de desktop en 4 secciones, el grid de `ProductLines` pasa de gap 0 a `clamp(2rem,4vw,5rem)`,
aparecen sombras en el hover de los CTA). Es una decisión de diseño con César, no una limpieza. **Repórtalo, no
lo arregles.**

**9.7 · Hero es LCP.** `Hero_02.mp4` mantiene `autoPlay` a propósito. Recodifícalo y dale `poster`, pero **no
lo migres a `SmartVideo`**.

---

## PROMPT PARA EJECUTAR

```
Aplica el Production Sweep Protocol a: [RUTA o RUTA › SECCIÓN]

Lee completos, en este orden:
@Graph-Design-Framework/command-prompts/codebase-architecture-protocol.md
@Graph-Design-Framework/command-prompts/production-sweep-protocol.md

Reglas que no puedes romper:

1. UNA sección por vez, en el orden de render. No abras la siguiente sin cerrar la anterior.
2. Censo primero. Entrégame el Reporte de Barrido (§7) y PÁRATE. No escribas una línea
   de código hasta que yo autorice.
3. Nada se borra: todo candidato va a _quarantine/. El borrado real es un commit aparte
   después de build verde + fingerprint.
4. El diseño está aprobado. El fingerprint tiene que dar TOTAL: 0 salvo en MEDIA.
   Cualquier cambio en CLASES, INLINE o TEXTO me lo justificas línea por línea o lo reviertes.
5. Si un px arbitrario NO coincide exactamente con un token, NO lo sustituyas: anótalo en el
   Reporte de Margen Creativo y yo decido.
6. Un eje = un commit.
7. Toda optimización viene con cifras: KB antes → KB después → % reducción.

Herramientas: ffmpeg/ffprobe/cwebp ya están instalados GLOBALMENTE en %USERPROFILE%\Tools
y en el PATH de usuario. NO instales nada en el repo — ni sharp, ni ffmpeg-static, ni
ninguna dependencia npm nueva. Si la shell no los reconoce, refresca el PATH (§3).

Si es el primer barrido del proyecto, antes de nada:
  - construye scripts/asset-audit.mjs, optimize-assets.mjs y dead-code-audit.mjs (§3),
    invocando a los CLIs globales por child_process
  - congela el baseline de la ruta si no existe

Al terminar cada sección, ejecuta y pégame la salida:
  cd design-system-app
  npx tsc --noEmit
  pnpm lint
  pnpm build
  node scripts/design-fingerprint.mjs scripts/baseline/<ruta>.baseline.html out/<ruta>/index.html

No me digas que quedó excelente. Dime qué cambió, cuánto pesó antes y después,
qué verificaste y qué NO tocaste.
```
