import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query getUser ($id: String!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
