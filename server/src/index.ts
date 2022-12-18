import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import { config } from "dotenv";
import deleteDeckController from "./controllers/deleteDeckController";
import getDeckContorller from "./controllers/getDeckController";
import createDeckController from "./controllers/createDeckController";

config();

const PORT = 5001;
const app = express();

app.use(cors({ origin: "*" }));
// Express middleware function
// This helps to understand and parse application/json in headers
app.use(express.json());

app.get("/decks", getDeckContorller);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on Port:${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error("Connect fail", err));
