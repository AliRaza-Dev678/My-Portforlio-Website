import { Mail, Phone, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { CalendlyInline } from "@/components/booking/CalendlyInline";

export function BookingSection() {
  const { personal } = portfolioData;

  return (
    <section id="book" className="section">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="section-title">Book a call</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A 30-minute intro call. Tell me about the role or the project, your stack, and your
            timeline, and I will tell you how I would build it.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <a href={`mailto:${personal.email}`} className="text-link break-all">
                {personal.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <a href={`tel:${personal.phone.replace(/\s+/g, "")}`} className="text-link">
                {personal.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <span>{personal.location}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-8">
          <CalendlyInline />
        </div>
      </div>
    </section>
  );
}
