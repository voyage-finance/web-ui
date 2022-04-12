import { gql } from '@apollo/client';

export const GET_POOLS = gql`
  {
    pools {
      id
      name
      symbol
      totalLuquidity
      totalLuquidityUSD
      seniorLuquidity
      seniorLuquidityUSD
      seniorAPY
      seniorDeposit
      juniorLuquidity
      juniorLuquidityUSD
      juniorAPY
      juniorDeposit
    }
  }
`;
