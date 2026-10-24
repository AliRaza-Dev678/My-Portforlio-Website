import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { portfolioData, type CaseStudy } from "@/data/portfolio";
import { ProjectLinks, StackChips } from "@/components/ProjectLinks";
import { BookCallButton } from "@/components/booking/BookCallButton";

function CaseLinks({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href={`/projects/${study.slug}`} className="text-link">
        Read the case study
        <span className="sr-only">: {study.title}</span>
      </Link>
      <ProjectLinks links={study.links} project={study.title} />
      {study.videos && (
        <Link
          href={`/projects/${study.slug}#demo`}
          className="text-link inline-flex items-center gap-1.5 text-sm"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          {study.videos.length} demo videos
        </Link>
      )}
    </div>
  );
}

/** The two lead projects get a wide panel. */
function FeaturedCase({ study }: { study: CaseStudy }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-12">
      <div className="p-6 md:p-10 lg:col-span-7">
        <h3 className="wide text-2xl font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[2rem]">
          <Link href={`/projects/${study.slug}`} className="hover:text-link">
            {study.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{study.problem}</p>
        <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed">{study.result}</p>
        <div className="mt-6">
          <StackChips stack={study.stack} />
        </div>
        <div className="mt-8">
          <CaseLinks study={study} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 bg-accent p-6 text-accent-foreground md:p-10 lg:col-span-5">
        {study.figures ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
            {study.figures.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end">
                <dt className="text-sm opacity-80">{f.label}</dt>
                <dd className="wide text-4xl font-extrabold leading-none tracking-[-0.03em]">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : study.highlights ? (
          <div>
            <ul className="space-y-1">
              {study.highlights.items.map((item) => (
                <li key={item} className="wide text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xs leading-relaxed opacity-80">{study.highlights.caption}</p>
          </div>
        ) : null}
        <BookCallButton section={`home-${study.slug}`} label="Book a call about this" className="self-start" />
      </div>
    </article>
  );
}

function CompactCase({ study }: { study: CaseStudy }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-6 md:p-8">
      <h3 className="wide text-xl font-extrabold leading-tight tracking-[-0.015em] md:text-[1.4rem]">
        <Link href={`/projects/${study.slug}`} className="hover:text-link">
          {study.title}
        </Link>
      </h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{study.summary}</p>
      <p className="mt-4 flex-1 border-l-2 border-primary pl-4 font-medium leading-relaxed">{study.result}</p>
      <div className="mt-6">
        <StackChips stack={study.stack} />
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <CaseLinks study={study} />
      </div>
    </article>
  );
}

export function CaseStudiesSection() {
  const [first, second, ...rest] = portfolioData.caseStudies;

  return (
    <section id="work" className="section">
      <div className="shell">
        <h2 className="section-title">Selected work</h2>
        <p className="section-lede">
          Six systems, each built end to end, from CRM automation and voice AI to full-stack platforms and RAG.
        </p>

        <div className="mt-12 space-y-6">
          <FeaturedCase study={first} />
          <FeaturedCase study={second} />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((study) => (
              <CompactCase key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
