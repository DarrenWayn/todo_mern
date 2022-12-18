import { Request, Response } from "express";
import Deck from "../models/Deck";

const createDeckCardController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  const { text } = req.body;

  if (!deck) return res.status(400).send("no deck of this id exist");
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
};

export default createDeckCardController;
