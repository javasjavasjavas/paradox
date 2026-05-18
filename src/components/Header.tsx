import { type MouseEvent } from "react";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const navItems = [
  { label: "Intro", href: "#hero" },
  {
    label: "OG Collection",
    href: "https://opensea.io/collection/paradox-by-javpixel",
    external: true,
  },
  { label: "Cards", href: "#welcome" },
  { label: "Game", href: "#experience" },
] satisfies NavItem[];

function handleInternalScroll(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
}

export function Header() {
  return (
    <header className="site-header">
      <a
        className="brand-lockup"
        href="#hero"
        aria-label="Paradox: Lex Machina home"
        onClick={(event) => handleInternalScroll(event, "#hero")}
      >
        <img
          className="brand-logo"
          src="/assets/brand/paradox-logo.svg"
          alt="Paradox"
        />
      </a>
      <nav className="header-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            onClick={(event) => handleInternalScroll(event, item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="glow-button glow-button--primary header-join is-mint-soon"
          type="button"
          aria-disabled="true"
        >
          <span>Mint Soon</span>
        </button>
      </div>
    </header>
  );
}
