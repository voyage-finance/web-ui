import { Deployment, Deployments, VoyageContracts } from '../consts/addresses';
import { ChainID, resolveProviderConfiguration, Network } from '../utils/env';
import { useNetwork } from 'wagmi';

const EMPTY_DEPLOYMENT: Deployment = {
  abi: [],
  address: '0x0',
  network: Network.Mainnet,
};

export const useGetDeployment = (contract: VoyageContracts): Deployment => {
  const { chain } = useNetwork();

  const chainId = chain ? chain.id : resolveProviderConfiguration().chainId;

  const deploymentMap = Deployments[chainId as ChainID];

  if (!deploymentMap) {
    return EMPTY_DEPLOYMENT;
  }

  return deploymentMap[contract];
};
