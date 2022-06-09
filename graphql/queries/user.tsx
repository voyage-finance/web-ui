import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query getUserPoolData($underlyingAsset: Bytes, $address: Bytes) {
    user(underlyingAsset: $underlyingAsset, address: $address) {
      poolData {
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
