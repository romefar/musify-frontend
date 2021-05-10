import { Image } from './Image';

export interface ArtistTopTrack {
  name: string;
  mbid?: string;
  url: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  }
  image: Image[];
  playcount: number;
  listeners: number;
  streamable: 0 | 1;
}
