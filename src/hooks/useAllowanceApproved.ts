import { showNotification } from '@utils/notification';
import { MAX_UINT_AMOUNT } from 'consts';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  Address,
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { useGetAllowance } from './useGetAllowance';

export const useAllowanceApproved = (
  contract: string,
  spender: string,
  successMessage: string
) => {
  const { data: allowance, isLoading } = useGetAllowance(contract, spender);
  const [isApproving, setIsApproving] = useState(false);
  const { config } = usePrepareContractWrite({
    address: contract,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender as Address, ethers.BigNumber.from(MAX_UINT_AMOUNT)],
  });
  const { error: errorApprove, writeAsync: approveTx } =
    useContractWrite(config);
  const [isApproved, setIsApproved] = useState(false);
  useEffect(() => {
    if (allowance) {
      setIsApproved(
        ethers.BigNumber.from(allowance).gte(
          ethers.BigNumber.from(MAX_UINT_AMOUNT)
        )
      );
    }
  }, [allowance]);

  const onApprove = async () => {
    setIsApproving(true);
    await approveTx?.().then((tx) => tx.wait());
    if (errorApprove) {
      showNotification({
        title: 'Transaction error',
        message: errorApprove.message,
        type: 'error',
      });
    } else {
      showNotification({
        title: 'Allowance increased',
        message: successMessage,
        type: 'success',
      });
      setIsApproved(true);
    }
    setIsApproving(true);
  };

  return [isApproved, isLoading, isApproving, onApprove] as const;
};
