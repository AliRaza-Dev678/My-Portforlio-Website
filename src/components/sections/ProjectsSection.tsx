import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {portfolioData.projects.map((project, idx) => (
            <FadeIn key={project.title} direction="up" delay={0.1 * idx}>
              <Card className="h-full flex flex-col group hover:border-primary/50 transition-colors bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2 mt-1">▹</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="font-mono text-xs text-primary/80 border-primary/20 bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 flex gap-4 border-t border-border/50">
                  <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                    <Link href={project.github} target="_blank">
                      <FaGithub className="w-4 h-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  {project.demo && (
                    <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Link href={project.demo} target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-foreground">ML/DL Experiments</h3>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.experiments.map((exp, idx) => (
            <FadeIn key={exp.title} direction="up" delay={0.05 * idx}>
              <Link href={exp.github} target="_blank" className="block group">
                <Card className="bg-background border-border hover:border-primary/50 hover:bg-secondary/50 transition-all">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                      {exp.title}
                    </span>
                    <FaGithub className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
