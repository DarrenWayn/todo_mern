import { Request, Response } from "express";
import Deck from "../models/Deck";

const deleteDeckController = async (req: Request, res: Response) => {
  // TODO
  // 1. get the deck id from the url
  const deckId = req.params.deckId;
  // 2. delete the deck from mongo
  const deck = await Deck.findByIdAndDelete(deckId);
  // 3. return the deleted deck to the user who made the requset
  res.json({
    deck,
    message: "succesfully deleted the entry",
  });
};

export default deleteDeckController;
