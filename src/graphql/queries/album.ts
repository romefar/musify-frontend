import { gql } from '@apollo/client';

export const GET_ALBUM_INFO = gql`
  query getAlbumInfo ($artist: String!, $album: String!, $mbid: String) {
    album(artist: $artist, album: $album, mbid: $mbid) {
      name
      artist
      mbid
      url
      image {
        text
        size
      }
      listeners
      playcount
      tracks {
        name
        url
        duration
      }
      wiki {
        published
        summary
        content
      }
    }
  }
`;

export const SEARCH_ALBUM = gql`
  query searchAlbumBy ($album: String!, $limit: Int, $page: Int) {
    searchAlbum(limit: $limit, album: $album, page: $page) {
      totalResults
      page
      albums {
        name
        mbid
        url
        artist
        image {
          size
          text
        }
      }
    }
  }
`;
