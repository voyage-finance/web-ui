import BigNumber from 'bignumber.js';

export enum TrancheType {
  Junior,
  Senior,
}

export const TrancheTextMap = {
  [TrancheType.Senior]: 'Senior',
  [TrancheType.Junior]: 'Junior',
};

export interface Currency {
  symbol: string;
  decimals: number;
}

export interface UserTrancheDeposit {
  assets: BigNumber;
  shares: BigNumber;
  cumulativeDeposits: BigNumber;
  cumulativeWithdrawals: BigNumber;
}

export interface UserDeposit {
  junior: UserTrancheDeposit;
  senior: UserTrancheDeposit;
}

export interface UserUnbonding {
  shares: BigNumber;
  maxUnderlying: BigNumber;
}

export interface Reserve {
  id: string;
  collection: string;
  currency: Currency;
  totalLiquidity: BigNumber;
  totalBorrow: BigNumber;
  totalUnbonding: BigNumber;
  totalMaxUnderlying: BigNumber;
  seniorTrancheVToken: VToken;
  seniorTrancheLiquidity: BigNumber;
  seniorTrancheDepositRate: BigNumber;
  juniorTrancheVToken: VToken;
  juniorTrancheLiquidity: BigNumber;
  juniorTrancheDepositRate: BigNumber;
  depositRate: BigNumber;
  borrowRate: BigNumber;
  userDepositData: UserDeposit;
  userUnbondingData: UserUnbonding;
}

export interface VToken {
  id: string;
  tranche: TrancheType;
  totalAssets: BigNumber;
  totalShares: BigNumber;
}

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
