import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GalleryPage from "@/components/GalleryPage";
import { Artists, Footer, Visit, Work } from "@/components/Sections";
import { getDictionary } from "@/lib/i18n";
import { allRoutes, pagePath, resolveRoute, routeSegments } from "@/lib/routes";
import { INSTAGRAM_URL, MAPS_URL, absoluteUrl } from "@/lib/site";

type Params = { lang?: string[] };

export function generateStaticParams(): Params[] {
  return allRoutes().map((r) => ({ lang: routeSegments(r) }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const route = resolveRoute((await params).lang);
  if (!route) notFound();
  const { lang, page } = route;
  const t = getDictionary(lang);

  if (page === "gallery") return <GalleryPage lang={lang} t={t} />;

  // Structured data so search engines can show the studio as a local business.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: "AC Art Tattoo Studio",
    description: t.meta.description,
    url: absoluteUrl(pagePath(lang, "home")),
    image: absoluteUrl("/images/pe-back-piece.jpg"),
    sameAs: [INSTAGRAM_URL],
    hasMap: MAPS_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tiwanon 45",
      addressLocality: "Pak Kret",
      addressRegion: "Nonthaburi",
      addressCountry: "TH",
    },
    paymentAccepted: "Credit Card",
    priceRange: "$$",
  };

  return (
    <div className="page-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header lang={lang} page="home" t={t} />
      <main>
        <Hero t={t} />
        <Artists t={t} />
        <Work t={t} lang={lang} />
        <Visit t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
