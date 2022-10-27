import { ethers } from 'ethers';
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi';

export const useGetAllowance = (address: string, spender: string) => {
  const account = useAccount();
  return useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [
      account?.address ?? ethers.constants.AddressZero,
      spender as Address,
    ],
  });
};
