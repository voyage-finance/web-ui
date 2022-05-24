import { useSupportedTokens } from './useFetchPoolTokens';
import { PoolData } from 'types';
import { useQuery } from '@apollo/client';
import { GET_POOL, GET_POOLS } from '@graph/queries/pools';
import { shiftDecimals } from 'utils/bn';

export const useGetPool = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  const { loading, data, error } = useQuery(GET_POOL, {
    variables: {
      asset: tokens[tokenSmb],
    },
  });
  return {
    data: data ? resultToPoolData(data.pool) : undefined,
    loading,
    error,
  };
};

export const useGetPools = () => {
  const { loading, data, error } = useQuery(GET_POOLS);
  const pools: PoolData[] = data
    ? data.pools.map((pool: any) => resultToPoolData(pool))
    : [];
  return {
    data: pools,
    loading,
    error,
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
  juniorTrancheLiquidityRate: shiftDecimals(
    res.juniorTrancheLiquidityRate,
    Number(res.decimals)
  ),
  seniorTrancheTotalLiquidity: shiftDecimals(
    res.seniorTrancheTotalLiquidity,
    Number(res.decimals)
  ),
  seniorTrancheAvailableLiquidity: shiftDecimals(
    res.seniorTrancheAvailableLiquidity,
    Number(res.decimals)
  ),
  seniorTrancheLiquidityRate: shiftDecimals(
    res.seniorTrancheLiquidityRate,
    Number(res.decimals)
  ),
  totalLiquidity: shiftDecimals(res.totalLiquidity, Number(res.decimals)),
  totalBorrow: shiftDecimals(res.totalBorrow, Number(res.decimals)),
  trancheRatio: res.trancheRatio,
});
