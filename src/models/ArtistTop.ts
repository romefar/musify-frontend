import { Image } from "./Image";

export interface ArtistTopInfo {
  name: string;
  mbid?: string;
  url: string;
  streamable: 0 | 1;
  image: Image[];
  listeners: number;
}


export interface ArtistTop {
  artists: ArtistTopInfo[];
  page: number;
}
