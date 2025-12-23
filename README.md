# Gourmet Go – Buscador de Recetas (Sprint 2)

Proyecto desarrollado como parte del **EF-M4 Proyecto Integrador – Sprint 2**.  
En este sprint, el prototipo visual del Sprint 1 evoluciona a una **aplicación web funcional**, conectada a una **API real de recetas**.

El proyecto permite a los usuarios **buscar recetas por ingrediente**, gestionando las búsquedas de forma **asíncrona**, sin recargar la página, y mostrando los resultados dinámicamente en pantalla.

## 🎯 Objetivo del Sprint 2

Transformar la maqueta estática del Sprint 1 en un **producto mínimo viable (MVP)** que:

- Se conecte a una **API externa de recetas (TheMealDB)**.
- Permita realizar **búsquedas reales por ingrediente**.
- Renderice los resultados dinámicamente en la interfaz.
- Gestione correctamente los casos donde no existen resultados.

## 🧩 Historias de Usuario Implementadas

### HU-04: Búsqueda Funcional de Recetas

Como usuario,  
quiero escribir un ingrediente y presionar **Buscar**,  
para obtener una lista de recetas que contengan dicho ingrediente.

**Implementación:**

- El formulario utiliza el evento `submit` con `preventDefault()` para evitar la recarga de la página.
- Se captura el texto ingresado por el usuario desde el input.
- Se realiza una llamada asíncrona a la API **TheMealDB** usando el endpoint:

https://www.themealdb.com/api/json/v1/1/filter.php?i=[ingrediente]

- La comunicación con la API se realiza mediante **fetch** y **async/await**.

### HU-05: Renderizado Dinámico de Resultados

Como usuario,  
quiero que los resultados aparezcan sin recargar la página,  
para tener una experiencia fluida.

**Implementación:**

- Las tarjetas de recetas hard-codeadas del Sprint 1 fueron eliminadas.
- El contenedor de resultados se encuentra vacío por defecto.
- Por cada receta devuelta por la API:
- Se genera dinámicamente una tarjeta HTML.
- Se utilizan **template literals de ES6+**.
- Los datos se extraen mediante **desestructuración**.
- Antes de mostrar nuevos resultados, se eliminan los anteriores.

### HU-06: Manejo de Búsquedas sin Resultados

Como usuario,  
quiero recibir un mensaje claro cuando no existan recetas,  
para saber que debo intentar con otro ingrediente.

**Implementación:**

- Si la API retorna `meals === null`, se muestra un mensaje informativo:
  > “Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.”

## 🌍 Soporte para Ingredientes en Español

Dado que la API TheMealDB trabaja principalmente con ingredientes en inglés, el proyecto incorpora:

- Un **diccionario de traducción Español → Inglés** en el frontend.
- Normalización de texto (minúsculas y eliminación de tildes).
- El usuario puede escribir ingredientes en español como:
- `pollo`, `arroz`, `queso`, `cebolla`
- Internamente, estos se traducen a los valores que reconoce la API:
- `chicken`, `rice`, `cheese`, `onion`

Esto mejora la experiencia del usuario sin necesidad de un backend.

## 🛠️ Tecnologías Utilizadas

- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript ES6+**
- `const` / `let`
- Arrow functions
- Template literals
- Desestructuración
- **Fetch API**
- **Async / Await**
- **Programación Orientada a Objetos (POO)**

Todo el código JavaScript se encuentra centralizado en el archivo `main.js`, tal como lo exige el enunciado del Sprint 2.

## ✅ Estado del Proyecto

✔ Sprint 2 completado  
✔ Funcionalidad conectada a API  
✔ Renderizado dinámico  
✔ Manejo de errores y búsquedas sin resultados

El proyecto se encuentra **completamente funcional y listo para evaluación**.
