// Site-wide constants. Both values are fixed at build time from the
// environment so the same code deploys to the production domain (root) and
// to GitHub Pages (under a base path). See .env.example.
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://acarttattoo.com").replace(/\/$/, "");
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

/** Public asset path with the GitHub Pages base path. next/image's unoptimized
 *  loader does not add basePath itself, so image sources go through this. */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
