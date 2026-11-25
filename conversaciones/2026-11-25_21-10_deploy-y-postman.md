# Interacción - 2026-11-25 21:10

## Usuario:
- Pidió ayuda para desplegar el backend en Render y cargar datos de ejemplo desde Postman.
- Después pidió desplegar el frontend en Netlify y que la tabla mostrara los datos.

## Asistente:
- Explicó cómo separar la **Internal Database URL** de Render en las 5 variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) y advirtió que la contraseña no debía pegarse en el repo.
- Creó el Web Service en Render con build `npm install --include=dev && npm run build` y start `npm run start:prod`.
- URL pública del backend: `https://tp-web-backend-w7x0.onrender.com`.
- Aclaró en Postman:
  - La copia local de la colección tenía `localhost` escrito a mano; hacía falta reimportar el JSON del repo para usar `{{baseUrl}}`.
  - La variable `baseUrl` va sin barra final.
  - El error `%0A` era un salto de línea al final de la URL.
- Se cargaron datos de ejemplo:
  - `POST /competiciones` → “Gran Premio de Mónaco” (`id: 1`).
  - `POST /autos` → Ferrari F1-75 (`competicionId: 1`).
  - `GET /competiciones` devolvió la competición con el array `autos` adentro.
- Checkpoint respondido: el auto muestra el objeto `competicion` completo porque `AutosService` carga `relations: { competicion: true }`; el ORM resuelve la FK y devuelve la entidad relacionada.
- Actualizó `src/environments/environment.ts` con la URL de Render y agregó `public/_redirects` con `/* /index.html 200` para que Netlify no dé 404 al refrescar rutas internas.
- Explicó el deploy en Netlify:
  - Build command: `npm run build`.
  - Publish directory: `dist/frontend-competicion/browser`.
  - El primer sitio (`frontend-deployment-e81158`) era privado y clonaba un repo equivocado; se creó el sitio definitivo conectado a `Tp-Web-Frontend`, rama `main`, con acceso **Public**.
  - URL final: `https://tp-web-frontend-srau.netlify.app`.
- Verificó que el bundle deployado contuviera la URL de Render y no el placeholder.
