import ERC20 from 'abi/ERC20.json';
import { useContractRead } from 'hooks';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';
import { useAccount } from 'wagmi';

export const useGetAllowance = (tokenSmb: string, forAddress: string) => {
  const account = useAccount();
  const [tokens] = useSupportedTokensCtx();
  return useContractRead(
    {
      addressOrName: tokens[tokenSmb],
      contractInterface: ERC20,
    },
    'allowance',
    {
      args: [account?.address, forAddress],
    }
  );
};
