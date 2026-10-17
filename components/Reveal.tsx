"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms, applied through the --d custom property. */
  delay?: number;
  className?: string;
  as?: ElementType;
  style?: React.CSSProperties;
};

/**
 * Fades and lifts its children into view the first time they scroll on screen.
 * Content is visible in the server HTML; only elements still below the fold
 * when JS runs are hidden and animated in, so nothing depends on hydration.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", style }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className || undefined} style={{ ...style, ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
