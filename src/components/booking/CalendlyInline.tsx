"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { calendlyUrl, type BookingTheme } from "@/lib/calendly";

/**
 * Inline scheduler for the booking section. It waits until the section is
 * close to the viewport, and rebuilds itself when the site theme changes.
 */
export function CalendlyInline({ section = "booking-section" }: { section?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.Calendly) setReady(true);
    const onReady = () => setReady(true);
    window.addEventListener("calendly:ready", onReady);
    return () => window.removeEventListener("calendly:ready", onReady);
  }, []);

  useEffect(() => {
    const el = container.current;
    if (!el || !near || !ready || !window.Calendly || !resolvedTheme) return;
    const theme: BookingTheme = resolvedTheme === "light" ? "light" : "dark";
    el.innerHTML = "";
    window.Calendly.initInlineWidget({ url: calendlyUrl(section, theme), parentElement: el });
    const onFocus = () => {
      window.__bookingSection = section;
    };
    el.addEventListener("pointerenter", onFocus);
    return () => el.removeEventListener("pointerenter", onFocus);
  }, [near, ready, resolvedTheme, section]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div ref={container} className="h-[700px] w-full [&>iframe]:h-full [&>iframe]:w-full" />
      <noscript>
        <p className="p-6">
          <a href={calendlyUrl(section)}>Open the booking page on Calendly</a>
        </p>
      </noscript>
    </div>
  );
}
