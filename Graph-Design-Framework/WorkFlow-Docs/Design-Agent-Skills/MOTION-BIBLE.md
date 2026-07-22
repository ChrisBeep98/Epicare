---
name: Motion Bible Epicare
description: LA fuente canónica de motion. Física de marca + tokens de movimiento + receta ejecutable de cada pilar. Reemplaza a AWWWARDS-MOTION, CREATIVE-MOTION y CINEMATIC-ARCHITECT (archivados).
---

# 📖 MOTION-BIBLE — La Física de Epicare

**Regla de este documento:** ningún concepto vive sin receta. Si un pilar se nombra, su código con valores exactos está al lado. Prohibido citar esta biblia y luego improvisar valores.

**Identidad:** fintech-seguros premium. Metáforas de **claridad, control, estructura/red, confianza**. Nada de café, ámbar, violeta, Playfair ni "solo light" — eso es la marca muerta (ver `_archive/legacy-goams/`).

**Stack real:** Next 16 · React 19 · GSAP 3.15 + ScrollTrigger · **Lenis YA es global** (`SmoothScrollProvider`, sincronizado con el ticker de GSAP — NUNCA lo re-inicialices). Siempre:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => { /* ...animaciones... */ }, sectionRef);
  return () => ctx.revert();
}, []);
```

`prefers-reduced-motion` → estados finales visibles, sin scrub ni loops.

---

## 0 · TOKENS DE MOTION (la firma — usar SIEMPRE estos, nunca inventar)

Fuente de código: `design-system-app/src/lib/motion.ts` (importar, no copiar valores).

Estos valores NO son inventados: son la **firma real ya presente en la landing** (censo 2026-07-22), unificada.

| Token | Valor | Uso |
|:--|:--|:--|
| `EASE.out` | `"power3.out"` | Reveal estándar de entrada. El default de la página. |
| `EASE.dramatic` | `"power4.out"` | Text-birth y momentos con peso. |
| `EASE.inOut` | `"power3.inOut"` | Transiciones entre estados (salidas, swaps). |
| `EASE_SIGNATURE_PATH` | CustomEase `"M0,0 C0.65,0.05 0.36,1 1,1"` | "proReveal" — reveals de firma (slats, cortinas). |
| `EASE_CSS.ui` | `cubic-bezier(0.22, 1, 0.36, 1)` | Hovers/CTAs en CSS, con `duration 450–700ms`. |
| `EASE.snap` | `"power2.out"` | Micro-interacciones (hover, click). |
| `EASE.breath` | `"sine.inOut"` | Loops infinitos (breathing, drift). |
| `DUR.micro / microOut` | `0.2 / 0.3` | Hover in / out. |
| `DUR.fast` | `0.5` | Elementos pequeños (pills, badges). |
| `DUR.base` | `0.9` | Reveal estándar. |
| `DUR.slow` | `1.2` | Bloques grandes, imágenes. |
| `DUR.birth` | `1.4` | Text-birth de titulares. |
| `DUR.cinematic` | `1.8` | Momentos de firma (1 por sección máximo). |
| `DUR.count` | `2.5` | Count-up de métricas. |
| `STAGGER.tight` | `0.04` | Caracteres / pills. |
| `STAGGER.base` | `0.08` | Líneas de texto. |
| `STAGGER.wave` | `0.15` | Cards / bloques. |
| `REVEAL.sm / md / lg` | `24 / 40 / 60` (px) | Distancia `y` de entrada según tamaño del elemento. |
| `REVEAL.birthPercent` | `120` | `yPercent` inicial del text-birth. |
| `REVEAL.blurSoft / blurBase / blurHeavy` | `6 / 12 / 20` (px) | Blur inicial del "blur reveal" según tamaño. |
| `SCRUB.crisp` | `1` | Pins y efectos que siguen al dedo. |
| `SCRUB.smooth` | `2` | Parallax estándar. |
| `SCRUB.heavy` | `3` | Slats, marquees, fondos pesados. |
| `TRIGGER.early / standard / late` | `"top 90%" / "top 80%" / "top 75%"` | Starts de entrada unificados. |
| `PARALLAX.bg / mid` | `0.7 / 0.85` | Ratio de velocidad de capas vs contenido. |

**Consistencia = sensación de estudio.** Dos secciones con easings distintos sin razón se sienten de dos sitios diferentes.

---

## 1 · TEXT-BIRTH (Water Mask) — títulos NUNCA hacen fade-in

**Física:** el texto nace desde un horizonte invisible, línea por línea, como emergiendo del agua.

```tsx
// Cada línea envuelta en un wrapper con overflow-hidden
<h2 ref={titleRef}>
  <span className="block overflow-hidden"><span className="line block">No somos el intermediario.</span></span>
  <span className="block overflow-hidden"><span className="line block">Somos la operación.</span></span>
</h2>
```
```ts
gsap.from(".line", {
  yPercent: REVEAL.birthPercent,   // 120
  duration: DUR.birth,             // 1.4
  ease: EASE.dramatic,             // power4.out
  stagger: STAGGER.base,           // ola: línea 2 nace 0.08s después
  scrollTrigger: { trigger: titleRef.current, start: TRIGGER.late },
});
```

**Variantes de intensidad:**
- *Sutil:* solo líneas, sin scrub (arriba).
- *Media:* añade `rotate: 4` inicial en cada línea (nace inclinado y se endereza).
- *Teatral:* scrub-linked — `scrub: SCRUB.smooth`, `start: "top 90%", end: "top 40%"` → la velocidad del scroll del usuario controla el nacimiento.

---

## 2 · LAYERED UNVEILING — el contenido llega en olas con peso

**Física:** nada aparece todo a la vez. Fondo, estructura y texto viajan a velocidades distintas → profundidad espacial inmediata.

```ts
const tl = gsap.timeline({
  scrollTrigger: { trigger: section, start: "top 75%" },
});
tl.from(".bg-layer",     { y: REVEAL.md * PARALLAX.bg,  opacity: 0, duration: DUR.slow, ease: EASE.out })
  .from(".card",         { y: REVEAL.md, opacity: 0, duration: DUR.base, ease: EASE.out, stagger: STAGGER.wave }, "-=0.6")
  .from(".card .detail", { y: REVEAL.sm, opacity: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base }, "-=0.4");
```

**Parallax persistente** (mientras se scrollea la sección):
```ts
gsap.to(".bg-layer", {
  yPercent: -15,
  ease: "none",
  scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: SCRUB.heavy },
});
```

**Regla:** mínimo **2 velocidades de scroll** por sección (fondo ≠ contenido). Con 1 velocidad, la página es un PDF.

---

## 3 · CURTAIN REVEAL — imágenes y superficies NUNCA hacen fade-in

**Física:** una cortina/persiana que se abre; la imagen interior contra-zoomea para dar volumen.

```ts
gsap.timeline({ scrollTrigger: { trigger: figure, start: "top 80%" } })
  .from(figure, { clipPath: "inset(100% 0 0 0)", duration: DUR.slow, ease: EASE.inOut })
  .from(figure.querySelector("img"), { scale: 1.15, duration: DUR.slow, ease: EASE.out }, "<");
```

Variantes: `inset(0 100% 0 0)` (lateral, para layouts asimétricos) · `circle(0% at 50% 50%)` (spotlight, solo momentos de firma).

---

## 4 · BREATHING CANVAS — nada queda muerto cuando el scroll para

**Física:** vida latente — micro-oscilaciones imperceptibles y gradientes que derivan.

```ts
// Elementos flotantes (cards, orbes, badges)
gsap.to(".floating", {
  y: "-=10",
  duration: 4,
  ease: EASE.breath,
  yoyo: true,
  repeat: -1,
  stagger: { each: 0.6, from: "random" },  // asíncrono = orgánico
});
```

**Obligatorio:** pausar fuera de viewport (60fps):
```ts
ScrollTrigger.create({
  trigger: section, start: "top bottom", end: "bottom top",
  onToggle: (self) => breathTl[self.isActive ? "play" : "pause"](),
});
```

Orbes de luz de marca (azul/naranja, `blur(120px)`, opacidad 10–20%) derivando lento son la versión Epicare del canvas vivo — **acento, nunca discoteca**: máximo 2 orbes, saturación contenida, funciona en light Y dark.

---

## 5 · THEATER CURTAIN + DEEP SPACE — transiciones entre secciones

**Física:** la sección siguiente se desliza POR ENCIMA; la anterior se hunde en el eje Z (escala + oscurece). El DOM se trata como espacio 3D, no como documento.

```ts
// En la sección A (la que se hunde):
gsap.to(sectionA, {
  scale: 0.95,
  filter: "brightness(0.8)",
  ease: "none",
  scrollTrigger: { trigger: sectionB, start: "top bottom", end: "top top", scrub: SCRUB.crisp },
});
// Sección B necesita z-index mayor y fondo opaco.
```

**Sandwich 3D** (para secciones-mundo, usar con moderación): contenedor con `perspective: 1000px`; capa fondo `translateZ(-100px)`, contenido `0`, elementos diegéticos `+100px`; mouse-tilt con `gsap.quickTo(layer, "rotationY")` limitado a ±3°.

Técnicas pesadas (pin, split-scroll, horizontal, stacking, FLIP) → recetario completo en `SCROLL-EFFECTS-ARCHITECT.md` §1–7.

---

## 6 · SCROLLYTELLING LIGHT-UP — leer se gana scrolleando

```ts
gsap.utils.toArray<HTMLElement>(".read-line").forEach((line) => {
  gsap.fromTo(line, { opacity: 0.2 }, {
    opacity: 1,
    ease: "none",
    scrollTrigger: { trigger: line, start: "top 75%", end: "top 45%", scrub: SCRUB.crisp },
  });
});
```

---

## 7 · RECETAS NUEVAS (antes prometidas, nunca implementadas)

**Count-up de métricas** (números que suben al entrar):
```ts
gsap.from(el, {
  textContent: 0,
  duration: DUR.cinematic,
  ease: EASE.signature,
  snap: { textContent: 1 },
  scrollTrigger: { trigger: el, start: "top 85%" },
});
```

**Gradient morph** (fondo que muta de mood por fase):
```ts
gsap.to(orb, {
  backgroundColor: phaseColor,       // azul → naranja según card activa
  duration: DUR.slow, ease: EASE.inOut, overwrite: "auto",
});
```

**Magnetic snap hover** (el estándar 2025 — rápido, no acolchado):
```ts
el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.05, duration: DUR.micro, ease: EASE.snap }));
el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1,    duration: 0.3,       ease: EASE.snap }));
```

---

## 8 · 60FPS (resumen ejecutable — detalle en HARDWARE-SYMPHONY.md)

- Animar SOLO `transform` y `opacity` (`clip-path` con cuidado). PROHIBIDO `width/height/top/left/box-shadow`.
- `will-change` solo en elementos activos; quitar al terminar.
- Loops infinitos SIEMPRE pausados fuera de viewport (receta en §4).
- `invalidateOnRefresh: true` en todo lo responsive; `gsap.matchMedia()` para degradar en mobile.

---

## ✅ SELF-CHECK antes de entregar (si fallas 1, reescribe)

1. ¿Hay algún `opacity: 0 → 1` sin transform acompañante? → Es un fade-in plano. PROHIBIDO. Text-Birth o Curtain.
2. ¿Hay ≥2 velocidades de scroll en la sección? Si no → añade parallax (§2).
3. ¿Algo respira cuando el scroll se detiene? Si no → §4.
4. ¿Todos los valores salen de `EASE/DUR/STAGGER/REVEAL/SCRUB`? Valores inventados = declararlos en el Reporte de Margen Creativo.
5. ¿La transición con la sección anterior/siguiente está coreografiada (o al menos considerada)? Consulta `project-context/scrollytelling-map.md`.
6. ¿Light Y Dark verificados? ¿`prefers-reduced-motion` cubierto? ¿`ctx.revert()` presente?
