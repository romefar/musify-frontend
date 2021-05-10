import { ApolloProvider } from '@apollo/client/react';
import { FC } from 'react';
import { useAppApolloClient } from '../apollo';

export const ApolloWrapper: FC = ({ children }) => {
  const client = useAppApolloClient();

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}
