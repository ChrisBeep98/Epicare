# 🌍 Protocolo: React-Globe.gl Anti-Hijack & Hardware Symphony

**Objetivo:** Evitar que cualquier agente IA o desarrollador vuelva a pasar por el "infierno del scroll" al trabajar con el componente 3D `react-globe.gl` en el proyecto Epicare.

---

## 1. El Problema (El "Infierno" del Scroll)

El mapa 3D de licencias (`InteractiveGlobeEpicare.tsx`) utiliza `react-globe.gl`, el cual instancia internamente `OrbitControls` de Three.js. 

**El Bug Fatal:** 
Por defecto, `OrbitControls` tiene el zoom activado (`enableZoom = true`), lo que secuestra la rueda del ratón (wheel event). Cuando el usuario intenta hacer scroll hacia abajo en la página, el planeta absorbe el evento y se escala gigantescamente, arruinando la experiencia.

**Por qué las soluciones lógicas FALLAN:**
1. **`useEffect` convencional:** Si configuras `controls.enableZoom = false` dentro de un `useEffect` que se ejecuta una sola vez, funciona temporalmente. Sin embargo, cuando la librería hace updates internos (por ejemplo, al mostrar tooltips de hover), recrea o resetea el objeto `OrbitControls`, volviendo a activar el zoom en secreto.
2. **`e.stopPropagation()` en el contenedor:** Si interceptas el evento `wheel` y lo bloqueas, evitas que el globo se escale, **PERO ROMPES A LENIS**. Lenis (nuestro smooth scroller) necesita que el evento `wheel` suba (bubble) hasta el `window`. Si lo bloqueas, la página entera deja de scrollear cuando el cursor está sobre el planeta.

---

## 2. La Solución Definitiva (El Bucle rAF)

Para garantizar que el zoom permanezca apagado de forma permanente sin bloquear los eventos nativos del ratón, utilizamos un micro-bucle de **`requestAnimationFrame` (rAF)**. 

Este algoritmo verifica los controles 60 veces por segundo y apaga el zoom instantáneamente si la librería intenta activarlo. Es una táctica de desarrollo de videojuegos (Game Loop) con un costo de rendimiento virtualmente nulo (0.001ms por frame).

**Implementación Canónica (COPIAR Y PEGAR):**

```javascript
  // Dentro del componente, después de montar el globo:
  useEffect(() => {
    // 1. Configuración de cámara inicial
    if (globeEl.current && countriesDataGlobal.length > 0 && dimensions.width > 0) {
      // ALTITUD: Mientras menor sea el número, más grande se ve el planeta.
      globeEl.current.pointOfView({ lat: 39.8283, lng: -98.5795, altitude: 1.45 }, 0);
    }

    // 2. ESCUDO ANTI-ZOOM (rAF Loop)
    let frameId;
    const enforceControls = () => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();
        if (controls) {
          // Usamos condicionales para evitar operaciones de escritura (setters) innecesarias
          if (controls.enableZoom !== false) controls.enableZoom = false;
          if (controls.autoRotate !== true) controls.autoRotate = true;
          if (controls.autoRotateSpeed !== 0.5) controls.autoRotateSpeed = 0.5;
        }
      }
      frameId = requestAnimationFrame(enforceControls);
    };
    enforceControls();

    return () => cancelAnimationFrame(frameId);
  }, [countriesDataGlobal.length, dimensions.width]); 
```

---

## 3. Reglas de Oro para Modificar el Globo

1. **Ampliar/Reducir el tamaño del Planeta:** 
   - **NUNCA** utilices CSS (`transform: scale`) ni GSAP para ampliar el contenedor del canvas de `react-globe.gl`. Eso rompe las coordenadas del ratón (los hovers de los pines fallarán).
   - **LA FORMA CORRECTA:** Cambia la propiedad `altitude` en el método `pointOfView()`. Por ejemplo, `altitude: 1.85` es un planeta pequeño; `altitude: 1.45` es un planeta inmersivo grande.
2. **Hover Tooltips:**
   - Para evitar problemas de Z-Index 3D (donde react-globe.gl inyecta `z-index` matemático en línea a los pines), SIEMPRE usa esta regla CSS inyectada en el componente para forzar que el tooltip activo rompa el canvas y se ponga por encima de todo:
   ```css
   .marker-wrapper:hover {
     z-index: 999999 !important;
   }
   ```
   - No usar State (`useState`) para los Hovers: El globo no debe re-renderizarse en React cada vez que el ratón toca un pin (esto destrozaría el rendimiento de WebGL). Los tooltips deben resolverse inyectando HTML puro (`htmlElement`) y controlando la visibilidad puramente con clases de Tailwind (`group-hover:opacity-100`).
4. **Mobile Scroll Vertical (La Bala de Plata CSS):**
   - `OrbitControls` inyecta automáticamente `touch-action: none` en línea en el `<canvas>`, lo que bloquea por completo el scroll de la página en móviles si intentas deslizar sobre el planeta.
   - **Solución:** SIEMPRE inyecta esta regla CSS con `!important` para obligar al navegador a controlar el scroll vertical de forma nativa, permitiendo que la rotación horizontal (X) la siga manejando el globo:
   ```css
   .globe-wrapper canvas {
     touch-action: pan-y !important;
   }
   ```
