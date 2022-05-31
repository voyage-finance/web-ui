import { PoolData } from 'types';
import { useQuery } from '@apollo/client';
import { GET_POOL, GET_POOLS } from '@graph/queries/pools';
import { rayToPercent, shiftDecimals } from 'utils/bn';
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
    data: data ? resultToPoolData(data.pool) : undefined,
    loading,
    error,
    refetch,
  };
};

export const useGetPools = () => {
  const { loading, data, error, refetch } = useQuery(GET_POOLS, {
    notifyOnNetworkStatusChange: true,
  });
  const pools: PoolData[] = data
    ? data.pools.map((pool: any) => resultToPoolData(pool))
    : [];
  return {
    data: pools,
    loading,
    error,
    refetch,
  };
};

const resultToPoolData = (res: any): PoolData => ({
  id: res.id,
  isActive: res.inActive,
  underlyingAsset: res.underlyingAsset,
  symbol: res.symbol,
  decimals: Number(res.decimals),
  collateralAsset: res.collateralAsset,
  juniorTrancheTotalLiquidity: shiftDecimals(
    res.juniorTrancheTotalLiquidity,
    Number(res.decimals)
  ),
  juniorTrancheLiquidityRate: rayToPercent(res.juniorTrancheLiquidityRate),
  seniorTrancheTotalLiquidity: shiftDecimals(
    res.seniorTrancheTotalLiquidity,
    Number(res.decimals)
  ),
  seniorTrancheAvailableLiquidity: shiftDecimals(
    res.seniorTrancheAvailableLiquidity,
    Number(res.decimals)
  ),
  seniorTrancheLiquidityRate: rayToPercent(res.seniorTrancheLiquidityRate),
  totalLiquidity: shiftDecimals(res.totalLiquidity, Number(res.decimals)),
  totalBorrow: shiftDecimals(res.totalBorrow, Number(res.decimals)),
  trancheRatio: rayToPercent(res.trancheRatio),
});
