//Esta es la capa donde se persisten los datos
//Por ahora las pizzas se guardan en memoria, si se reinicia el servidor se pierden los cambios

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let pizzas = [
   { id: 1, nombre: "Hawaiana", descripcion: "Jamon y piña" },
   { id: 2, nombre: "Mexicana", descripcion: "Jalapeño, chorizo y queso" }
]

/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync() {
   await sleep(2000)

   return pizzas
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {*} id
 */
export async function obtenerPizzaPorIdAsync(id) {
   await sleep(1000)

   const pizza = pizzas.find(x => x.id == id)

   return pizza
}

/**
 * Agrega una pizza nueva a la lista
 * @param {*} pizza con nombre y descripcion
 * @returns el id que se le asigno a la pizza
 */
export async function agregarPizzaAsync(pizza) {
   await sleep(1000)

   //el id nuevo es el mas grande que hay mas uno, asi no se repite aunque borren alguna
   let id = 1
   if (pizzas.length > 0) {
      id = Math.max(...pizzas.map(x => x.id)) + 1
   }

   pizzas.push({ id: id, nombre: pizza.nombre, descripcion: pizza.descripcion })

   return id
}

/**
 * Actualiza el nombre y la descripcion de una pizza
 * @param {*} id de la pizza a actualizar
 * @param {*} pizza con los datos nuevos
 * @returns la pizza ya actualizada o undefined si no existe
 */
export async function actualizarPizzaAsync(id, pizza) {
   await sleep(1000)

   const index = pizzas.findIndex(x => x.id == id)
   if (index == -1) {
      return undefined
   }

   //si no mandan algun dato se queda el que ya tenia
   pizzas[index].nombre = pizza.nombre ?? pizzas[index].nombre
   pizzas[index].descripcion = pizza.descripcion ?? pizzas[index].descripcion

   return pizzas[index]
}

/**
 * Borra una pizza de la lista
 * @param {*} id de la pizza a borrar
 * @returns la pizza que se borro o undefined si no existe
 */
export async function borrarPizzaAsync(id) {
   await sleep(1000)

   const index = pizzas.findIndex(x => x.id == id)
   if (index == -1) {
      return undefined
   }

   //splice quita 1 elemento desde la posicion index
   const pizzaBorrada = pizzas.splice(index, 1)

   return pizzaBorrada[0]
}
