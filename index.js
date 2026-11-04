import express from "express";
import cors from 'cors'
import {
  obtenerTodasLasPizzasAsync,
  obtenerPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  borrarPizzaAsync
} from './repositorios/pizza.repositorio.js'

const app = express();
app.use(cors())

const PORT = 3000; // Puerto en el que escuchará el servidor

//Configuración para usar el body en un metodo/verbo POST y PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Lista de pizzas
app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()

  return res.status(200).json(pizzas);
});

//Una pizza por su id
app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)

  if (pizza == undefined) {
    return res.status(404).json({ mensaje: "No existe la pizza con ese id" });
  }

  return res.status(200).json(pizza);
});

//Agregar una pizza
app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body

  if (!pizza || !pizza.nombre) {
    return res.status(400).json({ mensaje: "Falta el nombre de la pizza" });
  }

  const id = await agregarPizzaAsync(pizza)

  return res.status(201).json({ id: id, fecha: new Date() });
});

//Actualizar una pizza
app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = req.body ?? {}

  const pizzaActualizada = await actualizarPizzaAsync(id, pizza)

  if (pizzaActualizada == undefined) {
    return res.status(404).json({ mensaje: "No existe la pizza con ese id" });
  }

  return res.status(202).json({ mensaje: "Datos actualizados" });
});

//Borrar una pizza
app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id

  const pizzaBorrada = await borrarPizzaAsync(id)

  if (pizzaBorrada == undefined) {
    return res.status(404).json({ mensaje: "No existe la pizza con ese id" });
  }

  return res.status(202).json({ mensaje: "Pizza borrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando en el puerto http://localhost:${PORT}`,
  );
});
