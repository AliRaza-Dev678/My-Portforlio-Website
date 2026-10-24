"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// three.js loads only in the browser, after the page is interactive.
const SignalGlobe = dynamic(() => import("./SignalGlobe"), { ssr: false });

/** Wraps the 3D globe: pauses it off-screen and holds it still for reduced motion. */
export function HeroScene({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    const el = ref.current;
    const io = el ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" }) : null;
    if (el && io) io.observe(el);
    return () => {
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <SignalGlobe running={visible} animate={!reduced} />
    </div>
  );
}
