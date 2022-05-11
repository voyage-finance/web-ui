import { useContractWrite } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import TusAbi from 'abi/Token.json';

export const useIncreaseAllowance = (tokenSmb: string) => {
  const [tokens] = useSupportedTokens();
  return useContractWrite(
    {
      addressOrName: tokens[tokenSmb],
      contractInterface: TusAbi,
    },
    'increaseAllowance'
  );
};
