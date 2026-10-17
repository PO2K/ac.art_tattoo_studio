import type { MetadataRoute } from "next";
import { LANGS, absoluteUrl } from "@/lib/site";
import { allRoutes, pagePath } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map(({ lang, page }) => ({
    url: absoluteUrl(pagePath(lang, page)),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "home" ? (lang === "en" ? 1 : 0.9) : 0.8,
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(pagePath(l, page))])) },
  }));
}
