# Resumen de conversaciones — FRONTEND (para entregar)

**Alcance:** sólo el trabajo del frontend (`Tp-Web-Frontend`). El historia del backend está en el otro repo y no se incluye acá.
**URL de la app:** https://tp-web-frontend-srau.netlify.app  
**Repo:** https://github.com/estebanteyseyre/Tp-Web-Frontend

Este archivo es un índice contado en palabras simples: qué se pidió, qué se hizo y qué concepto conviene poder explicar. El detalle de cada interacción está en los archivos `2026-11-25_*.md` y `2026-11-26_*.md` de esta misma carpeta. No hay credenciales en ninguno.

## 1. Cronología

### 2026-11-25 — Armado del proyecto
Se generó el proyecto Angular 22 con NgModule, se crearon los servicios `CompeticionData` y `AutoData` con `HttpClient`, y el CRUD de competiciones. Se aprendió que la URL de la API debe salir de `environments/`, no escrita a mano en el servicio.

### 2026-11-25 — Deploy y datos de prueba
Se configuró Netlify (build `npm run build`, publicar `dist/frontend-competicion/browser`) y se agregó `public/_redirects` con `/* /index.html 200` para poder refrescar rutas internas. Se cargaron competiciones de ejemplo desde la colección de Postman contra Render.

### 2026-11-25 — El bug de “Cargando...”
La pantalla se quedaba en “Cargando...” aunque la respuesta llegaba. Causa: Angular 22 es **zoneless**, por lo que una asignación dentro del `subscribe` no dispara por sí sola la detección de cambios. Solución: `ChangeDetectorRef.markForCheck()` después de asignar. Es el concepto más importante para explicar en la defensa.

### 2026-11-25 — CRUD de autos y errores en UI
Se agregó el módulo de autos con el `<select>` de competición usando `[ngValue]="c.id"` (para que el valor siga siendo `number` y pase la validación `@IsInt()` del backend). Se sumaron estados `cargando`/`error` y diseño responsive.

### 2026-11-25 — Estado final de la entrega
Se verificó build, tests, rutas y deploys; se cerró con los commits `ac974f1` … `eb26408`.

### 2026-11-26 — Estética
Se pasó el menú a un `<aside>` a la izquierda con `routerLinkActive="activo"` y se unificaron los botones en `.btn` con variantes primaria, secundaria y de peligro.

### 2026-11-26 — Menú inicial
Se creó `Home` con un título grande y dos botones. La ruta `''` dejó de redirigir a `/competiciones`. Se oculta el menú lateral en el inicio y el título de la cabecera volvió al inicio. Se agregó `public/fondo.avif`.

### 2026-11-26 — Buscadores y autos por competición
Se creó `shared/busqueda.ts` (`normalizar` + `coincide`) y se agregaron buscadores en ambas tablas. El botón “Ver autos” navega a `/autos?competicion=<id>` y `AutoList` lee ese parámetro con `ActivatedRoute.queryParamMap` (cancelando la suscripción con `takeUntilDestroyed`).

**Bug corregido:** el backend devuelve la relación como `auto.competicion` (objeto), no como `competicionId`; el filtro comparaba el campo inexistente y no mostraba nada. Ahora usa `auto.competicion?.id ?? auto.competicionId`.

### 2026-11-26 — Detalle y extras (esta entrega)
Se agregó:

1. **Validación visible por campo** — en realidad ya estaba: `#nombre="ngModel"` y `*ngIf="nombre.invalid && nombre.touched"`. Se verificó en navegador (al salir del campo aparece “El nombre es obligatorio.” y “Guardar” sigue deshabilitado).
2. **Botón “Actualizar lista”** — vuelve a llamar al `getAll()` del servicio; muestra “Actualizando...” mientras espera.
3. **Ordenar por columna** — botones en los `<th>` con flecha ▲/▼ que invierten el sentido; el `sort()` se hace sobre el array ya cargado, sin pedir datos al backend.
4. **Confirmación antes de borrar** — modal con “Sí, borrar” / “Cancelar”; el `DELETE` sólo se dispara al confirmar.
5. **Vista maestro-detalle** — ruta `/competiciones/:id` con `CompeticionDetail`. Llama al mismo `GET /competiciones/:id` que usa el formulario de edición; el backend responde con `relations: { autos: true }`, así que en una sola vista se muestra la competición y sus autos. Tiene botones “Editar competición”, “Ver autos en lista” y “Volver a competiciones”.

## 2. Cómo conviene explicar la opción 5 (maestro-detalle)

- **Cierra el ciclo 1:N de punta a punta:** en NestJS el `findOne` carga la relación con TypeORM (`relations: { autos: true }`), el JSON viaja por HTTP y Angular lo pinta como vista maestro-detalle.
- **Justifica la clave foránea:** el auto guarda `competicionId`; de ahí sale la integridad referencial entre las dos entidades.
- **Muestra dos estados distintos:** `findAll` (listado liviano, con autos resumidos) versus `findOne` (detalle con la relación cargada). Son dos endpoints y dos componentes distintos.

## 3. Checklist verificado de la entrega 2

- [x] CRUD completo de competiciones y autos desde la UI.
- [x] Relación 1:N visible en lista, filtro y detalle.
- [x] Formularios con validación y mensajes por campo.
- [x] Errores del backend mostrados en pantalla.
- [x] Diseño responsive.
- [x] Buscadores, orden, recarga y confirmación de borrado.
- [x] Deploy: frontend en Netlify, backend en Render con datos de ejemplo. El último push todavía estaba pendiente de publicación al momento de escribir este resumen: Netlify sirve el bundle anterior; el refresh de rutas internas (incluida `/competiciones/4`) ya responde 200.
- [x] `_redirects` para refrescar rutas internas, incluida la nueva `/competiciones/:id`.
- [x] Producción apunta a Render (no a `localhost`).
- [x] Build y tests en verde; verificación en navegador sin errores de consola.
- [ ] El mail con los 4 links: borrador listo, falta completar nombre del alumno y del profesor y enviarlo.

**Recordatorio para el día de la entrega:** el plan gratuito de Render duerme el servicio; la primera request puede tardar cerca de un minuto y la UI muestra “Cargando...” mientras tanto. La base gratuita de Render vence a los 30 días, conviene creada cerca de la fecha de entrega.

## 4. Archivos del historial (sólo frontend)

- `README.md` — índice de esta carpeta.
- `2026-11-25_20-40_inicio-frontend.md`
- `2026-11-25_21-10_deploy-y-postman.md`
- `2026-11-25_21-14_zoneless-y-cargando.md`
- `2026-11-25_21-32_entrega2-crud-autos.md`
- `2026-11-25_resumen-final.md`
- `2026-11-26_estetica.md`
- `2026-11-26_menu-inicial.md`
- `2026-11-26_buscar-y-filtrar.md`
- `2026-11-26_detalle-y-extras.md`
- `resumen-frontend.md` — resumen técnico (stack, rutas, servicios, commits).
- `RESUMEN-PARA-ENTREGA.md` — este archivo.
