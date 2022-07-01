import { gql } from '@apollo/client';

export const GET_POOLS = gql`
  {
    pools {
      id
      isActive
      underlyingAsset
      symbol
      decimals
      juniorTrancheTotalLiquidity
      juniorTrancheLiquidityRate
      seniorTrancheTotalLiquidity
      seniorTrancheAvailableLiquidity
      seniorTrancheLiquidityRate
      totalLiquidity
      totalBorrow
      trancheRatio
    }
  }
`;

export const GET_POOL = gql`
  query Pool($asset: Bytes) {
    pool(id: $asset) {
      id
      isActive
      underlyingAsset
      symbol
      decimals
      juniorTrancheTotalLiquidity
      juniorTrancheLiquidityRate
      seniorTrancheTotalLiquidity
      seniorTrancheAvailableLiquidity
      seniorTrancheLiquidityRate
      totalLiquidity
      totalBorrow
      trancheRatio
    }
  }
`;
