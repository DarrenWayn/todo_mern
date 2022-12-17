import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";
import cors from "cors";
import { config } from "dotenv";

config();

const PORT = 5001;
const app = express();

app.use(cors({ origin: "*" }));
// Express middleware function
// This helps to understand and parse application/json in headers
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  // Tpdp: fetch all decks and send back to the use
  // 1. how do we fetch the decks from mongo?
  const decks = await Deck.find();
  console.log(decks);
  // 2. how do we send back the array to the ui?
  res.json(decks);
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createDeck = await newDeck.save();
  res.json(createDeck);
});

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on Port:${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error("Connect fail", err));
