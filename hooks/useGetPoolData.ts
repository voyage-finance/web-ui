import { useContractRead } from 'hooks';
import { useSupportedTokens } from './useFetchPoolTokens';
import { PoolData } from 'types';
import { rayToPercent, shiftDecimals } from 'utils/bn';
import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';
import { getProviderConfiguration } from 'utils/env';

export const useGetPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  const { address, abi } = useGetDeployment(
    VoyageContracts.VoyageProtocolDataProvider
  );
  const { data, isSuccess, ...rest } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'getPoolData',
    {
      args: tokens[tokenSmb],
      chainId: getProviderConfiguration().chainId,
    }
  );
  return { data: isSuccess ? resultToPoolData(data) : undefined, ...rest };
};

const resultToPoolData = (res: any): PoolData => ({
  totalLiquidity: shiftDecimals(res[0], res[8].toNumber()),
  juniorLiquidity: shiftDecimals(res[1], res[8].toNumber()),
  seniorLiquidity: shiftDecimals(res[2], res[8].toNumber()),
  juniorLiquidityRate: rayToPercent(res[3]),
  seniorLiquidityRate: rayToPercent(res[4]),
  totalDebt: shiftDecimals(res[5], res[8].toNumber()),
  borrowRate: rayToPercent(res[6]),
  trancheRatio: rayToPercent(res[7]),
  decimals: res[8].toNumber(),
});
