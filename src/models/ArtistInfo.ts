import { Image } from './Image';

export interface ArtistInfo {
  name: string;
  playcount: number;
  listeners: number;
  mbid: string;
  url: string;
  streamable: 0 | 1;
  image: Image[];
  ontour: 0 | 1;
  stats: {
    listeners: number;
    playcount: number;
  };
  similar: {
    name: string;
    url: string;
    image: Image[];
  }[];
  bio: {
    links: {
      link: {
        text: string;
        rel: string;
        href: string;
      }
    };
    published: string;
    summary: string;
    content: string;
  }
}
