import { portfolioData } from "@/data/portfolio";

export function ExperienceSection() {
  const { experience, honors } = portfolioData;

  return (
    <section id="experience" className="section border-t border-border">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="section-title">Experience</h2>
            <p className="section-lede">
              Building AI automation in operations today, alongside freelance AI engineering since January 2025.
            </p>
            <ul className="mt-8 space-y-3">
              {honors.map((h) => (
                <li key={h.title} className="rounded-xl border border-border bg-card px-4 py-3">
                  <p className="font-semibold">{h.title}</p>
                  <p className="text-sm text-muted-foreground">{h.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* A real timeline, newest first. */}
        <ol className="relative lg:col-span-8">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-border" aria-hidden="true" />
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="relative pb-12 pl-10 last:pb-0">
              <span
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                  job.current ? "border-primary bg-primary" : "border-border bg-background"
                }`}
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-muted-foreground">
                <span className={job.current ? "text-[hsl(var(--link))]" : undefined}>{job.period}</span>
                <span className="mx-2" aria-hidden="true">/</span>
                {job.location}
              </p>
              <h3 className="wide mt-2 text-xl font-extrabold leading-tight tracking-[-0.015em] md:text-2xl">
                {job.role}
              </h3>
              <p className="mt-1 text-lg">
                {job.company}
                {job.focus !== job.type && job.focus !== "Internship" && (
                  <span className="text-muted-foreground">, {job.focus}</span>
                )}
                <span className="text-muted-foreground">, {job.type}</span>
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b) => (
                  <li key={b} className="relative pl-5 leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-border">
                    {b}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Skills">
                {job.stack.map((t) => (
                  <li key={t} className="chip text-xs">{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
