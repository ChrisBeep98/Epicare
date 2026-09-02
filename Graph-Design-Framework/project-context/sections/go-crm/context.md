# Sección: GO CRM (/go-crm)

> **Estado:** Inicializada / En construcción
> **Ruta:** `/go-crm`
> **Archivos principales:**
> - `src/app/go-crm/layout.tsx` (Metadata SEO & OpenGraph)
> - `src/app/go-crm/page.tsx` (Orquestador de página)
> - `src/components/go-crm/` (Componentes modulares de GO CRM)

---

## 1. Visión y Propósito
**GO CRM** es la solución de gestión de prospectos, pipeline comercial y automatización de seguimiento de clientes dentro del **Ecosistema GO** de Epicare.

Permite a agentes y agencias:
- Centralizar leads entrantes y oportunidades en distintas etapas de cotización y cierre.
- Automatizar recordatorios, seguimiento de pólizas y renovaciones.
- Sincronizarse de manera bidireccional con **GO AMS** para evitar silos de información.

---

## 2. Arquitectura de Componentes
- `HeroGoCrm.tsx`: Apertura de la página, propuesta de valor y llamados a la acción iniciales.
- *(Próximos componentes: Pipeline Visualizer, Lead Tracking, Automation Engine, FAQ, etc.)*

---

## 3. Tokens y Reglas de Diseño
- **Zero Px Policy:** Todo espaciado, tipografía y elevaciones basadas en tokens del Design System.
- **Paleta de Marca:** Bimodal light/dark con énfasis en Brand Blue (`#35BBFD`), Brand Dark (`#2F3437`) y Brand Orange (`#F26023`).
- **Motion:** Integración con GSAP 3.15, ScrollTrigger, y tokens de `motion.ts`.
- **i18n:** Namespace `"goCrm"` en `messages/en.json` y `messages/es.json`.
