import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import { config } from "dotenv";
import deleteDeckController from "./controllers/deleteDeckController";
import getDeckContorller from "./controllers/getDeckController";
import getDecksContorller from "./controllers/getDecksController";
import createDeckController from "./controllers/createDeckController";
import createDeckCardController from "./controllers/createDeckCardController";
import deleteDeckCardController from "./controllers/deleteDeckCardController";

config();

const PORT = 5001;
const app = express();

app.use(cors({ origin: "*" }));
// Express middleware function
// This helps to understand and parse application/json in headers
app.use(express.json());

app.get("/decks", getDecksContorller);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckContorller);
app.post("/decks/:deckId/cards", createDeckCardController);
app.delete("/decks/:deckId/cards/:index", deleteDeckCardController);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on Port:${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error("Connect fail", err));
