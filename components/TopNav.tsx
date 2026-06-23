"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CornerDownRight, Moon, Sun } from "lucide-react";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/sections", label: "Browse Sections" },
  { href: "/design-systems", label: "Design Systems" },
  { href: "/page-layouts", label: "Page Layouts" },
  // Builder (Components, Your System) hidden for the Lane 1 MVP — pages still
  // exist by URL; re-add when the builder ships (Lane 2/3).
];

export default function TopNav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  // sync toggle state with the attribute the pre-paint script already set
  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") !== "dark";
    if (next) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("lp-theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="lp-topnav">
      <Link className="lp-logo" href="/" aria-label="layout.page home">
        <span className="lp-logo-mark" />
        <span className="logo">LAYOUT.PAGE</span>
      </Link>
      <nav className="lp-topnav-links">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="lp-topnav-actions">
        <a href="mailto:hello@productpaige.com?subject=Section%20request">
          <span className="lp-tbi">
            <CornerDownRight className="ico" size={16} strokeWidth={1.25} />
            Request a section
          </span>
        </a>
        <Link href="/#pricing">
          <span className="lp-tbi">
            <CornerDownRight className="ico" size={16} strokeWidth={1.25} />
            Start free
          </span>
        </Link>
      </div>
      <button className="themebtn" onClick={toggleTheme} aria-label="Toggle theme">
        {dark ? (
          <Sun className="ico" size={16} strokeWidth={1.25} />
        ) : (
          <Moon className="ico" size={16} strokeWidth={1.25} />
        )}
      </button>
    </header>
  );
}
