"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Artist, GalleryItem } from "@/lib/gallery";
import type { Dictionary } from "@/lib/i18n";
import { asset, type Lang } from "@/lib/site";

const ARTISTS: Artist[] = ["Pe", "Earth", "Boom"];
const PAGE = 40;

/** Filterable masonry grid of Instagram pieces. Each tile links to its post. */
export default function Gallery({ items, lang, t }: { items: GalleryItem[]; lang: Lang; t: Dictionary }) {
  const [filter, setFilter] = useState<Artist | "all">("all");
  const [limit, setLimit] = useState(PAGE);
  const filtered = useMemo(() => (filter === "all" ? items : items.filter((i) => i.artist === filter)), [items, filter]);
  const shown = filtered.slice(0, limit);
  const present = ARTISTS.filter((a) => items.some((i) => i.artist === a));
  useEffect(() => { setLimit(PAGE); }, [filter]);

  return (
    <>
      <div className="filter" role="group" aria-label={t.nav.artists}>
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>{t.gallery.all}</button>
        {present.map((a) => (
          <button key={a} type="button" aria-pressed={filter === a} onClick={() => setFilter(a)}>{t.gallery.artists[a]}</button>
        ))}
        <span className="filter-count">{filtered.length} {t.gallery.count}</span>
      </div>
      <div className="masonry">
        {shown.map((item, i) => (
          <a
            key={item.src}
            className="gtile"
            href={`https://www.instagram.com${item.post}`}
            target="_blank"
            rel="noopener"
            title={t.gallery.open}
            style={{ ["--d" as string]: `${(i % 4) * 60}ms` }}
          >
            <Image src={asset(item.src)} alt={item.alt[lang]} width={item.width} height={item.height} sizes="(max-width: 700px) 50vw, 25vw" loading={i < 8 ? "eager" : "lazy"} />
            <span className="tile-artist">{t.gallery.artists[item.artist]}</span>
          </a>
        ))}
      </div>
      {shown.length < filtered.length && (
        <div className="more">
          <button type="button" className="btn outline-dark" onClick={() => setLimit((n) => n + PAGE)}>{t.gallery.more}</button>
        </div>
      )}
    </>
  );
}
