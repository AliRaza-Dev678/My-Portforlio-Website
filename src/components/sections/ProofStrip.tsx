import {
  SiNextdotjs, SiReact, SiTypescript, SiPython, SiFastapi, SiPostgresql,
  SiRedis, SiDocker, SiN8N, SiMake, SiLangchain, SiFlutter,
} from "react-icons/si";
import { portfolioData } from "@/data/portfolio";

// Tools without a brand icon are shown as text so nothing from the CV stack is left out.
const STACK = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Python", Icon: SiPython },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: SiDocker },
  { name: "LangChain", Icon: SiLangchain },
  { name: "n8n", Icon: SiN8N },
  { name: "Make.com", Icon: SiMake },
  { name: "Flutter", Icon: SiFlutter },
  { name: "GoHighLevel", Icon: null },
  { name: "LangGraph", Icon: null },
  { name: "LiveKit Agents", Icon: null },
  { name: "Groq", Icon: null },
];

export function ProofStrip() {
  return (
    <section aria-label="Key numbers and core stack" className="border-b border-border bg-card">
      <div className="shell py-12 md:py-16">
        <dl className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-border">
          {portfolioData.proof.map((item) => (
            <div key={item.value} className="flex flex-col-reverse justify-end sm:pr-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <dt className="mt-2 text-sm leading-snug text-muted-foreground">{item.label}</dt>
              <dd className="text-[1.75rem] font-extrabold leading-none tracking-[-0.03em] text-[hsl(var(--link))] [font-stretch:108%] lg:text-[1.7rem] xl:text-3xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-8 text-sm font-medium text-muted-foreground">
          {STACK.map(({ name, Icon }) => (
            <li key={name} className="inline-flex items-center gap-2">
              {Icon && <Icon className="h-[18px] w-[18px]" aria-hidden="true" />}
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
