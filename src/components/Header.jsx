import React, { useState } from "react";

const navItems = [
  { href: "#learn", label: "Learn" },
  { href: "#data", label: "Data" },
  { href: "#tips", label: "Act" },
  { href: "#blog", label: "Blog" },
  { href: "#pledge", label: "Pledge" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-red-700/20 bg-red-700 text-white" role="banner">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white">
            <span aria-hidden className="inline-block h-7 w-7 rounded bg-white text-red-700 font-extrabold grid place-items-center">🌍</span>
            <span className="font-extrabold tracking-tight text-white text-lg">HeatUp Action</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#donate"
                  className="inline-flex items-center rounded bg-white px-4 py-2 font-semibold text-red-700 shadow hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Donate
                </a>
              </li>
            </ul>
          </nav>

          <button
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center rounded p-2 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open main menu</span>
            <div aria-hidden>
              {open ? (
                <span className="text-2xl" role="img">✖️</span>
              ) : (
                <span className="text-2xl" role="img">☰</span>
              )}
            </div>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${open ? "block" : "hidden"} md:hidden border-t border-red-600 bg-red-700`}>
        <nav aria-label="Mobile Primary">
          <ul className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#donate"
                onClick={() => setOpen(false)}
                className="block rounded bg-white px-3 py-2 font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Donate
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
