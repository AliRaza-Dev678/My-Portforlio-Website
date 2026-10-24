import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";
import { CalendlyInline } from "@/components/booking/CalendlyInline";

export function BookingSection() {
  const { personal } = portfolioData;
  const linkClass = "font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white break-all";

  return (
    <section id="book" className="signal-block relative overflow-hidden">
      <div className="signal-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_80%)]" aria-hidden="true" />
      <div className="shell relative grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="wide text-4xl font-extrabold leading-[1] tracking-[-0.035em] md:text-6xl">
            Have something to build?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
            Pick a time for a 30-minute intro call. Tell me about the role or the project, your stack,
            and your timeline, and I will tell you how I would build it.
          </p>

          <ul className="mt-10 space-y-4">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
              <a href={`mailto:${personal.email}`} className={linkClass}>
                {personal.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
              <a href={`tel:${personal.phone.replace(/\s+/g, "")}`} className={linkClass}>
                {personal.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaLinkedin className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                linkedin.com/in/aliraza-aiengineer
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
              <span>{personal.location}, open to remote roles</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <CalendlyInline />
        </div>
      </div>
    </section>
  );
}
