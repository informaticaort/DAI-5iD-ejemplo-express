import express from "express";
import PizzaController from "./src/controllers/pizza-controller.js";
import UserController from "./src/controllers/usuarios-controller.js";
import EventController from "./src/controllers/lugares-controller.js";
import FoodController from "./src/controllers/pizza-controller.js";
import PlacesController from "./src/controllers/comidas-controller.js";

const app = express(); // Init API REST
app.use(express.json()); // Middleware to parse JSON
const port = 3508;

app.use("/Pizzas", PizzaController);
app.use("/Usuarios", UserController);
app.use("/Eventos", EventController);
app.use("/Lugares", PlacesController);
app.use("/Comidas", FoodController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
