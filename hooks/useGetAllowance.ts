import { useAccount } from 'wagmi';
import ERC20 from 'abi/ERC20.json';
import { VoyageContracts } from '../consts/addresses';
import { useGetContractAddress } from './useGetContractAddress';
import { useContractRead } from 'hooks';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useGetAllowance = (tokenSmb: string) => {
  const lmAddress = useGetContractAddress(VoyageContracts.LiquidityManager);
  const account = useAccount();
  const [tokens] = useSupportedTokensCtx();
  return useContractRead(
    {
      addressOrName: tokens[tokenSmb],
      contractInterface: ERC20,
    },
    'allowance',
    {
      args: [account.data?.address, lmAddress],
    }
  );
};
