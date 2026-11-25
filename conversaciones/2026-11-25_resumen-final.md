# Resumen final del frontend

## Estado

TP de Tecnologías Web (TUARI/UNICEN), entrega 2 completada del lado del frontend.
Angular 22.3.0 en modo NgModule, consumiendo la API REST del backend desplegado en Render.

## Enlaces

- Repo frontend: https://github.com/estebanteyseyre/Tp-Web-Frontend
- Repo backend: https://github.com/estebanteyseyre/Tp-Web
- Frontend (Netlify): https://tp-web-frontend-srau.netlify.app
- Backend (Render): https://tp-web-backend-w7x0.onrender.com

## Funcionalidades

- CRUD completo de **Competiciones**: listar, crear, editar y borrar.
- CRUD completo de **Autos**: listar, crear, editar y borrar.
- Relación **1:N** visible en ambas tablas.
- Formularios con validación y mensajes de error por campo.
- Errores de carga/guardado visibles en la UI (nunca queda “Cargando...” para siempre).
- Diseño responsive con breakpoint de 700px.
- Environments separados: desarrollo (`localhost:3000`) y producción (Render).
- `_redirects` para soportar refresh de rutas internas en Netlify.

## Commits del frontend

- `ac974f1` — frontend Angular con listado, alta y borrado de competiciones.
- `b41c6a8` — apunta a Render en producción y agrega `_redirects`.
- `02305c8` — `markForCheck()` para Angular zoneless.
- `64ea497` — documentación y URLs de deploy.
- `07bcdb3` — CRUD de autos, edición, errores en UI y estilos responsive.

## Verificación

- `npm run build` → OK, bundle `main-QYO6HE2I.js`.
- `npm test` → 4 archivos, 5 tests pasando.
- `GET /competiciones`, `/autos` y `/competiciones/nueva` en Netlify → 200.
- `GET /competiciones` en Render → 200 con datos.
- Repositorios públicos y sin `.env` subido (solo `.env.example` en el backend).

## Notas para la defensa

- Angular 22 usa `provideHttpClient()`, `styleUrl`, `standalone: false` y `public/`.
- Es zoneless: por eso se llama a `ChangeDetectorRef.markForCheck()` tras asignar en `subscribe`.
- El `<select>` usa `[ngValue]` para conservar el `competicionId` como número.
- El plan gratuito de Render duerme el servicio: la primera request puede tardar cerca de un minuto.
