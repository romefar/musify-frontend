import { ApolloClient, ApolloLink, from } from '@apollo/client';
import { useContext } from 'react';

import { AuthContext } from '../components/AuthContext';
import { cache } from './cache';
import { authMiddleware, errorLink, httpLink } from './links';

export const useAppApolloClient = () => {
  const { authToken } = useContext(AuthContext);

  return new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    link: from([
      (errorLink as unknown) as ApolloLink,
      authMiddleware(authToken).concat(httpLink),
    ]),
    cache,
  });
};
