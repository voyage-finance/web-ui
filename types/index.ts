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

export type CreditLine = {
  id: string;
  borrowRate: BigNumber;
  assetAddress: string;
  symbol: string;
  decimals: number;
  totalDebt: BigNumber;
  totalMargin: BigNumber;
  marginRequirement: BigNumber;
  withdrawableSecurityDeposit: BigNumber;
  creditLimit: BigNumber;
  spendableBalance: BigNumber;
  gav: number;
  ltv: number;
  healthFactor: number;
};

export type Loan = {
  id: string;
  pmt_principal: BigNumber;
  pmt_interest: BigNumber;
  pmt_payment: BigNumber;
  principal: BigNumber;
  symbol: string;
  decimals: number;
  term: number;
  epoch: number;
  nper: number;
  apr: BigNumber;
  borrowAt: number;
  nextPaymentDue: number;
  totalPrincipalPaid: BigNumber;
  totalInterestPaid: BigNumber;
  paidTimes: number;
};

export type Vault = {
  id: string;
  loans: Loan[];
  creditLines: CreditLine[];
};

export type BorrowParams = {
  term: BigNumber;
  epoch: BigNumber;
};

export type VoyagePoolTokenMap = Record<string, string>;
