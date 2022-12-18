import { Request, Response } from "express";
import Deck from "../models/Deck";

const getDeckContorller = async (req: Request, res: Response) => {
  const { deckId } = req.params;
  // we want to find a single deck find by id
  const deck = await Deck.findById(deckId);
  res.json(deck);
};

export default getDeckContorller;
