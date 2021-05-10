import { Image } from './Image';

export interface AlbumShortInfo {
  artist: string;
  title: string;
  mbid?: string;
  url: string;
  image: Image[];
}
