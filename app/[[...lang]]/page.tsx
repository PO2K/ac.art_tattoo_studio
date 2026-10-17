import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Artists, Footer, Visit, Work } from "@/components/Sections";
import { getDictionary } from "@/lib/i18n";
import { DEFAULT_LANG, INSTAGRAM_URL, LANGS, MAPS_URL, absoluteUrl, langPath, type Lang } from "@/lib/site";

type Params = { lang?: string[] };

function resolveLang(segments?: string[]): Lang | null {
  if (!segments || segments.length === 0) return DEFAULT_LANG;
  if (segments.length === 1 && (LANGS as readonly string[]).includes(segments[0]) && segments[0] !== DEFAULT_LANG) {
    return segments[0] as Lang;
  }
  return null;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const lang = resolveLang((await params).lang);
  if (!lang) notFound();
  const t = getDictionary(lang);

  // Structured data so search engines can show the studio as a local business.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: "AC Art Tattoo Studio",
    description: t.meta.description,
    url: absoluteUrl(langPath(lang)),
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
      <Header lang={lang} t={t} />
      <main>
        <Hero t={t} />
        <Artists t={t} />
        <Work t={t} />
        <Visit t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
