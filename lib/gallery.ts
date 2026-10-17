import data from "./gallery.json";

export type Artist = "Pe" | "Earth" | "Boom" | "Studio";

export type GalleryItem = {
  /** Path under public/, e.g. "/images/gallery/DeRnnXLkzBP-1.jpg". */
  src: string;
  width: number;
  height: number;
  artist: Artist;
  alt: { en: string; th: string };
  /** Instagram post path, used as the click-through link. */
  post: string;
};

export const gallery = data as GalleryItem[];
