import express from "express";
import { Game } from "../mongoose/schemas/gameSchema.js";

const cartRouter = express();

cartRouter.use((request, response, next) => {
  if (!request.session.cart) {
    request.session.cart = [];
  }
  next();
});

cartRouter.get("/api/cart", (request, response) => {
  return response.send(request.session.cart);
});

cartRouter.post("/api/cart", async (request, response) => {
  try {
    const { id } = request.body;
    const item = await Game.findById(id);
    if (!item)
      return response.status(404).send({ msg: "could not find the game" });
    request.session.cart.push(item);
    return response.send(request.session.cart);
  } catch (err) {
    console.log(err);
  }
});

cartRouter.get("/api/cart/count", (request, response) => {
  return response.send({ items: request.session.cart.length });
});

cartRouter.delete("/api/cart/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  const index = request.session.cart.findIndex((item) => {
    return item._id === id;
  });

  if (index > -1) request.session.cart.splice(index, 1);

  return response.sendStatus(204);
});

cartRouter.delete("/api/cart", (request, response) => {
  request.session.cart = [];
  return response.sendStatus(204);
});

export default cartRouter;
