"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize?: boolean }) => void;
    };
    __bookingSection?: string;
  }
}

/**
 * Loads the Calendly widget after the page is idle and reports completed
 * bookings to analytics. Mounted once in the root layout.
 */
export function CalendlyProvider() {
  useEffect(() => {
    // The stylesheet is only needed for the popup, so it is added without blocking render.
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        trackEvent("booking_scheduled", { section: window.__bookingSection ?? "unknown" });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Script
      src={WIDGET_JS}
      strategy="lazyOnload"
      onLoad={() => window.dispatchEvent(new Event("calendly:ready"))}
    />
  );
}
