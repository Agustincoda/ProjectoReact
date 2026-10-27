# Dragon Store

Tienda online de figuras S.H. Figuarts de Dragon Ball, hecha con React como proyecto final del curso de React de Coderhouse. Los productos y las órdenes viven en Firebase (Firestore).

Demo: https://proyectoreactcoda.netlify.app/

<!-- TODO: reemplazar por una captura de la app (por ejemplo docs/captura.png) -->
![Captura de pantalla de Dragon Store](docs/captura.png)

## Funcionalidades

- **Catálogo** de productos que se lee desde Firestore.
- **Filtro por categoría** desde el menú: "Guerreros definitivos" (héroes) y "Villanos temibles".
- **Detalle de producto** con descripción, precio, stock disponible y selector de cantidad.
- **Carrito** con contador en el navbar, aviso al agregar productos, tope por stock, eliminación de productos, vaciado y total.
- **Checkout** con nombre, teléfono y email: valida los campos, revisa el stock en Firestore, descuenta el stock y guarda la orden en la colección `buyers`.
- **Página 404** para rutas que no existen.
- **Diseño responsive** con Bootstrap, adaptado a mobile.

## Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/) para la navegación
- [Firebase / Firestore](https://firebase.google.com/) como base de datos
- [Bootstrap 5](https://getbootstrap.com/) (por CDN) y CSS propio para los estilos
- [SweetAlert2](https://sweetalert2.github.io/) para los avisos
- ESLint para el lint

## Cómo correrlo

Requisitos: Node.js 18 o superior.

1. Cloná el repo e instalá las dependencias:

   ```bash
   git clone https://github.com/Agustincoda/ProjectoReact.git
   cd ProjectoReact
   npm install
   ```

2. Copiá `.env.example` a `.env` y completá la config web de tu proyecto de Firebase (Consola de Firebase > Configuración del proyecto > Tus apps).

3. Levantá el servidor de desarrollo en http://localhost:5173:

   ```bash
   npm run dev
   ```

Otros scripts:

| Script | Qué hace |
| --- | --- |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Corre ESLint |

### Datos en Firestore

La app espera dos colecciones:

- `Productos`: un documento por producto con los campos `Nombre`, `Descripcion`, `Precio`, `Stock`, `Imagen` (ruta dentro de `public/`, por ejemplo `/Images/GokuSHFiguart.jpg`) y `Categoria` (`heroes` o `villanos`).
- `buyers`: la app crea acá una orden por cada compra, con el comprador, los productos, las cantidades, el total y la fecha.

### Deploy en Netlify

- El archivo `public/_redirects` hace que las rutas de la SPA (`/productos`, `/carrito`, etc.) funcionen al entrar directo o al recargar.
- Las variables `VITE_FIREBASE_*` de `.env.example` se cargan en Netlify en *Site configuration > Environment variables*, porque el `.env` no se sube al repo.

## Mejoras pendientes

- **Reglas de Firestore**: hoy cualquiera puede leer la colección `buyers` (con nombre, teléfono y email de los compradores), y el checkout escribe el stock desde el navegador, así que las reglas tienen que dejar que cualquiera modifique `Productos`. Lo correcto es cerrar la lectura de `buyers` y mover la confirmación de compra a una Cloud Function que valide stock y precios del lado del servidor.
- **Checkout atómico**: el stock se revisa y después se descuenta en dos pasos; usar una transacción (`runTransaction`) evita vender de más si dos personas compran a la vez.
- **Persistir el carrito** en `localStorage` para que no se pierda al recargar la página.
- **Estados de carga y error** en el listado (hoy muestra "No hay productos disponibles." mientras carga).
- **Dependencias**: quedan vulnerabilidades que piden subir de versión mayor Firebase, React Router y Vite.
- **Código sin usar**: `itemListContainer.jsx`, `itemDetailContainer.jsx`, `item.jsx` y `src/assets/productos.json` son de una etapa anterior con datos locales.
- **Bundle de 575 kB**: se puede dividir con imports dinámicos por ruta.
