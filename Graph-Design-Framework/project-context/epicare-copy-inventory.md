# 📋 EPICARE LANDING — Inventario Completo de Copy (Censo Agosto 2026)

> **Propósito:** Este documento es la extracción exhaustiva de TODO el texto visible en la landing de Epicare — organizado por sección, en ambos idiomas, señalando qué viene del sistema i18n (`messages/es.json` / `en.json`) y qué está **hardcodeado** directamente en los componentes TSX.
>
> **Para la IA de storytelling:** usa este inventario como la fuente de verdad de lo que dice actualmente cada sección. Itera sobre él para proponer un arco narrativo coherente.

---

## 🚨 PROBLEMAS DETECTADOS EN ESTE CENSO

### A. Hardcoded (sin i18n — no se traducen)
Las siguientes secciones tienen texto visible quemado directamente en el código. **No cambian de idioma** cuando el usuario cambia de ES a EN:

| Sección | Strings hardcodeadas | Severidad |
|:--|:--|:--|
| **FAQ** | 5 preguntas + 5 respuestas + título + overline (TODO) | 🔴 Crítica |
| **Problem** | 6 pain points (título+desc) + h2 + overline + CTA (TODO) | 🔴 Crítica |
| **Coverage52** | Título + overline + subtítulo (parcial — los estados son OK en EN) | 🔴 Crítica |
| **Footer** | Hero heading + CTAs + marquee + links legales | 🟠 Alta |
| **WhyEpicare** | 3 métricas (valor+label) | 🟠 Alta |
| **Metrics** | 4 valores numéricos (`132+`, `15+`, `600+`, `24/7`) | 🟡 Media |
| **ForWho** | 1 texto CTA móvil (`Explore features`) | 🟡 Media |

### B. Voseo (prohibido por directiva — debe ser "tú" neutro)
- `es.json > whyEpicare.subtitle`: *"para que **vos** produzcas más"*
- `es.json > whyEpicare.pillar1Desc`: *"Te **unís** a algo…"*
- `es.json > whyEpicare.pillar2Desc`: *"…datos que no **podés** ver"*
- `es.json > whyEpicare.pillar3Desc`: *"…**tenés** acceso…"*

### C. Inconsistencias de datos (números contradictorios)
- **Metrics** (hardcoded): `132+` carriers, `15+` años, `600+` agentes, `24/7`
- **i18n / Blueprint**: `130+` carriers, `5+` años, `100+` agentes, `6,000+` asegurados
- **WhyEpicare** (hardcoded): `6,000+` asegurados, `52` jurisdicciones, `< 24h` respuesta
- ⚠️ **Los números no coinciden entre secciones**. Confirmar con César.

### D. Copy genérico / cliché detectado
- DarkGradient: *"Opera tu agencia a otro nivel"* — suena genérico
- Bento `itemDiTitle/itemOmsTitle`: *"Item DI"* / *"Item OMS"* — son placeholders olvidados
- Nav items EN idénticos en ES (no traducidos): `aboutCompany`, `aboutTeam`, etc.

---

## SECCIÓN 0 — LOADER
**Componente:** `LoaderEpicare.tsx`
**i18n:** ❌ No usa  
**Estado:** ✅ OK (todo es SVG vectorial, no hay texto)

El texto "EPICARE INSURANCE" se renderiza como paths SVG — no hay strings que traducir.

---

## SECCIÓN 1 — HERO
**Componente:** `HeroEpicare.tsx`  
**i18n:** ✅ `landingV2.hero`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| Indicador scroll | `scrollDown` | Deslizar |
| H1 línea 1 | `title1` | El Sistema Operativo |
| H1 línea 2 | `title2` | Para Agencias de Seguros. |
| Descripción desktop | `description` | Epicare es la plataforma definitiva diseñada para que agentes y agencias gestionen todo su flujo de trabajo, coticen pólizas y escalen ventas desde un solo lugar. |
| Descripción móvil | `descriptionMobile` | Gestiona todo tu flujo de trabajo, cotiza pólizas y escala tus ventas desde un solo lugar. |
| CTA primario | `ctaPlans` | Descubre Nuestros Planes |
| CTA secundario | `ctaAgents` | Para Agentes |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| Scroll indicator | `scrollDown` | Scroll Down |
| H1 line 1 | `title1` | The Operating System |
| H1 line 2 | `title2` | For Insurance Agencies. |
| Description desktop | `description` | Epicare is the ultimate platform designed for agents and agencies to manage their entire workflow, quote policies, and scale sales from a single place. |
| Description mobile | `descriptionMobile` | Manage your entire workflow, quote policies, and scale sales from a single place. |
| Primary CTA | `ctaPlans` | Discover Our Plans |
| Secondary CTA | `ctaAgents` | For Agents |

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L282 | `"Epicare"` | alt de logo (accesibilidad) |

---

## SECCIÓN 1.5 — HEADER (Global)
**Componente:** `HeaderEpicare.tsx`  
**i18n:** ✅ `landingV2.nav`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| Menú: About | `about` | About |
| → Company | `aboutCompany` | Company |
| → Company desc | `aboutCompanyDesc` | Learn about our mission, vision and values. |
| → Team | `aboutTeam` | Team |
| → Team desc | `aboutTeamDesc` | Meet the leaders driving innovation at Epicare. |
| → Licensing | `aboutLicensing` | Licensing |
| → Licensing desc | `aboutLicensingDesc` | Information about our licenses and certifications. |
| Menú: Go Hub | `gohub` | Go Hub |
| → GO CRM | `gohubCrm` | GO CRM |
| → GO CRM desc | `gohubCrmDesc` | Manage relationships and grow your network. |
| → Go AMS | `gohubAms` | Go AMS |
| → Go AMS desc | `gohubAmsDesc` | Automate and optimize membership operations. |
| → GO Calls | `gohubCalls` | GO Calls |
| → GO Calls desc | `gohubCallsDesc` | Integrated calling and communication tools. |
| → Academy | `gohubAcademy` | Epicare Academy |
| → Academy desc | `gohubAcademyDesc` | Training, resources and certifications. |
| Menú: Solutions | `solutions` | Solutions |
| → Marketing | `solMarketing` | Marketing |
| → Marketing desc | `solMarketingDesc` | Attract, engage and convert more members. |
| → Technology | `solTech` | Technology |
| → Tech desc | `solTechDesc` | Scalable and secure technology solutions. |
| Badge | `comingSoon` | Coming Soon |
| Login | `login` | Iniciar Sesión |
| Menú móvil | `moreFromEpicare` | Más de Epicare |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| Login | `login` | Login |
| Mobile menu | `moreFromEpicare` | More from Epicare |
| *(Resto idéntico — las claves nav NO están traducidas a ES, están en EN en ambos idiomas)* | | |

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L210 | `"ES"` / `"EN"` | Badge idioma (visible) |
| L239 | `"Español"` | Dropdown opción (visible) |
| L247 | `"English"` | Dropdown opción (visible) |

### 🔴 BUG: Navigación sin traducir
Casi todas las claves de `nav` están en **inglés en ambos archivos** (`es.json` y `en.json` tienen el mismo texto en EN). Solo `login` y `moreFromEpicare` difieren. Las descripciones de dropdown (Company, Team, etc.) nunca se tradujeron al español.

---

## SECCIÓN 2 — BRANDS CAROUSEL
**Componente:** `BrandsCarousel.tsx`  
**i18n:** ❌ No usa (solo logos)

No hay texto de copy visible. Los logos son imágenes.

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L89 | `"Carrier Logo"` | alt de imagen (accesibilidad) |

---

## SECCIÓN 3 — DARK GRADIENT (La Plataforma / Features)
**Componente:** `DarkGradientSection.tsx`  
**i18n:** ✅ `landingV2.darkGradient`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| H2 | `sectionTitle` | Opera tu agencia a `<span>`otro nivel`</span>`. |
| Subtítulo | `sectionDesc` | No solo abrimos puertas: proporcionamos las herramientas, el apoyo y las oportunidades que necesitas para tener éxito en cada paso. |
| Feature 1 tag | `feature1_step` | 01 · Innovación |
| Feature 1 título | `feature1_title` | Soluciones tecnológicas y de marketing de primer nivel |
| Feature 1 sub | `feature1_subtitle` | Equipa tu negocio con herramientas modernas. |
| Feature 1 body | `feature1_body` | Accede a `<b>`plataformas de marketing y stacks tecnológicos`</b>` de última generación diseñados para `<b>`acelerar tu crecimiento`</b>` y simplificar tus operaciones sin fricciones. |
| Feature 2 tag | `feature2_step` | 02 · Soporte |
| Feature 2 título | `feature2_title` | Orientación experta y soporte de intermediación |
| Feature 2 sub | `feature2_subtitle` | Te acompañamos en cada paso. |
| Feature 2 body | `feature2_body` | Confía en nuestro `<b>`dedicado equipo de veteranos`</b>` de la industria para brindarte `<b>`asesoría personalizada`</b>`, soporte operativo y asesoramiento estratégico cuando lo necesites. |
| Feature 3 tag | `feature3_step` | 03 · Ganancias |
| Feature 3 título | `feature3_title` | Compensación máxima y transparente |
| Feature 3 sub | `feature3_subtitle` | Maximiza tu verdadero potencial. |
| Feature 3 body | `feature3_body` | Disfruta de `<b>`estructuras de comisiones líderes`</b>` en la industria `<b>`sin tarifas ocultas`</b>`. Nuestros modelos transparentes aseguran que seas recompensado justamente por cada éxito. |
| Feature 4 tag | `feature4_step` | 04 · Variedad |
| Feature 4 título | `feature4_title` | Portafolio diverso de productos |
| Feature 4 sub | `feature4_subtitle` | Soluciones para cada tipo de cliente. |
| Feature 4 body | `feature4_body` | Ofrece un conjunto integral de productos de `<b>`aseguradoras de primer nivel`</b>`, lo que te permite `<b>`adaptar la cobertura perfectamente`</b>` a las necesidades únicas de tus clientes. |
| Tooltip tilt | `tiltCard` | Girar |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| H2 | `sectionTitle` | Operate your agency at a `<span>`higher level`</span>`. |
| Subtitle | `sectionDesc` | We don't just open doors — we provide the tools, support, and opportunities you need to succeed at every step. |
| Feature 1 tag | `feature1_step` | 01 · Innovation |
| Feature 1 title | `feature1_title` | Top marketing and tech solutions |
| Feature 1 sub | `feature1_subtitle` | Equip your business with modern tools. |
| Feature 1 body | `feature1_body` | Access next-generation `<b>`marketing platforms and tech stacks`</b>` designed to `<b>`accelerate your growth`</b>` and streamline your operations frictionlessly. |
| Feature 2 tag | `feature2_step` | 02 · Support |
| Feature 2 title | `feature2_title` | Expert guidance and brokerage support |
| Feature 2 sub | `feature2_subtitle` | We guide you every step of the way. |
| Feature 2 body | `feature2_body` | Rely on our `<b>`dedicated team of industry veterans`</b>` to provide `<b>`personalized advice`</b>`, operational support, and strategic counsel whenever you need it. |
| Feature 3 tag | `feature3_step` | 03 · Earnings |
| Feature 3 title | `feature3_title` | Maximum and transparent compensation |
| Feature 3 sub | `feature3_subtitle` | Maximize your true potential. |
| Feature 3 body | `feature3_body` | Enjoy `<b>`industry-leading commission structures`</b>` with `<b>`no hidden fees`</b>`. Our transparent models ensure you are fairly rewarded for every success. |
| Feature 4 tag | `feature4_step` | 04 · Variety |
| Feature 4 title | `feature4_title` | Diverse product portfolio |
| Feature 4 sub | `feature4_subtitle` | Solutions for every client type. |
| Feature 4 body | `feature4_body` | Offer a comprehensive suite of insurance products from `<b>`top-tier carriers`</b>`, allowing you to `<b>`perfectly tailor coverage`</b>` to your clients' unique needs. |
| Tilt tooltip | `tiltCard` | Tilt |

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L281 | `"Go to slide ${idx + 1}"` | aria-label (accesibilidad) |

---

## SECCIÓN 4 — METRICS
**Componente:** `MetricsEpicare.tsx`  
**i18n:** ✅ Parcial — `landingV2.metrics` (labels sí, valores NO)

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| H2 línea 1 | `titleLine1` | Diseñado para escalar |
| H2 línea 2 | `titleLine2` | las operaciones de seguros |
| H2 línea 3 | `titleLine3` | más exigentes. |
| Métrica 1 label | `carriers` | Carrier\nAppointments |
| Métrica 2 label | `years` | Años de\nExperiencia |
| Métrica 3 label | `agents` | Agentes\nActivos |
| Métrica 4 label | `platform` | Plataforma de\nAprendizaje |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| H2 line 1 | `titleLine1` | Engineered to scale |
| H2 line 2 | `titleLine2` | the most demanding |
| H2 line 3 | `titleLine3` | insurance operations. |
| Metric 1 label | `carriers` | Carrier\nAppointments |
| Metric 2 label | `years` | Years of\nExperience |
| Metric 3 label | `agents` | Active\nAgents |
| Metric 4 label | `platform` | Learning\nPlatform |

### 🔴 Hardcoded (Valores numéricos)
| Línea | Texto | Contexto |
|:--|:--|:--|
| L56 | `"132+"` | Valor carriers (visible) |
| L57 | `"15+"` | Valor años (visible) |
| L58 | `"600+"` | Valor agentes (visible) |
| L59 | `"24/7"` | Valor plataforma (visible) |

> ⚠️ **Conflicto:** Blueprint dice `130+` carriers / `5+` años / `100+` agentes. El componente muestra `132+` / `15+` / `600+`.

---

## SECCIÓN 5 — BENTO GRID (Ecosistema)
**Componente:** `BentoGridEpicare.tsx` → `BentoGridDesktop.tsx` + `BentoGridMobile.tsx`  
**i18n:** ✅ `landingV2.bento`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| H2 | `sectionTitle` | Tu agencia,\nun solo ecosistema |
| Subtítulo | `sectionDesc` | Ventas, pólizas, capacitación y operación en `<b>`una sola plataforma`</b>`. Todo lo que tu agencia de seguros necesita para `<b>`crecer sin fricción`</b>`. |
| Card: GO CRM título | `card1Title` | GO CRM |
| Card: GO CRM desc | `card1Desc` | Automatiza procesos, rastrea tratos en tiempo real y aumenta tu flujo de ventas fácilmente. |
| Card: GO AMS título | `card4Title` | GO AMS |
| Card: GO AMS desc | `card4Desc` | Gestión operativa total con herramientas escalables y seguimiento automatizado garantizado. |
| Card: GO CALLS título | `card6Title` | GO CALLS |
| Card: GO CALLS desc | `card6Desc` | Conéctate y comunícate sin problemas con una integración de voz nítida y seguimiento continuo. |
| Card: Métricas título | `card7Title` | Métricas Inteligentes |
| Card: Métricas desc | `card7Desc` | Desbloquea información útil y datos en tiempo real para optimizar tus operaciones diarias. |
| Card: Academy título | `card8Title` | Academy |
| Card: Academy desc | `card8Desc` | Capacitación continua, recursos clave y certificaciones oficiales para dominar el mercado. |
| Card: Eppigo título | `cardEppigoTitle` | Eppigo |
| Card: Eppigo desc | `cardEppigoDesc` | Motor integral para cotizar, generar propuestas e inscribir usuarios desde un solo portal. |
| Card: Solutions título | `cardSolutionsTitle` | Agency Solutions |
| Card: Solutions desc | `cardSolutionsDesc` | Campañas de marketing personalizadas, embudos de ventas y sistemas avanzados para agentes. |
| CTA card | `cardCta` | Explorar |
| Placeholder | `itemDiTitle` | Item DI |
| Placeholder | `itemDiDesc` | Elevate your insurance workflow with intelligent tools. |
| Placeholder | `itemOmsTitle` | Item OMS |
| Placeholder | `itemOmsDesc` | The supreme operating system for elite agencies. |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| H2 | `sectionTitle` | Your agency,\none ecosystem |
| Subtitle | `sectionDesc` | Sales, policies, training and operations in `<b>`a single platform`</b>`. Everything your insurance agency needs to `<b>`grow without friction`</b>`. |
| Card: GO CRM title | `card1Title` | GO CRM |
| Card: GO CRM desc | `card1Desc` | Automate processes, track deals in real time and increase your sales flow easily every day. |
| Card: GO AMS title | `card4Title` | GO AMS |
| Card: GO AMS desc | `card4Desc` | Seamless operations management with scalable tools and fully automated tracking guaranteed. |
| Card: GO CALLS title | `card6Title` | GO CALLS |
| Card: GO CALLS desc | `card6Desc` | Connect and communicate seamlessly with crystal clear voice integration and tracking. |
| Card: Metrics title | `card7Title` | Smart Metrics |
| Card: Metrics desc | `card7Desc` | Unlock actionable insights and real-time data to optimize your daily operations. |
| Card: Academy title | `card8Title` | Academy |
| Card: Academy desc | `card8Desc` | Continuous training, key resources, and official certifications to dominate the industry. |
| Card: Eppigo title | `cardEppigoTitle` | Eppigo |
| Card: Eppigo desc | `cardEppigoDesc` | Comprehensive engine to quote, generate proposals, and enroll users from a single platform. |
| Card: Solutions title | `cardSolutionsTitle` | Agency Solutions |
| Card: Solutions desc | `cardSolutionsDesc` | Custom marketing campaigns, proven sales funnels, and advanced systems built for agents. |
| CTA card | `cardCta` | Explore |
| Placeholder | `itemDiTitle` | Item DI |
| Placeholder | `itemDiDesc` | Elevate your insurance workflow with intelligent tools. |
| Placeholder | `itemOmsTitle` | Item OMS |
| Placeholder | `itemOmsDesc` | The supreme operating system for elite agencies. |

> ⚠️ `itemDiTitle` / `itemDiDesc` / `itemOmsTitle` / `itemOmsDesc` parecen **placeholders olvidados**. Están en EN en ambos idiomas.

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| BentoDesktop L422 | `"Ecosystem progress"` | aria-label (accesibilidad) |
| BentoMobile L372 | `"Ecosystem progress"` | aria-label (accesibilidad) |

---

## SECCIÓN 6 — PEOPLE REVEAL
**Componente:** `PeopleRevealEpicare.tsx`  
**i18n:** ✅ `landingV2.peopleReveal`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| Marquee word | `portalWord` | JUNTOS |
| Statement | `statement` | Expertos de tu lado. |
| Alt imagen | `imageAlt` | Agentes y comunidad de Epicare |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| Marquee word | `portalWord` | TOGETHER |
| Statement | `statement` | Experts on your side. |
| Image alt | `imageAlt` | Epicare agents and community |

✅ Sin hardcoded.

---

## SECCIÓN 7 — PROBLEM (El Problema)
**Componente:** `ProblemSectionEpicare.tsx`  
**i18n:** ❌ **TODO hardcodeado — solo en español**

### 🔴 Hardcoded completo (ES only — EN no existe)
| Elemento | Texto ES |
|:--|:--|
| Overline | El Problema |
| H2 línea 1 | ¿Reconoces estos |
| H2 línea 2 | síntomas? |
| Subtítulo | Si tu operación diaria se ve así, la fragmentación del sistema está ahogando tu crecimiento. |
| Pain 1 título | Portales desconectados |
| Pain 1 desc | Cada carrier exige su propio portal; cruzar datos y conciliar se ha vuelto un proceso 100% manual y propenso a errores. |
| Pain 2 título | Downline invisible |
| Pain 2 desc | No tienes visibilidad en tiempo real de tu equipo, su volumen de producción ni las métricas de retención clave. |
| Pain 3 título | Spreadsheets como sistema |
| Pain 3 desc | La información de tus clientes, comisiones y renovaciones sobrevive esparcida en docenas de archivos frágiles. |
| Pain 4 título | Soporte sin SLAs |
| Pain 4 desc | La comunicación carece de sistema de tickets, no hay historial auditable y los tiempos de respuesta son una incógnita. |
| Pain 5 título | Licencias sin alerta |
| Pain 5 desc | Te enteras de que una licencia estatal venció cuando el negocio ya se detuvo y perdiste la comisión. |
| Pain 6 título | Producción opaca |
| Pain 6 desc | Tus datos viven secuestrados en sistemas legacy de terceros que no puedes auditar, controlar ni integrar. |
| CTA | Descubre la solución |

---

## SECCIÓN 8 — PRODUCT LINES
**Componente:** `ProductLinesEpicare.tsx`  
**i18n:** ✅ `landingV2.productLines`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| Overline | `overline` | Líneas de producto |
| Tag | `tag` | 3 categorías |
| Label | `productsLabel` | productos |
| H2 línea 1 | `titleLine1` | Nuestro portafolio |
| H2 línea 2 | `titleLine2` | de contratos. |
| Descripción | `desc` | Al unirte a Epicare tienes acceso a las tres categorías principales de seguros — con los carriers correctos para cada una. |
| Cat 1 nombre | `cat1_name` | Vida |
| Cat 1 desc | `cat1_desc` | Protección para lo que más importa — desde cobertura temporal hasta pólizas permanentes y gastos finales. |
| Cat 2 nombre | `cat2_name` | Salud |
| Cat 2 desc | `cat2_desc` | Planes médicos para cada etapa y presupuesto, incluyendo el Marketplace y Medicare. |
| Cat 3 nombre | `cat3_name` | Complementario |
| Cat 3 desc | `cat3_desc` | Cobertura que llena los vacíos: dental, visión y protección ante lo inesperado. |
| Life items | `cat1_items` | Term Life · Whole Life · Final Expense |
| Life descs | `cat1_descs` | Cobertura asequible por un período fijo… · Protección permanente que acumula valor… · Póliza de vida pequeña que cubre gastos funerarios… |
| Health items | `cat2_items` | Short Term Medical · Major Medical · ACA / Marketplace · Medicare Advantage (MAPD) |
| Health descs | `cat2_descs` | Cobertura médica temporal… · Cobertura de salud integral… · Planes elegibles a subsidios… · Medicare todo-en-uno… |
| Supp items | `cat3_items` | Dental · Vision · Accident · Cancer · Hospital Indemnity · Critical Illness · Senior Supplement |
| Supp descs | `cat3_descs` | Cobertura para cuidado dental preventivo… · Cobertura de exámenes, lentes… · Beneficios en efectivo por lesiones… · Protección financiera ante diagnóstico… · Pagos fijos en efectivo por hospitalización… · Beneficio de suma única para eventos graves… · Cubre los vacíos que deja Medicare Original. |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| Overline | `overline` | Product lines |
| Tag | `tag` | 3 categories |
| Label | `productsLabel` | products |
| H2 line 1 | `titleLine1` | Our contract |
| H2 line 2 | `titleLine2` | portfolio. |
| Description | `desc` | When you join Epicare you get access to the three core insurance categories — each backed by the right carriers. |
| Cat 1 name | `cat1_name` | Life |
| Cat 1 desc | `cat1_desc` | Protection for what matters most — from term coverage to permanent policies and final expense. |
| Cat 2 name | `cat2_name` | Health |
| Cat 2 desc | `cat2_desc` | Medical plans for every stage and budget, including the Marketplace and Medicare. |
| Cat 3 name | `cat3_name` | Supplementary |
| Cat 3 desc | `cat3_desc` | Coverage that fills the gaps: dental, vision, and protection against the unexpected. |
| *(Items y descriptions — ver es.json para la tabla completa, EN tiene traducciones correctas)* | | |

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L150 | `"Go to ${cat.name}"` | aria-label (accesibilidad, EN) |
| L226 | `"+"` | Símbolo visual de acordeón |

---

## SECCIÓN 9 — FOR WHO (Para Quién)
**Componente:** `ForWhoEpicare.tsx`  
**i18n:** ✅ `landingV2.forWho`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| Overline | `overline` | Para quién es |
| H2 línea 1 | `titleLine1` | Diseñado para |
| H2 línea 2 | `titleLine2` | tu forma de trabajar. |
| Descripción | `desc` | Ya seas agente independiente o agencia con estructura multinivel, Epicare tiene el modelo para tu operación. |
| Tag Agent | `tagAgent` | Agente |
| Tag Owner | `tagOwner` | Agency Owner |
| Tag Sub | `tagSub` | Sub-agencia |
| Toggle Agent | `toggleAgent` | Para agentes |
| Toggle Agency | `toggleAgency` | Para agencias |
| Panel título Agent | `agentTitle` | Para agentes |
| Panel kicker Agent | `agentKicker` | Operas solo, control total |
| Panel título Agency | `agencyTitle` | Para agencias |
| Panel kicker Agency | `agencyKicker` | Multinivel, un solo sistema |
| Agent bullet 1 | `agentItems[0]` | Dashboard que te dice qué atender hoy |
| Agent bullet 2 | `agentItems[1]` | Tus contratos con 130+ carriers en un lugar |
| Agent bullet 3 | `agentItems[2]` | Cotización y enrollment desde un solo portal |
| Agent bullet 4 | `agentItems[3]` | Propuestas profesionales en minutos |
| Agent bullet 5 | `agentItems[4]` | Licencias con alertas de vencimiento |
| Agent bullet 6 | `agentItems[5]` | Soporte a Epicare con SLAs visibles |
| Agent bullet 7 | `agentItems[6]` | Staff con acceso y permisos propios |
| Agency bullet 1 | `agencyItems[0]` | Vista agregada de todo tu downline |
| Agency bullet 2 | `agencyItems[1]` | Onboarding de nuevos agentes desde el portal |
| Agency bullet 3 | `agencyItems[2]` | Contratos de tu agencia centralizados |
| Agency bullet 4 | `agencyItems[3]` | Métricas de producción por agente |
| Agency bullet 5 | `agencyItems[4]` | Estructura multinivel soportada de forma nativa |
| Agency bullet 6 | `agencyItems[5]` | Toggle Agency / Agent — operas en ambos modos |
| Agency bullet 7 | `agencyItems[6]` | Tus agentes usan el mismo sistema que tú |
| Hover hint | `hoverHint` | Pasa el mouse para ver más → |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| Overline | `overline` | Who it's for |
| H2 line 1 | `titleLine1` | Built for |
| H2 line 2 | `titleLine2` | the way you work. |
| Description | `desc` | Whether you're an independent agent or an agency with a multi-level structure, Epicare has the model for your operation. |
| Agent kicker | `agentKicker` | Solo operator, full control |
| Agency kicker | `agencyKicker` | Multi-level, one system |
| Agent bullet 1 | `agentItems[0]` | A dashboard that tells you what to handle today |
| Agent bullet 2 | `agentItems[1]` | Your contracts with 130+ carriers in one place |
| Agent bullet 3 | `agentItems[2]` | Quoting and enrollment from a single portal |
| Agent bullet 4 | `agentItems[3]` | Professional proposals in minutes |
| Agent bullet 5 | `agentItems[4]` | License tracking with expiration alerts |
| Agent bullet 6 | `agentItems[5]` | Epicare support with visible SLAs |
| Agent bullet 7 | `agentItems[6]` | Staff with their own access and permissions |
| Agency bullet 1 | `agencyItems[0]` | Aggregated view of your entire downline |
| Agency bullet 2 | `agencyItems[1]` | Onboard new agents right from the portal |
| Agency bullet 3 | `agencyItems[2]` | Your agency's contracts, centralized |
| Agency bullet 4 | `agencyItems[3]` | Production metrics per agent |
| Agency bullet 5 | `agencyItems[4]` | Multi-level structure supported natively |
| Agency bullet 6 | `agencyItems[5]` | Agency / Agent toggle — operate in both modes |
| Agency bullet 7 | `agencyItems[6]` | Your agents use the same system you do |
| Hover hint | `hoverHint` | Hover to see more → |

### 🔴 Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L108 | `"Explore features"` | CTA móvil (visible, solo EN) |

---

## SECCIÓN 10 — COVERAGE 52
**Componente:** `Coverage52Epicare.tsx`  
**i18n:** ❌ **TODO hardcodeado — solo en español**

### 🔴 Hardcoded completo (ES only — EN no existe)
| Elemento | Texto ES |
|:--|:--|
| Overline | 04 // National Reach |
| H2 | Cobertura 52 Estados |
| Subtítulo | Una infraestructura de red sin fronteras. Desde licencias hasta cumplimiento normativo, operamos en la totalidad del territorio nacional, incluyendo DC y PR. |
| 52 badges | AL, AK, AZ, AR, CA, CO, CT, DE, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY, DC, PR |
| 52 nombres | Alabama, Alaska, Arizona, … Puerto Rico |

> Nota: los códigos de estado y nombres completos son EN por naturaleza. El overline "National Reach" está en inglés dentro del componente "español". El título y subtítulo están en español sin traducción EN.

---

## SECCIÓN 11 — WHY EPICARE (Clímax)
**Componente:** `WhyEpicare.tsx`  
**i18n:** ✅ Parcial — `landingV2.whyEpicare` (textos sí, métricas NO)

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| H2 línea 1 | `headlineLine1` | No somos el intermediario. |
| H2 línea 2 | `headlineLine2` | Somos la operación. |
| Subtítulo | `subtitle` | Hay cientos de agencias en el mercado. La diferencia no está en los carriers que ofrecemos — está en cómo construimos la infraestructura para que **vos** produzcas más. |
| Pilar 1 título | `pillar1Title` | Operación probada, no promesa |
| Pilar 1 desc | `pillar1Desc` | 5 años de operación activa, 6,000+ asegurados y 100+ agentes. Te **unís** a algo que ya funciona — no a un experimento. |
| Pilar 2 título | `pillar2Title` | Tecnología que **vos controlás** |
| Pilar 2 desc | `pillar2Desc` | GO AMS te da visibilidad de tu negocio en tiempo real. Nunca más depender de reportes que llegan tarde o datos que no **podés** ver. |
| Pilar 3 título | `pillar3Title` | 130+ carriers, un solo acuerdo |
| Pilar 3 desc | `pillar3Desc` | Al contratar con Epicare **tenés** acceso al portafolio completo. No necesitás negociar contratos por separado con cada carrier. |
| Pilar 4 título | `pillar4Title` | Equipo que resuelve |
| Pilar 4 desc | `pillar4Desc` | Soporte con SLAs reales, equipo de contracting, commissions y compliance. Cuando algo falla, alguien lo resuelve. |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| H2 line 1 | `headlineLine1` | We are not the middleman. |
| H2 line 2 | `headlineLine2` | We are the operation. |
| Subtitle | `subtitle` | There are hundreds of agencies in the market. The difference isn't in the carriers we offer — it's in how we build the infrastructure so you can produce more. |
| Pillar 1 title | `pillar1Title` | Proven operation, not a promise |
| Pillar 1 desc | `pillar1Desc` | 5 years of active operation, 6,000+ insured and 100+ agents. You join something that already works — not an experiment. |
| Pillar 2 title | `pillar2Title` | Technology you control |
| Pillar 2 desc | `pillar2Desc` | GO AMS gives you visibility of your business in real-time. Never again depend on late reports or data you can't see. |
| Pillar 3 title | `pillar3Title` | 130+ carriers, one agreement |
| Pillar 3 desc | `pillar3Desc` | By contracting with Epicare you get access to the full portfolio. You don't need to negotiate separate contracts with each carrier. |
| Pillar 4 title | `pillar4Title` | A team that solves |
| Pillar 4 desc | `pillar4Desc` | Support with real SLAs, contracting, commissions, and compliance teams. When something fails, someone resolves it. |

### 🔴 Hardcoded (métricas del componente)
| Línea | Texto | Contexto |
|:--|:--|:--|
| L10 | `"6,000+"` / `"Asegurados activos"` | Métrica (ES only) |
| L11 | `"52"` / `"Jurisdicciones"` | Métrica (ES only) |
| L12 | `"< 24h"` / `"Respuesta garantizada"` | Métrica (ES only) |

### 🔴 Voseo en ES
- `subtitle`: "vos produzcas"
- `pillar1Desc`: "Te unís"
- `pillar2Title`: "vos controlás"
- `pillar2Desc`: "no podés ver"
- `pillar3Desc`: "tenés acceso" / "No necesitás"

---

## SECCIÓN 12 — HOW TO JOIN
**Componente:** `HowToJoinEpicare.tsx`  
**i18n:** ✅ `landingV2.howToJoin`

### Español (ES)
| Elemento | Clave i18n | Texto |
|:--|:--|:--|
| Overline | `overline` | 04 // Onboarding |
| H2 línea 1 | `titleLine1` | Cómo Funciona |
| H2 línea 2 | `titleLine2` | la Vinculación |
| Step 1 título | `steps.step1Title` | El Primer Contacto |
| Step 1 desc | `steps.step1Desc` | Todo nace en nuestro portal optimizado. Datos y validación de identidad en tiempo récord, sin burocracia. |
| Step 2 título | `steps.step2Title` | Background Check |
| Step 2 desc | `steps.step2Desc` | Nuestros nodos se conectan con los entes federales. Un proceso que tomaba semanas, resuelto en segundos. |
| Step 3 título | `steps.step3Title` | Firma Electrónica |
| Step 3 desc | `steps.step3Desc` | Olvídate por completo del papel. Tu onboarding se sella criptográficamente en una bóveda transparente. |
| Step 4 título | `steps.step4Title` | Aprovisionamiento |
| Step 4 desc | `steps.step4Desc` | El ecosistema despierta a tu orden. Tus accesos al CRM, AMS y la plataforma se generan automáticamente. |
| Step 5 título | `steps.step5Title` | Entrenamiento |
| Step 5 desc | `steps.step5Desc` | Ingresas a Epicare Academy, nuestra pista de despegue. Aquí obtienes las bases para romper el mercado. |
| Step 6 título | `steps.step6Title` | Ready, Go Live! |
| Step 6 desc | `steps.step6Desc` | Tu infraestructura está lista, tu contrato firmado y accesos activados. Es hora de dominar la industria. |

### English (EN)
| Element | i18n key | Text |
|:--|:--|:--|
| Overline | `overline` | 04 // Onboarding |
| H2 line 1 | `titleLine1` | How the |
| H2 line 2 | `titleLine2` | Onboarding Works |
| Step 1 title | `steps.step1Title` | The First Contact |
| Step 1 desc | `steps.step1Desc` | Everything starts in our optimized portal. Data and identity validation in record time, zero bureaucracy. |
| Step 2 title | `steps.step2Title` | Background Check |
| Step 2 desc | `steps.step2Desc` | Our nodes connect with federal databases. A process that took weeks, now resolved in a matter of seconds. |
| Step 3 title | `steps.step3Title` | Electronic Signature |
| Step 3 desc | `steps.step3Desc` | Forget about paper completely. Your onboarding is cryptographically sealed in a fully transparent vault. |
| Step 4 title | `steps.step4Title` | Provisioning |
| Step 4 desc | `steps.step4Desc` | The ecosystem awakens at your command. Your CRM, AMS, and platform access are generated automatically. |
| Step 5 title | `steps.step5Title` | Training |
| Step 5 desc | `steps.step5Desc` | You enter Epicare Academy, our launchpad. Here you get the knowledge base to dominate the whole market. |
| Step 6 title | `steps.step6Title` | Ready, Go Live! |
| Step 6 desc | `steps.step6Desc` | Your infrastructure is ready, contracts signed and access activated. It's time to dominate the industry. |

### ⚠️ Hardcoded
| Línea | Texto | Tipo |
|:--|:--|:--|
| L61 | `"Step visual ${i}"` | alt imagen (accesibilidad) |

---

## SECCIÓN 13 — FAQ
**Componente:** `FAQEpicare.tsx`  
**i18n:** ❌ **TODO hardcodeado — solo en español**

### 🔴 Hardcoded completo (ES only — EN no existe)
| Elemento | Texto ES |
|:--|:--|
| Overline | F.A.Q. |
| H2 | Dudas Frecuentes |
| Q1 | ¿Qué carriers o aseguradoras están disponibles? |
| A1 | Proveemos acceso directo a los carriers más prestigiosos de nivel nacional y regional en salud, vida y property & casualty. Nuestro motor se actualiza mensualmente con nuevos nombramientos. |
| Q2 | ¿Son dueños de mi Book of Business? |
| A2 | Absolutamente no. Tú mantienes el 100% de la propiedad de tu cartera desde el día uno. Epicare es el motor tecnológico y tu socio operativo, no el dueño de tu trabajo. |
| Q3 | ¿Existen tarifas ocultas de mantenimiento? |
| A3 | Operamos bajo una estructura de costos 100% transparente. Tienes un fee claro por el uso del stack tecnológico (AMS/CRM) y tu split de comisiones acordado. Sin sorpresas. |
| Q4 | ¿Qué pasa si ya tengo mi propio CRM? |
| A4 | El ecosistema Epicare está diseñado para estar unificado. Sin embargo, nuestro sistema incluye APIs abiertas para exportación de datos si deseas mantener respaldos externos. |
| Q5 | ¿Cuánto tiempo toma el onboarding completo? |
| A5 | Si tienes todas tus licencias en regla, el proceso de alta, firma de contratos y aprovisionamiento del software toma entre 24 y 48 horas. |

---

## SECCIÓN 14 — FOOTER
**Componente:** `FooterEpicare.tsx`  
**i18n:** ❌ Parcial — nav links vía `landingV2.nav`, **el resto hardcodeado**

### 🔴 Hardcoded (visible)
| Línea | Texto | Contexto |
|:--|:--|:--|
| L77 | `"EPICARE"` | Marquee background (kinetic) |
| L77 | `"SHAPE THE FUTURE"` | Marquee background (kinetic) |
| L103 | `"Elevate your"` | Hero heading line 1 |
| L103 | `"insurance agency."` | Hero heading line 2 |
| L107 | `"Get Started"` | CTA primario (botón) |
| L114 | `"Contact Us"` | CTA secundario (botón) |
| L208 | `"© {year} EPICARE"` | Copyright |
| L211 | `"Privacy"` | Link legal |
| L212 | `"Terms"` | Link legal |

> ⚠️ Todo el contenido visible del Footer está en **inglés hardcodeado**. No se traduce a español.

---

## RESUMEN DE COBERTURA i18n

| Sección | Componente | i18n | Hardcoded visible | Estado |
|:--|:--|:--|:--|:--|
| Loader | LoaderEpicare | — | 0 | ✅ |
| Hero | HeroEpicare | ✅ | 0 | ✅ |
| Header | HeaderEpicare | ✅ parcial | 3 (idioma UI) | 🟡 Nav sin traducir |
| Brands | BrandsCarousel | — | 0 | ✅ |
| DarkGradient | DarkGradientSection | ✅ | 0 | ✅ |
| Metrics | MetricsEpicare | ✅ parcial | 4 (valores) | 🟡 Números contradictorios |
| BentoGrid | BentoGrid* | ✅ | 0 | 🟡 Placeholders olvidados |
| PeopleReveal | PeopleRevealEpicare | ✅ | 0 | ✅ |
| **Problem** | ProblemSectionEpicare | ❌ | **~18 strings** | 🔴 Todo hardcodeado |
| ProductLines | ProductLinesEpicare | ✅ | 0 | ✅ |
| **ForWho** | ForWhoEpicare | ✅ | 1 CTA | 🟡 |
| **Coverage52** | Coverage52Epicare | ❌ | **~56 strings** | 🔴 Todo hardcodeado |
| **WhyEpicare** | WhyEpicare | ✅ parcial | 3 métricas | 🔴 Voseo |
| HowToJoin | HowToJoinEpicare | ✅ | 0 | ✅ |
| **FAQ** | FAQEpicare | ❌ | **~12 strings** | 🔴 Todo hardcodeado |
| **Footer** | FooterEpicare | ❌ parcial | **~9 strings** | 🔴 Todo hardcodeado |
