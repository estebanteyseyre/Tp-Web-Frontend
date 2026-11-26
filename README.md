# TP Tecnologías Web — Frontend: Competiciones y Autos

SPA de Angular que consume la API REST del backend de este TP. Permite el **CRUD completo de competiciones y autos** desde la UI, muestra la relación 1:N (cantidad de autos por competición y competición asignada a cada auto) y maneja errores de carga/guardado.

Incluye pantalla inicial con dos botones, menú lateral, imagen de fondo, **buscadores en ambas tablas**, orden por columna, botón “Actualizar lista”, confirmación antes de borrar y una **vista de detalle** en `/competiciones/:id` que muestra una competición con sus autos. El botón “Ver autos” filtra con `/autos?competicion=<id>`.

## Deploy

- **Frontend (Render Static Site):** `https://<nombre>.onrender.com` — se crea desde el `render.yaml` de este repo. Reemplazar `<nombre>` por el dominio que asigne Render.
- **Backend (Render):** https://tp-web-backend-w7x0.onrender.com
- **Frontend anterior (Netlify):** https://tp-web-frontend-srau.netlify.app — quedó **pausado por créditos agotados** del plan gratuito y todavía sirve el bundle anterior. No se usa para la entrega.

### Cómo publicar el frontend en Render

1. En https://dashboard.render.com elegir **New → Blueprint**.
2. Conectar el repo `Tp-Web-Frontend`, rama `main`.
3. Aplicar el blueprint. `render.yaml` ya trae:
   - **Build command:** `npm ci && npm run build`
   - **Publish directory:** `dist/frontend-competicion/browser`
   - **Rewrite** `/*` → `/index.html` (equivalente a `public/_redirects` en Netlify) para poder refrescar `/competiciones/4`.
   - `NODE_VERSION=24` (Angular 22 necesita Node 22.22.3+ o 24.15+).
4. Verificar con **Ctrl+U** que el HTML referencie `main-HBAHTSRN.js` y probar **Ver detalle** en una competición.

En Netlify el build estaba configurado con `npm run build` y publish `dist/frontend-competicion/browser`; el archivo `public/_redirects` (`/* /index.html 200`) hacía lo mismo que el rewrite de Render. Se conserva por si algún día se reanuda el equipo.

La imagen de fondo está en `public/fondo.avif` y se aplica desde `styles.css` con un overlay oscuro para que el texto se lea bien. Angular sirve `public/` en la raíz, así que también funciona en Netlify.

## Stack

- **Angular 22.3.0** en modo **NgModule** (`standalone: false`), igual que el estilo de las slides pero con la versión actual del framework.
- **HttpClient** provisto con `provideHttpClient()` en `app-module.ts`.
- **FormsModule** para `[(ngModel)]` en el formulario.
- **Router** con rutas `/`, `/competiciones`, `/autos`, altas, ediciones y `/competiciones/:id` (ver `conversaciones/resumen-frontend.md`).
- **Environments** generados con `ng generate environments`.

## Desarrollo

```bash
npm install
npm start
```

Abrir `http://localhost:4200`. En desarrollo se usa `src/environments/environment.development.ts`, que apunta a `http://localhost:3000`. En producción se usa `src/environments/environment.ts`, que apunta a Render.

## Estructura relevante

```
src/app/
  app.ts / app.html              -> layout con header y <router-outlet>
  app-module.ts                  -> providers (HttpClient) y declaraciones
  app-routing-module.ts          -> rutas (/, /competiciones, /autos)
  home/                          -> pantalla inicial con título y dos botones
  competiciones/
    competicion-data.ts          -> servicio con el CRUD (GET/POST/PATCH/DELETE)
    competicion-list/            -> tabla con buscador, cantidad de autos y botón "Ver autos"
    competicion-form/            -> formulario con validación (alta y edición)
    competicion-detail/          -> detalle de una competición con sus autos
  autos/
    auto-data.ts                 -> servicio con el CRUD de autos
    auto-list/                   -> tabla con buscador y filtro por competición
    auto-form/                   -> formulario con <select> de competición
  shared/busqueda.ts             -> normalización y coincidencia para los buscadores
src/environments/                -> URL de la API según entorno
public/_redirects                -> soporte de rutas en Netlify
render.yaml                      -> Static Site en Render (build, publish y rewrite SPA)
```

## Build y tests

```bash
npm run build   # genera dist/frontend-competicion/browser
npm test        # Vitest (8 archivos, 16 tests pasando)
```

## Notas para la cátedra

Angular 22 trae cambios respecto del Angular 12 de las slides:

- Los archivos se llaman `app.ts`, `app-module.ts` y usan `styleUrl` (en singular).
- `provideHttpClient()` reemplaza al viejo `HttpClientModule`.
- No se incluye `zone.js`: la app es **zoneless**. Por eso, después de asignar datos dentro de un `subscribe`, se llama a `ChangeDetectorRef.markForCheck()` para actualizar la vista (ver `competicion-list.ts`).
- Los assets estáticos van en `public/`, no en `src/assets/`.
- Los buscadores filtran en el cliente con `shared/busqueda.ts` (sin tildes ni mayúsculas). `AutoList` lee `?competicion=<id>` con `ActivatedRoute.queryParamMap` y cancela esa suscripción con `takeUntilDestroyed()`.

## Resumen para la entrega

- `conversaciones/RESUMEN-PARA-ENTREGA.md` — resumen de las conversaciones del frontend y checklist.
- `conversaciones/resumen-frontend.md` — resumen técnico: stack, rutas, servicios y commits.
