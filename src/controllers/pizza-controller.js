import express from "express";
import {
  PizzaService,
  PizzaService2,
  PizzaService3,
} from "../servicios/pizza-service.js";
import { AuthMiddleware } from "../auth/authMiddleware.js";

const router = express.Router();
const pizzaService = new PizzaService();

router.get("/", AuthMiddleware, (request, response) => {
  const limit = request.query.limit;
  const offset = request.query.offset;
  request.user;

  //Verificar si limit y offset son numeros y existen

  try {
    const allPizzas = pizzaService.getAllPizzas(pageSize, page);
    return response.json(allPizzas);
  } catch (error) {
    console.log("Un Error");
    return response.json("Un Error");
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  return res.status(201).send({
    id: 4,
    name: body.name,
    price: body.price,
  });
});

router.put("/", (req, res) => {
  return {
    id: 4,
    name: "4 fromages",
    price: 25,
  };
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  return res.send("Ok!");
});

export default router;
