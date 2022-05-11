import { VOYAGE_DATA_PROVIDER_ADDRESS } from 'abi/addresses';
import { useContractRead } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import VoyageProtocolDataProviderAbi from 'abi/VoyageProtocolDataProvider.json';

export const useGetPoolData = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  return useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolData',
    {
      args: tokens[tokenSmb],
    }
  );
};
