import { wethAddress } from '@utils/config';
import { Address, erc20ABI, useContractRead } from 'wagmi';

export const useWethBalance = (address: string) => {
  return useContractRead({
    abi: erc20ABI,
    address: wethAddress,
    functionName: 'balanceOf',
    args: [address as Address],
  });
};
