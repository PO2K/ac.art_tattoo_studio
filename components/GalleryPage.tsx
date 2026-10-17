import Header from "./Header";
import { Footer } from "./Sections";
import Gallery from "./Gallery";
import { gallery } from "@/lib/gallery";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@/lib/site";

export default function GalleryPage({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <div className="page-bg">
      <Header lang={lang} page="gallery" t={t} />
      <main>
        <section className="container gallery-head">
          <p className="eyebrow hero-item" style={{ ["--d" as string]: "80ms" }}>{t.gallery.sub}</p>
          <h1 className="serif hero-item" style={{ ["--d" as string]: "180ms" }}>{t.gallery.title}</h1>
        </section>
        <section className="container gallery-body">
          <Gallery items={gallery} lang={lang} t={t} />
        </section>
      </main>
      <Footer t={t} />
    </div>
  );
}
