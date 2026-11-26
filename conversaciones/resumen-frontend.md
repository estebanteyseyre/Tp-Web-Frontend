# Resumen del frontend — TP Tecnologías Web

**Estado:** listo para entregar (Entrega 2).  
**URL pública:** https://tp-web-frontend-srau.netlify.app  
**Backend que consume:** https://tp-web-backend-w7x0.onrender.com  
**Repo:** https://github.com/estebanteyseyre/Tp-Web-Frontend

## 1. Qué hace

Es una SPA de Angular que administra **Competiciones** y **Autos** contra la API REST del backend.

- CRUD completo de **competiciones**: listar, crear, editar, borrar.
- CRUD completo de **autos**: listar, crear, editar, borrar.
- Relación **1:N** visible:
  - en la tabla de competiciones se muestra la cantidad de autos (`c.autos?.length`);
  - en la tabla de autos se muestra la competición asignada (`a.competicion?.nombre`).
- **Ver los autos de una competición:** botón “Ver autos” en cada fila navega a `/autos?competicion=<id>`; el listado de autos muestra un aviso con el nombre de la competición y un botón “Ver todos los autos”.
- **Buscadores** en ambas tablas: filtran mientras escribo, ignorando mayúsculas y tildes.
- Pantalla inicial con título grande y dos botones (“Competiciones” y “Autos”).
- Menú lateral izquierdo en las pantallas internas; se oculta en el inicio.
- Errores y estados de carga visibles en la UI.
- Diseño responsive: en pantallas chicas el menú pasa arriba, la tabla scrollea horizontalmente y los botones se adaptan.

## 2. Stack y decisiones técnicas

- **Angular 22.3.0**, modo **NgModule** (`standalone: false`).
- `provideHttpClient()` en `app-module.ts` (reemplaza al viejo `HttpClientModule`).
- `FormsModule` para `[(ngModel)]` en formularios y buscadores.
- **Router** con rutas declaradas en `app-routing-module.ts`.
- **Zoneless**: no hay Zone.js. Cada vez que una respuesta HTTP o un evento del Router actualiza una propiedad, se llama a `ChangeDetectorRef.markForCheck()` para pedir un ciclo de detección de cambios.
- La suscripción a `queryParamMap` se cancela con `takeUntilDestroyed(this.destroyRef)` para no dejar suscripciones colgadas.
- `environments`: `environment.ts` apunta a Render (producción) y `environment.development.ts` a `http://localhost:3000` (desarrollo).
- Assets estáticos en `public/`: `fondo.avif` y `_redirects`.

## 3. Estructura de archivos

```
src/app/
  app.ts / app.html / app.css        -> layout: cabecera, menú lateral, router-outlet
  app-module.ts                      -> declaraciones y providers
  app-routing-module.ts              -> rutas
  home/                              -> pantalla inicial
  competiciones/
    competicion-data.ts              -> servicio CRUD de competiciones
    competicion-list/                -> tabla + buscador + botón "Ver autos"
    competicion-form/                -> alta y edición con validación
  autos/
    auto-data.ts                     -> servicio CRUD de autos
    auto-list/                       -> tabla + buscador + filtro por competición
    auto-form/                       -> alta y edición con <select> de competición
  shared/busqueda.ts                 -> normalizar / coincide (buscadores)
src/environments/                    -> URL de la API por entorno
public/_redirects                    -> /* /index.html 200 (refrescar rutas en Netlify)
public/fondo.avif                    -> imagen de fondo
```

## 4. Rutas

| Ruta | Componente | Función |
| --- | --- | --- |
| `/` | `Home` | Menú inicial con dos botones |
| `/competiciones` | `CompeticionList` | Lista, buscador y acciones |
| `/competiciones/nueva` | `CompeticionForm` | Alta |
| `/competiciones/editar/:id` | `CompeticionForm` | Edición |
| `/autos` | `AutoList` | Lista, buscador y filtro opcional |
| `/autos?competicion=:id` | `AutoList` | Autos de una competición |
| `/autos/nuevo` | `AutoForm` | Alta |
| `/autos/editar/:id` | `AutoForm` | Edición |

## 5. Servicios (métodos)

- `CompeticionData`: `getAll()`, `getById(id)`, `create(dto)`, `update(id, dto)`, `remove(id)`.
- `AutoData`: `getAll()`, `getById(id)`, `create(dto)`, `update(id, dto)`, `remove(id)`.

El `select` del formulario de autos usa `[ngValue]="c.id"` para mantener el valor como `number` (el backend valida con `@IsInt()`).

La API devuelve la relación como `auto.competicion` (objeto), **no** como `competicionId`. Por eso el filtro por competición usa `auto.competicion?.id ?? auto.competicionId`.

## 6. Validación y errores

- Formularios con `ngModel` + `required` y `minlength` donde corresponde; el botón “Guardar” queda deshabilitado hasta que el formulario es válido.
- Estados `cargando` y `error` en los listados; `subscribe({ next, error })` para cada operación.
- Si falla el GET de competiciones dentro de `AutoList`, el listado de autos igual funciona y el nombre del filtro muestra el ID.

## 7. Cómo verificar

```bash
cd "D:\trabajo especial web\frontend-competicion"
npm install
npm start        # http://localhost:4200 (usa API local en :3000)
npm run build    # genera dist/frontend-competicion/browser
npm test         # Vitest
```

Para probar en producción basta abrir la URL de Netlify (usa la API de Render; si el plan gratuito durmió el servicio, la primera request puede tardar ~1 minuto).

## 8. Commits del frontend

- `ac974f1`, `b41c6a8`, `02305c8`, `64ea497`, `07bcdb3`, `eb26408` — armado del frontend, CRUD, errores, responsive y registro.
- `22bca0f` — menú lateral, botones y fondo con degradado.
- `cd821d4` — pantalla inicial, imagen de fondo y dos botones.
- (último commit de esta entrega) — buscadores, filtro por competición, resumen y corrección del filtro con la respuesta real de la API.

## 9. Checklist para entregar

- [x] CRUD de competiciones y autos desde la UI.
- [x] Relación 1:N visible en ambas tablas.
- [x] Formularios con validación y errores en pantalla.
- [x] Responsive.
- [x] Menú inicial y menú lateral.
- [x] Imagen de fondo.
- [x] Buscadores y autos por competición.
- [x] Backend desplegado en Render y frontend en Netlify.
- [x] Build y tests en verde (7 archivos, 12 tests).
- [x] Verificación en navegador: búsquedas, filtro por competición, limpiar y consola sin errores.
- [ ] Mail de entrega con los 4 links (borrador listo; falta completar nombre del alumno y del profesor y enviarlo).
