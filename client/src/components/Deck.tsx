import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createCard from "../api/createCard";
import deleteCard from "../api/deleteCard";
import getDeck from "../api/getDeck";
import { TDeck } from "../api/getDecks";
import "./Deck.css";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  let { deckId } = useParams();

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  };

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  };

  useEffect(() => {
    (async () => {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck?.cards);
    })();
  }, [deckId]);

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateCard}>
        <label htmlFor="deck-title">Card Text</label>
        <input
          id="deck-title"
          value={text}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
