import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createDeck from "./api/createDeck";
import deleteDeck from "./api/deleteDeck";
import getDecks, { TDeck } from "./api/getDecks";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(title);
    // inorder react to re-render array need to pass an array reference and spread it, then
    // spread the old array
    // and append the deck that came from the back end
    setDecks([...decks, deck]);
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    // option 1: refetch all your todo items
    /* setDecks() */
    // option 2: optimistics updates
    // loop through this decks array and filter the one who matches the deckId
    // !== to return this items if its truthy and emitted if its falsey
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    console.log("we are here");
    // we this app component first mount we want to fecth the decks
    // option 1
    /* fetch("http://localhost:5001/decks"); */

    // option 2
    /* const fecthDecks = async () => { */
    /*   await fetch("http://localhost:5001/decks") */
    /* } */
    /* return fecthDecks() */

    (async () => {
      // response return an object
      /* const response = await fetch("http://localhost:5001/decks"); */
      // parse it to json so we can put it on array in setDecks
      /* const newDecks = await response.json(); */
      const newDecks = await getDecks();
      setDecks(newDecks);
    })();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>
        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            value={title}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button>Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default App;
