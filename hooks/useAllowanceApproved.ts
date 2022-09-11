import { showNotification } from 'utils/notification';
import BigNumber from 'bignumber.js';
import { MAX_UINT_AMOUNT } from 'consts';
import { useEffect, useState } from 'react';
import { fromBigNumber, toHexString } from 'utils/bn';
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import { useGetAllowance } from './useGetAllowance';
import TusAbi from 'abi/ERC20.json';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useAllowanceApproved = (
  forAddress: string,
  successMessage: string
) => {
  // TODO: make TUS dynamic
  const symbol = 'TUS';
  // const { data: signer } = useSigner();
  const { data: allowanceAmount, isLoading } = useGetAllowance(
    symbol,
    forAddress
  );
  const [isApproving, setIsApproving] = useState(false);
  const [tokens] = useSupportedTokensCtx();
  const { config } = usePrepareContractWrite({
    addressOrName: tokens[symbol],
    contractInterface: TusAbi,
    functionName: 'approve',
    args: [forAddress, toHexString(new BigNumber(MAX_UINT_AMOUNT))],
  });
  const { error: errorApprove, writeAsync: approveTx } =
    useContractWrite(config);
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
