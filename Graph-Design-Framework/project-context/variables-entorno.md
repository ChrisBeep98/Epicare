# Manejo de Variables de Entorno y Supabase

Este documento explica de manera detallada por qué fue necesario crear variables de entorno locales con "llaves falsas" durante el proceso de rediseño de la Landing Page, y cómo funciona esta interacción con la arquitectura existente del proyecto.

## 1. El Problema: El Middleware de Next.js y Supabase

El proyecto original de SalentoCoffee es una aplicación completa (no solo una página estática) que incluye áreas privadas (como `/admin` o `/dashboard`). Para proteger estas áreas, se utiliza **Supabase** como proveedor de autenticación y base de datos.

En Next.js, la seguridad se suele manejar mediante un archivo llamado `src/middleware.ts`. Este archivo actúa como un "portero" que se ejecuta *antes* de cargar cualquier página. Su trabajo es:
1. Comprobar a qué ruta quieres entrar.
2. Si la ruta requiere sesión, se comunica con Supabase para verificar si eres un usuario válido.
3. Para comunicarse con Supabase, **requiere obligatoriamente dos llaves secretas**: la URL de tu proyecto y una clave anónima (Anon Key).

**El Crasheo (Error 500):**
Cuando clonamos el repositorio para trabajar localmente, no teníamos el archivo `.env` original (por seguridad, las llaves reales nunca se suben a GitHub). Al intentar entrar a la nueva ruta de prueba (`localhost:3000/inicio-nuevo`), el middleware intentaba inicializar el cliente de Supabase. Como no encontraba las llaves en tu computadora, el código fallaba miserablemente, lanzando el error: `URL and Key are required to create a Supabase client!`.

## 2. La Solución: Llaves "Dummy" (Falsas) locales

Para poder trabajar en el diseño visual de la Landing Page (la cual es pública y no necesita base de datos) sin romper el proyecto, implementamos una solución estándar en la industria:

### A. Crear `.env.local`
Creamos un archivo llamado `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.dummy_key
```

**¿Por qué funciona?**
- Al ver estas llaves (aunque sean invenciones nuestras), Next.js deja de lanzar el error de "llaves faltantes", permitiendo que el servidor arranque.
- Este archivo `.env.local` es ignorado automáticamente por Git (gracias al `.gitignore`), por lo que **estas llaves falsas jamás se subirán al repositorio de tus compañeros**. Solo existen en tu computadora.

### B. Evitar que el Middleware use las llaves falsas
Si el middleware intentara usar esas llaves falsas para consultar la base de datos, el servidor de Supabase nos rechazaría (porque son inventadas). 
Para evitar esto, modificamos `src/middleware.ts` añadiendo nuestra ruta de prueba a la "lista blanca" de rutas públicas:

```typescript
// Antes
const publicRoutes = ['/', '/privacy', '/terms'];

// Después
const publicRoutes = ['/', '/privacy', '/terms', '/inicio-nuevo'];
```

De esta forma, cuando entras a `/inicio-nuevo`, el middleware dice: *"Ah, esta ruta es pública, la dejo pasar directamente sin preguntarle nada a Supabase"*.

## 3. ¿Qué pasará en Producción?

**No tienes que preocuparte por nada.** El entorno está totalmente protegido:

1. **Tus compañeros no se verán afectados:** Al hacer `git push`, el archivo `.env.local` no se sube. Ellos seguirán usando sus propias llaves locales o de desarrollo sin interrupciones.
2. **El servidor de producción tiene sus propias llaves:** Cuando el código se despliegue (se publique en Vercel, Netlify, etc.), ese servidor ya tiene configuradas en su panel las verdaderas variables de entorno del proyecto original. 
3. **Reemplazo Final:** Cuando terminemos el rediseño y pasemos el contenido de `/inicio-nuevo` al verdadero `/` (el cual ya está en la lista de `publicRoutes`), el comportamiento será exactamente el mismo: se cargará el hermoso diseño sin molestar a Supabase, mientras que las áreas privadas seguirán funcionando perfectamente para los administradores reales.
