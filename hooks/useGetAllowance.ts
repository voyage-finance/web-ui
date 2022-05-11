import { useAccount, useContractRead } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import TusAbi from 'abi/Token.json';
import { VOYAGE_LM_IMPL_ADDRESS } from 'abi/addresses';

export const useGetAllowance = (tokenSmb: string) => {
  const account = useAccount();
  const [tokens] = useSupportedTokens();
  return useContractRead(
    {
      addressOrName: tokens[tokenSmb],
      contractInterface: TusAbi,
    },
    'allowance',
    {
      args: [account.data?.address, VOYAGE_LM_IMPL_ADDRESS],
    }
  );
};
