# 🔬 SalentoCoffee Hardware Audit (El Inspector de Rendimiento)

Copia y pega este prompt cuando sientas que la página está lenta, el scroll se traba, o acabemos de terminar una sección con demasiadas animaciones. Este comando me fuerza (a Gemini) a ponerme el sombrero de Ingeniero de Sistemas y auditar estrictamente el código en busca de fugas de memoria o malos cálculos de renderizado.

***

**PROMPT PARA AUDITAR RENDIMIENTO:**

> "Hola Gemini. El componente/sección que estamos revisando necesita pasar por el **SalentoCoffee Hardware Audit**. No me interesa cambiar el diseño visual, quiero que auditemos la física subyacente.
> 
> Es OBLIGATORIO que actives tu protocolo de rendimiento estricto leyendo:
> 
> 1. `context-Docs/WorkFlow-Docs/Design-Agent-Skills/HARDWARE-SYMPHONY.md` 
> 2. `context-Docs/WorkFlow-Docs/Design-System/Design-System.md` (Para verificar si estamos usando demasiados blurs de cristal innecesarios).
> 
> **Tu directiva de escaneo:** 
> - Revisa línea por línea el código de **[INSERTAR AQUÍ EL COMPONENTE. EJ: "ScrollSequence.tsx"]**.
> - Busca animaciones que alteren propiedades prohibidas (`width`, `height`, `box-shadow`) y reescríbelas usando `transform` u `opacity`.
> - Identifica si hay efectos de `backdrop-filter` (Cristal) o loops de GSAP/Framer Motion que NO se estén apagando cuando salen del Viewport (IntersectionObserver).
> - Asegúrate de que estemos respetando `prefers-reduced-motion`.
> 
> Tu respuesta debe ser quirúrgica: 1) Dime qué líneas exactas están matando la GPU o los 60fps. 2) Entrégame el bloque de código optimizado aplicando la Hardware Symphony."

***
