import { VoyageContracts } from 'consts/addresses';
import { TrancheType } from 'types';
import { addDecimals, toHexString } from 'utils/bn';
import { useContractWrite, useSigner } from 'wagmi';
import { useSupportedTokensCtx } from './context/useSupportedTokensCtx';
import { useGetDeployment } from './useGetDeployment';

export const useWithdraw = () => {
  const [tokens] = useSupportedTokensCtx();
  const { data: signer } = useSigner();
  const { address: voyagerAddress, abi: voyagerAbi } = useGetDeployment(
    VoyageContracts.Voyager
  );
  const { isLoading, writeAsync: withdraw } = useContractWrite(
    {
      addressOrName: voyagerAddress,
      contractInterface: voyagerAbi,
      signerOrProvider: signer,
    },
    'withdraw'
  );

  const onWithdraw = async (
    value: string,
    type: TrancheType,
    decimals: number,
    symbol: string
  ) => {
    const amountHex = toHexString(addDecimals(value, decimals));
    const user = await signer?.getAddress();
    const tx = await withdraw({
      args: [tokens[symbol], type == TrancheType.Senior ? '1' : '0', amountHex, user],
    });

    return tx;
  };

  return { isLoading, onWithdraw } as const;
};
