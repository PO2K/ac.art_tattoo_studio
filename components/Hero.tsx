"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/i18n";

/** Hero copy staggers in on load, then drifts down and fades as the page scrolls. */
export default function Hero({ t }: { t: Dictionary }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const p = Math.min(y / (el.offsetHeight || 1), 1);
        el.style.transform = `translateY(${(y * 0.18).toFixed(1)}px)`;
        el.style.opacity = Math.max(0, 1 - p * 1.1).toFixed(3);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" ref={ref} className="hero container">
      <p className="eyebrow hero-item" style={{ ["--d" as string]: "100ms" }}>{t.hero.eyebrow}</p>
      <h1 className="serif hero-item" style={{ ["--d" as string]: "220ms" }}>
        <span>{t.hero.title[0]}</span>
        <span>{t.hero.title[1]}</span>
      </h1>
      <p className="lead hero-item" style={{ ["--d" as string]: "380ms" }}>{t.hero.lead}</p>
    </section>
  );
}
