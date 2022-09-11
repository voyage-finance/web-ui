import { resolveProviderConfiguration } from 'utils/env';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

export const useIsWrongNetwork = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const currentConf = resolveProviderConfiguration();
  const handleSwitch = () => switchNetwork?.(currentConf.chainId);

  return [address && chain?.id !== currentConf.chainId, handleSwitch] as const;
};
