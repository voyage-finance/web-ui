import { ethers } from 'ethers';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';

export const useGetUserErc20Balance = (address: string) => {
  const account = useAccount();
  return useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [account.address ?? ethers.constants.AddressZero],
  });
};
