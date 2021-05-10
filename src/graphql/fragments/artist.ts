import gql from "graphql-tag";

export const ARTIST_BASE_INFO = gql`
  fragment ArtistBaseInfo on Artist {
    similar {
      name
      url
      image {
        text
        size
      }
    }
    bio {
      links {
        link {
          text
          rel
          href
        }
      }
      published
      summary
      content
    }
  }
`;

export const ARTIST_SHORT_INFO = gql`
  fragment ArtistShortInfo on ArtistAlbumItem {
   artist {
    name
    url
    mbid
   }
  }
`;

export const ARTIST_SHORT_INFO_TOP_TRACK = gql`
  fragment ArtistShortInfoTopTrack on ArtistTopTracks {
   artist {
    name
    url
    mbid
   }
  }
`;
