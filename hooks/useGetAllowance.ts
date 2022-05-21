import { useAccount } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import ERC20 from 'abi/ERC20.json';
import { VoyageContracts } from '../consts/addresses';
import { useGetContractAddress } from './useGetContractAddress';
import { useContractRead } from 'hooks';

export const useGetAllowance = (tokenSmb: string) => {
  const lmAddress = useGetContractAddress(VoyageContracts.LiquidityManager);
  const account = useAccount();
  const [tokens] = useSupportedTokens();
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
