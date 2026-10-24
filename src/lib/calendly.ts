import { site } from "@/data/portfolio";

// Calendly reads these as hex values without the leading "#".
const THEME = {
  light: { background_color: "ffffff", text_color: "0c1f23", primary_color: "b4470a" },
  dark: { background_color: "0d262b", text_color: "eef3f1", primary_color: "ff7a1a" },
} as const;

export type BookingTheme = keyof typeof THEME;

/**
 * Builds the Calendly URL for one "Book a call" entry point.
 * `section` lands in Calendly as utm_content, so each booking shows which
 * part of the site produced it (hero, nav, sticky-bar, case-study slug, razamind...).
 */
export function calendlyUrl(section: string, theme?: BookingTheme) {
  const url = new URL(site.calendlyUrl);
  url.searchParams.set("utm_source", "portfolio");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "book-a-call");
  url.searchParams.set("utm_content", section);
  if (theme) {
    for (const [key, value] of Object.entries(THEME[theme])) {
      url.searchParams.set(key, value);
    }
    url.searchParams.set("hide_gdpr_banner", "1");
  }
  return url.toString();
}
