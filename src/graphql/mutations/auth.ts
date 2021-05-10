import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser ($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      name
      id
      token
    }
  }
`;
