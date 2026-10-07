import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData, site } from "@/data/portfolio";

export function Footer() {
  const { personal } = portfolioData;
  const linkClass = "inline-flex items-center gap-2 text-sm hover:underline hover:underline-offset-4";

  return (
    <footer className="border-t border-border bg-card pb-24 pt-10 md:pb-10">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {personal.name}, {personal.title}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          <li>
            <a href={`mailto:${personal.email}`} className={linkClass}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {personal.email}
            </a>
          </li>
          <li>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </li>
          <li>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <FaLinkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.cvPath} download="Ali-Raza-CV.pdf" className={linkClass}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
