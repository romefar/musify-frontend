import { HttpLink, ApolloLink } from '@apollo/client';
import { notification } from 'antd';
import { onError } from 'apollo-link-error';

const isDev = process.env.NODE_ENV === 'development';

export const httpLink = new HttpLink({ uri: 'http://localhost:4001/graphql' });

export const authMiddleware = (authToken: string | null) =>
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
export const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    const gqlMessages = graphQLErrors.map(i => i.message);
    const message = isDev ? gqlMessages.join(' ') : 'Something went wrong while fetching the data.';
    const title = isDev ? 'GraphQL error' : 'Error';

    notification.error({
      message: title,
      description: message,
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
