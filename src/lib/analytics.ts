import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends one event to Vercel Analytics, and to GA4 as well if gtag is on the page. */
export function trackEvent(name: string, props: Props = {}) {
  try {
    track(name, props);
    window.gtag?.("event", name, props);
  } catch {
    // Analytics must never break the page.
  }
}
