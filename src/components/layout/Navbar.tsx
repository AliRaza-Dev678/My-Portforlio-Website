"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", href: "/#work" },
  { name: "Experience", href: "/#experience" },
  { name: "Skills", href: "/#skills" },
  { name: "Education", href: "/#education" },
];

/**
 * `overHero` makes the bar transparent with white text while it sits on the
 * ultramarine hero, then solid once the page scrolls.
 */
export function Navbar({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSignal = overHero && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-colors duration-200",
        onSignal
          ? "border-b border-transparent text-white"
          : "border-b border-border bg-background/85 text-foreground backdrop-blur-md"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="wide text-lg font-extrabold tracking-tight">
          Ali Raza
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                onSignal ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className={onSignal ? "text-white hover:bg-white/10 hover:text-white" : ""} />
          <BookCallButton
            section="nav"
            size="sm"
            icon={false}
            variant={onSignal ? "inverse" : "default"}
            className="hidden sm:inline-flex"
          />
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
