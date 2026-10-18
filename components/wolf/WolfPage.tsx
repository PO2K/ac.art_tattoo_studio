import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import { Dots, Heading, Torn } from "./bits";
import { gallery } from "@/lib/gallery";
import type { Dictionary } from "@/lib/i18n";
import { INSTAGRAM_URL, LANGS, MAPS_URL, asset, type Lang } from "@/lib/site";
import { pagePath } from "@/lib/routes";

const LANG_LABEL: Record<Lang, string> = { en: "EN", th: "ไทย" };
const HERO_BG = "/images/gallery/DaVL_Z9k5QJ-2.jpg";      // artist at work, dark room
const ABOUT_1 = "/images/pe-back-piece.jpg";
const ABOUT_2 = "/images/gallery/DdMILXeHTzr-2.jpg";      // tattooing close-up
const FEATURED = "/images/gallery/DZ-CJvwHVdE-2.jpg";     // studio interior

/** Alternative layout after the "Yellow Wolf" reference: warm yellow accent, torn-paper edges, flourishes. */
export default function WolfPage({ lang, t }: { lang: Lang; t: Dictionary }) {
  const w = t.wolf;
  const styleImages = [t.work.list[2], t.work.list[0], t.work.list[3], t.work.list[1], { image: t.artists.list[2].image, alt: t.artists.list[2].alt }, t.work.list[4]];
  const grid = gallery.slice(0, 10);

  return (
    <div className="theme-wolf">
      {/* Header floats over the hero photo */}
      <header className="w-header">
        <div className="w-container w-bar">
          <Link href={pagePath(lang, "v2")} className="w-brand">
            <span className="w-brand-name">AC Art</span>
            <span className="w-brand-sub">{t.brand.sub}</span>
          </Link>
          <nav className="w-nav" aria-label="Main">
            <a href="#top" aria-current="page">{w.nav.home}</a>
            <a href="#about">{w.nav.about}</a>
            <a href="#styles">{w.nav.styles}</a>
            <a href="#artists">{w.nav.artists}</a>
            <Link href={pagePath(lang, "gallery")}>{w.nav.gallery}</Link>
            <a href="#contact">{w.nav.contact}</a>
            <span className="w-lang">
              {LANGS.map((l) => (
                <Link key={l} href={pagePath(l, "v2")} lang={l} hrefLang={l} aria-current={l === lang ? "page" : undefined}>{LANG_LABEL[l]}</Link>
              ))}
            </span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <Torn id="top" className="w-hero" seed={3}>
        <Image src={asset(HERO_BG)} alt="" fill priority sizes="100vw" className="w-hero-bg" />
        <div className="w-hero-shade" />
        <Dots className="d1" /><Dots className="d2" />
        <div className="w-container w-hero-inner">
          <div className="w-hero-copy">
            <h1 className="w-h1 hero-item" style={{ ["--d" as string]: "100ms" }}>
              {w.hero.pre} <span className="hl">{w.hero.highlight}</span>
            </h1>
            <p className="w-lead hero-item" style={{ ["--d" as string]: "240ms" }}>{t.hero.lead}</p>
            <div className="w-actions hero-item" style={{ ["--d" as string]: "380ms" }}>
              <a className="w-btn solid" href={INSTAGRAM_URL} target="_blank" rel="noopener">{w.hero.book}</a>
              <Link className="w-btn outline" href={pagePath(lang, "gallery")}>{w.hero.gallery}</Link>
            </div>
          </div>
          <ol className="w-pager" aria-hidden><li className="on"><span>1</span></li><li><span>2</span></li><li><span>3</span></li></ol>
        </div>
      </Torn>

      {/* About */}
      <section id="about" className="w-section w-about">
        <Dots className="d3" />
        <div className="w-container">
          <Heading>{w.about.title}</Heading>
          <div className="w-about-grid">
            <Reveal className="w-collage">
              <div className="w-photo big"><Image src={asset(ABOUT_1)} alt={t.artists.list[0].alt} fill sizes="(max-width: 860px) 100vw, 40vw" /></div>
              <div className="w-photo small"><Image src={asset(ABOUT_2)} alt="" fill sizes="30vw" /></div>
            </Reveal>
            <Reveal className="w-about-copy" delay={120}>
              <h3 className="w-h3 bar">{w.about.heading}</h3>
              <p>{w.about.text1}</p>
              <p>{w.about.text2}</p>
              <p className="w-sign">— {w.about.sign}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Styles (yellow band) */}
      <Torn id="styles" className="w-styles" top seed={5}>
        <Dots className="d4" /><Dots className="d5" />
        <div className="w-container">
          <Heading>{w.styles.title}</Heading>
          <ul className="w-styles-row">
            {w.styles.items.map((label, i) => (
              <Reveal key={label} as="li" delay={i * 80}>
                <div className="w-thumb"><Image src={asset(styleImages[i].image)} alt={styleImages[i].alt} fill sizes="160px" /></div>
                <span>{label}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="w-featured">
            <div className="w-photo framed"><Image src={asset(FEATURED)} alt="" fill sizes="(max-width: 860px) 100vw, 640px" /></div>
            <h3 className="w-h3 center">{w.styles.featuredTitle}</h3>
            <p>{w.styles.featuredText}</p>
            <Link className="w-link" href={pagePath(lang, "gallery")}>{w.styles.more}</Link>
          </Reveal>
        </div>
      </Torn>

      {/* Artists */}
      <section id="artists" className="w-section w-artists">
        <div className="w-container">
          <Heading>{w.artists.title}</Heading>
          <div className="w-artist-list">
            {t.artists.list.map((a, i) => (
              <Reveal key={a.name} as="article" className="w-artist" delay={i * 100}>
                <div className="w-photo"><Image src={asset(a.image)} alt={a.alt} fill sizes="(max-width: 860px) 100vw, 40vw" /></div>
                <div className="w-artist-panel">
                  <h3 className="w-h3">{a.name}</h3>
                  <p className="w-role">{w.artists.role} · {a.tags[0]}</p>
                  <p>{a.desc}</p>
                  <ul className="w-tags">{a.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (dark) */}
      <Torn className="w-gallery" top bottom={false} seed={9}>
        <div className="w-container">
          <Heading light>{w.gallery.title}</Heading>
          <div className="w-grid">
            {grid.map((g, i) => (
              <Reveal key={g.src} as="a" className="w-cell" delay={(i % 5) * 70} style={{ display: "block" }}>
                <Image src={asset(g.src)} alt={g.alt[lang]} fill sizes="(max-width: 700px) 50vw, 20vw" />
              </Reveal>
            ))}
          </div>
          <div className="w-center"><Link className="w-btn solid" href={pagePath(lang, "gallery")}>{w.gallery.more}</Link></div>
        </div>
      </Torn>

      {/* Contact */}
      <section id="contact" className="w-section w-contact">
        <Dots className="d6" />
        <div className="w-container">
          <Heading>{w.contact.title}</Heading>
          <div className="w-contact-grid">
            <Reveal as="dl">
              <dt>{t.visit.address}</dt><dd>{t.visit.addressVal}</dd>
              <dt>{t.visit.hours}</dt><dd>{t.visit.hoursVal}</dd>
              <dt>{t.visit.contact}</dt><dd>{t.visit.contactVal}</dd>
              <dt>{t.visit.payment}</dt><dd>{t.visit.paymentVal}</dd>
            </Reveal>
            <Reveal className="w-contact-side" delay={120}>
              <div className="w-info"><h4>{t.visit.howTitle}</h4><p>{t.visit.howBody}</p></div>
              <div className="w-info"><h4>{t.visit.careTitle}</h4><p>{t.visit.careBody}</p></div>
              <div className="w-actions">
                <a className="w-btn solid" href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.visit.ig}</a>
                <a className="w-btn outline dark" href={MAPS_URL} target="_blank" rel="noopener">{t.visit.maps}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="w-footer">
        <div className="w-container w-bar">
          <span>{t.footer.text}</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">@ac.art_tattoostudio</a>
        </div>
      </footer>
    </div>
  );
}
