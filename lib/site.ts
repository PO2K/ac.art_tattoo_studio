// Site-wide constants. SITE_URL includes the GitHub Pages base path so every
// absolute URL used for SEO (canonical, hreflang, Open Graph, sitemap) is right.
export const SITE_URL = "https://po2k.github.io/ac.art_tattoo_studio";
export const INSTAGRAM_URL = "https://www.instagram.com/ac.art_tattoostudio/";
export const MAPS_URL = "https://maps.app.goo.gl/7TdBCyYBPwsNCXHe7";

export const LANGS = ["en", "th"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

/** Public path of a locale's page: English is the site root, Thai lives at /th/. */
export function langPath(lang: Lang): string {
  return lang === DEFAULT_LANG ? "/" : `/${lang}/`;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
