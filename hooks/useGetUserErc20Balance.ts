import { useAccount } from 'wagmi';
import ERC20ABI from 'abi/ERC20.json';
import { formatEthersBN, Zero } from '../utils/bn';
import { BigNumber } from 'ethers';
import { useContractRead } from 'hooks';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useGetUserErc20Balance = (tokenSym: string, decimals = 18) => {
  const { data: account } = useAccount();
  const [tokens] = useSupportedTokensCtx();
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
