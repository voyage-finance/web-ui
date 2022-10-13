import BigNumber from 'bignumber.js';
import { UserDepositData } from 'hooks/useGetPoolData';

export enum TrancheType {
  Senior,
  Junior,
}

export const TrancheTextMap = {
  [TrancheType.Senior]: 'Senior',
  [TrancheType.Junior]: 'Junior',
};

export interface Currency {
  id: string; // ERC20 address
  symbol: string;
  decimals: number;
}

export interface ReserveData {
  id: string;
  collection: string;
  currency: Currency;
  isActive: boolean;
  totalLiquidity: BigNumber;
  seniorTrancheLiquidity: BigNumber;
  seniorTrancheDepositRate: BigNumber;
  juniorTrancheLiquidity: BigNumber;
  juniorTrancheDepositRate: BigNumber;
  totalBorrow: BigNumber;
  depositRate: BigNumber;
  borrowRate: BigNumber;
  userDepositData?: UserDepositData;
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

export enum MessageAction {
  AUTH_SUCCESS = 'auth_success',
  GET_FINGERPRINT = 'get_fingerprint',
}

export interface RuntimeMessage {
  action: MessageAction;
  params?: any;
}
