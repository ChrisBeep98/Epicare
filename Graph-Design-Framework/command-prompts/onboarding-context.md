# Prompt de Onboarding / Entrada en Contexto

Copia y pega este prompt al iniciar un nuevo chat o sesión con un asistente de IA para que adquiera inmediatamente todo el contexto del proyecto, la arquitectura, el stack tecnológico y las directrices de animación.

***

**PROMPT PARA ENTRAR EN CONTEXTO:**

> "Hola IA. Vamos a trabajar en el proyecto 'salento-coffee-experience' (actualmente en la Fase 2 del Rediseño de la Landing Page). Antes de sugerir, planificar o escribir cualquier código, necesito que te empapes del contexto actual y de nuestras reglas de diseño.
>
> Por favor, realiza estrictamente estas acciones empleando tus herramientas de lectura de archivos:
> 
> 1. **Lee cuidadosamente** el archivo `context-Docs/project-context/context.md` para entender el estado de la migración, la arquitectura estricta (Next.js 16.1.4 App Router, pnpm) y los últimos hitos completados.
> 2. **Analiza el archivo de estilos globales del landing** en `src/components/landing-v2/landing.css` para conocer nuestras variables de color base (`--color-pillar-*`) y las clases utilitarias de diseño premium que estamos usando (como `.liquid-glass`).
> 3. **Revisa la lista de tareas activa** (si la tienes en tus artefactos o pide leer el `task.md` actual) para ver qué queda por hacer.
> 4. **Comprende nuestro Stack Core:** Usamos `GSAP` (con `ScrollTrigger` y animaciones potentes, NO uses Framer Motion a menos que sea estrictamente necesario para layout) y `Lenis` para smooth scrolling. Requerimos muchísimo cuidado arquitectónico con el manejo del DOM y pin-spacers de GSAP (fíjate en los aprendizajes de `WaveRevealSection.tsx` y `ComparisonSection.tsx` si vas a animar con scroll).
>
> Una vez hayas leído, procesado y asimilado a fondo estos archivos y directrices, responde únicamente con: 
> 
> *'✅ Contexto, arquitectura y directrices de diseño asimilados al 100%. Estoy alineado con la Fase 8 del rediseño. ¿En qué sección, componente o flujo trabajaremos hoy?'*"

***
