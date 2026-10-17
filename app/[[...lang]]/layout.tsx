import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Sans_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import { DEFAULT_LANG, LANGS, absoluteUrl, langPath, type Lang } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

// Fonts are downloaded at build time and self-hosted: no runtime request to Google.
const serif = Bodoni_Moda({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-serif", display: "swap" });
const sans = IBM_Plex_Sans_Thai({ subsets: ["thai", "latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });

type Params = { lang?: string[] };

/** "/" is English, "/th/" is Thai; anything else is a 404. */
function resolveLang(segments?: string[]): Lang | null {
  if (!segments || segments.length === 0) return DEFAULT_LANG;
  if (segments.length === 1 && (LANGS as readonly string[]).includes(segments[0]) && segments[0] !== DEFAULT_LANG) {
    return segments[0] as Lang;
  }
  return null;
}

export function generateStaticParams(): Params[] {
  return [{ lang: [] }, ...LANGS.filter((l) => l !== DEFAULT_LANG).map((l) => ({ lang: [l] }))];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const lang = resolveLang((await params).lang);
  if (!lang) return {};
  const t = getDictionary(lang);
  const languages = Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(langPath(l))]));
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: absoluteUrl(langPath(lang)),
      languages: { ...languages, "x-default": absoluteUrl(langPath(DEFAULT_LANG)) },
    },
    openGraph: {
      type: "website",
      locale: lang === "th" ? "th_TH" : "en_US",
      url: absoluteUrl(langPath(lang)),
      siteName: "AC Art Tattoo Studio",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: absoluteUrl("/images/pe-back-piece.jpg"), alt: t.artists.list[0].alt }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<Params> }) {
  const lang = resolveLang((await params).lang);
  if (!lang) notFound();
  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
