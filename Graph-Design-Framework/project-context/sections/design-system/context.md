# Contexto: Design System (UI Kit)

## 📌 TL;DR
Página de Debug y visualización del ecosistema tipográfico y cromático (`/design-system`). Implementa la estética "Organic Liquid Glass" bimodal (Light: Light Mode / Dark: Dark Mode). Cuenta con un selector interactivo de tipografías premium Serif y un "Typography Sandbox".

## 📁 Componentes y Archivos Involucrados
- `src/app/design-system/page.tsx` (UI Kit Interactivo y estado local)
- `src/app/globals.css` (Variables raíz, Semantic Mapping y utilidades)
- `src/app/layout.tsx` (Inyección de Google Fonts)

## 📊 Estado Actual
- **Visual:** Layout Editorial de nivel "Awwwards" con laboratorios interactivos para Tipografía, Color y ahora **Espaciado Fluido**.
- **Funcional:** 
  - Toggle de Tema (Amanecer/Midnight).
  - Selectors de fuentes (Primary/Secondary) dinámicos.
  - **Spacing Studio v2.0:** Laboratorio con diagramas arquitectónicos interactivos que muestran Section Padding, Fluid Gaps, Page Gutters y Micro-spacing en tiempo real.
- **Unidades:** **Zero Px Policy.** Todo el sistema ha sido migrado a `rem` y funciones `clamp()`.

## 📜 Historial de Cambios

- **2026-04-05:** Evolución y Refinamiento Maestro del Design System.
  - *Acción:* Se estructuró `globals.css` con **6 niveles de color de texto** (Primary a Muted + Inverse) con contrastes calibrados para lujo.
  - *Acción:* Se implementó la **Bimodalidad Perfecta** (Light Mode / Dark Mode) con fondo Obsidian Black (#111111).
  - *Acción:* Se inyectaron **9 fuentes Serif de lujo** y **5 fuentes Sans-Serif Humanistas** seleccionables interactivamente.
  - *Acción:* Se expandió la escala tipográfica a **18 niveles cognitivos** (Display XL a Body XS).
  - *Acción:* Se creó el **Salento Spacing System**: Un sistema de espaciado fluido basado en `clamp()` con 4 categorías (Internal, Fluid Gaps, Section Paddings, 4 niveles de Page Gutters).
  - *Acción:* Se construyó el **Architectural Playground v2.0** en `/design-system`, permitiendo testear la arquitectura de la web visualmente.
  - *Acción:* **Purga total de `px`**. Todas las variables, sombras, blurs y márgenes usan ahora `rem`.

## ⚖️ Decisiones de Diseño
- **Obsidian sobre Espresso:** El fondo oscuro pasó a `#111111` para evitar fatiga visual y resaltar acentos metálicos.
- **Jerarquía Semántica de Texto (6 Niveles):** Se introdujeron `Secondary` y `Tertiary` para manejar densidades de lectura editorial.
- **Fluid Spacing vs Breakpoints:** Se eliminaron las medidas fijas en favor de `clamp()` para que la web "respire" de forma líquida en cualquier monitor.
- **Zero Px Policy:** Se adoptó el estándar de unidades relativas (`rem`) para asegurar escalabilidad y profesionalismo en la ingeniería responsiva.
- **Sticky Selector + GSAP Fix:** Se removieron los `overflow-hidden` y las animaciones de entrada de los contenedores sticky para permitir el posicionamiento fijo nativo del navegador.

## 🐛 Bugs Conocidos / Pendientes
- Ninguno. Compilación en Turbopack limpia y validada (✓).

---
Última actualización: 5 de abril de 2026.