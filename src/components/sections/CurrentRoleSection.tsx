import { Building2, CalendarDays, MapPin, Check } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

/** The current job, given its own band right under the hero. */
export function CurrentRoleSection() {
  const { personal, experience } = portfolioData;
  const now = personal.current;
  const job = experience[0];

  return (
    <section id="now" aria-labelledby="now-title" className="border-b border-border bg-card">
      <div className="shell grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Current role
          </p>
          <h2 id="now-title" className="wide mt-5 text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[2.6rem]">
            {now.role}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">{now.focus}</p>

          <ul className="mt-7 space-y-3 text-base">
            <li className="flex items-center gap-3">
              <Building2 className="h-5 w-5 shrink-0 text-[hsl(var(--link))]" aria-hidden="true" />
              <span className="font-semibold">{now.company}</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-[hsl(var(--link))]" aria-hidden="true" />
              {now.location}, {now.workplace.toLowerCase()}
            </li>
            <li className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 shrink-0 text-[hsl(var(--link))]" aria-hidden="true" />
              {now.type}, {now.since} to present
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-sm font-semibold text-muted-foreground">What I do there</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {job.bullets.map((b) => (
              <li key={b} className="flex gap-3 rounded-xl border border-border bg-background p-4 leading-relaxed">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--link))]" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
