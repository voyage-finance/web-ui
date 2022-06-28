import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query getUserPoolData($depositDataAddress: Bytes, $address: Bytes) {
    userData(id: $address) {
      depositData(where: { id: $depositDataAddress }) {
        juniorTrancheBalance
        juniorTranchePnl
        seniorTrancheBalance
        seniorTranchePnl
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
