import { Image } from "./Image";

export interface AlbumSearchItem {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  mbid: string;
}

export interface AlbumSearchResult {
  totalResults: number;
  albums: AlbumSearchItem[];
  page: number;
}
