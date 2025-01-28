import express from "express";
import { checkSchema, validationResult } from "express-validator";
import { Game } from "../mongoose/schemas/gameSchema.js";
import { getGamesQueryParams } from "../utils/validationSchemas.js";

const gamesRouter = express();

function validateQueryParams(request, response) {
  checkSchema(getGamesQueryParams);
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(400).send({ errors: result.array() });

  const { page, count } = request.query;
  if (page && !count)
    return response
      .status(400)
      .send({ msg: "Parameter 'count' must be passed in pair with 'page'." });
}

gamesRouter.get("/api/games/count", async (request, response) => {
  try {
    const gamesCounter = await Game.countDocuments();
    return response.send({ count: gamesCounter });
  } catch (error) {
    console.log("Could not count the items:", error);
    return res.status(500).send(error, "Error counting the items");
  }
});

gamesRouter.get("/api/games", async (request, response) => {
  validateQueryParams(request, response);
  const { page, count } = request.query;
  if (page) {
    try {
      const skip = (page - 1) * count;
      const games = await Game.find().skip(skip).limit(count);
      return response.send(games);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  // If 'page' is not passed as a query param, then return all games
  try {
    const games = await Game.find();
    return response.send(games);
  } catch (error) {
    return response.status(500).send(error);
  }
});

gamesRouter.get("/api/games/:name", async (request, response) => {
  validateQueryParams(request, response);
  const { name } = request.params;
  const { page, count } = request.query;
  if (page) {
    try {
      const skip = (page - 1) * count;
      const games = await Game.find({ name: { $regex: name, $options: "i" } })
        .skip(skip)
        .limit(count);
      return response.send(games);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  try {
    const games = await Game.find({ name: { $regex: name, $options: "i" } });
    return response.send(games);
  } catch {
    return response.status(500).send(error);
  }
});

export default gamesRouter;
