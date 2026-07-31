import { FadeIn } from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn direction="up">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="h-px bg-border flex-1 ml-4" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeIn direction="up" delay={0.2}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am a Full-Stack AI Engineer and Software Engineering undergraduate at{" "}
                <strong className="text-foreground">The Islamia University of Bahawalpur (2023–2027)</strong>. 
                My passion lies in building intelligent products that bridge the gap between cutting-edge AI models and real-world applications.
              </p>
              <p>
                My expertise spans React/TypeScript frontends, FastAPI services, PostgreSQL/Redis data layers, LLM workflows, and n8n automation pipelines. I&apos;ve designed containerized AI-powered workspace platforms with secure authentication, role-aware access, real-time WebSocket communication, and Groq-powered insights.
              </p>
              <p>
                Beyond web development, I have hands-on experience with document and video RAG, LangGraph agents, NLP, and computer vision, always focusing on turning AI prototypes into complete, usable software systems.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.4}>
            <Card className="bg-background border-border/50 shadow-2xl overflow-hidden group border-2">
              <CardContent className="p-0 relative aspect-[4/5] md:aspect-[3/4] flex items-center justify-center">
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src="/profile.jpg" 
                    alt="Ali Raza" 
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col items-center text-center">
                  <h3 className="font-mono text-2xl font-bold text-foreground drop-shadow-md">Ali Raza</h3>
                  <p className="text-primary font-medium mt-1">Full Stack AI Engineer</p>
                  <p className="text-sm text-muted-foreground mt-3 font-mono flex items-center justify-center gap-2 bg-background/80 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for opportunities
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
