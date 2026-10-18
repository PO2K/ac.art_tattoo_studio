import Header from "./Header";
import { CtaBand, Footer } from "./Sections";
import Gallery from "./Gallery";
import { gallery } from "@/lib/gallery";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@/lib/site";

export default function GalleryPage({ lang, t }: { lang: Lang; t: Dictionary }) {
  return (
    <>
      <Header lang={lang} page="gallery" t={t} />
      <main className="band light">
        <div className="watermark display" aria-hidden>Gallery</div>
        <section className="container gallery-head">
          <p className="label hero-item" style={{ ["--d" as string]: "80ms" }}>{t.gallery.sub}</p>
          <h1 className="display h-giant hero-item" style={{ ["--d" as string]: "180ms" }}>{t.gallery.title}</h1>
        </section>
        <section className="container gallery-body">
          <Gallery items={gallery} lang={lang} t={t} />
        </section>
      </main>
      <CtaBand t={t} />
      <Footer t={t} lang={lang} />
    </>
  );
}
