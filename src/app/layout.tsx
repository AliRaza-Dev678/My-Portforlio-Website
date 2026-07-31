import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { RazaMindChatbot } from "@/components/RazaMindChatbot";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Ali Raza | Full-Stack AI Engineer",
  description: "Portfolio of Ali Raza, Full-Stack AI Engineer turning AI prototypes into complete, usable software systems.",
  keywords: ["Ali Raza", "Full-Stack AI Engineer", "Software Engineer", "React", "Next.js", "Python", "FastAPI"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aliraza-dev.vercel.app/",
    title: "Ali Raza | Full-Stack AI Engineer",
    description: "Portfolio of Ali Raza, Full-Stack AI Engineer turning AI prototypes into complete, usable software systems.",
    siteName: "Ali Raza Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <RazaMindChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
