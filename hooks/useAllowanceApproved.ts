import { showNotification } from 'utils/notification';
import BigNumber from 'bignumber.js';
import { MAX_UINT_AMOUNT } from 'consts';
import { useEffect, useState } from 'react';
import { fromBigNumber, toHexString } from 'utils/bn';
import { useContractWrite } from 'wagmi';
import { useGetAllowance } from './useGetAllowance';
import TusAbi from 'abi/ERC20.json';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useAllowanceApproved = (
  forAddress: string,
  successMessage: string
) => {
  // TODO: make TUS dynamic
  const symbol = 'TUS';
  const { data: allowanceAmount, isLoading } = useGetAllowance(symbol);
  const [tokens] = useSupportedTokensCtx();
  const {
    isLoading: isApproving,
    error: errorApprove,
    writeAsync: approveTx,
  } = useContractWrite(
    {
      addressOrName: tokens[symbol],
      contractInterface: TusAbi,
    },
    'increaseAllowance'
  );
  const [isApproved, setIsApproved] = useState(
    allowanceAmount &&
      fromBigNumber(allowanceAmount).isEqualTo(new BigNumber(MAX_UINT_AMOUNT))
  );

  useEffect(() => {
    if (allowanceAmount) {
      setIsApproved(
        fromBigNumber(allowanceAmount).isEqualTo(new BigNumber(MAX_UINT_AMOUNT))
      );
    }
  }, [allowanceAmount]);

  const onApprove = async () => {
    const amountNeeded = new BigNumber(MAX_UINT_AMOUNT).minus(
      fromBigNumber(allowanceAmount)
    );

    await approveTx({
      args: [forAddress, toHexString(amountNeeded)],
    });

    if (errorApprove)
      showNotification({
        title: 'Transaction error',
        message: errorApprove.message,
        type: 'error',
      });
    else {
      showNotification({
        title: 'Allowance increased',
        message: successMessage,
        type: 'success',
      });
      setIsApproved(true);
    }
  };

  return [isApproved, isLoading, isApproving, onApprove] as const;
};
