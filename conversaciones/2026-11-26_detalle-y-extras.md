# Interacción - 2026-11-26 (detalle y extras)

## Usuario:
- Pidió un resumen de las conversaciones del frontend para entregar.
- Aportó por qué la opción 5 (vista maestro-detalle) es la mejor para defender: cierra el ciclo 1:N end-to-end, justifica la clave foránea y permite distinguir `findAll` de `findOne`.
- Pidió agregar **todas** las ideas, verificar si faltaba algo y recordar agregar el historial **sólo del frontend**.

## Asistente:
- Revisó `competiciones.service.ts` del backend para confirmar que `findOne` usa `relations: { autos: true }` y devuelve el objeto completo con sus autos.
- Idea 1 (validación visible): ya estaba implementada en ambos formularios con referencias `#campo="ngModel"` y mensajes `*ngIf="campo.invalid && campo.touched"`. Se verificó en navegador: al salir del campo “Nombre” aparece “El nombre es obligatorio.” y “Guardar” queda deshabilitado. No se modificó.
- Idea 2: botón **“Actualizar lista”** en ambos listados. Se extrajo el `getAll()` a un método privado `cargar(mostrarEstado)` y se llama desde `ngOnInit()` y desde `recargar()`. Muestra “Actualizando...” y limpia el error previo.
- Idea 3: **ordenar por columna**. Nuevo `ordenarPorCampo` + `ascendente` y un getter que ordena una copia del array filtrado (`[...filtradas].sort(...)`). Botones `.btn-orden` en los `<th>` con flecha ▲/▼.
- Idea 4: **confirmación antes de borrar**. El botón “Borrar” llama a `pedirBorrar(id)`, que abre un modal con “Sí, borrar” / “Cancelar”. El `DELETE` sigue en `borrar()`, privado, y sólo se llama desde `confirmarBorrar()`.
- Idea 5: **vista de detalle**. Nuevo componente `CompeticionDetail` (`competicion-detail.ts/html/css/spec.ts`), declarado en `app-module.ts` y con ruta `/competiciones/:id` (después de `nueva` y `editar/:id`). Lee el `:id` con `ActivatedRoute.snapshot.paramMap`, llama a `getById()` y muestra datos + tabla de autos. Amplió `AutoResumen` con los campos que realmente devuelve la API (`marca`, `numero`, `potencia`, `piloto`, `categoria`).
- Tests nuevos: orden por autos y por número, confirmación de borrado, y creación del componente de detalle con `ActivatedRoute` simulado.
- Documentación: `conversaciones/RESUMEN-PARA-ENTREGA.md` (resumen de las conversaciones **sólo del frontend**, cronología y checklist), `README.md` e índice de `conversaciones/` actualizados.
- Verificación:
  - `npm run build` OK (`main-HBAHTSRN.js`, `styles-MBT44N2N.css`).
  - `npm test` → 8 archivos, **16 tests pasando**.
  - En navegador contra Render: ordenar “Autos” dio 0 → 1 y 1 → 0 con flechas ▲/▼; “Actualizar lista” volvió a cargar sin perder filas; “Ver detalle” abrió `/competiciones/4` mostrando “imola”, 1 auto y sus datos; el modal de borrar se abrió y se canceló sin borrar nada; el mensaje de validación apareció al salir del campo. Sin errores en consola.
  - No se confirmó ningún borrado: los datos de producción quedaron intactos.

- Checkpoint: ¿por qué el detalle puede mostrar los autos con un solo GET? Porque el `findOne` del backend ya carga la relación con TypeORM; Angular no tiene que pedir después el listado de autos ni hacer un join en el cliente.
