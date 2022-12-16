import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";
import { config } from "dotenv";

config();
const PORT = 5001;

const app = express();

app.get("/hello", (req: Request, res: Response) => {
  res.send("hello world");
});

//Express middleware function
app.use(express.json());

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
