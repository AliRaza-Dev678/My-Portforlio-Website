import { getCaseStudy } from "@/data/portfolio";
import { ogSize, renderOgImage } from "@/lib/og";

// Edge runtime: the Node build of next/og fails on Windows ("Invalid URL").
export const runtime = "edge";
export const alt = "Case study by Ali Raza";
export const size = ogSize;
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  return renderOgImage({
    kicker: "Case study by Ali Raza, Full-Stack AI Engineer",
    headline: study?.title ?? "Case study",
  });
}
