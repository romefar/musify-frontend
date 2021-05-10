import { InMemoryCache } from '@apollo/client';
import uniqBy from 'lodash.uniqby';

import { TopTrack, ArtistTop, TrackSearchResult, ArtistSearchResult, AlbumSearchResult } from '../models';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        topTracks: {
          keyArgs: false,
          merge (existing: TopTrack | undefined, incoming: TopTrack) {
            if (existing) {
              const mergedTracks = [...existing.tracks, ...incoming.tracks];

              const tracks = uniqBy(mergedTracks, i => i.url);

              return {
                page: incoming.page,
                tracks,
              };
            }

            return incoming;
          },
        },
        topArtists: {
          keyArgs: false,
          merge (existing: ArtistTop | undefined, incoming: ArtistTop) {
            if (existing) {
              const mergedArtists = [...existing.artists, ...incoming.artists];

              const artists = uniqBy(mergedArtists, i => i.url);

              return {
                page: incoming.page,
                artists,
              };
            }

            return incoming;
          },
        },
        searchTrack: {
          keyArgs: ['tracks'],
          merge (existing: TrackSearchResult | undefined, incoming: TrackSearchResult) {
            if (existing) {
              const mergedTracks = [...existing.tracks, ...incoming.tracks];

              const tracks = uniqBy(mergedTracks, i => i.url);

              return {
                ...existing,
                ...incoming,
                tracks: tracks,
              };
            }

            return incoming;
          },
        },
        searchArtist: {
          keyArgs: ['artist'],
          merge (existing: ArtistSearchResult | undefined, incoming: ArtistSearchResult) {
            if (existing) {
              const mergedArtist = [...existing.artists, ...incoming.artists];

              const artists = uniqBy(mergedArtist, i => i.url);

              return {
                ...existing,
                ...incoming,
                artists,
              };
            }

            return incoming;
          },
        },
        searchAlbum: {
          keyArgs: ['album'],
          merge (existing: AlbumSearchResult | undefined, incoming: AlbumSearchResult) {
            if (existing) {
              const mergedAlbums = [...existing.albums, ...incoming.albums];

              const albums = uniqBy(mergedAlbums, i => i.url);

              return {
                ...existing,
                ...incoming,
                albums,
              };
            }

            return incoming;
          },
        },
      },
    },
  },
});
