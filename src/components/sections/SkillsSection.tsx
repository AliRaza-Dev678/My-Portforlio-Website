import { portfolioData } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <h2 className="section-title">Technical skills</h2>

        <dl className="mt-10 divide-y divide-border border-y border-border">
          {portfolioData.skills.map((category) => (
            <div key={category.group} className="grid gap-2 py-6 md:grid-cols-12 md:gap-10">
              <dt className="font-display text-lg font-semibold leading-snug md:col-span-4">
                {category.group}
              </dt>
              <dd className="leading-relaxed text-muted-foreground md:col-span-8">
                {category.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
