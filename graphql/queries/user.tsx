import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query getUserPoolData($depositDataAddress: Bytes, $address: Bytes) {
    userData(id: $address) {
      depositData(where: { id: $depositDataAddress }) {
        juniorTrancheBalance
        seniorTrancheBalance
        withdrawableJuniorBalance
        withdrawableSeniorBalance
        decimals
      }
      unbondings {
        time
        amount
        type
      }
    }
  }
`;
