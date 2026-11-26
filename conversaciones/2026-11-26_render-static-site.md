# Interacción - 2026-11-26 (deploy alternativo en Render)

## Usuario:
- Preguntó cómo verificar que Netlify publicó el último código.
- Informó el mensaje del panel: **“Production deploys are paused. Your team has used all of its available credits for this billing cycle.”**
- Aclaró que está en plan gratuito y que **no va a pagar**; pidió que explique qué afecta y cuál es la opción alternativa.
- Elegió la opción **Render Static Site** entre las alternativas propuestas.

## Asistente:
- Verificó con una request directa que Netlify todavía servía `main-IBSJHJ53.js` (bundle anterior) mientras el build local generó `main-HBAHTSRN.js`.
- Consultó la documentación oficial de Netlify: al agotarse los créditos del ciclo se pausan **todos los proyectos del equipo**; se frenan los deploys y también pueden frenarse las visitas (“Site not available”). En plan gratuito no se pueden comprar créditos: sólo esperar al próximo ciclo o upgradear.
- Explicó qué **no** se rompe: repos y commits intactos, backend de Render aparte, historial en GitHub y bundle anterior con toda la consigna ya cumplida. Lo que no se veía en producción eran las cinco mejoras nuevas.
- Descartó seguir haciendo pushes o tocar código para arreglar Netlify: el problema es de facturación, no de build.
- Recomendó **Render Static Site** porque ya existe cuenta en Render por el backend, es gratis, va por CDN y no duerme como un Web Service. Como plan B quedó GitHub Pages (más pasos: `--base-href` y `404.html`).
- Creó `render.yaml` en la raíz del repo con:
  - `type: web` + `runtime: static` (formato Blueprint de Render para sitios estáticos).
  - `buildCommand: npm ci && npm run build` (hay `package-lock.json`, así que `npm ci` funciona).
  - `staticPublishPath: dist/frontend-competicion/browser` (salida real de Angular 22).
  - `routes` con un **rewrite** `/*` → `/index.html`: mismo efecto que `public/_redirects` en Netlify, para que refrescar `/competiciones/4` no dé 404.
  - `NODE_VERSION=24`: Angular 22 exige Node 22.22.3+ o 24.15+; la versión por defecto de Render para servicios nuevos es 24.x y esto lo deja explícito.
- Actualizó `README.md`, `conversaciones/README.md` y `conversaciones/RESUMEN-PARA-ENTREGA.md` con el nuevo deploy y el aviso de que Netlify quedó pausado.
- Dejó un placeholder en la documentación hasta que Render asignara el dominio.

- Checkpoint: ¿por qué el `render.yaml` necesita un rewrite aunque ya existe `public/_redirects`? Porque `_redirects` es un archivo que interpreta Netlify; Render no lo lee y necesita su propia regla `routes` para servir `index.html` en rutas internas.

## Pasos que el usuario hizo en el panel de Render

1. `https://dashboard.render.com` → **New → Blueprint**.
2. Conectó el repo **`Tp-Web-Frontend`**, rama `main`.
3. Aplicó el blueprint; Render creó el Static Site `tp-web-frontend`.
4. Copió la URL asignada: **https://tp-web-frontend.onrender.com/**.

## Interacción posterior: URL definitiva y verificación

## Usuario:
- Pasó la URL `https://tp-web-frontend.onrender.com/`.

## Asistente:
- Verificó por HTTP que la raíz y `/competiciones/4` devuelven **200** con `<app-root>` y el bundle nuevo (`main-HBAHTSRN.js`, `styles-MBT44N2N.css`). Es decir, el rewrite del `render.yaml` funciona y Netlify ya no es necesario.
- Verificó en navegador contra la API de Render: el listado cargó 2 competiciones con las cabezas de columna ordenables, “Ver detalle” abrió `/competiciones/4` y mostró “imola” con 1 auto inscripto. Sin errores en consola.
- Reemplazó el placeholder por la URL real en `README.md`, `conversaciones/RESUMEN-PARA-ENTREGA.md` y `conversaciones/resumen-frontend.md`; actualizó los commits y el checklist de ese resumen.
- Commit y push con el hash de este cambio.

- Checkpoint: ¿por qué `/competiciones/4` responde 200 si en el servidor no existe ese archivo? Porque el rewrite `/* → /index.html` hace que Render sirva el HTML de la SPA; después es Angular quien lee la URL y decide qué componente mostrar.
