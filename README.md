# Gourmet Go - Buscador de Recetas Italianas (Sprint 1)

Proyecto desarrollado como parte del **EF-M3 Proyecto Integrador - Sprint 1**.  
El objetivo de este sprint es construir un **prototipo visual de alta fidelidad** para un buscador de recetas, enfocado en **recetas italianas**, utilizando **Bootstrap 5** y una maquetación completamente responsiva.

## 🎯 Objetivo del Sprint 1

Entregar una **única página estática** que muestre:

- Un encabezado claro y un **formulario de búsqueda** prominente.
- Una **galería de recetas de ejemplo** utilizando cards de Bootstrap.
- Un diseño **responsivo**, adaptado tanto a escritorio como a dispositivos móviles.

Este sprint está centrado en el **diseño visual y la maquetación**, no en la lógica funcional del buscador.

## 🧩 Historias de Usuario Cubiertas

### HU-01: Interfaz Principal de Búsqueda

- Título principal: **"Buscador de Recetas Italianas"**.
- Formulario con:
  - `<input>` de texto con placeholder descriptivo.
  - `<button>` con texto claro **"Buscar"**.
- Todos los elementos utilizan clases de **Bootstrap 5** para formulario y botones.

### HU-02: Visualización de Recetas de Ejemplo

- Sección de resultados debajo del buscador: **"Recetas Clásicas Italianas"**.
- 6 tarjetas de recetas **hard-codeadas** en `index.html`.
- Cada tarjeta usa el componente **`card` de Bootstrap** e incluye:
  - Imagen (`<img class="card-img-top">`).
  - Título (`<h5 class="card-title">`).
  - Botón de acción (`<a href="#" class="btn btn-italy">Ver receta</a>`).

### HU-03: Experiencia en Dispositivos Móviles

- Diseño completamente **responsivo** utilizando el sistema de grillas de Bootstrap:
  - `col-12` en móviles (1 columna).
  - `col-md-6` en pantallas medianas (2 columnas).
  - `col-lg-4` en escritorio (3 columnas).
- Se ajusta el diseño del hero para mejorar la lectura en pantallas pequeñas.
