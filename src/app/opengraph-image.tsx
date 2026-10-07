import { portfolioData } from "@/data/portfolio";
import { ogSize, renderOgImage } from "@/lib/og";

// Edge runtime: the Node build of next/og fails on Windows ("Invalid URL").
export const runtime = "edge";
export const alt = "Ali Raza, Full-Stack AI Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const { name, title, pitch } = portfolioData.personal;
  return renderOgImage({ kicker: `${name}, ${title}`, headline: pitch });
}
