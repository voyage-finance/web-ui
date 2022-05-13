import { Deployment, Deployments, VoyageContracts } from '../consts/addresses';
import { ChainID, Network } from '../utils/env';
import { useNetwork } from 'wagmi';

const EMPTY_DEPLOYMENT: Deployment = {
  abi: [],
  address: '0x0',
  network: Network.Avalanche,
};

export const useGetDeployment = (contract: VoyageContracts): Deployment => {
  const { activeChain } = useNetwork();
  if (!activeChain) {
    return EMPTY_DEPLOYMENT;
  }

  const chainId = activeChain.id as ChainID;

  const deploymentMap = Deployments[chainId];

  if (!deploymentMap) {
    return EMPTY_DEPLOYMENT;
  }

  return deploymentMap[contract];
};
