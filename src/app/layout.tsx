import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RazaMindChatbot } from "@/components/RazaMindChatbot";
import { CalendlyProvider } from "@/components/booking/CalendlyProvider";
import { portfolioData, site } from "@/data/portfolio";

// One family, two voices: Archivo at normal width for reading, stretched wide for display.
// Self-hosted variable font (wght 100-900, wdth 62-125). SIL Open Font License.
const archivo = localFont({
  src: "./fonts/ArchivoVF.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
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
    "AI automation",
    "AI Operations Specialist",
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
    { media: "(prefers-color-scheme: light)", color: "#f4f6f5" },
    { media: "(prefers-color-scheme: dark)", color: "#071a1e" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} font-sans antialiased`}>
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
