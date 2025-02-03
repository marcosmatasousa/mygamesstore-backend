import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Session } from "./mongoose/schemas/sessionSchema.js";
import "dotenv/config";

const app = express();

const SESSION_LIFETIME = 30 * 60 * 1000;
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESSION_LIFETIME,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "none",
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
  })
);

app.use((request, response, next) => {
  if (!request.session.cart) request.session.cart = [];
  next();
});

app.use((request, response, next) => {
  if (!request.session) return next();

  const sessionData = {
    _id: request.sessionID,
    session: request.session,
    expires: new Date(Date.now() + SESSION_LIFETIME),
  };

  const newSession = new Session(sessionData);
  newSession.validate();

  next();
});

const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(router);

app.get("/", async (request, response) => {
  return response.send("OK");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
