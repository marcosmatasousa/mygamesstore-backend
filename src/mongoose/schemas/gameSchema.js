import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  released: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  background_image: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  genres: {
    type: [mongoose.Schema.Types.String],
    required: true,
  },
  short_screenshots: {
    type: [mongoose.Schema.Types.String],
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const Game = mongoose.model("Game", GameSchema);
