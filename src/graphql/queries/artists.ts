import { gql } from '@apollo/client';
import { ARTIST_BASE_INFO, ARTIST_SHORT_INFO, ARTIST_SHORT_INFO_TOP_TRACK } from '../fragments/artist';

export const GET_TOP_ALBUMS = gql`
  ${ARTIST_SHORT_INFO}
  query getArtistTopAlbums ($artist: String!, $mbid: String) {
    topAlbums(artist: $artist, mbid: $mbid) {
     albums {
      name
      mbid
      url
      playcount
      image {
        text
        size
      }
      ...ArtistShortInfo
     }
    }
  }
`;

export const GET_ARTIST_INFO = gql`
  ${ARTIST_BASE_INFO}
  query getArtistFullInfo ($artist: String!, $mbid: String) {
    artist(artist: $artist, mbid: $mbid) {
      name
      mbid
      url
      stats {
        listeners
        playcount
      }
      streamable
      image {
        text
        size
      }
      ontour
      ...ArtistBaseInfo
    }
  }
`;

export const GET_TOP_TRACKS = gql`
  ${ARTIST_SHORT_INFO_TOP_TRACK}
  query getArtistTopTracks ($artist: String!, $mbid: String) {
    artistTopTracks(artist: $artist, mbid: $mbid) {
      name
      mbid
      url
      listeners
      playcount
      streamable
      image {
        text
        size
      }
      ...ArtistShortInfoTopTrack
    }
  }
`;


export const GET_ARTIST_FULL_INFO = gql`
  ${ARTIST_BASE_INFO}
  ${ARTIST_SHORT_INFO}
  ${ARTIST_SHORT_INFO_TOP_TRACK}
  query getArtistFullInfo ($artist: String!, $limit: Int, $mbid: String) {
    artist(artist: $artist, mbid: $mbid) {
      name
      mbid
      url
      stats {
        listeners
        playcount
      }
      streamable
      image {
        text
        size
      }
      ontour
      ...ArtistBaseInfo
    }
    topAlbums(artist: $artist, limit: $limit, mbid: $mbid) {
      albums {
       name
       mbid
       url
       playcount
       image {
         text
         size
       }
       ...ArtistShortInfo
      }
    }
    artistTopTracks(artist: $artist, limit: $limit, mbid: $mbid) {
      name
      mbid
      url
      listeners
      playcount
      streamable
      image {
        text
        size
      }
      ...ArtistShortInfoTopTrack
    }
  }
`;

export const GET_ARTIST_TOP = gql`
  query getTopArtists ($page: Int!, $limit: Int) {
    topArtists(page: $page, limit: $limit) {
      artists {
        name
        mbid
        url
        listeners
        playcount
        streamable
        image {
          text
          size
        }
      }
    page
    }
  }
`;

export const SEARCH_ARTIST = gql`
  query searchArtistBy ($artist: String!, $limit: Int, $page: Int) {
    searchArtist(limit: $limit, artist: $artist, page: $page) {
      totalResults
      page
      artists {
        name
        mbid
        url
        streamable
        listeners
        image {
          size
          text
        }
      }
    }
  }
`;
