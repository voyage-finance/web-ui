import { gql } from '@apollo/client';

export const GET_USERS = gql`
  {
    user(id: 1) {
      id
      firstname
      age
    }
  }
`;
