import { API_URL } from "./config";

export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

const getDecks = async (): Promise<TDeck[]> => {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
};

export default getDecks;
