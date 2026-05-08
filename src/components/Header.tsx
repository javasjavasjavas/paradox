import { Diamond } from "lucide-react";

const navItems = ["Collection", "Cards", "Rarities", "Lore", "About"];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#welcome" aria-label="Paradox: Lex Machina home">
        <img
          className="brand-logo"
          src="/assets/brand/paradox-lex-machina.svg"
          alt="Paradox: Lex Machina"
        />
      </a>
      <nav className="header-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <Diamond size={15} className="header-diamond" aria-hidden="true" />
        <button className="header-join" type="button">
          Mint now
        </button>
      </div>
    </header>
  );
}
