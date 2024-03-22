import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  return response.json([
    {
      id: 1,
      name: "4 fromages",
      price: 12.5,
    },
    {
      id: 2,
      name: "4 fromages",
      price: 15,
    },
    {
      id: 3,
      name: "4 fromages",
      price: 17.5,
    },
  ]);
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
