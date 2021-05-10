import { ArtistTopInfo } from "./ArtistTop";

export interface ArtistSearchResult {
  totalResults: number;
  artists: ArtistTopInfo[];
  page: number;
}
