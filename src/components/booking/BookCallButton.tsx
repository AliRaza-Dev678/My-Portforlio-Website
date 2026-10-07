"use client";

import { useTheme } from "next-themes";
import { CalendarDays } from "lucide-react";
import { calendlyUrl, type BookingTheme } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  /** Where on the site this button sits. Sent to Calendly as utm_content. */
  section: string;
  label?: string;
  variant?: "default" | "outline" | "link";
  size?: "default" | "sm" | "lg";
  icon?: boolean;
  className?: string;
};

/**
 * Opens the Calendly popup. It is a real link, so it still works if the
 * widget script has not loaded or JavaScript is off.
 */
export function BookCallButton({
  section,
  label = "Book a call",
  variant = "default",
  size = "default",
  icon = true,
  className,
}: Props) {
  const { resolvedTheme } = useTheme();

  return (
    <a
      href={calendlyUrl(section)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={(e) => {
        window.__bookingSection = section;
        trackEvent("booking_opened", { section });
        if (window.Calendly) {
          e.preventDefault();
          const theme: BookingTheme = resolvedTheme === "light" ? "light" : "dark";
          window.Calendly.initPopupWidget({ url: calendlyUrl(section, theme) });
        }
      }}
    >
      {icon && <CalendarDays aria-hidden="true" />}
      {label}
    </a>
  );
}
