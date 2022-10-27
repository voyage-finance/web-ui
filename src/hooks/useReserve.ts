import { useQuery } from '@tanstack/react-query';
import { Reserve, ReserveData, TrancheType } from '@types';
import { valueToBigNumber, Zero } from '@utils/bn';
import { getReserveId, subgraph } from '@utils/graph';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

const NIL_USER_DEPOSIT = {
  assets: Zero,
  shares: Zero,
  cumulativeDeposits: Zero,
  cumulativeWithdrawals: Zero,
};

export const DEFAULT_RESERVE_STATE: Reserve = {
  id: ethers.constants.AddressZero,
  collection: ethers.constants.AddressZero,
  currency: { symbol: 'WETH', decimals: 18 },
  totalLiquidity: Zero,
  totalBorrow: Zero,
  totalUnbonding: Zero,
  totalMaxUnderlying: Zero,
  // utilizationRate: Zero,
  depositRate: Zero,
  borrowRate: Zero,
  seniorTrancheVToken: {
    id: ethers.constants.AddressZero,
    tranche: TrancheType.Senior,
    totalAssets: Zero,
    totalShares: Zero,
  },
  seniorTrancheLiquidity: Zero,
  seniorTrancheDepositRate: Zero,
  juniorTrancheVToken: {
    id: ethers.constants.AddressZero,
    tranche: TrancheType.Junior,
    totalAssets: Zero,
    totalShares: Zero,
  },
  juniorTrancheLiquidity: Zero,
  juniorTrancheDepositRate: Zero,
  userDepositData: {
    junior: NIL_USER_DEPOSIT,
    senior: NIL_USER_DEPOSIT,
  },
  userUnbondingData: {
    shares: Zero,
    maxUnderlying: Zero,
  },
};

export const useReserve = (collection: string, user?: string) => {
  const id = getReserveId(collection);
  const { data, ...rest } = useQuery(['reserve', collection, user], () =>
    subgraph.Reserve({ id, user: user?.toLowerCase() })
  );
  if (!data || !data.reserve) {
    return { data: undefined, ...rest };
  }
  return {
    ...rest,
    data: deserialiseReserveQueryResult(data.reserve),
  };
};

export const useReserves = () => {
  const { address } = useAccount();
  const { data, ...rest } = useQuery(['reserves', address], () =>
    subgraph.Reserves({ user: address?.toLowerCase() })
  );
  if (!data) {
    return { ...rest, data: [] };
  }
  return {
    ...rest,
    data: data.reserves.map((reserve) =>
      deserialiseReserveQueryResult(reserve)
    ),
  };
};

const convertToAssets = (
  shares: BigNumber,
  totalShares: BigNumber,
  totalAssets: BigNumber
) => {
  return totalShares.isZero()
    ? Zero
    : shares.times(totalAssets).div(totalShares);
};

const deserialiseReserveQueryResult = (res: ReserveData): Reserve => {
  const {
    juniorTrancheVToken,
    seniorTrancheVToken,
    userDeposits,
    userUnbondings,
  } = res;
  const [
    userDepositData = {
      junior: NIL_USER_DEPOSIT,
      senior: NIL_USER_DEPOSIT,
    },
  ] = userDeposits.map((datum: any) => {
    const {
      juniorTrancheShares,
      juniorTrancheCumulativeDeposits,
      juniorTrancheCumulativeWithdrawals,
      seniorTrancheShares,
      seniorTrancheCumulativeDeposits,
      seniorTrancheCumulativeWithdrawals,
    } = datum;
    const juniorTrancheSharesBN = valueToBigNumber(juniorTrancheShares);
    const juniorTrancheCumulativeDepositsBN = valueToBigNumber(
      juniorTrancheCumulativeDeposits
    );
    const juniorTrancheCumulativeWithdrawalsBN = valueToBigNumber(
      juniorTrancheCumulativeWithdrawals
    );
    const seniorTrancheSharesBN = valueToBigNumber(seniorTrancheShares);
    const seniorTrancheCumulativeDepositsBN = valueToBigNumber(
      seniorTrancheCumulativeDeposits
    );
    const seniorTrancheCumulativeWithdrawalsBN = valueToBigNumber(
      seniorTrancheCumulativeWithdrawals
    );
    const juniorTrancheAssets = convertToAssets(
      juniorTrancheSharesBN,
      new BigNumber(juniorTrancheVToken.totalShares),
      new BigNumber(juniorTrancheVToken.totalAssets)
    );
    const seniorTrancheAssets = convertToAssets(
      seniorTrancheSharesBN,
      new BigNumber(seniorTrancheVToken.totalShares),
      new BigNumber(seniorTrancheVToken.totalAssets)
    );
    return {
      junior: {
        assets: juniorTrancheAssets,
        shares: juniorTrancheSharesBN,
        cumulativeDeposits: juniorTrancheCumulativeDepositsBN,
        cumulativeWithdrawals: juniorTrancheCumulativeWithdrawalsBN,
      },
      senior: {
        assets: seniorTrancheAssets,
        shares: seniorTrancheSharesBN,
        cumulativeDeposits: seniorTrancheCumulativeDepositsBN,
        cumulativeWithdrawals: seniorTrancheCumulativeWithdrawalsBN,
      },
    };
  });
  const [
    userUnbondingData = {
      shares: Zero,
      maxUnderlying: Zero,
    },
  ] = userUnbondings.map((datum: any) => {
    const { shares, maxUnderlying } = datum;
    return {
      shares: valueToBigNumber(shares),
      maxUnderlying: valueToBigNumber(maxUnderlying),
    };
  });

  return {
    id: res.id,
    collection: res.collection,
    currency: res.currency,
    juniorTrancheVToken: {
      id: juniorTrancheVToken.id,
      tranche: TrancheType.Junior,
      totalAssets: valueToBigNumber(res.juniorTrancheVToken.totalAssets),
      totalShares: valueToBigNumber(res.juniorTrancheVToken.totalShares),
    },
    juniorTrancheLiquidity: valueToBigNumber(res.juniorTrancheLiquidity),
    juniorTrancheDepositRate: valueToBigNumber(res.juniorTrancheDepositRate),
    seniorTrancheVToken: {
      id: seniorTrancheVToken.id,
      tranche: TrancheType.Senior,
      totalAssets: valueToBigNumber(res.seniorTrancheVToken.totalAssets),
      totalShares: valueToBigNumber(res.seniorTrancheVToken.totalShares),
    },
    seniorTrancheLiquidity: valueToBigNumber(res.seniorTrancheLiquidity),
    seniorTrancheDepositRate: valueToBigNumber(res.seniorTrancheDepositRate),
    totalBorrow: valueToBigNumber(res.totalBorrow),
    totalLiquidity: valueToBigNumber(res.totalLiquidity),

    totalMaxUnderlying: valueToBigNumber(res.totalMaxUnderlying),
    totalUnbonding: valueToBigNumber(res.totalUnbonding),

    userDepositData,
    userUnbondingData,

    borrowRate: valueToBigNumber(res.borrowRate),
    depositRate: valueToBigNumber(res.depositRate),
    // utilizationRate: rayToPercent(res.utilizationRate),
  };
};
