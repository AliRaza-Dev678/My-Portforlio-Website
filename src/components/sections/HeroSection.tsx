import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { NeuralNetwork3D } from "@/components/animations/NeuralNetwork3D";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* 3D Background */}
      <NeuralNetwork3D />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up" delay={0.1}>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium font-mono border border-border">
              Hello World {"->"} I am
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {portfolioData.personal.name}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <h2 className="text-2xl md:text-4xl text-primary font-semibold mb-6">
              {portfolioData.personal.title}
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 group rounded-full">
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full border-primary/50 hover:border-primary">
                <a href="/CV_Ali_Raza.pdf" download="CV_Ali_Raza.pdf">
                  <Download className="mr-2 w-4 h-4" />
                  Download CV
                </a>
              </Button>
              
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-border hidden sm:flex">
                <Link href={portfolioData.personal.github} target="_blank">
                  <FaGithub className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 rounded-full border border-border hidden sm:flex">
                <Link href={portfolioData.personal.linkedin} target="_blank">
                  <FaLinkedin className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              
              <div className="flex sm:hidden gap-4 mt-2">
                <Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-full">
                  <Link href={portfolioData.personal.github} target="_blank">
                    <FaGithub className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-full">
                  <Link href={portfolioData.personal.linkedin} target="_blank">
                    <FaLinkedin className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
