# Product

<!-- impeccable:product-schema 1 -->

> Verdad de producto duradera de Epicare. Headings en inglés (contrato del framework), contenido en español neutro ("tú").
> Fuentes: `Graph-Design-Framework/project-context/landing-blueprint.md`, `landing-strategy/`, `context.md`, `command-prompts/ONBOARDING-AI-protocol.md`, y confirmaciones del usuario (11 ago 2026).
> Este archivo NO define el mundo visual. Tokens y estética viven en el Design System del proyecto.

## Platform

web

## Users

Tres audiencias con el mismo dolor raíz —**operación fragmentada**— y motivaciones distintas:

1. **Agente individual** (audiencia por defecto, mayor volumen, decisión más simple). Productor independiente, exclusivo o cautivo. Trabaja entre portales de carriers que no se hablan, un CRM que no controla, spreadsheets desactualizados y correos sin tiempos de respuesta. Su trabajo: contratarse rápido, cotizar y enrollar sin fricción, y hacer crecer su libro.
2. **Agency owner** (mayor valor por conversión, ciclo de decisión más largo). Sub-agencia con downline propio. Necesita visibilidad de producción de su equipo, onboarding que escale e infraestructura que hoy no tiene.
3. **Sub-agencia con estructura multinivel.** Requiere soporte multinivel nativo, contratos centralizados y que sus agentes usen el mismo sistema.

Mercado: Estados Unidos, con fuerte componente hispanohablante — de ahí la paridad bilingüe EN/ES.

## Product Purpose

**Epicare Insurance Corp** es la marca paraguas: una agencia de seguros con operación activa (Miami, FL) que recluta agentes y agencias para que se contraten con ella. **GO AMS** es el broker portal y el producto núcleo del **ecosistema GO** — la infraestructura que Epicare construyó y que se incluye al firmar el Exclusive Producer Agreement.

Los dos niveles conviven a propósito: la marca que se vende es Epicare (la operación), y GO AMS es la prueba tangible de que esa operación es infraestructura y no una promesa.

Éxito = aplicaciones de contracting calificadas. Todo lo demás (ecosistema, portafolio, cobertura) existe para hacer creíble esa decisión.

## Positioning

**"No somos el intermediario. Somos la operación."**

Un solo acuerdo da acceso al portafolio completo de carriers *y* a un stack propietario que la mayoría de agencias no tiene: AMS, CRM, Academy, motor de cotización y enrollment (Eppigo) y Solutions. La diferencia no está en qué carriers se ofrecen — está en la infraestructura que Epicare opera para que el agente produzca más.

Lo que un competidor no puede copiar de forma honesta: la combinación de operación con trayectoria verificable, licencias activas en 52 jurisdicciones, y software propio incluido sin costo de plataforma.

## Operating Context

- **El día a día que se reemplaza:** portales de carrier desconectados (cada uno con su login, todo manual), downline invisible, spreadsheets como sistema de registro, soporte sin SLAs ni historial, licencias que se vencen sin alerta, producción alojada en sistemas que el agente no controla.
- **Proceso de contracting (5 pasos):** aplicar → llamada para revisar perfil y carriers → firma digital del Exclusive Producer Agreement desde GO AMS (sin papel) → configuración de cuenta y conexión de carriers → producir. Contracting responde en 24–48 h hábiles. El proceso toma días, no horas — el copy no debe prometer inmediatez.
- **Superficies:** landing pública (esta base de código), portal de producción en `ams.epicareinsurance.com`, y una superficie de licencias/cobertura (`/licensing`) que muestra la operación en las 52 jurisdicciones.
- **Proceso interno de trabajo:** `Graph-Design-Framework/` es la autoridad de proceso del proyecto (protocolos de sección, mapa de scrollytelling, rúbrica de calidad, log de acciones críticas). `Graph-Design-Framework/_archive/` es la marca muerta anterior (GO AMS/café) y nunca es fuente válida.

## Capabilities and Constraints

**Ecosistema GO**
- **GO AMS** — core, único producto obligatorio; se activa automáticamente al contratar. Appointments de todos los carriers visibles sin entrar a cada portal, Book of Business completo con coverage gaps, licencias de 52 jurisdicciones con alertas automáticas, dashboard de KPIs en tiempo real, Delegate Users con permisos propios y audit trail, toggle Agency/Agent, multinivel nativo.
- **GO CRM**, **Epicare Academy**, **Solutions** — opcionales, se habilitan bajo solicitud.
- **Eppigo** — quote & enroll multicarrier (solo sobre appointments activos), propuestas web interactivas con tracking de apertura, links trazables y códigos QR. Cinco carriers con cotización directa vía API: Ameritas, Allstate, Manhattan Life, Mutual of Omaha, Triple-S.
- **GO CALLS existe pero está fuera del alcance de la landing** (decisión tomada, no revertir sin instrucción).

**Portafolio**
- Tres líneas: **Life** (Term, Whole, Final Expense) · **Health** (STM, Major Medical, ACA/Marketplace, Medicare Advantage) · **Supplementary** (Dental, Vision, Accident, Cancer, Hospital Indemnity, Critical Illness, Senior Supplement).
- Dental/Vision **jamás** como categoría aparte — son Supplementary.
- Nombres de producto siempre en inglés (estándar de la industria en EE. UU.), incluso en la versión en español.

**Hechos comerciales confirmados**
- Costo de plataforma: **$0** — GO AMS incluido en el contrato de productor.
- No hace falta estar en Florida: licencias activas en los 50 estados, DC y Puerto Rico (52 jurisdicciones).
- El agente **no pierde** sus appointments existentes; suma acceso al portafolio de Epicare.
- Sí funciona para agencias con downline (multinivel nativo).
- Epicare **no es un carrier** — el disclaimer es obligatorio donde corresponda.

**Restricciones técnicas**
- Next.js con **static export** (`out/`) desplegado a GitHub Pages vía GitHub Actions, con `basePath` dirigido por env. Consecuencia dura: **sin runtime de servidor, sin API routes, sin manejo de formularios del lado servidor** — cualquier captura de leads necesita un servicio externo.
- `pnpm` estricto (nunca npm ni yarn). Build limpio (`pnpm build`, cero errores de TypeScript) es condición de entrega.
- i18n con `next-intl`: `messages/en.json` y `messages/es.json` con paridad exacta de claves. Ningún texto quemado en componentes.
- Las rutas de assets crudas (`<img>`, `<video>`) deben prefijarse manualmente — Next no lo hace por ellas bajo `basePath`.

**Decisiones abiertas (no inventar respuesta)**
- 🔴 **Ruta de conversión — bloquea lanzamiento.** Los 2 CTA del hero son `<button>` sin destino y hay 22 `href="#"` más; la hamburguesa móvil (único acceso a nav en móvil) tampoco tiene handler. El usuario aún no decide entre formulario propio, formulario externo o el signup del portal. El static export condiciona la opción "formulario propio".
- 🟡 **Estado de lanzamiento de GO AMS en el copy.** La fecha original (14 jul 2026) venció; el copy debe hablar en presente post-lanzamiento y no reintroducir urgencia caduca.
- 🟡 **Número de asegurados activos.** El "6,000+" del copy antiguo no fue confirmado en la ratificación de métricas. No usarlo hasta confirmarlo.

## Brand Commitments

- **Entidad legal:** Epicare Insurance Corp · Miami, FL · EIN 87-1093490 · NPN 19985316 · **EPICARE® USPTO Reg. 8148738**. Credenciales reales y citables.
- **Voz:** español **neutro en "tú"** — jamás voseo (`trabajás`, `operás`, `vos`). Inglés canónico en la versión EN. Framing operativo y específico.
- **Anti-cliché prohibido:** "Trusted by", "soluciones integrales", "llevar al siguiente nivel", "revolucionario".
- **Identidad fijada (vinculante):** azul `#35BBFD`, naranja `#F26023`, gris oscuro `#2F3437`. Tipografía de tres roles: Inter Display (display/encabezados), Inter Tight (cuerpo/UI), JetBrains Mono (data/labels/meta). Serif y Playfair están **prohibidos** — pertenecen a la marca muerta archivada.
- **Bimodal siempre:** toda superficie funciona en light y dark.
- **Autoridad del Design System:** Zero Px Policy — nada de medidas ni colores inventados. Tokens en `design-system-app/src/app/globals.css`, export de Figma en `design-system/Light.tokens.json` y `Dark.tokens.json`, motion en `design-system-app/src/lib/motion.ts`.
- **Regla de color heredada:** el naranja como color de **botón** está reservado al CTA de cierre (y al CTA móvil del hero). Como tinte de audiencia o acento es libre.

## Evidence on Hand

**Confirmado por el usuario (11 ago 2026) — set de métricas oficial:**
- **252+** carriers · **25+** años · **216+** agentes · **52** jurisdicciones.
- ⚠️ **Conflicto derivado a reescribir, no a promediar:** el copy canónico y el FAQ construidos todavía afirman "130+ carriers", "5+ años", "Est. 2021", "100+ agentes" y "6,000+ asegurados". Ese set queda **obsoleto**. Al reescribir, revisar en particular la respuesta del FAQ "¿startup o compañía?" y cualquier "Est. 2021", que ya no concuerdan con 25+ años.

**Real y usable:** credenciales legales (USPTO, EIN, NPN), logos de carriers, videos y mockups de producto del ecosistema GO, el proceso de contracting de 5 pasos, la cobertura de 52 jurisdicciones.

**No existe — nunca fabricar:**
- Testimonials reales. Regla dura heredada y vigente: **sin testimonials reales, la sección no existe**.
- Foto real del equipo (`PeopleRevealEpicare` usa un placeholder de Unsplash).
- Assets propios de Eppigo y Solutions.
- Imagen OG (1200×630).
- Pricing, benchmarks, premios o clientes nombrados de cualquier tipo.

## Product Principles

1. **Operación real, no promesa.** Cada afirmación se ancla en algo que ya funciona hoy. Es el motivo central y se repite deliberadamente.
2. **Un solo contrato, portafolio completo.** La simplicidad del acuerdo es el argumento, no la longitud del catálogo.
3. **La infraestructura es el producto.** Lo diferenciador es el sistema que Epicare opera, no la lista de carriers que cualquiera puede replicar.
4. **Cifra sin respaldo no se publica.** Números y credenciales solo si son verificables; una decisión abierta se declara, no se rellena.
5. **Paridad bilingüe sin dilución.** ES y EN dicen exactamente lo mismo con la misma fuerza; ninguno es traducción de segunda.

## Accessibility & Inclusion

Necesidad de producto confirmada: **bilingüe ES/EN completo** (el mercado incluye agentes hispanohablantes en EE. UU.) y `lang` correcto por versión.

Deuda de accesibilidad conocida y verificada en el código actual, que el trabajo futuro debe cerrar en vez de heredar:
- FAQ, acordeones de ForWho, FlipCards y la nav del header son `<div onClick>` — **no operables por teclado**.
- `globals.css` tiene **0** reglas de foco visible y **0** bloques `prefers-reduced-motion`.
- Contraste insuficiente en modo claro: `--color-text-muted` 2.50:1 y `--color-brand-blue` usado como texto 2.17:1 (es el color de todos los overlines). El modo oscuro cumple.
- El pin del Bento en desktop vive bajo `no-preference`: con reduced-motion activo, **5 de 6 tarjetas quedan inalcanzables** — es pérdida de contenido, no solo de animación.

Estándar formal objetivo (WCAG 2.2 AA u otro): **no establecido por el usuario**.
