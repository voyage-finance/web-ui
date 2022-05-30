import { showNotification } from '@mantine/notifications';
import BigNumber from 'bignumber.js';
import { MAX_UINT_AMOUNT } from 'consts';
import { useEffect, useState } from 'react';
import { fromBigNumber, toHexString } from 'utils/bn';
import { useContractWrite } from 'wagmi';
import { useGetAllowance } from './useGetAllowance';
import TusAbi from 'abi/ERC20.json';
import { VoyageContracts } from '../consts/addresses';
import { useGetContractAddress } from './useGetContractAddress';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';

export const useAllowanceApproved = (symbol: string) => {
  const { data: allowanceAmount } = useGetAllowance(symbol);
  const [tokens] = useSupportedTokensCtx();
  const lmAddress = useGetContractAddress(VoyageContracts.LiquidityManager);
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
      args: [lmAddress, toHexString(amountNeeded)],
    });

    if (errorApprove)
      showNotification({
        title: 'Transaction error',
        message: errorApprove.message,
        color: 'red',
      });
    else {
      showNotification({
        title: 'Allowance increased',
        message: 'You can now start depositing',
        color: 'green',
      });
      setIsApproved(true);
    }
  };

  return [isApproved, isApproving, onApprove] as const;
};
