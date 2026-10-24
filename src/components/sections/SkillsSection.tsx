import { portfolioData } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="section border-t border-border">
      <div className="shell">
        <h2 className="section-title">Technical skills</h2>
        <p className="section-lede">Grouped the same way as on my CV.</p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.skills.map((category) => (
            <div key={category.group} className="bg-card p-6 md:p-7">
              <dt className="wide text-lg font-extrabold leading-snug tracking-[-0.01em]">{category.group}</dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li key={item} className="rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
