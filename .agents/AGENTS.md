# 🏛️ GO AMS - Master AI Directives & Architecture

Este archivo define las reglas globales de comportamiento, arquitectura y estándares de codificación para todos los agentes de IA operando en el repositorio de **GO AMS**. Se carga de manera automática en cada sesión.

## 1. Arquitectura Base del Proyecto
El proyecto utiliza un stack moderno de alto rendimiento enfocado en la escalabilidad y mantenibilidad: **Next.js (App Router)** + **Tailwind CSS v4** + **TypeScript**.

- **Server-First (React Server Components):** Maximiza el uso de Server Components para mejorar el SEO y reducir el bundle size. Reserva la directiva `"use client"` estricta y únicamente para los nodos hoja del árbol de componentes donde haya interactividad pura (hooks de estado, efectos, event listeners).
- **Component-Driven Architecture:** Divide las interfaces en componentes modulares, reutilizables y atómicos. Un archivo no debería superar las 300 líneas de código si puede abstraerse de forma lógica.
- **Single Source of Truth (SSOT) OBLIGATORIO:** Toda la estética visual y diseño de interfaces DEBE basarse estrictamente en el inventario documentado en `Graph-Design-Framework/project-context/sections/design-system/Design-System.md`. Tienes **ESTRICTAMENTE PROHIBIDO** inventar estilos, colores o clases que no pertenezcan a este archivo. Todo diseño debe usar los tokens allí estipulados.

## 2. Estándares de Calidad y Clean Code
- **Tipado Fuerte y Defensivo:** TypeScript es obligatorio. Prohibido el uso de `any` a menos que sea una emergencia de fuerza mayor (y debe llevar un comentario `// TODO: fix any`). Prefiere la creación de `interfaces` explícitas para Data Models y Props.
- **Zero Arbitrary Values (Zero Px Policy):** Queda estrictamente prohibido usar valores crudos en CSS (ej. `px-4`, `p-[16px]`, `gap-8`). Debes enrutar todo diseño a través de las variables y clases utilitarias del ecosistema interno (`.gap-fluid-*`, `.p-static-*`, `.grid-layout`).
- **DRY (Don't Repeat Yourself):** Si notas que una lógica de cálculo, un hook, o un patrón visual se repite 3 veces, detente y extráelo a un utility, hook personalizado, o componente base.
- **Control de Versiones (Protocolo Manual):** Tienes estrictamente prohibido realizar un `git commit` o enviar cambios al repositorio sin la orden y autorización explícita del usuario humano.

## 3. Directivas de Agente y UX/UI (Creative Skills)
- **Refactorizaciones Premium:** Cuando el usuario pida refactorizar componentes o mejorar las visuales, asume inmediatamente el rol de un UX/UI Engineer Senior. 
- **Estética Vanguardista:** No esperes a que el usuario te dicte el diseño milimétrico. Inyecta proactivamente animaciones (GSAP, Tailwind keyframes), micro-interacciones, efectos glassmorphism, y usa paletas de colores sofisticadas. El objetivo siempre es lograr un diseño que se sienta "premium" y de alta tecnología.
- **Pensamiento Analítico:** Antes de romper código existente para agregar una "feature", analiza si la arquitectura actual soporta la expansión. Si la arquitectura es débil, propón el refactor antes de amontonar código malo.

## 4. Troubleshooting & Testing (GSAP & Mobile)
- **GSAP Testing en Localhost (Móvil):** Si GSAP falla al probar en un celular físico mediante hotspot/red local sobre `pnpm dev`, NO MODIFIQUES EL CÓDIGO asumiendo un bug. El modo `dev` empaqueta bundles masivos y WebSockets (HMR) que sobrecargan la conexión del hotspot y rompen la hidratación y los triggers de GSAP. **Solución obligatoria:** Compila y sirve en modo producción para probar en dispositivos físicos locales (`pnpm build && pnpm start -H 0.0.0.0`).
- **GSAP Mobile 100vh Bug:** Para evitar saltos cuando la barra de direcciones del móvil desaparece, asegúrate de inicializar `ScrollTrigger.config({ ignoreMobileResize: true });` y utiliza las variables `h-dvh` en lugar de `h-screen`.
- **Next.js 16/Turbopack Mobile Testing Block:** Si el servidor local (`pnpm dev`) lanza el aviso de `"Blocked cross-origin request to Next.js dev resource"` al acceder desde un móvil, es un bloqueo de seguridad de Turbopack. El agente debe solicitarle al usuario que verifique su IP actual y actualizarla de forma manual en `allowedDevOrigins` dentro de `next.config.ts`. No intentes inyectar scripts de detección automática (ej. `os.networkInterfaces`) ya que el usuario prefiere mantener el control del archivo limpio.
- **Turbopack Dev Cache Desync & Ghost Chunk Error:** Si `pnpm dev` lanza errores de parseo inexplicables (ej. `globals.css:8634:1 Unexpected end of input`), NO MODIFIQUES el CSS ni los archivos fuente si `npx tsc --noEmit` o `pnpm build` pasan en limpio. Es un desync de la caché en memoria de Turbopack ocasionado por cambios masivos o `git restore` con el servidor encendido. **Protocolo obligatorio:** Detén el servidor (`Ctrl + C` o `Stop-Process -Name node`), purga `.next` (`Remove-Item -Recurse -Force .next`) y reinicia con `pnpm dev`. (Ver `Graph-Design-Framework/command-prompts/dev-cache-desync-protocol.md`).
