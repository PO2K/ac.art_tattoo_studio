import type { MetadataRoute } from "next";
import { DEFAULT_LANG, LANGS, absoluteUrl, langPath } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LANGS.map((l) => [l, absoluteUrl(langPath(l))]));
  return LANGS.map((l) => ({
    url: absoluteUrl(langPath(l)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === DEFAULT_LANG ? 1 : 0.9,
    alternates: { languages },
  }));
}
