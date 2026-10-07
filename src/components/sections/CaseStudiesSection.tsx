import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { ProjectLinks, StackChips } from "@/components/ProjectLinks";
import { BookCallButton } from "@/components/booking/BookCallButton";

export function CaseStudiesSection() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <h2 className="section-title">Featured case studies</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Six systems, each one built end to end. Every case study covers the problem, what I built,
          the stack, and the result.
        </p>

        <div className="mt-12">
          {portfolioData.caseStudies.map((study) => (
            <article
              key={study.slug}
              className="grid gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-5">
                <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                  <Link href={`/projects/${study.slug}`} className="hover:underline hover:underline-offset-4">
                    {study.title}
                  </Link>
                </h3>
                <div className="mt-4">
                  <ProjectLinks links={study.links} project={study.title} />
                </div>
              </div>

              <div className="md:col-span-7">
                <dl className="space-y-4 leading-relaxed">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Problem</dt>
                    <dd>{study.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">What I built</dt>
                    <dd>{study.summary}</dd>
                  </div>
                  <div>
                    <dt className="mb-1.5 text-sm font-medium text-muted-foreground">Stack</dt>
                    <dd>
                      <StackChips stack={study.stack} />
                    </dd>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <dt className="text-sm font-medium text-muted-foreground">Result</dt>
                    <dd className="font-medium">{study.result}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={`/projects/${study.slug}`} className="text-link">
                    Read the case study
                    <span className="sr-only">: {study.title}</span>
                  </Link>
                  <BookCallButton
                    section={`home-${study.slug}`}
                    label="Book a call about this"
                    variant="link"
                    icon={false}
                    className="h-auto p-0 text-base font-medium"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
