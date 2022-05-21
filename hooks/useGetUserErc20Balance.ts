import { useAccount } from 'wagmi';
import { useSupportedTokens } from './useFetchPoolTokens';
import ERC20ABI from 'abi/ERC20.json';
import { formatEthersBN, Zero } from '../utils/bn';
import { BigNumber } from 'ethers';
import { useContractRead } from 'hooks';

export const useGetUserErc20Balance = (tokenSym: string, decimals = 18) => {
  const { data: account } = useAccount();
  const [tokens] = useSupportedTokens();
  const targetAddress = tokens[tokenSym];
  const { data: balanceOf } = useContractRead(
    { addressOrName: targetAddress, contractInterface: ERC20ABI },
    'balanceOf',
    { args: [account?.address] }
  );
  return balanceOf
    ? formatEthersBN(balanceOf as unknown as BigNumber, decimals)
    : Zero;
};
