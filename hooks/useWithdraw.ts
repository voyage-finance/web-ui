import { VoyageContracts } from 'consts/addresses';
import { TrancheType } from 'types';
import { addDecimals, toHexString } from 'utils/bn';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';
import { useGetDeployment } from './useGetDeployment';

export const useWithdraw = (
  value: string,
  type: TrancheType,
  decimals: number,
  symbol: string
) => {
  const [tokens] = useSupportedTokensCtx();
  const amountHex = toHexString(addDecimals(value, decimals));
  const { address: user } = useAccount();
  const { address: voyageAddress, abi: voyageABI } = useGetDeployment(
    VoyageContracts.Voyage
  );
  const { config } = usePrepareContractWrite({
    addressOrName: voyageAddress,
    contractInterface: voyageABI,
    functionName: 'withdraw',
    args: [
      tokens[symbol],
      type == TrancheType.Senior ? '1' : '0',
      amountHex,
      user,
    ],
  });
  const { isLoading, writeAsync } = useContractWrite(config);

  return { isLoading, onWithdraw: writeAsync } as const;
};
