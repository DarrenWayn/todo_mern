import { API_URL } from "./config";

const deleteDeck = async (deckId: string) => {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
};

export default deleteDeck;
