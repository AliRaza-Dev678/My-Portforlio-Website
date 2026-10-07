"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "./BookCallButton";

/** Phone-only bar that keeps "Book a call" in reach once the hero has scrolled away. */
export function StickyBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atBooking, setAtBooking] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const booking = document.getElementById("book");
    let io: IntersectionObserver | undefined;
    if (booking) {
      io = new IntersectionObserver(([entry]) => setAtBooking(entry.isIntersecting));
      io.observe(booking);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = pastHero && !atBooking;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur transition-transform duration-200 motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-sm leading-tight text-muted-foreground">30-minute intro call</p>
        <BookCallButton section="sticky-bar" className={visible ? "" : "invisible"} />
      </div>
    </div>
  );
}
