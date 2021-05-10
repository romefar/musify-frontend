import { ArtistShortInfo } from "./ArtistShortInfo";
import { Image } from './Image';

export interface Track {
  name: string;
  duration: number;
  playcount: number;
  listeners: number;
  mbid: string;
  url: string;
  artist: ArtistShortInfo;
  image: Image[];
}

export interface TopTrack {
  page: number;
  tracks: Track[];
}