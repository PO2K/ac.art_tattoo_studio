"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INSTAGRAM_URL, LANGS, langPath, type Lang } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

const LANG_LABEL: Record<Lang, string> = { en: "EN", th: "ไทย" };

export default function Header({ lang, t }: { lang: Lang; t: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);

  // Tighten and darken the bar once the visitor scrolls past the top.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header glass${scrolled ? " scrolled" : ""}`}>
      <div className="container bar">
        <Link href={langPath(lang)} className="brand">
          <span className="brand-name">AC ART</span>
          <span className="brand-sub">{t.brand.sub}</span>
        </Link>
        <nav aria-label="Main" className="nav">
          <a className="link" href="#artists">{t.nav.artists}</a>
          <a className="link" href="#work">{t.nav.work}</a>
          <a className="link" href="#visit">{t.nav.visit}</a>
          <div className="lang-switch" role="group" aria-label={t.nav.language}>
            {LANGS.map((l) => (
              <Link key={l} href={langPath(l)} lang={l} hrefLang={l} aria-current={l === lang ? "page" : undefined}>
                {LANG_LABEL[l]}
              </Link>
            ))}
          </div>
          <a className="btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.nav.book}</a>
        </nav>
      </div>
    </header>
  );
}
