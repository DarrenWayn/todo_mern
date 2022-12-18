import { API_URL } from "./config";
import { TDeck } from "./getDecks";

const getDeck = async (deckId: string): Promise<TDeck> => {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
};

export default getDeck;
