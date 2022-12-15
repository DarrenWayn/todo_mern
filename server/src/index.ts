import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const PORT = 5001;

const app = express();

app.post("/decks", (req: Request, res: Response) => {
  res.send("hello world");
  const newDeck = new Deck({
    title: "my awesome flascard deck",
  });
  const createDeck = await newDeck.save();
  res.json(createDeck);
});

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://darrenwayn:AUffP5SZ93gGH3e2@cluster0.tsg4hsp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Listening on Port:${PORT}`);
    app.listen(PORT);
  })
  .catch((err) => console.error("Connect fail", err));
