"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INSTAGRAM_URL, LANGS, langPath, type Lang } from "@/lib/site";
import { pagePath, type Page } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

const LANG_LABEL: Record<Lang, string> = { en: "EN", th: "ไทย" };

/** Three-column bar: section links, centred brand mark, language + booking. */
export default function Header({ lang, page, t }: { lang: Lang; page: Page; t: Dictionary }) {
  const home = langPath(lang);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 24); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="bar label">
        <nav aria-label="Main" className="nav">
          {/* Section anchors go through Link so the base path is applied on GitHub Pages. */}
          <Link className="link" href={`${home}#artists`}>{t.nav.artists}</Link>
          <Link className="link" href={`${home}#work`}>{t.nav.work}</Link>
          <Link className="link" href={pagePath(lang, "gallery")} aria-current={page === "gallery" ? "page" : undefined}>{t.nav.gallery}</Link>
          <Link className="link" href={`${home}#visit`}>{t.nav.visit}</Link>
        </nav>
        <Link href={home} className="brand">
          <span className="mark">AC ART</span>
          <span className="sub">{t.brand.sub}</span>
        </Link>
        <nav className="nav right" aria-label={t.nav.language}>
          <div className="lang-switch" role="group" aria-label={t.nav.language}>
            {LANGS.map((l) => (
              <Link key={l} href={pagePath(l, page)} lang={l} hrefLang={l} aria-current={l === lang ? "page" : undefined}>{LANG_LABEL[l]}</Link>
            ))}
          </div>
          <a className="btn cream" href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.nav.book}</a>
        </nav>
      </div>
      <div className="rule" />
    </header>
  );
}
