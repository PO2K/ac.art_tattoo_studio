import { DEFAULT_LANG, LANGS, type Lang, langPath } from "./site";

export type Page = "home" | "gallery";
export type Route = { lang: Lang; page: Page };

/**
 * Maps the optional catch-all segments to a route:
 *   []              -> English home        ["gallery"]        -> English gallery
 *   ["th"]          -> Thai home           ["th", "gallery"]  -> Thai gallery
 * Anything else is a 404.
 */
export function resolveRoute(segments?: string[]): Route | null {
  const s = segments ?? [];
  let lang: Lang = DEFAULT_LANG;
  let rest = s;
  if (s.length > 0 && (LANGS as readonly string[]).includes(s[0]) && s[0] !== DEFAULT_LANG) {
    lang = s[0] as Lang;
    rest = s.slice(1);
  }
  if (rest.length === 0) return { lang, page: "home" };
  if (rest.length === 1 && rest[0] === "gallery") return { lang, page: "gallery" };
  return null;
}

/** Public path for a page in a language, e.g. "/th/gallery/". */
export function pagePath(lang: Lang, page: Page): string {
  const base = langPath(lang);
  return page === "home" ? base : `${base}gallery/`;
}

export function allRoutes(): Route[] {
  const pages: Page[] = ["home", "gallery"];
  return LANGS.flatMap((lang) => pages.map((page) => ({ lang, page })));
}

export function routeSegments({ lang, page }: Route): string[] {
  const segs: string[] = [];
  if (lang !== DEFAULT_LANG) segs.push(lang);
  if (page !== "home") segs.push(page);
  return segs;
}
