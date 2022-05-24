import BigNumber from 'bignumber.js';

export enum TrancheType {
  Senior,
  Junior,
}

export const TrancheTextMap = {
  [TrancheType.Senior]: 'Senior',
  [TrancheType.Junior]: 'Junior',
};

export type PoolData = {
  id: string;
  isActive: boolean;
  underlyingAsset: string;
  collateralAsset: string;
  symbol: string;
  decimals: number;
  juniorTrancheTotalLiquidity: BigNumber;
  juniorTrancheLiquidityRate: BigNumber;
  seniorTrancheTotalLiquidity: BigNumber;
  seniorTrancheAvailableLiquidity: BigNumber;
  seniorTrancheLiquidityRate: BigNumber;
  totalLiquidity: BigNumber;
  totalBorrow: BigNumber;
  trancheRatio: BigNumber;
};

export type UserPoolData = {
  juniorTrancheBalance: BigNumber;
  withdrawableJuniorTrancheBalance: BigNumber;
  seniorTrancheBalance: BigNumber;
  withdrawableSeniorTrancheBalance: BigNumber;
};

export type VoyagePoolTokenMap = Record<string, string>;
