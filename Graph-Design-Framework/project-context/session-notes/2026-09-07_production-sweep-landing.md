# Nota de Sesión: Production Sweep Protocol + Barrido del Landing (7 Sep 2026)

> Rama: `prod-sweep-landing` · 5 commits (uno por eje) · `public/` **73 MB → 25 MB**

## Resumen

1. Creado el protocolo `production-sweep-protocol.md` y cableado en el router del framework.
2. Instalada la cadena de herramientas real (global, no en el repo) y construidos 3 scripts de auditoría/optimización.
3. Ejecutado el barrido completo sobre `/` (página raíz), sección por sección.

## Decisiones Tomadas

### Herramientas: globales, no dependencias del repo
Petición explícita del usuario. Descubierto que esta máquina **no tiene `winget`, ni Chocolatey, ni Scoop**
(Windows 11 IoT Enterprise LTSC) — la causa de que `optimize-images-prompt.md` y `optimize-video-prompt.md`
llevaran tiempo rotos apuntando a `C:\Users\Grizzly\`.

Instalados binarios estáticos en `%USERPROFILE%\Tools` + PATH de usuario (sin admin):
`ffmpeg`/`ffprobe` 9.0.1 (gyan.dev) y `cwebp`/`dwebp` de libwebp 1.6.0 (Google).
Los scripts los invocan por `child_process` con fallback de ruta, así que **el repo no ganó ni una dependencia npm**.

⚠️ GitHub Actions no los tiene: los assets se optimizan en local y se commitean ya optimizados.

### El baseline estaba obsoleto — se recongeló dos veces
Daba **1586 diferencias** contra el build actual porque predataba las acciones 142-146. Sin un baseline válido
la ley del píxel no es verificable, así que se recongeló desde `main` limpio **antes** de tocar nada, y otra vez
al final sobre el estado aprobado.

### Conservar el nombre de archivo al recodificar vídeo
`swap-optimized.mjs` manda el original a `_quarantine/` y renombra el optimizado al nombre original. Así
**ningún `.tsx` cambia** por recodificar, y el fingerprint no se mueve ni en el eje MEDIA.

### Ejes C y D: reportados, no ejecutados
Sustituir un `[22px]` por un token **mueve el píxel** si el token no vale exactamente eso. El usuario pidió
explícitamente no dañar el diseño en desktop ni en móvil → se reportan las cifras y decide él.

## Cifras

| Eje | Antes | Después |
|:--|--:|--:|
| Vídeo (22 archivos) | 27.6 MB | 9.1 MB |
| Imágenes raster del landing | 6.9 MB | 1.0 MB |
| Huérfanos | 19.48 MB | 0 |
| **`public/` total** | **73 MB** | **25 MB** |
| Primera pantalla | ~7.6 MB | **5.24 MB** (5.14 = vídeo hero) |
| Vídeos con `poster` | 4 de 22 | **22 de 22** |
| Rutas en el build | 13 | 9 |

Calidad de recodificación medida, no asumida: **SSIM 0.996–0.998 · PSNR ~48 dB**.

## Hallazgos

- **Un debug panel viajaba a producción.** `ProductSpotlightEpicare` tenía ~85 líneas de sliders tras
  `{false && …}`, 5 `useState` congelados y un array de 12 fondos del que solo se usaba el índice 4.
  Los `useState` pasaron a constantes con los mismos valores; 11 fondos (5.1 MB) purgados.
- **17 de 22 vídeos traían pista de audio AAC** reproduciéndose `muted`.
- **`go_ams_hero.mp4` venía a 3826px de ancho** para una card del Bento.
- **4 rutas `/preview-spotlight`** llegaban a producción, con un comentario que decía lo contrario.
- **No existía imagen OG.** Todo link compartido salía sin miniatura.
- **`/licensing` sin metadata ni sitemap**, pese a estar enlazada desde `HeaderEpicare.tsx:84`.
- **`CierreGoCrm` usaba `src="/Files/..."` sin `asset()`** → 404 bajo `basePath`.
- 🐞 **`MacBook_Pro_16_Front.jpeg` nunca existió en el repo** pero se referencia en `BentoGridMobile.tsx:210`.
  Con `videoDarkFullBackground: true` la rama de vídeo oscuro se desactiva y se renderiza esa imagen →
  **404 visible en dark mode móvil**. NO corregido: requiere decisión.
- **`ForWhoEpicare.tsx` es huérfano** (ninguna ruta lo importa) y arrastra 1.42 MB.

## Verificación

`npx tsc --noEmit` limpio · `pnpm build` exit 0 · `design-fingerprint` **sin cambios en CLASES, INLINE ni
TEXTO** (solo MEDIA -36/+36 y META -3/+5, ambos intencionales) · **las 73 referencias de assets del HTML
generado resuelven a archivo real**.

`pnpm lint` sigue con 105 errores, **todos preexistentes** (`no-explicit-any`, `no-img-element` — este último
es política deliberada del static export). Verificado archivo por archivo que el barrido no introdujo ninguno.

## Archivos Creados

- `Graph-Design-Framework/command-prompts/production-sweep-protocol.md`
- `design-system-app/scripts/asset-audit.mjs` · `optimize-assets.mjs` · `swap-optimized.mjs` · `lib/tools.mjs`
- `design-system-app/src/app/licensing/layout.tsx`
- `design-system-app/public/og-image.jpg`
- 34 `.webp` (16 conversiones + 18 posters)

## Pendiente de Decisión

1. El 404 de `MacBook_Pro_16_Front.jpeg` en dark móvil.
2. `ForWhoEpicare` / `PeopleReveal` / `Coverage52`: ¿se resucitan o se purgan?
3. `Hero_02.mp4`: 5.14 MB a CRF 24. Hay 4.34 MB a CRF 26 o 3.51 MB a CRF 28.
4. Eje C (70 px, 38 hex, 37 `as any` en el landing) — requiere revisión visual.
5. Los 4 `alt` en español de `go-ams/agent-agency/data.ts`.
