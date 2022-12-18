import { Request, Response } from "express";
import Deck from "../models/Deck";

const getDecksContorller = async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
};

export default getDecksContorller;
