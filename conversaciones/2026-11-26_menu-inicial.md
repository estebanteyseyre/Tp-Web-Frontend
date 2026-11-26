# Interacción - 2026-11-26 11:40

## Usuario:
- Pidió un menú inicial con un título grande en el medio y, abajo, dos botones: **Competiciones** y **Autos**.
- Adjuntó la imagen `fondo-bandera-cuadros-carreras-planas_23-2148962002.avif` para usarla de fondo.

## Asistente:
- Copió el archivo adjunto a `public/fondo.avif` (18 KB). Angular sirve `public/` en la raíz, así que funciona igual en desarrollo y en Netlify.
- Reemplazó el fondo CSS por `background-image` con un `linear-gradient` oscuro encima de `url('/fondo.avif')`, para que el texto blanco se lea bien. Si el navegador no soporta AVIF, queda el degradado como fallback.
- Creó el componente `Home` (`home.ts`, `home.html`, `home.css` y `home.spec.ts`):
  - etiqueta “Tecnologías Web · TUARI/UNICEN”,
  - título grande centrado “Competiciones y Autos”,
  - descripción corta,
  - dos botones grandes con la clase `.btn-grande`.
- Cambió la ruta `''` en `app-routing-module.ts`: antes redirigía a `/competiciones`, ahora muestra `Home`.
- En `app.ts` agregó `esInicio`, calculado con `router.url` y actualizado con `router.events` filtrados por `NavigationEnd`. Como el proyecto es zoneless, se llama a `ChangeDetectorRef.markForCheck()` después de cambiarlo.
- En `app.html` el `<aside class="menu-lateral">` se oculta con `*ngIf="!esInicio"`: en el inicio no hay sidebar, en las listas sí. El título de la cabecera ahora es un link a `/` para poder volver.
- Actualizó `app.spec.ts` con `CommonModule` para que el `*ngIf` del template no deje directivas sin resolver en el test.
- Verificación:
  - `npm run build` OK (`main-IBSJHJ53.js`).
  - `npm test` → 5 archivos, **6 tests pasando**.
  - En el navegador: el inicio muestra el título y los dos botones sin sidebar; al tocar “Competiciones” aparece la tabla y el menú lateral con el link activo; al tocar el título vuelve al inicio.
  - La request a `/fondo.avif` responde 200 y el `background-image` computado contiene la URL de la imagen. Sin errores en consola.
- Checkpoint: ¿por qué hace falta `markForCheck()` al actualizar `esInicio`? En Angular zoneless el evento del Router no dispara por sí solo la detección de cambios; hay que marcar la vista.
