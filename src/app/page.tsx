import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { MoreProjectsSection } from "@/components/sections/MoreProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { StickyBookBar } from "@/components/booking/StickyBookBar";
import { JsonLd } from "@/components/JsonLd";
import { portfolioData, site } from "@/data/portfolio";

export default function Home() {
  const { personal, education, skills } = portfolioData;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: personal.name,
          jobTitle: personal.title,
          description: site.description,
          url: site.url,
          image: `${site.url}/profile.jpg`,
          email: `mailto:${personal.email}`,
          telephone: personal.phone,
          address: { "@type": "PostalAddress", addressLocality: "Multan", addressCountry: "PK" },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: education[0].institution,
          },
          sameAs: [personal.github, personal.linkedin],
          knowsAbout: skills.map((s) => s.group),
        }}
      />
      <Navbar />
      <main id="main">
        <HeroSection />
        <ProofStrip />
        <CaseStudiesSection />
        <MoreProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <BookingSection />
      </main>
      <Footer />
      <StickyBookBar />
    </>
  );
}
