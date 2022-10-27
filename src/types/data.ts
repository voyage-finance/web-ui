export interface CurrencyData {
  symbol: string;
  decimals: number;
}

export interface VTokenData {
  id: string;
  totalAssets: string;
  totalShares: string;
}

interface UserDepositData {
  juniorTrancheShares: string;
  juniorTrancheCumulativeDeposits: string;
  juniorTrancheCumulativeWithdrawals: string;
  seniorTrancheShares: string;
  seniorTrancheCumulativeDeposits: string;
  seniorTrancheCumulativeWithdrawals: string;
}

interface UserUnbondingData {
  shares: string;
  maxUnderlying: string;
}

export interface ReserveData {
  id: string;
  collection: string;
  currency: CurrencyData;
  totalBorrow: string;
  totalLiquidity: string;
  totalUnbonding: string;
  totalMaxUnderlying: string;
  utilizationRate: string;
  depositRate: string;
  borrowRate: string;
  seniorTrancheVToken: VTokenData;
  seniorTrancheLiquidity: string;
  seniorTrancheDepositRate: string;
  juniorTrancheVToken: VTokenData;
  juniorTrancheLiquidity: string;
  juniorTrancheDepositRate: string;
  userDeposits: UserDepositData[];
  userUnbondings: UserUnbondingData[];
}
