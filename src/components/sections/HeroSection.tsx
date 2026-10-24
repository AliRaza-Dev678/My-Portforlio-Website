import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { personal, heroTrace } = portfolioData;
  const steps = heroTrace.steps;

  return (
    <section id="top" className="signal-block relative overflow-hidden">
      <div className="signal-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />

      <div className="shell relative pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/25 bg-white/10 py-1.5 pl-3 pr-4 text-sm">
              <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-white" aria-hidden="true" />
              <span className="min-w-0">
                Now: {personal.current.role} at {personal.current.company}
              </span>
            </p>

            <h1 className="wide mt-8 text-[2.35rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
              {personal.pitch}
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              {personal.pitchDetail}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookCallButton section="hero" size="lg" variant="inverse" />
              <Link href="/#work" className={cn(buttonVariants({ variant: "inverseOutline", size: "lg" }))}>
                View projects
              </Link>
            </div>
          </div>

          <aside className="flex items-end lg:col-span-4" aria-label="Profile">
            <div className="flex w-full items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.07] p-4 lg:flex-col lg:items-start lg:p-5">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${personal.name}`}
                width={320}
                height={320}
                priority
                sizes="(min-width: 1024px) 280px, 72px"
                className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover object-top lg:aspect-square lg:h-auto lg:w-full"
              />
              <div className="min-w-0">
                <p className="wide text-lg font-bold leading-tight">{personal.name}</p>
                <p className="mt-0.5 text-white/80">{personal.title}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {personal.location}, open to remote roles
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* A real pipeline from the voice agent project. The pulse is the page's one animation. */}
        <figure className="mt-14 md:mt-20">
          <div className="relative">
            <svg
              className="absolute left-[10%] right-[10%] top-1/2 hidden h-px w-[80%] -translate-y-1/2 overflow-visible md:block"
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="0" y1="1" x2="1000" y2="1" stroke="rgb(255 255 255 / 0.3)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <line className="signal-pulse" x1="0" y1="1" x2="1000" y2="1" pathLength={1000} stroke="#fff" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <svg
              className="absolute left-[27px] top-10 h-[calc(100%-5rem)] w-px overflow-visible md:hidden"
              viewBox="0 0 2 1000"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="1" y1="0" x2="1" y2="1000" stroke="rgb(255 255 255 / 0.3)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <line className="signal-pulse" x1="1" y1="0" x2="1" y2="1000" pathLength={1000} stroke="#fff" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>

            <ol className="relative grid gap-3 md:grid-cols-5 md:gap-4">
              {steps.map((step, i) => (
                <li
                  key={step.text}
                  className="signal-node flex items-start gap-3 rounded-xl border border-white/25 bg-[hsl(var(--signal))] p-3 md:flex-col md:gap-3 md:p-4"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold tabular-nums">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold leading-snug">{step.text}</span>
                    <span className="mt-1 block text-sm opacity-75">{step.tool}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className="mt-4 text-sm text-white/75">
            {heroTrace.caption}.{" "}
            <Link href={`/projects/${heroTrace.slug}`} className="font-medium text-white underline underline-offset-4 hover:decoration-2">
              Read the case study
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
