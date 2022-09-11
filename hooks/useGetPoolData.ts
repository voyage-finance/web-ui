import { useQuery } from '@apollo/client';
import { GET_POOL, GET_RESERVES } from '@graph/queries/pools';
import BigNumber from 'bignumber.js';
import { ReserveData } from 'types';
import { valueToBigNumber, wadDiv, wadMul } from 'utils/bn';
import { useAccount } from 'wagmi';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useGetPool = (tokenSmb: string) => {
  const [tokens] = useSupportedTokensCtx();
  const { loading, data, error, refetch } = useQuery(GET_POOL, {
    variables: {
      asset: tokens[tokenSmb],
    },
    notifyOnNetworkStatusChange: true,
  });
  return {
    data: data ? deserialiseReserveQueryResult(data.pool) : undefined,
    loading,
    error,
    refetch,
  };
};

export const useReserves = () => {
  const { address } = useAccount();
  const { loading, data, error, refetch } = useQuery(GET_RESERVES, {
    variables: { user: address?.toLowerCase() },
    notifyOnNetworkStatusChange: true,
  });

  const pools: ReserveData[] = data
    ? data.reserves.map((reserve: any) =>
        deserialiseReserveQueryResult(reserve)
      )
    : [];

  return {
    data: pools,
    loading,
    error,
    refetch,
  };
};

interface UserDeposit {
  assets: BigNumber;
  shares: BigNumber;
}

export interface UserDepositData {
  junior: UserDeposit;
  senior: UserDeposit;
}

const convertToAssets = (
  shares: BigNumber,
  totalShares: BigNumber,
  totalAssets: BigNumber
) => {
  return wadDiv(wadMul(shares, totalAssets), totalShares);
};

const deserialiseReserveQueryResult = (res: any): ReserveData => {
  const { juniorTrancheVToken, seniorTrancheVToken, userDeposits } = res;
  const [userDepositData] = userDeposits.map((datum: any) => {
    const { juniorTrancheShares, seniorTrancheShares } = datum;
    const juniorTrancheSharesBN = valueToBigNumber(juniorTrancheShares);
    const seniorTrancheSharesBN = valueToBigNumber(seniorTrancheShares);
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
      },
      senior: {
        assets: seniorTrancheAssets,
        shares: seniorTrancheSharesBN,
      },
    };
  });
  return {
    id: res.id,
    isActive: res.isActive,
    collection: res.collection,
    currency: res.currency,
    juniorTrancheLiquidity: valueToBigNumber(res.juniorTrancheLiquidity),
    juniorTrancheDepositRate: valueToBigNumber(res.juniorTrancheDepositRate),
    seniorTrancheLiquidity: valueToBigNumber(res.seniorTrancheLiquidity),
    seniorTrancheDepositRate: valueToBigNumber(res.seniorTrancheDepositRate),
    totalLiquidity: valueToBigNumber(res.totalLiquidity),
    totalBorrow: valueToBigNumber(res.totalBorrow),
    userDepositData,
    borrowRate: valueToBigNumber(res.borrowRate),
    depositRate: valueToBigNumber(res.depositRate),
    // utilizationRate: rayToPercent(res.utilizationRate),
  };
};
