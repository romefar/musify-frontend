import { Image } from "./Image";

interface Album {
  name: string;
  artist: string;
  mbid?: string;
  url: string;
  image: Image[];
  duration: number;
  listeners: number;
  playcount: number;
  tracks: {
    name: string;
    url: string;
    duration: number;
  }[];
  wiki?: {
    published: string;
    summary: string;
    content: string;
  }
}

export interface AlbumInfo {
  album: Album;
}
