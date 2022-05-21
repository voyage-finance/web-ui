import { Deployment, Deployments, VoyageContracts } from '../consts/addresses';
import { ChainID, getProviderConfiguration, Network } from '../utils/env';
import { useNetwork } from 'wagmi';

const EMPTY_DEPLOYMENT: Deployment = {
  abi: [],
  address: '0x0',
  network: Network.Avalanche,
};

export const useGetDeployment = (contract: VoyageContracts): Deployment => {
  const { activeChain } = useNetwork();

  const chainId = activeChain
    ? activeChain.id
    : getProviderConfiguration().chainId;

  const deploymentMap = Deployments[chainId as ChainID];

  if (!deploymentMap) {
    return EMPTY_DEPLOYMENT;
  }

  return deploymentMap[contract];
};
