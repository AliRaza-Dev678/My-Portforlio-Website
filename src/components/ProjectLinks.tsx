import { ExternalLink, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProjectLink } from "@/data/portfolio";

const ICONS = { live: ExternalLink, code: FaGithub, docs: FileText } as const;

export function ProjectLinks({ links, project }: { links: ProjectLink[]; project: string }) {
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => {
        const Icon = ICONS[link.kind];
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link inline-flex items-center gap-1.5 text-sm"
              aria-label={`${link.label}: ${project}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Stack">
      {stack.map((tech) => (
        <li key={tech} className="chip">
          {tech}
        </li>
      ))}
    </ul>
  );
}
