import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import { DEFAULT_LANG, LANGS, absoluteUrl } from "@/lib/site";
import { allRoutes, pagePath, resolveRoute, routeSegments } from "@/lib/routes";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

// Fonts are downloaded at build time and self-hosted: no runtime request to Google.
const serif = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-serif", display: "swap" });
const sans = IBM_Plex_Sans_Thai({ subsets: ["thai", "latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });

type Params = { lang?: string[] };

export function generateStaticParams(): Params[] {
  return allRoutes().map((r) => ({ lang: routeSegments(r) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const route = resolveRoute((await params).lang);
  if (!route) return {};
  const { lang, page } = route;
  const t = getDictionary(lang);
  const title = page === "gallery" ? t.gallery.metaTitle : t.meta.title;
  const description = page === "gallery" ? t.gallery.metaDescription : t.meta.description;
  const languages = Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(pagePath(l, page))]));
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(pagePath(lang, page)),
      languages: { ...languages, "x-default": absoluteUrl(pagePath(DEFAULT_LANG, page)) },
    },
    openGraph: {
      type: "website",
      locale: lang === "th" ? "th_TH" : "en_US",
      url: absoluteUrl(pagePath(lang, page)),
      siteName: "AC Art Tattoo Studio",
      title,
      description,
      images: [{ url: absoluteUrl("/images/pe-back-piece.jpg"), alt: t.artists.list[0].alt }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<Params> }) {
  const route = resolveRoute((await params).lang);
  if (!route) notFound();
  return (
    <html lang={route.lang} className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
