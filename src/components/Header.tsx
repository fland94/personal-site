"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#contact", label: "Contact" }
];

type Theme = "light" | "dark";

export function Header() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    setTheme(attr === "dark" ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fl-theme", next);
    setTheme(next);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <Link href="/#top" className="brand" onClick={closeMenu}>
        Federico&nbsp;Landozzi
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </nav>
      <button
        className="menu-button"
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        Menu
      </button>
      {menuOpen ? (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <span>Menu</span>
            <button type="button" onClick={closeMenu} aria-label="Close menu">
              Close
            </button>
          </div>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={toggleTheme} className="mobile-theme">
            Toggle {theme === "light" ? "dark" : "light"} theme
          </button>
        </div>
      ) : null}
    </header>
  );
}
