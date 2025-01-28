import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

const app = express();

app.use(
  session({
    secret: "aSuperMegaUltraTremendousSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 60 * 3,
    },
  })
);

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

const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.get("/", async (request, response) => {
  return response.send("OK");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
