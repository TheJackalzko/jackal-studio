"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex h-10 w-10 items-center justify-center border border-silver/30 text-ink"
      >
        <span className="relative block h-3 w-4">
          <span
            className={`absolute left-0 top-0 h-px w-4 bg-ink transition-transform duration-[250ms] ease-out ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 bottom-0 h-px w-4 bg-ink transition-transform duration-[250ms] ease-out ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-t border-silver/15 bg-paper"
        >
          <nav className="flex flex-col px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-silver/10 py-4 text-17 text-ink last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 border border-gold px-5 py-3 text-center text-17 text-ink"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
