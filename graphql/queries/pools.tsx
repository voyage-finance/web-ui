import { gql } from '@apollo/client';

export const GET_RESERVES = gql`
  query Reserves($user: Bytes) {
    reserves {
      id
      collection
      currency {
        symbol
        decimals
      }

      totalBorrow
      totalLiquidity
      utilizationRate

      depositRate
      borrowRate

      seniorTrancheVToken {
        totalAssets
        totalShares
      }
      seniorTrancheLiquidity
      seniorTrancheDepositRate

      juniorTrancheVToken {
        totalAssets
        totalShares
      }
      juniorTrancheLiquidity
      juniorTrancheDepositRate

      userDeposits(where: { user: $user }) {
        juniorTrancheShares
        seniorTrancheShares
      }
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
