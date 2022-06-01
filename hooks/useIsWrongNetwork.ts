import { getProviderConfiguration } from 'utils/env';
import { useAccount, useNetwork } from 'wagmi';

export const useIsWrongNetwork = () => {
  const { activeChain, switchNetwork } = useNetwork();
  const currentConf = getProviderConfiguration();
  const { data: accountData } = useAccount();
  const switchFn = () => {
    switchNetwork?.(currentConf.chainId);
  };
  return [
    accountData !== null && activeChain?.id !== currentConf.chainId,
    switchFn,
  ] as const;
};
