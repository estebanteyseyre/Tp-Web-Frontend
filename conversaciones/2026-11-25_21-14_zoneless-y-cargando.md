# Interacción - 2026-11-25 21:14

## Usuario:
- Reportó que la página deployada mostraba “TP Tecnologías Web — Competiciones y Autos / Nueva competición / Cargando...” y que la tabla nunca aparecía.

## Asistente:
- Descartó causas previas:
  - El backend respondía `200` con los datos desde la PC del alumno.
  - CORS estaba habilitado (`access-control-allow-origin: *`).
  - El bundle deployado ya apuntaba a Render.
  - El `GET` a Render en el navegador volvía con el JSON correcto y sin errores en consola.
- Abrió la página con el navegador integrado y encontró `window.Zone === undefined`: Angular 22 creó el proyecto en modo **zoneless** (no incluye `zone.js`).
- Explicó el problema: en modo zoneless, una asignación normal dentro de `subscribe` (`this.competiciones = data`) no avisa a Angular de que cambió el estado; el arreglo ya tiene datos pero el DOM sigue mostrando “Cargando...”.
- El alumno escribió el código siguiendo las indicaciones:
  - Importar `ChangeDetectorRef` desde `@angular/core`.
  - Inyectarlo en el constructor de `CompeticionList`.
  - Llamar `this.cdr.markForCheck()` después de asignar en `ngOnInit` y después del `filter` en `borrar`.
- Se guardó el archivo, `npm run build` pasó y se verificó el build de producción en el navegador integrado: apareció la tabla con “Gran Premio de Mónaco”, sin errores.
- Commit: `02305c8` — `fix: marca la vista para actualizar el listado en Angular zoneless`.
- Explicación para la cátedra: en Angular 12, `zone.js` disparaba la detección de cambios automáticamente; en Angular 22 zoneless hay que marcar la vista explícitamente.
- Checkpoint respondido: se quedaba en “Cargando...” porque el `*ngIf` evalúa `competiciones.length === 0` y el `subscribe` no tenía callback de error ni actualizaba una bandera de estado; si la request fallaba, el arreglo quedaba vacío para siempre.
