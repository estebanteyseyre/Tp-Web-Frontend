# Interacción - 2026-11-25 20:40

## Usuario:
- Pidió arrancar el frontend del TP en Angular, consumiendo la API ya hecha en NestJS.
- Quería explicaciones simples y checkpoints para poder defender el código.

## Asistente:
- Generó el proyecto con Angular **22.3.0** en modo **NgModule** (`--no-standalone`), para acercarse al estilo de las slides de la cátedra.
- Explicó las diferencias respecto de Angular 12: `app.ts`, `app-module.ts`, `styleUrl`, `provideHttpClient()` y `public/` en vez de `src/assets/`.
- Configuró en `app-module.ts`:
  - `provideHttpClient()` en vez del viejo `HttpClientModule`.
  - `FormsModule` para poder usar `[(ngModel)]`.
- Generó environments con `ng generate environments`:
  - `environment.ts` (producción) apuntando inicialmente a un placeholder de Render.
  - `environment.development.ts` (desarrollo) apuntando a `http://localhost:3000`.
- Creó `CompeticionData` (`competicion-data.ts`) con `getAll`, `create`, `update` y `remove` usando `HttpClient` y `environment.apiUrl`.
- Definió `CompeticionInput` (sin `id`) para el formulario y `Competicion` (con `id`) para las respuestas.
- Creó `CompeticionList`: tabla con `Nombre / Premio / Fecha / Lugar / Acciones`, link a “Nueva competición” y botón “Borrar”.
- Creó `CompeticionForm`: formulario con `[(ngModel)]`, `required` y mensajes de error por campo.
- Configuró el router: `/competiciones` y `/competiciones/nueva`, con redirección de `''` a `/competiciones`.
- Checkpoints respondidos por el alumno:
  - `whitelist` del `ValidationPipe` descarta campos no declarados en el DTO.
  - `HttpClient` devuelve un `Observable`; con `.subscribe()` se ejecuta la request y se recibe la respuesta.
  - `[(ngModel)]` necesita `FormsModule` para enlazar el input con la propiedad del componente.
- `npm run build` terminó correctamente.
