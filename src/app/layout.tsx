import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RazaMindChatbot } from "@/components/RazaMindChatbot";
import { CalendlyProvider } from "@/components/booking/CalendlyProvider";
import { portfolioData, site } from "@/data/portfolio";

const body = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const { name, title } = portfolioData.personal;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${name} | ${title}`,
    template: `%s | ${name}`,
  },
  description: site.description,
  keywords: [
    "Ali Raza",
    "Full-Stack AI Engineer",
    "AI engineer",
    "voice AI agent",
    "RAG",
    "n8n",
    "Make.com",
    "GoHighLevel",
    "FastAPI",
    "Next.js",
    "LangGraph",
  ],
  authors: [{ name, url: site.url }],
  creator: name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${name}, ${title}`,
    title: `${name} | ${title}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} | ${title}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1b2a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          {children}
          <RazaMindChatbot />
          <CalendlyProvider />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
