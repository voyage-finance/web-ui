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
  totalLiquidity: BigNumber;
  juniorLiquidity: BigNumber;
  seniorLiquidity: BigNumber;
  juniorLiquidityRate: BigNumber;
  seniorLiquidityRate: BigNumber;
  totalDebt: BigNumber;
  borrowRate: BigNumber;
  trancheRatio: BigNumber;
  decimals: number;
};

export type VoyagePoolTokenMap = Record<string, string>;
