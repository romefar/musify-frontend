import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { notification } from 'antd';
import uniqBy from 'lodash.uniqby';
import { onError } from 'apollo-link-error';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { AlbumSearchResult, ArtistSearchResult, ArtistTop, TopTrack, TrackSearchResult } from '../models';

const isDev = process.env.NODE_ENV === 'development';

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = (authToken: string | null) =>
  new ApolloLink((operation, forward) => {
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }

    return forward(operation);
  });

// Issue with unhandled errors: https://github.com/apollographql/apollo-client/issues/5708
const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    const gqlMessages = graphQLErrors.map(i => i.message);
    const message = isDev ? gqlMessages.join(' ') : 'Something went wrong while fetching the data.';
    const title = isDev ? 'GraphQL error' : 'Error';

    notification.error({
      message: title,
      description: message
    });
  }

  if (networkError) {
    const message = isDev ? networkError.message : 'Something went wrong while fetching the data.';
    const title = isDev ? 'GraphQL error' : 'Error';

    notification.error({
      message: title,
      description: message,
    });
  };
});

export const useAppApolloClient = () => {
  const { authToken } = useContext(AuthContext);
  console.log(`Apollo ${authToken}`);
  return new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    link: from([
      (errorLink as unknown) as ApolloLink,
      authMiddleware(authToken).concat(httpLink),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            topTracks: {
              keyArgs: false,
              merge(existing: TopTrack | undefined, incoming: TopTrack) {
                if (existing) {
                  const mergedTracks = [...existing.tracks, ...incoming.tracks];

                  const tracks = uniqBy(mergedTracks, i => i.url);

                  return {
                    page: incoming.page,
                    tracks
                  };
                }

                return incoming;
              },
            },
            topArtists: {
              keyArgs: false,
              merge(existing: ArtistTop | undefined, incoming: ArtistTop) {
                if (existing) {
                  const mergedArtists = [...existing.artists, ...incoming.artists];

                  const artists = uniqBy(mergedArtists, i => i.url);

                  return {
                    page: incoming.page,
                    artists
                  }
                }

                return incoming;
              },
            },
            searchTrack: {
              keyArgs: ['tracks'],
              merge(existing: TrackSearchResult | undefined, incoming: TrackSearchResult) {
                if (existing) {
                  const mergedTracks= [...existing.tracks, ...incoming.tracks];

                  const tracks = uniqBy(mergedTracks, i => i.url);

                  return {
                    ...existing,
                    ...incoming,
                    tracks: tracks
                  }
                }

                return incoming;
              },
            },
            searchArtist: {
              keyArgs: ['artist'],
              merge(existing: ArtistSearchResult | undefined, incoming: ArtistSearchResult) {
                if (existing) {
                  const mergedArtist= [...existing.artists, ...incoming.artists];

                  const artists = uniqBy(mergedArtist, i => i.url);

                  return {
                    ...existing,
                    ...incoming,
                    artists
                  }
                }

                return incoming;
              },
            },
            searchAlbum: {
              keyArgs: ['album'],
              merge(existing: AlbumSearchResult | undefined, incoming: AlbumSearchResult) {
                if (existing) {
                  const mergedAlbums= [...existing.albums, ...incoming.albums];

                  const albums = uniqBy(mergedAlbums, i => i.url);

                  return {
                    ...existing,
                    ...incoming,
                    albums
                  }
                }

                return incoming;
              },
            },
          }
        }
      }
    })
  });
}
