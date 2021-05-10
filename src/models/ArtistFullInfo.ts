import { ArtistInfo } from './ArtistInfo';
import { ArtistTopAlbums } from './ArtistTopAlbums';
import { ArtistTopTrack } from './ArtistTopTrack';

export interface ArtistFullInfo {
  artist: ArtistInfo;
  artistTopTracks: ArtistTopTrack[];
  topAlbums: ArtistTopAlbums;
}
