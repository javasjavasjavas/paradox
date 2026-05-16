const navItems = [
  { label: "OG Collection", href: "#welcome" },
  { label: "Game", href: "#experience" },
  { label: "Cards", href: "#anatomy" },
  { label: "Codex", href: "#legacy" },
  { label: "Signal", href: "#signal" },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#hero" aria-label="Paradox: Lex Machina home">
        <img
          className="brand-logo"
          src="/assets/brand/paradox-logo.svg"
          alt="Paradox"
        />
      </a>
      <nav className="header-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="header-join" type="button">
          Mint now
        </button>
      </div>
    </header>
  );
}
