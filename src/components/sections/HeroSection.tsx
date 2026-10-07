import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { personal, heroTrace } = portfolioData;

  return (
    <section id="top" className="pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="mb-6 flex items-center gap-3 text-base text-muted-foreground">
            <Image
              src="/profile.jpg"
              alt=""
              width={44}
              height={44}
              priority
              className="h-11 w-11 rounded-full object-cover object-top"
            />
            <span>
              <span className="font-medium text-foreground">{personal.name}</span>, {personal.title}
            </span>
          </p>

          <h1 className="text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {personal.pitch}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {personal.pitchDetail}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookCallButton section="hero" size="lg" />
            <Link href="/#work" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              View projects
            </Link>
          </div>
        </div>

        {/* A real flow from the voice agent project, shown as the system it is. */}
        <figure className="lg:col-span-5">
          <ol className="relative rounded-lg border border-border bg-card p-6 md:p-7">
            {heroTrace.steps.map((step, i) => (
              <li
                key={step.text}
                className="trace-step relative flex gap-4 pb-6 last:pb-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                {i < heroTrace.steps.length - 1 && (
                  <span className="absolute left-[7px] top-5 h-full w-px bg-border" aria-hidden="true" />
                )}
                <span
                  className="trace-node relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border-2 border-primary"
                  style={{ "--i": i } as React.CSSProperties}
                  aria-hidden="true"
                />
                <span>
                  <span className="block font-medium leading-snug">{step.text}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{step.tool}</span>
                </span>
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {heroTrace.caption}.{" "}
            <Link href={`/projects/${heroTrace.slug}`} className="text-link">
              Read the case study
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
