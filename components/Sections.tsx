import Image from "next/image";
import Reveal from "./Reveal";
import Link from "next/link";
import { INSTAGRAM_URL, MAPS_URL, asset, type Lang } from "@/lib/site";
import { pagePath } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

export function Artists({ t }: { t: Dictionary }) {
  return (
    <section id="artists" aria-labelledby="artists-h" className="section">
      <div className="container section-inner">
        <Reveal className="section-head">
          <h2 id="artists-h" className="serif">{t.artists.title}</h2>
          <p>{t.artists.sub}</p>
        </Reveal>
        <div className="artist-grid">
          {t.artists.list.map((a, i) => (
            <Reveal key={a.name} as="article" className="card glass" delay={i * 120}>
              <div className="media r43">
                <Image src={asset(a.image)} alt={a.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
              </div>
              <div className="card-body">
                <h3 className="serif">{a.name}</h3>
                <p className="handle">{a.handle}</p>
                <p className="desc">{a.desc}</p>
                <ul className="tags">
                  {a.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work({ t, lang }: { t: Dictionary; lang: Lang }) {
  return (
    <section id="work" aria-labelledby="work-h" className="section">
      <div className="container section-inner">
        <Reveal className="section-head">
          <h2 id="work-h" className="serif">{t.work.title}</h2>
          <div className="section-links">
            <Link href={pagePath(lang, "gallery")}>{t.work.gallery}</Link>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.work.more}</a>
          </div>
        </Reveal>
        <div className="work-grid">
          {t.work.list.map((w, i) => (
            <Reveal key={w.image} as="figure" delay={(i % 3) * 120}>
              <div className="media r45">
                <Image src={asset(w.image)} alt={w.alt} fill loading="lazy" sizes="(max-width: 700px) 100vw, 33vw" />
              </div>
              <figcaption>
                <span>{w.title}</span>
                <span>{w.artist}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Visit({ t }: { t: Dictionary }) {
  const v = t.visit;
  return (
    <section id="visit" aria-labelledby="visit-h" className="visit glass">
      <div className="container visit-inner">
        <Reveal className="visit-col">
          <h2 id="visit-h" className="serif">{v.title}</h2>
          <dl>
            <dt>{v.address}</dt><dd>{v.addressVal}</dd>
            <dt>{v.hours}</dt><dd>{v.hoursVal}</dd>
            <dt>{v.contact}</dt><dd>{v.contactVal}</dd>
            <dt>{v.payment}</dt><dd>{v.paymentVal}</dd>
          </dl>
          <div className="actions">
            <a className="btn-primary lg" href={INSTAGRAM_URL} target="_blank" rel="noopener">{v.ig}</a>
            <a className="btn-ghost" href={MAPS_URL} target="_blank" rel="noopener">{v.maps}</a>
            <a className="btn-ghost" href="#">{v.facebook}</a>
          </div>
        </Reveal>
        <Reveal className="visit-col right" delay={150}>
          <div role="img" aria-label="Map placeholder" className="map-placeholder">{v.map}</div>
          <div className="info-grid">
            <div className="info"><h3>{v.howTitle}</h3><p>{v.howBody}</p></div>
            <div className="info"><h3>{v.careTitle}</h3><p>{v.careBody}</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="site-footer glass">
      <div className="container bar">
        <span>{t.footer.text}</span>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener">@ac.art_tattoostudio</a>
      </div>
    </footer>
  );
}
