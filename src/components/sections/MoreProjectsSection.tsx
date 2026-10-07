import { FaGithub } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";
import { OpenChatButton } from "@/components/OpenChatButton";

export function MoreProjectsSection() {
  const { moreProjects, mlProjects } = portfolioData;

  return (
    <section id="more-projects" className="section">
      <div className="shell">
        <h2 className="section-title">More projects</h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {moreProjects.map((project) => (
            <li key={project.title} className="flex flex-col rounded-lg border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{project.description}</p>
              <p className="mt-4 text-sm text-muted-foreground">{project.stack.join(", ")}</p>
              <div className="mt-4">
                {project.action === "chat" ? (
                  <OpenChatButton />
                ) : (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link inline-flex items-center gap-1.5 text-sm"
                    aria-label={`Code: ${project.title}`}
                  >
                    <FaGithub className="h-4 w-4" aria-hidden="true" />
                    Code
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <h3 className="text-lg font-semibold">{mlProjects.intro}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{mlProjects.stack.join(", ")}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {mlProjects.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip gap-2 hover:border-foreground"
                >
                  <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
