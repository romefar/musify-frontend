import { AlbumShortInfo } from "./AlbumShortInfo";
import { ArtistShortInfo } from "./ArtistShortInfo";

export interface TrackInfo {
  name: string;
  mbid?: string;
  url: string;
  duration: number;
  listeners: number;
  playcount: number;
  artist: ArtistShortInfo;
  album?: AlbumShortInfo;
  wiki?: {
    published: string;
    summary: string;
    content: string;
  }
}

export interface TrackInfoModel {
  track: TrackInfo;
}

