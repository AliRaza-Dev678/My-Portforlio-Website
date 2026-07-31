import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";

export function SkillsSection() {
  const skillCategories = [
    { title: "Full-Stack & Platform", skills: portfolioData.skills.fullstack },
    { title: "Generative AI & LLMs", skills: portfolioData.skills.ai },
    { title: "Data & Backend", skills: portfolioData.skills.data },
    { title: "ML/DL & Vision", skills: portfolioData.skills.ml },
    { title: "Automation & DevOps", skills: portfolioData.skills.devops },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
          {skillCategories.map((category, idx) => (
            <FadeIn key={category.title} direction="up" delay={0.1 * idx}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary font-mono">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm font-medium hover:bg-primary/20 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
          
        </div>
      </div>
    </section>
  );
}
