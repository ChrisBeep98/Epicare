# Contexto de Sección — Project Setup & Architecture

> **Última Actualización:** 5 de Abril, 2026

## 📌 TL;DR
Configuración inicial de la arquitectura base para la plataforma de venta de café (e-commerce) en Next.js App Router. Integración de herramientas esenciales: pnpm, Tailwind CSS, GSAP y la creación de una estructura de directorios escalable para soportar animaciones complejas, tienda y pasarela de pago.

## 🧱 Componentes Involucrados
- `src/app/` (App Router structure: `(shop)/cart`, `(shop)/checkout`, `(shop)/product/[slug]`)
- `src/components/` (`animations/`, `layout/`, `sections/`, `ui/`)
- `src/services/` (`api/`, `payment/`)
- `src/store/` (Global state management placeholder)
- `src/hooks/`, `src/lib/`, `src/types/`
- `public/` (`images/`, `fonts/`, `videos/`)

## 📊 Estado Actual
- **Visual:** Proyecto en blanco con estructura de carpetas creada.
- **Funcional:** Configurado con dependencias (React 19, Next 16.2.2, GSAP, Tailwind). pnpm virtual store corregido.

## 📜 Historial de Cambios
- **5 de Abril, 2026:** [NUEVO] Se generó el proyecto base con `create-next-app` y se instalaron las dependencias principales (`gsap`, `@gsap/react`). Se implementó una arquitectura de carpetas recomendada para e-commerce (App Router, componentes modulares, aislamiento de lógica de animaciones GSAP y servicios externos).

## 📐 Decisiones de Diseño
- **Gestor de Paquetes:** `pnpm` por su rapidez, ahorro de espacio en disco (virtual store) y por los estándares del proyecto (declarados en el contexto global).
- **Aislamiento de GSAP:** Creación de `src/components/animations` para aislar el código de animaciones (wrappers/hooks) de la UI pura (React Server/Client Components). Es vital para evitar tirones y memory leaks con react y gsap.
- **Arquitectura Modular E-commerce:** Se utilizaron grupos de rutas `(shop)` en App Router para aislar el layout de la tienda, y una ruta dinámica `[slug]` para mejorar el SEO de cada producto individual.

## 🐛 Bugs Conocidos / Pendientes
- Ninguno por el momento. Próximos pasos: Configurar fuente global, layout base y provider para GSAP.
