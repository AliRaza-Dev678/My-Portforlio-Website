import { portfolioData } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="shell">
        <h2 className="section-title">Experience</h2>

        <ul className="mt-10 grid gap-10 md:grid-cols-2">
          {portfolioData.experience.map((job) => (
            <li key={job.company}>
              <h3 className="text-xl font-semibold leading-snug">{job.role}</h3>
              <p className="mt-1 text-muted-foreground">
                {job.company}, {job.period}
              </p>
              <p className="mt-4 leading-relaxed">{job.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
