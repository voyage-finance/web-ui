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

export type Unbonding = {
  time: BigNumber;
  amount: BigNumber;
  type: TrancheType;
};

export type UserPoolData = {
  juniorTrancheBalance: BigNumber;
  withdrawableJuniorBalance: BigNumber;
  seniorTrancheBalance: BigNumber;
  withdrawableSeniorBalance: BigNumber;
  seniorTranchePnl: BigNumber;
  juniorTranchePnl: BigNumber;
  unbondings: Unbonding[];
};

export type VoyagePoolTokenMap = Record<string, string>;
