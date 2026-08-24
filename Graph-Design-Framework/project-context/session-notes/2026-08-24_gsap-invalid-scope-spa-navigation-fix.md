# Sesión: Resolución Definitiva del Bug "Invalid scope" en Navegación SPA (GSAP + Next.js App Router)

**Fecha:** 2026-08-24

## 1. Resumen Ejecutivo
Se resolvió de forma definitiva el error masivo `[browser] Invalid scope (gsap-core.js:674/677)` que inundaba la consola con 80-100+ advertencias cada vez que el usuario navegaba client-side desde la Landing Page (`/`) hacia `/go-ams` a través del Header (`<Link href="/go-ams">`).

El código pasa la verificación completa de TypeScript (`pnpm exec tsc --noEmit` exit code 0) y mantiene un comportamiento SPA limpio, sin saltos de scroll y sin advertencias en consola.

---

## 2. Diagnóstico y Causas Raíz (Anatomía del Bug)

### Causa Raíz #1: `ctx.revert()` atrapado dentro del callback de `setTimeout`
* **Archivos afectados:** `BentoGridDesktop.tsx`, `PeopleRevealEpicare.tsx`, `ProductLinesEpicare.tsx`, `ProductSpotlightEpicare.tsx`.
* **El mecanismo:**
  ```tsx
  // ❌ PATRÓN ANTIGUO CON BUG:
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // animaciones...
      }, sectionRef);
      return () => ctx.revert(); // ⚠️ JS descarta este return dentro de setTimeout!
    }, 100);
    return () => clearTimeout(timer); // ⚠️ React solo limpiaba el timeout, NUNCA el ctx!
  }, []);
  ```
* **Consecuencia:** Cuando React desmontaba la Landing para montar `/go-ams`, las animaciones infinitas (`repeat: -1` en el marquee y rotadores) y los ScrollTriggers horizontales **NUNCA se revertían**. Se quedaban como *procesos zombies* en el ticker global de GSAP intentando evaluar elementos DOM ya destruidos.

### Causa Raíz #2: Paso de objetos React Ref `{ current: null }` al scope de GSAP
* **El mecanismo en `gsap-core.js` (líneas 674–677):**
  ```js
  selector = function selector(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function (v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
    };
  }
  ```
* Cuando se pasa `gsap.context(fn, sectionRef)`, GSAP almacena el objeto Ref. Al desmontar el componente o ejecutar el cleanup, React asigna `sectionRef.current = null`.
* Al intentar resolver cualquier selector CSS (`.glass-matrix`, `.dg-head-line`, `.module-card`), `el` vale `null` y `el === value` se vuelve `true` (`{ current: null } === { current: null }`), disparando `_warn("Invalid scope")` en cada frame y en cada selector evaluado.

### Causa Raíz #3: Loop de Re-creación en `BackOfficeTourB` y Race Condition en `LoaderEpicare`
* `BackOfficeTourB.tsx`: Tenía `[activeIndex]` en las dependencias del `useEffect`. Cada vez que el ScrollTrigger actualizaba `activeIndex` en `onUpdate`, el efecto se destruía y creaba un nuevo contexto en un bucle infinito.
* `LoaderEpicare.tsx`: En soft-navigation, `document.readyState` ya es `'complete'`. El preloader ejecutaba `triggerOutro()` y `setVisible(false)` antes de que `containerRef` estuviera resuelto, ejecutando `gsap.to(containerRef.current)` sobre `null`.

---

## 3. Protocolo Estándar de Implementación (Solución Aplicada)

### A. Patrón Seguro de `setTimeout` + `gsap.context`
```tsx
// ✅ PATRÓN CANÓNICO RESUELTO:
useLayoutEffect(() => {
  const el = sectionRef.current;
  if (!el) return;

  let ctx: gsap.Context | undefined;

  const timer = setTimeout(() => {
    ctx = gsap.context(() => {
      // animaciones y ScrollTriggers...
    }, el); // ← Pasamos el elemento DOM capturado directamente, no el ref object
  }, 100);

  return () => {
    clearTimeout(timer); // Cancela el timeout si desmonta antes
    ctx?.revert();       // Destruye limpiamente todos los tweens y ScrollTriggers si ya corrió
  };
}, []);
```

### B. Captura Atómica de Elementos DOM
En TODOS los componentes con animaciones GSAP:
1. Capturar `const el = sectionRef.current; if (!el) return;` al inicio del hook.
2. Pasar `el` (el `HTMLElement` directo) como segundo argumento a `gsap.context(fn, el)` o `gsap.matchMedia(el)`.
3. Usar `el` en la propiedad `trigger: el` de ScrollTrigger.
* **Por qué funciona:** Al pasar la referencia directa del `HTMLElement`, aunque React desmonte el componente del DOM del navegador, el objeto sigue teniendo la interfaz `.querySelectorAll`, impidiendo que GSAP lance `_warn("Invalid scope")`.

### C. Manejo de Navegación en `SmoothScrollProvider`
En `src/components/SmoothScrollProvider.tsx`:
- Se eliminó el `ScrollTrigger.getAll().forEach(st => st.kill())` en `[pathname]`, ya que al correr en `useEffect` del padre eliminaba los ScrollTriggers que los componentes de la nueva página acababan de crear en su `useLayoutEffect`.
- Se reemplazó por un reset suave de posición: `window.scrollTo(0,0)`, `lenis.scrollTo(0, { immediate: true })` y `ScrollTrigger.refresh()` con un debounce de 50ms.

### D. Optimización de `LoaderEpicare`
- Inicialización con estado perezoso: `const [visible, setVisible] = useState(() => !(window as any).epicareLoaderFinished);`.
- En soft-navigation (SPA), el Loader no se monta ni ejecuta GSAP, evitando el parpadeo de pantalla negra y previniendo colisiones de contextos.

---

## 4. Archivos Corregidos en Esta Sesión

| Archivo | Corrección Principal |
|:---|:---|
| `src/components/AnimatedTitle.tsx` | Captura de `el` directo + `trigger: el` + `gsap.context(fn, el)` |
| `src/components/epicare/BentoGridDesktop.tsx` | Extracción de `ctx.revert()` fuera de `setTimeout` + captura `section` |
| `src/components/epicare/PeopleRevealEpicare.tsx` | Extracción de `ctx.revert()` fuera de `setTimeout` + captura `el` |
| `src/components/epicare/ProductLinesEpicare.tsx` | Extracción de `ctx.revert()` fuera de `setTimeout` + captura `el` |
| `src/components/epicare/ProductSpotlightEpicare.tsx` | Extracción de `ctx.revert()` fuera de `setTimeout` + captura `el` |
| `src/components/epicare/HeroEpicare.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/MetricsEpicare.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/ProblemSectionEpicare.tsx` | Captura de `elDesc` y `elContainer` en ambos `useEffect` |
| `src/components/epicare/WhyEpicare.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/DarkGradientSection.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/ForWhoEpicare.tsx` | Captura de `el` en `useEffect` + `gsap.matchMedia(el)` |
| `src/components/epicare/Coverage52Epicare.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/FAQEpicare.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/HowToJoinEpicare.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/InteractiveGlobeEpicare.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/LicensingGridEpicare.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/LicensingHeroEpicare.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/licensing/LicensingSection.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/epicare/LoaderEpicare.tsx` | Skip en soft-navigation + guards defensivos en `triggerOutro` |
| `src/components/go-ams/PlatformRevealSection.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/AgentAgencySection.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/QuoteEnroll.tsx` | Captura de `el` + filtrado de nulls en `cardsRef` |
| `src/components/go-ams/DownlineSection.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/DelegateUsersSection.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/FaqSection.tsx` | Captura de `el` en `useLayoutEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/ContextSection.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/BrokenDaySection.tsx` | Eliminación de propiedad `animation` inválida en TS + captura de `el` en los 3 conceptos |
| `src/components/go-ams/BackOfficeTourA.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/BackOfficeTourB.tsx` | Eliminación del dependency array loop `[activeIndex]` → `[]` + captura de `el` |
| `src/components/go-ams/BackOfficeTourC.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/BackOfficeTourCommand.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/BackOfficeTourCrisis.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/go-ams/BackOfficeTourOscilloscope.tsx` | Captura de `el` en `useEffect` + `gsap.context(fn, el)` |
| `src/components/SmoothScrollProvider.tsx` | Reset de scroll seguro en `[pathname]` sin matar triggers activos de páginas hijas |
