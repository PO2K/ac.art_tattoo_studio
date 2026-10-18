import type { CSSProperties, ReactNode } from "react";

/** Deterministic jagged edge for clip-path, so every torn section matches between renders. */
function jagged(seed: number, depth: number, steps = 34): string[] {
  let x = seed;
  const rnd = () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const px = (i / steps) * 100;
    const off = Math.round(rnd() * depth);
    pts.push(`${px.toFixed(1)}% calc(100% - ${off}px)`);
  }
  return pts;
}
function jaggedTop(seed: number, depth: number, steps = 34): string[] {
  let x = seed;
  const rnd = () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
  const pts: string[] = [];
  for (let i = steps; i >= 0; i--) {
    const px = (i / steps) * 100;
    pts.push(`${px.toFixed(1)}% ${Math.round(rnd() * depth)}px`);
  }
  return pts;
}

export function tornPath(opts: { top?: boolean; bottom?: boolean; seed?: number; depth?: number }): string {
  const { top = false, bottom = true, seed = 7, depth = 26 } = opts;
  const topPts = top ? jaggedTop(seed + 11, depth) : ["0% 0%", "100% 0%"];
  const bottomPts = bottom ? jagged(seed, depth) : ["100% 100%", "0% 100%"];
  // Build clockwise: top edge left->right, then bottom edge right->left.
  const topLR = top ? [...topPts].reverse() : topPts;
  const bottomRL = bottom ? [...bottomPts].reverse() : bottomPts;
  return `polygon(${[...topLR, ...bottomRL].join(", ")})`;
}

/** A section with a torn-paper edge and a soft shadow beneath it. */
export function Torn({ children, className = "", top, bottom = true, seed = 7, id, style }: {
  children: ReactNode; className?: string; top?: boolean; bottom?: boolean; seed?: number; id?: string; style?: CSSProperties;
}) {
  return (
    <div className={`torn-wrap${top ? " has-top" : ""}`}>
      <section id={id} className={`torn ${className}`} style={{ clipPath: tornPath({ top, bottom, seed }), ...style }}>
        {children}
      </section>
    </div>
  );
}

/** Ornamental swirl under section headings. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg className={`flourish ${className}`} viewBox="0 0 140 22" width="140" height="22" aria-hidden>
      <path d="M4 11c14-12 26 12 40 0s26-12 26 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M136 11c-14-12-26 12-40 0s-26-12-26 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="70" cy="11" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function Dots({ className = "" }: { className?: string }) {
  return <span className={`dots ${className}`} aria-hidden />;
}

export function Heading({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`w-heading${light ? " light" : ""}`}>
      <h2 className="w-h2">{children}</h2>
      <Flourish />
    </div>
  );
}
