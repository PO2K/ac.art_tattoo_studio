import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { INSTAGRAM_URL, asset } from "@/lib/site";

/** Dark hero: small flanking notes, two framed photos, giant headline overlapping them. */
export default function Hero({ t }: { t: Dictionary }) {
  const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });
  return (
    <section id="top" className="band dark">
      <div className="watermark display" aria-hidden>Tattoo</div>
      <div className="container hero">
        <div className="hero-top">
          <p className="small hero-item" style={d(80)}>{t.hero.eyebrow}</p>
          <p className="center label hero-item" style={d(160)}>{t.hero.center}</p>
          <p className="small right hero-item" style={d(240)}>{t.hero.aside}</p>
        </div>
        <div className="hero-media">
          <div className="frame teal hero-item" style={d(300)}>
            <Image src={asset(t.artists.list[0].image)} alt={t.artists.list[0].alt} fill priority sizes="(max-width: 700px) 100vw, 490px" />
          </div>
          <div className="frame hero-item" style={d(380)}>
            <Image src={asset(t.artists.list[1].image)} alt={t.artists.list[1].alt} fill priority sizes="(max-width: 700px) 100vw, 490px" />
          </div>
        </div>
        <h1 className="display hero-headline hero-item" style={d(520)}>{t.hero.headline}</h1>
        <div className="hero-cta hero-item" style={d(680)}>
          <a className="btn cream" href={INSTAGRAM_URL} target="_blank" rel="noopener">{t.nav.book}</a>
        </div>
      </div>
    </section>
  );
}
