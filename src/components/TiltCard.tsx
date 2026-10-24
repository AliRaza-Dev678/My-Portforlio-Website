"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Tilts its content a few degrees toward the pointer, with a soft light that
 * follows it. Only reacts to a mouse; touch and reduced-motion users get a flat card.
 */
export function TiltCard({ children, className, max = 4 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--glow", "1");
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--glow", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("tilt-card relative transition-transform duration-300 ease-out will-change-transform", className)}
    >
      {children}
    </div>
  );
}
