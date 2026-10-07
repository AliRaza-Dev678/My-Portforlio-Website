"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookCallButton } from "@/components/booking/BookCallButton";

const navLinks = [
  { name: "Case studies", href: "/#work" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Education", href: "/#education" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Ali Raza
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <BookCallButton section="nav" size="sm" icon={false} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-border bg-background md:hidden">
          <ul className="shell flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <BookCallButton section="nav-mobile" className="w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
