import { VOYAGE_DATA_PROVIDER_ADDRESS } from 'abi/addresses';
import { useContractRead } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import VoyageProtocolDataProviderAbi from 'abi/VoyageProtocolDataProvider.json';
import { PoolData } from 'types';
import { rayToPercent, shiftDecimals } from 'utils/bn';

export const useGetPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  const { data, isSuccess, ...rest } = useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolData',
    {
      args: tokens[tokenSmb],
    }
  );
  console.log('jr rate: ', data?.[3].toString());
  console.log('sr rate: ', data?.[4].toString());
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
