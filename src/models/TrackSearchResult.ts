import { Image } from './Image';

export interface TrackSearchItem {
  name: string;
  mbid?: string;
  url: string;
  listeners: number;
  artist: string;
  image: Image[];
}

export interface TrackSearchResult {
  totalResults: number;
  tracks: TrackSearchItem[];
  page: number;
}
