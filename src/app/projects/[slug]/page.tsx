import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StackChips } from "@/components/ProjectLinks";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { StickyBookBar } from "@/components/booking/StickyBookBar";
import { JsonLd } from "@/components/JsonLd";
import { getCaseStudy, portfolioData, site } from "@/data/portfolio";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioData.caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  const path = `/projects/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: study.title, description: study.summary },
    twitter: { card: "summary_large_image", title: study.title, description: study.summary },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const all = portfolioData.caseStudies;
  const index = all.findIndex((c) => c.slug === study.slug);
  const next = all[(index + 1) % all.length];
  const { personal } = portfolioData;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          description: study.summary,
          url: `${site.url}/projects/${study.slug}`,
          keywords: study.stack.join(", "),
          author: { "@type": "Person", name: personal.name, jobTitle: personal.title, url: site.url },
        }}
      />
      <Navbar overHero />
      <main id="main" className="pb-20">
        <header className="signal-block relative overflow-hidden">
          <div className="signal-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />
          <div className="shell relative pb-14 pt-28 md:pb-20 md:pt-32">
            <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All projects
            </Link>
            <h1 className="wide mt-6 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{study.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookCallButton section={`case-${study.slug}-top`} size="lg" variant="inverse" />
              <ul className="flex flex-wrap gap-2">
                {study.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center rounded-lg border border-white/40 px-5 font-semibold text-white hover:bg-white/10"
                      aria-label={`${link.label}: ${study.title}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <article className="shell pt-12 md:pt-16">
          {study.figures && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl bg-accent p-6 text-accent-foreground sm:grid-cols-4 md:p-10">
              {study.figures.map((figure) => (
                <div key={figure.label} className="flex flex-col-reverse justify-end">
                  <dt className="text-sm opacity-80">{figure.label}</dt>
                  <dd className="wide text-4xl font-extrabold leading-none tracking-[-0.03em]">{figure.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className={`${study.figures ? "mt-14" : ""} grid gap-12 lg:grid-cols-12 lg:gap-10`}>
            <div className="max-w-2xl space-y-12 lg:col-span-8">
              <section aria-labelledby="problem">
                <h2 id="problem" className="wide text-2xl font-extrabold tracking-[-0.02em]">Problem</h2>
                <p className="mt-3 text-lg leading-relaxed">{study.problem}</p>
              </section>

              <section aria-labelledby="built">
                <h2 id="built" className="wide text-2xl font-extrabold tracking-[-0.02em]">What I built</h2>
                <ul className="mt-4 space-y-4">
                  {study.built.map((item) => (
                    <li key={item} className="border-l-2 border-border pl-4 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {study.flow && (
                <section aria-labelledby="flow">
                  <h2 id="flow" className="wide text-2xl font-extrabold tracking-[-0.02em]">How a booking flows</h2>
                  <ol className="mt-5">
                    {study.flow.map((step, i) => (
                      <li key={step.text} className="relative flex gap-4 pb-6 last:pb-0">
                        {i < study.flow!.length - 1 && (
                          <span className="absolute left-[7px] top-5 h-full w-px bg-border" aria-hidden="true" />
                        )}
                        <span className="relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>
                          <span className="block font-medium leading-snug">{step.text}</span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">{step.tool}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <section aria-labelledby="result" className="border-l-2 border-primary pl-5">
                <h2 id="result" className="wide text-2xl font-extrabold tracking-[-0.02em]">Result</h2>
                <p className="mt-3 text-lg font-medium leading-relaxed">{study.result}</p>
              </section>

              {study.videos && (
                <section aria-labelledby="demo">
                  <h2 id="demo" className="wide text-2xl font-extrabold tracking-[-0.02em]">Watch the demo</h2>
                  <div className="mt-5 space-y-8">
                    {study.videos.map((video) => (
                      <figure key={video.embedUrl}>
                        <div className="aspect-video overflow-hidden rounded-xl border border-border bg-card">
                          <iframe
                            src={video.embedUrl}
                            title={`${study.title}: ${video.title}`}
                            loading="lazy"
                            allowFullScreen
                            className="h-full w-full"
                          />
                        </div>
                        <figcaption className="mt-2 text-sm text-muted-foreground">
                          {video.title}.{" "}
                          <a href={video.watchUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                            Open on Loom
                          </a>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <h2 className="wide text-lg font-extrabold">Stack</h2>
                <div className="mt-3">
                  <StackChips stack={study.stack} />
                </div>
              </div>
            </aside>
          </div>

          <section aria-labelledby="cta" className="signal-block mt-16 rounded-2xl p-7 md:p-12">
            <h2 id="cta" className="wide text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
              Need something like this built?
            </h2>
            <p className="mt-3 max-w-xl text-lg text-white/80">
              Book a 30-minute intro call and tell me about the role or the project.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookCallButton section={`case-${study.slug}-bottom`} size="lg" variant="inverse" />
              <a href={`mailto:${personal.email}`} className="font-medium text-white underline underline-offset-4">
                {personal.email}
              </a>
            </div>
          </section>

          <p className="mt-10">
            <span className="text-muted-foreground">Next case study: </span>
            <Link href={`/projects/${next.slug}`} className="text-link">
              {next.title}
            </Link>
          </p>
        </article>
      </main>
      <Footer />
      <StickyBookBar />
    </>
  );
}
