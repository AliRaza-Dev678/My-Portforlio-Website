import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-6">
          <Link
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors scale-110"
          >
            <FaGithub className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors scale-110"
          >
            <FaLinkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href={`mailto:${portfolioData.personal.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors scale-110"
          >
            <Mail className="w-6 h-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
