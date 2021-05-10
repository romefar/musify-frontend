import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser ($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      name
      id
      token
    }
  }
`;
