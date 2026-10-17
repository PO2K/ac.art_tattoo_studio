"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INSTAGRAM_URL, LANGS, langPath, type Lang } from "@/lib/site";
import { pagePath, type Page } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

const LANG_LABEL: Record<Lang, string> = { en: "EN", th: "ไทย" };

export default function Header({ lang, page, t }: { lang: Lang; page: Page; t: Dictionary }) {
  const home = langPath(lang);
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
          <a className="link" href={`${home}#artists`}>{t.nav.artists}</a>
          <a className="link" href={`${home}#work`}>{t.nav.work}</a>
          <Link className="link" href={pagePath(lang, "gallery")} aria-current={page === "gallery" ? "page" : undefined}>{t.nav.gallery}</Link>
          <a className="link" href={`${home}#visit`}>{t.nav.visit}</a>
          <div className="lang-switch" role="group" aria-label={t.nav.language}>
            {LANGS.map((l) => (
              <Link key={l} href={pagePath(l, page)} lang={l} hrefLang={l} aria-current={l === lang ? "page" : undefined}>
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
