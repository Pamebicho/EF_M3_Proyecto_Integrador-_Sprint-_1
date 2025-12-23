// Gourmet Go - Sprint 2 (M4)
// Objetivo: conectar la maqueta a TheMealDB, buscar por ingrediente,
// manejar asincronía con fetch + async/await, y renderizar resultados en el DOM.

// 1) ENDPOINT (URL de la API)//
const FILTER_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

// 2) DICCIONARIO ES -> EN//
// traducir/normalizar lo que escribe el usuario y buscar en inglés.
// Puedes ampliar este diccionario con más ingredientes.
const ING_ES_EN = {
  // Proteínas
  pollo: "chicken",
  gallina: "chicken",
  carne: "beef",
  vacuno: "beef",
  res: "beef",
  cerdo: "pork",
  chancho: "pork",
  jamon: "ham",
  tocino: "bacon",
  pescado: "fish",
  salmon: "salmon",
  atun: "tuna",
  camaron: "prawns",
  camarones: "prawns",

  // Base / carbohidratos
  arroz: "rice",
  pasta: "pasta",
  fideos: "pasta",
  tallarines: "pasta",
  pan: "bread",
  papa: "potato",
  papas: "potato",

  // Lácteos
  queso: "cheese",
  leche: "milk",
  crema: "cream",
  mantequilla: "butter",
  yogur: "yogurt",

  // Verduras / aromáticos
  tomate: "tomato",
  tomates: "tomato",
  cebolla: "onion",
  ajo: "garlic",
  zanahoria: "carrot",
  pimiento: "pepper",
  champinon: "mushroom",
  champinones: "mushroom",
  palta: "avocado",
  aguacate: "avocado",
  limon: "lemon",
  perejil: "parsley",
  albahaca: "basil",
  cilantro: "coriander",

  // Otros comunes
  aceite: "oil",
  azucar: "sugar",
  harina: "flour",
  sal: "salt",
  pimienta: "pepper",
  chocolate: "chocolate",
};

// Normaliza texto: quita tildes y lo deja en minúscula
const normalizar = (texto) =>
  texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Convierte lo que escribe el usuario en el ingrediente que entiende TheMealDB
// - Si existe en diccionario: traduce a inglés
// - Si no existe: usa lo escrito (por si el usuario ya pone inglés)
const traducirIngrediente = (entradaUsuario) => {
  const entrada = normalizar(entradaUsuario);
  return ING_ES_EN[entrada] || entrada;
};

// 3) CLASE Receta //
class Receta {
  constructor({ idMeal, strMeal, strMealThumb }) {
    this.id = idMeal;
    this.nombre = strMeal;
    this.imagen = strMealThumb;
  }

  toCardHTML() {
    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card recipe-card h-100">
          <img
            src="${this.imagen}"
            class="card-img-top"
            alt="${this.nombre}"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${this.nombre}</h5>
            <p class="text-muted">
              Resultado obtenido desde TheMealDB según el ingrediente buscado.
            </p>
            <span class="badge bg-success mb-3">Resultado</span>
            <a
              href="https://www.themealdb.com/meal/${this.id}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-italy mt-auto"
            >
              Ver receta
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

// 4) DOM + EVENTOS//
document.addEventListener("DOMContentLoaded", () => {
  // Referencias DOM
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const resultsRow = document.getElementById("resultsRow");

  // Helpers UI
  const limpiarResultados = () => {
    resultsRow.innerHTML = "";
  };

  const renderMensaje = (mensaje) => {
    limpiarResultados();
    resultsRow.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info mb-0" role="alert">
          ${mensaje}
        </div>
      </div>
    `;
  };

  const renderRecetas = (recetas) => {
    limpiarResultados();
    resultsRow.innerHTML = recetas.map((r) => r.toCardHTML()).join("");
  };

  // 5) SUBMIT: Buscar recetas (HU-04)//
  form.addEventListener("submit", async (event) => {
    // HU-04: prevenir recarga
    event.preventDefault();

    // Capturar texto del usuario
    const textoUsuario = input.value;

    // Traducir ES->EN (o usar tal cual si ya es inglés)
    const ingrediente = traducirIngrediente(textoUsuario);

    // Validación: vacío
    if (!ingrediente) {
      renderMensaje("Escribe un ingrediente para buscar.");
      return;
    }

    try {
      // Mensaje de carga
      renderMensaje("Buscando recetas...");

      // Llamada a la API con fetch + async/await
      const url = `${FILTER_URL}${encodeURIComponent(ingrediente)}`;
      const response = await fetch(url);

      // fetch no falla solo por HTTP, validamos ok
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();

      // HU-06: sin resultados
      if (!data.meals) {
        renderMensaje(
          `Lo sentimos, no se encontraron recetas para "${textoUsuario}". Intenta con otro ingrediente.`
        );
        return;
      }

      // HU-05: destructuring desde el objeto de la API
      const recetas = data.meals.map((meal) => {
        const { idMeal, strMeal, strMealThumb } = meal;
        return new Receta({ idMeal, strMeal, strMealThumb });
      });

      // HU-05: limpiar anteriores y mostrar nuevos
      renderRecetas(recetas);
    } catch (err) {
      console.error(err);
      renderMensaje(
        "Ocurrió un error al buscar recetas. Revisa tu conexión e inténtalo nuevamente."
      );
    }
  });
});
