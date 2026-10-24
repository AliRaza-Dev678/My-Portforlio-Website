import { portfolioData } from "@/data/portfolio";

export function EducationSection() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="section border-t border-border">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="section-title">Education</h2>
          <ul className="mt-8 space-y-4">
            {education.map((item) => (
              <li key={item.degree} className="rounded-xl border border-border bg-card p-5">
                <h3 className="wide text-lg font-extrabold leading-snug">{item.degree}</h3>
                <p className="mt-1 text-muted-foreground">
                  {item.institution}, {item.period}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-7">
          <h2 className="section-title">Certifications</h2>
          <ul className="mt-8 space-y-6">
            {certifications.map((item) => (
              <li key={item.title} className="border-l-2 border-primary pl-5">
                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
