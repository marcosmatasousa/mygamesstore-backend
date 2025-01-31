import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  _id: String,
  session: {
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    cookie: { type: Object, required: true },
    type: Object,
    required: true,
  },
  expires: { type: Date, required: true },
});

export const Session = mongoose.model("Session", SessionSchema);
