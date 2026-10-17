import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { INSTAGRAM_URL, MAPS_URL, asset, type Lang } from "@/lib/site";
import { pagePath } from "@/lib/routes";
import type { Dictionary } from "@/lib/i18n";

export function Artists({ t }: { t: Dictionary }) {
  return (
    <section id="artists" aria-labelledby="artists-h" className="band light">
      <div className="watermark display" aria-hidden>Artists</div>
      <div className="container section">
        <Reveal className="section-head">
          <p className="label eyebrow">{t.artists.sub}</p>
          <h2 id="artists-h" className="display h-giant">{t.artists.title}</h2>
        </Reveal>
        <div className="artists-grid">
          {t.artists.list.map((a, i) => (
            <Reveal key={a.name} as="article" className="artist" delay={i * 120}>
              <div className="media">
                <Image src={asset(a.image)} alt={a.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
              </div>
              <h3 className="display">{a.name}</h3>
              <p className="handle small">{a.handle}</p>
              <p className="desc">{a.desc}</p>
              <ul className="tags">{a.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work({ t, lang }: { t: Dictionary; lang: Lang }) {
  const top = t.work.list.slice(0, 3);
  const bottom = t.work.list.slice(3, 6);
  const Tile = ({ w, i }: { w: (typeof top)[number]; i: number }) => (
    <Reveal as="figure" className={`tile${i === 1 ? " offset" : ""}`} delay={i * 120} style={{ margin: 0 }}>
      <Image src={asset(w.image)} alt={w.alt} fill sizes="(max-width: 700px) 50vw, 33vw" />
      <figcaption><span>{w.title}</span><span>{w.artist}</span></figcaption>
    </Reveal>
  );
  return (
    <section id="work" aria-labelledby="work-h" className="band grey">
      <div className="watermark display" aria-hidden>Work</div>
      <div className="container section">
        <div className="strip">{top.map((w, i) => <Tile key={w.image} w={w} i={i} />)}</div>
        <div className="work-foot">
          <Reveal>
            <h2 id="work-h" className="display h-giant">{t.work.title}</h2>
          </Reveal>
          <Reveal className="aside" delay={120}>
            <p className="small">{t.gallery.sub}</p>
            <div className="actions">
              <Link className="btn black" href={pagePath(lang, "gallery")}>{t.work.gallery}</Link>
              <a className="btn outline-dark" href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.work.more}</a>
            </div>
          </Reveal>
        </div>
        <div className="strip" style={{ marginTop: 72 }}>{bottom.map((w, i) => <Tile key={w.image} w={w} i={i} />)}</div>
      </div>
    </section>
  );
}

export function Visit({ t }: { t: Dictionary }) {
  const v = t.visit;
  const img1 = t.work.list[5];
  const img2 = t.work.list[0];
  return (
    <section id="visit" aria-labelledby="visit-h" className="band light visit">
      <div className="watermark display" aria-hidden>Visit</div>
      <div className="container section">
        <div className="visit-grid">
          <Reveal className="visit-col">
            <div className="frame"><Image src={asset(img1.image)} alt={img1.alt} fill sizes="(max-width: 900px) 100vw, 30vw" /></div>
            <p className="small">{t.hero.lead}</p>
            <div className="actions">
              <a className="btn black" href={INSTAGRAM_URL} target="_blank" rel="noopener">{v.ig}</a>
              <a className="btn outline-dark" href={MAPS_URL} target="_blank" rel="noopener">{v.maps}</a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="visit-h" className="display visit-rotated">{v.title}</h2>
          </Reveal>
          <Reveal className="visit-col" delay={200}>
            <dl className="small">
              <dt>{v.address}</dt><dd>{v.addressVal}</dd>
              <dt>{v.hours}</dt><dd>{v.hoursVal}</dd>
              <dt>{v.contact}</dt><dd>{v.contactVal}</dd>
              <dt>{v.payment}</dt><dd>{v.paymentVal}</dd>
            </dl>
            <div className="frame"><Image src={asset(img2.image)} alt={img2.alt} fill sizes="(max-width: 900px) 100vw, 30vw" /></div>
            <div className="info"><h3>{v.howTitle}</h3><p className="small">{v.howBody}</p></div>
            <div className="info"><h3>{v.careTitle}</h3><p className="small">{v.careBody}</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ t }: { t: Dictionary }) {
  return (
    <section className="band dark cta-band" aria-label={t.cta.text}>
      <Reveal className="cta-bar">
        <p className="label">{t.cta.text}</p>
        <a className="btn cream" href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.cta.button}</a>
      </Reveal>
      <div className="container inner">
        <div className="cta-photo"><Image src={asset("/images/studio-bg.jpg")} alt="" fill sizes="520px" /></div>
        <p className="display cta-big">{t.cta.big}</p>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container bar small">
        <span>{t.footer.text}</span>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener">@ac.art_tattoostudio</a>
      </div>
    </footer>
  );
}
