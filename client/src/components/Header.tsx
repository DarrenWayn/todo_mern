import "./Header.css";

export default function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div>
          <a href="/">LOGO</a>
        </div>
        <div>
          <a href="/decks">Decks</a>
        </div>

        <div>
          <a href="/login">login</a>
        </div>
      </div>
    </div>
  );
}
