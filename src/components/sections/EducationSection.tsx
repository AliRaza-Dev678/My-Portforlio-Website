import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-6">
          {portfolioData.education.map((edu, idx) => (
            <FadeIn key={idx} direction="up" delay={0.1 * idx}>
              <div className="p-6 rounded-xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform mt-1 md:mt-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                </div>
                <div className="md:text-right ml-13 md:ml-0">
                  <span className="font-mono text-sm text-primary bg-primary/5 border border-primary/20 px-3 py-1 rounded-full inline-block">
                    {edu.period}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
