import express from "express";
import { Game } from "../mongoose/schemas/gameSchema.js";
import { Session } from "../mongoose/schemas/sessionSchema.js";

const cartRouter = express();

cartRouter.get("/api/cart", async (request, response) => {
  const { sessionID } = request;
  try {
    const sessionData = await Session.findById(sessionID);
    if (!sessionData)
      return response.status(404).send({ message: "Invalid session data" });
    const { cart } = sessionData.session;
    return response.send(cart);
  } catch (error) {
    return response.status(500).send({ message: error });
  }
});

cartRouter.post("/api/cart", async (request, response) => {
  try {
    const { id } = request.body;
    const item = await Game.findById(id);
    if (!item)
      return response.status(404).send({ msg: "Invalid session data" });
    try {
      const { sessionID } = request;
      const sessionData = await Session.findById(sessionID);
      const isGameOnCart = sessionData.session.cart.some(
        (obj) => obj.name === item.name
      );
      if (!isGameOnCart) {
        await Session.updateOne(
          { _id: sessionID },
          { $push: { "session.cart": item } }
        );
      }
      return response.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
});

cartRouter.get("/api/cart/count", async (request, response) => {
  const { sessionID } = request;
  try {
    const sessionData = await Session.findById(sessionID);
    if (!sessionData) return response.sendStatus(404);
    const length = sessionData.session.cart.length;
    return response.send({ items: length });
  } catch (error) {
    console.log(error);
  }
});

cartRouter.delete("/api/cart/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const { sessionID } = request;
    const sessionData = await Session.findById(sessionID);
    const { cart } = sessionData.session;
    const gameIndex = cart.findIndex((obj) => obj._id == id);
    cart.splice(gameIndex, 1);
    await Session.updateOne(
      { _id: sessionID },
      { $set: { "session.cart": cart } }
    );
    return response.send(cart);
  } catch (error) {
    console.log(error);
  }
});

cartRouter.delete("/api/cart", async (request, response) => {
  try {
    const { sessionID } = request;
    await Session.updateOne(
      { _id: sessionID },
      { $set: { "session.cart": [] } }
    );

    const sessionData = await Session.findById(sessionID);
    return response.send(sessionData.session.cart).status(204);
  } catch (error) {
    console.log(error);
  }
});

export default cartRouter;
