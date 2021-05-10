import { gql } from '@apollo/client';

export const GET_CHART_TOP_TRACKS = gql`
  query getTopChartTracks ($page: Int!, $limit: Int) {
    topTracks(page: $page, limit: $limit) {
      page
      tracks {
        mbid
        name
        listeners
        playcount
        image {
          text
          size
        }
        artist {
          name
        }
        url
      }
    }
  }
`;

export const GET_TRACK_INFO = gql`
  query getTrackInfo ($artist: String!, $track: String!, $mbid: String) {
    track(artist: $artist, track: $track, mbid: $mbid) {
      name
      mbid
      name
      listeners
      url
      playcount
      duration
      album {
        artist
        title
        mbid
        url
        image {
          size
          text
        }
      }
      wiki {
        published
        summary
        content
      }
      artist {
        name
        mbid
        url
      }
    }
  }
`;

export const SEARCH_TRACK = gql`
  query searchTrackBy ($artist: String, $track: String!, $limit: Int, $page: Int) {
    searchTrack(limit: $limit, track: $track, artist: $artist, page: $page) {
      totalResults
      page
      tracks {
        name
        mbid
        url
        artist
        listeners
        image {
          size
          text
        }
      }
    }
  }
`;
