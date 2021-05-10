import { Image } from './Image';

export interface Album {
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
}

export interface ArtistTopAlbums {
  albums: Album[];
}
